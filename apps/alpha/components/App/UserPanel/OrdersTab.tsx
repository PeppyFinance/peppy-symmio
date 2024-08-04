import { TabButton, TabWrapper } from "components/Tabs";

export enum StateTabs {
  POSITIONS = "Positions",
  ORDER_HISTORY = "Order History",
}

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
