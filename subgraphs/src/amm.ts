import { BigDecimal } from "@graphprotocol/graph-ts";
import {
  LiquidityProvided as LiquidityProvidedEvent,
  LiquidityRemoved as LiquidityRemovedEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
  Swapped as SwappedEvent,
} from "../generated/amm/amm";
import {
  LiquidityProvided,
  LiquidityRemoved,
  OwnershipTransferred,
  Swapped,
  Volume,
  TVL,
} from "../generated/schema";

export function handleLiquidityProvided(event: LiquidityProvidedEvent): void {
  let entity = new LiquidityProvided(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.provider = event.params.provider;
  entity.amount1 = event.params.amount1;
  entity.amount2 = event.params.amount2;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();

  let tvlEntity = TVL.load(event.block.timestamp.toString());
  if (tvlEntity == null) {
    tvlEntity = new TVL(event.block.timestamp.toString());
    tvlEntity.timestamp = event.block.timestamp;
    tvlEntity.tvl = BigDecimal.fromString("0");
  }
  tvlEntity.tvl = tvlEntity.tvl
    .plus(event.params.amount1.toBigDecimal())
    .plus(event.params.amount2.toBigDecimal());
  tvlEntity.save();
}

export function handleLiquidityRemoved(event: LiquidityRemovedEvent): void {
  let entity = new LiquidityRemoved(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.provider = event.params.provider;
  entity.amount1 = event.params.amount1;
  entity.amount2 = event.params.amount2;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();

  let tvlEntity = TVL.load(event.block.timestamp.toString());
  if (tvlEntity == null) {
    tvlEntity = new TVL(event.block.timestamp.toString());
    tvlEntity.timestamp = event.block.timestamp;
    tvlEntity.tvl = BigDecimal.fromString("0");
  }
  tvlEntity.tvl = tvlEntity.tvl
    .minus(event.params.amount1.toBigDecimal())
    .minus(event.params.amount2.toBigDecimal());
  tvlEntity.save();
}

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent
): void {
  let entity = new OwnershipTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.previousOwner = event.params.previousOwner;
  entity.newOwner = event.params.newOwner;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleSwapped(event: SwappedEvent): void {
  let entity = new Swapped(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.swapper = event.params.swapper;
  entity.tokenIn = event.params.tokenIn;
  entity.tokenOut = event.params.tokenOut;
  entity.amountIn = event.params.amountIn;
  entity.amountOut = event.params.amountOut;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();

  let volumeEntity = Volume.load(event.block.timestamp.toString());
  if (volumeEntity == null) {
    volumeEntity = new Volume(event.block.timestamp.toString());
    volumeEntity.timestamp = event.block.timestamp;
    volumeEntity.volume = BigDecimal.fromString("0");
  }
  volumeEntity.volume = volumeEntity.volume.plus(
    event.params.amountIn.toBigDecimal()
  );
  volumeEntity.save();
}
