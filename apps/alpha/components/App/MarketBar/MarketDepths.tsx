import styled, { useTheme } from "styled-components";

import { useActiveMarket } from "@symmio/frontend-sdk/state/trade/hooks";
import useBidAskPrice from "@symmio/frontend-sdk/hooks/useBidAskPrice";

import { Name, Separator, Value } from ".";
import Column from "components/Column";
import { RowEnd } from "components/Row";
import BlinkingPrice from "components/App/FavoriteBar/BlinkingPrice";

const MarginColumn = styled(Column)`
  margin-left: 20px;
  ${({ theme }) => theme.mediaWidth.upToMedium` 
      margin-right: 5px;
      margin-left: unset;
  `};
`;

const MarketInfos = styled(RowEnd)`
  gap: 25px;
  flex: 1;
  ${({ theme }) => theme.mediaWidth.upToLarge`
    gap: 10px;
  justify-content: center;
    flex-direction: row-reverse;
    width:100%;
  `};
`;

const MarketDepth = styled(RowEnd)`
  gap: 20px;
  width: unset;
  justify-content: center;
  ${({ theme }) => theme.mediaWidth.upToMedium`
    justify-content: center;

  `};
`;

export default function MarketDepths() {
  const theme = useTheme();
  const activeMarket = useActiveMarket();
  const { ask, bid, spread } = useBidAskPrice(activeMarket);

  return (
    <MarketInfos>
      <Column>
        <Name>Spread(bps)</Name>
        <Value>{spread}</Value>
      </Column>
      <Separator />
      <MarketDepth>
        <Column>
          <Name>Bid</Name>
          <BlinkingPrice data={bid} textSize={"12px"} textAlign={"center"} />
        </Column>
        <Separator />
        <Column>
          <Name>Ask</Name>
          <BlinkingPrice data={ask} textSize={"12px"} textAlign={"center"} />
        </Column>
      </MarketDepth>
    </MarketInfos>
  );
}
