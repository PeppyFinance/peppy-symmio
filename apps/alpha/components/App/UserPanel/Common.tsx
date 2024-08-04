import styled from "styled-components";
import { RowBetween, RowCenter, RowStart } from "components/Row";
import { Column } from "components/Column";

export const TableStructure = styled(RowBetween)`
  width: 100%;
  color: ${({ theme }) => theme.text8};
  font-size: 12px;
  font-weight: 400;

  & > * {
    width: 12%;

    &:first-child {
      width: 25%;
    }
    &:nth-last-child(2) {
      width: 15%;
      text-align: right;
    }
  }
`;

export const HeaderWrap = styled(TableStructure)`
  color: ${({ theme }) => theme.text8};
  font-weight: 500;
  margin-bottom: 12px;
  margin: 12px 0px;

  & > * {
    &:first-child {
      padding-left: 28px;
    }
  }
`;

export const Wrapper = styled.div`
  overflow-y: scroll;
  height: 100%;
  background-color: ${({ theme }) => theme.bg1};
`;

export const BodyWrap = styled(Column)`
  gap: 1px;
`;

export const PositionTypeWrap = styled(RowCenter)<{
  liquidatePending?: boolean;
}>`
  width: 20px;
  height: 40px;
  background: ${({ theme, liquidatePending }) =>
    liquidatePending ? theme.red1 : theme.bg7};
  margin-right: 8px;
`;

export const LeverageWrap = styled(RowCenter)<{ liquidatePending?: boolean }>`
  width: unset;
  padding: 2px 8px;
  height: 16px;
  background: ${({ theme, liquidatePending }) =>
    liquidatePending ? theme.red1 : theme.bg1};
  color: ${({ theme, liquidatePending }) =>
    liquidatePending ? theme.text0 : theme.text1};
  margin-left: 8px;
  border-radius: 2px;
  font-weight: 600;
`;

export const EmptyRow = styled(Column)`
  font-size: 14px;
  text-align: center;
  color: ${({ theme }) => theme.text2};
`;

export const PnlValue = styled.div<{
  color?: string;
  size?: string;
}>`
  color: ${({ theme, color }) => color ?? theme.text0};
  ${({ size }) =>
    size &&
    `
  font-size: ${size};
`}

  ${({ theme }) => theme.mediaWidth.upToMedium`
    font-size: 10px;
  `};
`;

export const MarketName = styled(RowStart)`
  width: unset;
  & > * {
    &:first-child {
      color: ${({ theme }) => theme.text0};
    }
    &:last-child {
      color: ${({ theme }) => theme.text1};
    }
  }
`;

export const QuoteStatusValue = styled.div<{
  liq: boolean;
  expired: boolean;
}>`
  color: ${({ theme, liq, expired }) =>
    liq ? theme.red1 : expired ? theme.warning : theme.text1};
`;
