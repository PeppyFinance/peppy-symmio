import styled from "styled-components";
import Image from "next/image";
import { useRouter } from "next/router";

import {
  useFavorites,
  useToggleUserFavoriteCallback,
} from "@symmio/frontend-sdk/state/user/hooks";
import { formatDollarAmount, toBN } from "@symmio/frontend-sdk/utils/numbers";
import { Market } from "@symmio/frontend-sdk/types/market";

import useCurrencyLogo from "lib/hooks/useCurrencyLogo";

import { Star } from "components/Icons";
import { Row, RowBetween, RowCenter, RowStart } from "components/Row";

const TableStructure = styled(RowBetween)`
  font-size: 12px;
  font-weight: 500;
  text-align: left;

  & > * {
    width: 18%;

    &:nth-child(1) {
      width: 28px;
      margin-right: 12px;
    }
    &:nth-child(2) {
      width: 14%;
    }
    &:nth-child(3) {
      width: 12%;
    }

    ${({ theme }) => theme.mediaWidth.upToSmall`
      &:nth-child(1) {
        width: 14px;
        margin-right: 0;
      }
      &:nth-child(2) {
        width: 20%;
      }
      &:nth-child(4) {
        width: 16%;
      }
      &:nth-child(5) {
        display: none;
      }
      &:nth-child(6) {
        display: none;
      }
    `}
    ${({ theme }) => theme.mediaWidth.upToExtraSmall`
      &:nth-child(2) {
        width: 27%;
      }
      &:nth-child(4) {
        display: none;
      }
    `}
  }
`;

const RowWrap = styled(TableStructure)`
  height: 56px;
  color: ${({ theme }) => theme.text7};
  padding: 12px 24px 12px 12px;
  border-bottom: 1px solid ${({ theme }) => theme.bgTransparent};

  & > * {
    &:nth-child(1) {
      height: 100%;
    }
  }
`;

const StarWrapper = styled(RowCenter)`
  &:hover {
    cursor: pointer;
  }
`;

const Symbol = styled.div`
  margin-bottom: 4px;
`;

const MarketName = styled.span`
  font-size: 10px;
`;

const ColorLabel = styled(Row)<{ color: "green" | "red" | "gray" }>`
  color: ${({ color, theme }) =>
    color === "green"
      ? theme.peppyGreen
      : color === "red"
      ? theme.peppyRed
      : theme.text2};
`;

const ActionBtn = styled.button`
  box-sizing: border-box;
  width: 80px;
  height: 30px;
  padding: 8px 24px;
  color: ${({ theme }) => theme.text8};
  border: 1px solid ${({ theme }) => theme.text8};
  border-radius: 6px;
  font-weight: 600;

  &:hover {
    background: ${({ theme }) => theme.bg9};
    color: ${({ theme }) => theme.bgTransparent};
    transition: all 0.3s;
  }
`;

export default function MarketRow({
  market,
  marketInfo,
}: {
  market: Market;
  marketInfo?: {
    price: string;
    priceChangePercent: string;
    tradeVolume: string;
    notionalCap: string;
  };
}) {
  const { symbol, name, pricePrecision } = market;
  const { price, priceChangePercent, tradeVolume, notionalCap } =
    marketInfo || {};

  const router = useRouter();
  const favorites = useFavorites();
  const isFavorite = favorites?.includes(symbol);
  const icon = useCurrencyLogo(symbol);
  const toggleFavorite = useToggleUserFavoriteCallback(symbol);

  const onTradeClick = () => {
    router.push(`/trade/${name}`);
  };

  return (
    <RowWrap>
      <StarWrapper onClick={toggleFavorite}>
        <Star size={12.44} isFavorite={isFavorite} />
      </StarWrapper>
      <RowStart gap={"8px"}>
        <Image src={icon} alt={symbol} width={28} height={28} />
        <div>
          <Symbol>{symbol}</Symbol>
          <ColorLabel color={"gray"}>
            <MarketName>{name}</MarketName>
          </ColorLabel>
        </div>
      </RowStart>
      <div>{price ? `$${parseFloat(price).toFixed(pricePrecision)}` : "-"}</div>
      <ColorLabel
        color={
          priceChangePercent
            ? toBN(priceChangePercent).isGreaterThan(0)
              ? "green"
              : "red"
            : "gray"
        }
        gap={"2px"}
      >
        <span>
          {(() => {
            if (!priceChangePercent) return "-";
            return `${
              toBN(priceChangePercent).isGreaterThan(0) ? "+" : ""
            }${priceChangePercent}%`;
          })()}
        </span>
      </ColorLabel>
      <div>{formatDollarAmount(tradeVolume)}</div>
      <div>{formatDollarAmount(notionalCap)}</div>
      <ActionBtn onClick={onTradeClick}>Trade</ActionBtn>
    </RowWrap>
  );
}
