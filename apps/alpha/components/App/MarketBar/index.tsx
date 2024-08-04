import { useMemo } from "react";
import styled from "styled-components";

import { ApiState } from "@symmio/frontend-sdk/types/api";
import { formatDollarAmount } from "@symmio/frontend-sdk/utils/numbers";
import { useActiveMarket } from "@symmio/frontend-sdk/state/trade/hooks";
import {
  useMarketNotionalCap,
  useMarketOpenInterest,
} from "@symmio/frontend-sdk/state/hedger/hooks";

import { Loader } from "components/Icons";
import MarketInfo from "components/App/MarketBar/MarketInfo";
import Column from "components/Column";
import BlinkingPrice from "components/App/FavoriteBar/BlinkingPrice";
import { Row, RowBetween } from "components/Row";
import MarketDepths from "./MarketDepths";
import MarketFundingRate from "./MarketFundingRate";

const Wrapper = styled(Row)`
  min-height: 48px;
  padding: 0px 12px;
  border-radius: 2px;
  z-index: 10;
  ${({ theme }) => theme.mediaWidth.upToLarge`
    flex-direction: column;   
    min-height: unset;
    gap:16px; 
  `};
`;

const DataWrap = styled(Row)`
  gap: 20px;
  border-radius: 4px;
  flex: 2;

  ${({ theme }) => theme.mediaWidth.upToLarge` 
    & > * {
      &:nth-child(2) {
        display: none;
      }
    }
         flex-direction: column;   
  `};
`;

const HedgerInfos = styled(RowBetween)`
  gap: 25px;
  width: unset;
  justify-content: center;

  ${({ theme }) => theme.mediaWidth.upToExtraLarge` 
    gap: 10px;
    width: 100%;
    & > * {
      &:nth-child(3) {
        display: none;
      }
    }
  `};
`;

export const Separator = styled.div`
  width: 1px;
  height: 40px;
  border-radius: 4px;
  margin-right: 2px;
  background: ${({ theme }) => theme.border1};
`;

export const Name = styled.div<{
  textAlign?: string;
  textAlignMedium?: string;
}>`
  display: flex;
  align-items: center;
  text-wrap: nowrap;
  font-weight: 400;
  font-size: 12px;
  margin-bottom: 4px;
  text-align: ${({ textAlign }) => textAlign ?? "center"};
  color: ${({ theme }) => theme.text7};
  ${({ theme, textAlignMedium }) => theme.mediaWidth.upToMedium`
    text-align: ${textAlignMedium ?? "center"};
  `};
`;

export const Value = styled.div<{
  color?: string;
  textAlign?: string;
  textAlignMedium?: string;
}>`
  text-wrap: nowrap;
  font-weight: 500;
  font-size: 12px;
  color: ${({ theme, color }) => color ?? theme.text0};
  text-align: left;
`;

export default function MarketBar() {
  const openInterest = useMarketOpenInterest();
  const { marketNotionalCap, marketNotionalCapStatus } = useMarketNotionalCap();
  const activeMarket = useActiveMarket();

  const [used, total] = useMemo(
    () => [openInterest?.used, openInterest?.total],
    [openInterest]
  );
  const [notionalCapUsed, totalCap] = useMemo(() => {
    return activeMarket?.name === marketNotionalCap.name &&
      marketNotionalCapStatus !== ApiState.ERROR
      ? [marketNotionalCap?.used, marketNotionalCap?.totalCap]
      : [-1, -1];
  }, [activeMarket?.name, marketNotionalCapStatus, marketNotionalCap]);

  return (
    <Wrapper className="boxStyling">
      <div style={{ marginRight: 24 }}>
        <MarketInfo />
      </div>
      <DataWrap>
        <HedgerInfos>
          <Separator />
          <Column>
            <Name>Last Price</Name>
            {activeMarket ? (
              <BlinkingPrice market={activeMarket} priceWidth={"66"} />
            ) : (
              <Loader size={"12px"} stroke="#EBEBEC" />
            )}
          </Column>
          <Separator />
          <Column>
            <Name textAlignMedium={"center"}>Open Interest</Name>
            <Value>
              {used === -1 ? (
                <Loader size={"12px"} stroke="#EBEBEC" />
              ) : (
                formatDollarAmount(used)
              )}{" "}
              /{" "}
              {total === -1 ? (
                <Loader size={"12px"} stroke="#EBEBEC" />
              ) : (
                formatDollarAmount(total)
              )}
            </Value>
          </Column>
          <Separator />
          <Column>
            <Name>Notional Cap</Name>
            <Value>
              {notionalCapUsed === -1 ? (
                <Loader size={"12px"} stroke="#EBEBEC" />
              ) : (
                formatDollarAmount(notionalCapUsed)
              )}{" "}
              /{" "}
              {totalCap === -1 ? (
                <Loader size={"12px"} stroke="#EBEBEC" />
              ) : (
                formatDollarAmount(totalCap)
              )}
            </Value>
          </Column>
          <Separator />
          <MarketFundingRate />
          <Separator />
          <MarketDepths />
          <Separator />
        </HedgerInfos>
      </DataWrap>
    </Wrapper>
  );
}
