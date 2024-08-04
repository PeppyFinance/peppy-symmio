import styled from "styled-components";

import { RowCenter, RowStart } from "components/Row";
import { darken } from "polished";

export enum StateTabs {
  POSITIONS = "Positions",
  ORDER_HISTORY = "Order History",
}

const TabWrapper = styled(RowStart)`
  border-bottom: 1px solid ${({ theme }) => theme.border1};
`;
const TabButton = styled(RowCenter)<{ active: boolean }>`
  font-size: 16px;
  font-weight: 500;
  width: fit-content;
  white-space: nowrap;
  padding: 8.5px 16px;
  color: ${({ active, theme }) => (active ? theme.text8 : theme.text2)};

  &:hover {
    cursor: pointer;
    color: ${({ theme, active }) =>
      active ? theme.text0 : darken(0.3, theme.text0)};
  }

  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    font-size: 12px;
  `}

  ${({ theme, active }) => theme.mediaWidth.upToMedium`
    flex: 1;
  `};
`;

export default function OrdersTab({
  activeTab,
  setActiveTab,
}: {
  activeTab: StateTabs;
  setActiveTab(s: StateTabs): void;
}): JSX.Element | null {
  return (
    <TabWrapper>
      <TabButton
        active={activeTab === StateTabs.POSITIONS}
        onClick={() => setActiveTab(StateTabs.POSITIONS)}
      >
        {StateTabs.POSITIONS}
      </TabButton>
      <TabButton
        active={activeTab === StateTabs.ORDER_HISTORY}
        onClick={() => setActiveTab(StateTabs.ORDER_HISTORY)}
      >
        {StateTabs.ORDER_HISTORY}
      </TabButton>
    </TabWrapper>
  );
}
