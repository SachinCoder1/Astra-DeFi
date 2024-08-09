import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, BigInt } from "@graphprotocol/graph-ts"
import { LiquidityProvided } from "../generated/schema"
import { LiquidityProvided as LiquidityProvidedEvent } from "../generated/AMM/AMM"
import { handleLiquidityProvided } from "../src/amm"
import { createLiquidityProvidedEvent } from "./amm-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let provider = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let amount1 = BigInt.fromI32(234)
    let amount2 = BigInt.fromI32(234)
    let newLiquidityProvidedEvent = createLiquidityProvidedEvent(
      provider,
      amount1,
      amount2
    )
    handleLiquidityProvided(newLiquidityProvidedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("LiquidityProvided created and stored", () => {
    assert.entityCount("LiquidityProvided", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "LiquidityProvided",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "provider",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "LiquidityProvided",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "amount1",
      "234"
    )
    assert.fieldEquals(
      "LiquidityProvided",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "amount2",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
