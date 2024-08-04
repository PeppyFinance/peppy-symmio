import React, { useEffect, useState } from "react";
import styled from "styled-components";

import {
  useQuoteDetail,
  useSetQuoteDetailCallback,
} from "@symmio/frontend-sdk/state/quotes/hooks";

import { useIsMobile } from "lib/hooks/useWindowSize";

import { TabWrapper, TabButton } from "components/Tabs";
import AccountOverview from "components/App/AccountData/AccountOverview";
import PositionDetails from "components/App/AccountData/PositionDetails";

const Wrapper = styled.div`
  width: 100%;
  min-height: 400px;
  max-width: 480px;
  display: flex;
  flex-flow: column nowrap;
  background-color: ${({ theme }) => theme.bg0};

  ${({ theme }) => theme.mediaWidth.upToMedium`
    max-width: unset;
  `};
`;

export enum PanelType {
  POSITION_OVERVIEW = "Position Details",
  ACCOUNT_OVERVIEW = "Account Overview",
}

interface TabProps {
  activeTab: PanelType;
  setActiveTab: (tab: PanelType) => void;
}

function Tab({ activeTab, setActiveTab }: TabProps) {
  return (
    <TabWrapper>
      <TabButton
        active={activeTab === PanelType.ACCOUNT_OVERVIEW}
        onClick={() => setActiveTab(PanelType.ACCOUNT_OVERVIEW)}
      >
        {PanelType.ACCOUNT_OVERVIEW}
      </TabButton>
      <TabButton
        active={activeTab === PanelType.POSITION_OVERVIEW}
        onClick={() => setActiveTab(PanelType.POSITION_OVERVIEW)}
      >
        {PanelType.POSITION_OVERVIEW}
      </TabButton>
    </TabWrapper>
  );
}

export default function Overviews() {
  const [activeTab, setActiveTab] = useState<PanelType>(
    PanelType.ACCOUNT_OVERVIEW
  );
  const quoteDetail = useQuoteDetail();
  const setQuoteDetail = useSetQuoteDetailCallback();
  const mobileVersion = useIsMobile();

  useEffect(() => {
    if (quoteDetail) setActiveTab(PanelType.POSITION_OVERVIEW);
  }, [quoteDetail]);

  useEffect(() => {
    if (mobileVersion) setActiveTab(PanelType.ACCOUNT_OVERVIEW);
  }, [mobileVersion]);

  useEffect(() => {
    if (activeTab === PanelType.ACCOUNT_OVERVIEW) setQuoteDetail(null);
  }, [activeTab]);

  return (
    <Wrapper className="boxStyling">
      {!mobileVersion && (
        <Tab activeTab={activeTab} setActiveTab={setActiveTab} />
      )}
      {activeTab === PanelType.ACCOUNT_OVERVIEW ? (
        <AccountOverview mobileVersion={mobileVersion} />
      ) : (
        <PositionDetails quote={quoteDetail} />
      )}
    </Wrapper>
  );
}
