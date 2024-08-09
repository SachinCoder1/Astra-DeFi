import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  LiquidityProvided,
  LiquidityRemoved,
  OwnershipTransferred,
  Swapped
} from "../generated/AMM/AMM"

export function createLiquidityProvidedEvent(
  provider: Address,
  amount1: BigInt,
  amount2: BigInt
): LiquidityProvided {
  let liquidityProvidedEvent = changetype<LiquidityProvided>(newMockEvent())

  liquidityProvidedEvent.parameters = new Array()

  liquidityProvidedEvent.parameters.push(
    new ethereum.EventParam("provider", ethereum.Value.fromAddress(provider))
  )
  liquidityProvidedEvent.parameters.push(
    new ethereum.EventParam(
      "amount1",
      ethereum.Value.fromUnsignedBigInt(amount1)
    )
  )
  liquidityProvidedEvent.parameters.push(
    new ethereum.EventParam(
      "amount2",
      ethereum.Value.fromUnsignedBigInt(amount2)
    )
  )

  return liquidityProvidedEvent
}

export function createLiquidityRemovedEvent(
  provider: Address,
  amount1: BigInt,
  amount2: BigInt
): LiquidityRemoved {
  let liquidityRemovedEvent = changetype<LiquidityRemoved>(newMockEvent())

  liquidityRemovedEvent.parameters = new Array()

  liquidityRemovedEvent.parameters.push(
    new ethereum.EventParam("provider", ethereum.Value.fromAddress(provider))
  )
  liquidityRemovedEvent.parameters.push(
    new ethereum.EventParam(
      "amount1",
      ethereum.Value.fromUnsignedBigInt(amount1)
    )
  )
  liquidityRemovedEvent.parameters.push(
    new ethereum.EventParam(
      "amount2",
      ethereum.Value.fromUnsignedBigInt(amount2)
    )
  )

  return liquidityRemovedEvent
}

export function createOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferred {
  let ownershipTransferredEvent = changetype<OwnershipTransferred>(
    newMockEvent()
  )

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipTransferredEvent
}

export function createSwappedEvent(
  swapper: Address,
  tokenIn: Address,
  tokenOut: Address,
  amountIn: BigInt,
  amountOut: BigInt
): Swapped {
  let swappedEvent = changetype<Swapped>(newMockEvent())

  swappedEvent.parameters = new Array()

  swappedEvent.parameters.push(
    new ethereum.EventParam("swapper", ethereum.Value.fromAddress(swapper))
  )
  swappedEvent.parameters.push(
    new ethereum.EventParam("tokenIn", ethereum.Value.fromAddress(tokenIn))
  )
  swappedEvent.parameters.push(
    new ethereum.EventParam("tokenOut", ethereum.Value.fromAddress(tokenOut))
  )
  swappedEvent.parameters.push(
    new ethereum.EventParam(
      "amountIn",
      ethereum.Value.fromUnsignedBigInt(amountIn)
    )
  )
  swappedEvent.parameters.push(
    new ethereum.EventParam(
      "amountOut",
      ethereum.Value.fromUnsignedBigInt(amountOut)
    )
  )

  return swappedEvent
}
