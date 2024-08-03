import styled from "styled-components";
import { RowCenter, RowStart } from "components/Row";
import { lighten } from "polished";
import { PositionType } from "@symmio/frontend-sdk/types/trade";

export const TabWrapper = styled(RowCenter)`
  width: unset;
  font-size: 16px;
  font-weight: 400;
  margin-left: 10px;
  margin-right: 10px;
  margin-top: 10px;
  color: ${({ theme }) => theme.text0};
  border-radius: 0px;
  overflow: hidden;
`;

export const TabButton = styled(RowCenter)<{
  active: boolean;
  height?: string;
}>`
  width: 100%;
  height: ${({ height }) => height ?? "40px"};
  position: relative;
  text-align: center;
  overflow: hidden;
  border-radius: 2px;
  margin-right: 10px;
  text-transform: uppercase;
  font-weight: ${({ active }) => (active ? 500 : 400)};
  color: ${({ active, theme }) => (active ? theme.text8 : theme.text8)};
  background: ${({ active, theme }) =>
    active ? theme.bg9 : theme.transparent};

  &:hover {
    cursor: ${({ active }) => (active ? "default" : "pointer")};
`;

const ModalTabButton = styled(TabButton)<{ type: string }>`
  border: none;
  border: 1px solid ${({ theme, active }) => (active ? "none" : theme.border1)};
  background: ${({ active, theme, type }) =>
    active
      ? type === PositionType.LONG
        ? theme.green1
        : theme.red1
      : theme.transparent};

  &:hover {
    cursor: ${({ active }) => (active ? "default" : "pointer")};
  }
`;

const ModalButton = styled(TabButton)`
  height: 32px;
  color: ${({ active, theme }) => (active ? theme.text0 : theme.primary4)};
  background: ${({ active, theme }) => (active ? theme.bg0 : theme.bg2)};
  border: 1px solid
    ${({ active, theme }) => (active ? theme.chartStroke : "none")};
`;

export const Option = styled.div<{ active?: boolean }>`
  width: fit-content;
  color: ${({ theme }) => theme.text1};
  border-radius: 4px;
  font-size: 16px;
  font-weight: 500;
  line-height: 19px;
  padding: 4px 0px 8px 0px;

  ${({ active, theme }) =>
    active &&
    `
    color: ${theme.text0};
  `}
  &:hover {
    cursor: pointer;
    color: ${({ theme, active }) => (active ? theme.gradLight : theme.text1)};
  }
`;

export function Tab({
  tabOptions,
  activeOption,
  onChange,
  height,
}: {
  tabOptions: string[];
  activeOption: string;
  onChange: (tab: string) => void;
  height?: string;
}): JSX.Element {
  return (
    <TabWrapper>
      {tabOptions.map((tab, i) => (
        <TabButton
          key={i}
          active={tab === activeOption}
          onClick={() => onChange(tab)}
          height={height}
        >
          {tab}
        </TabButton>
      ))}
    </TabWrapper>
  );
}

export function TabModal({
  tabOptions,
  activeOption,
  onChange,
  ...rest
}: {
  tabOptions: string[];
  activeOption: string;
  onChange: (tab: string) => void;
  [x: string]: any;
}): JSX.Element {
  return (
    <TabWrapper width={"100%"} justifyContent={"space-between"} {...rest}>
      {tabOptions.map((tab, i) => (
        <ModalButton
          key={i}
          active={tab === activeOption}
          onClick={() => onChange(tab)}
        >
          <div>{tab}</div>
        </ModalButton>
      ))}
    </TabWrapper>
  );
}

export function GradientTabs({
  tabOptions,
  activeOption,
  onChange,
}: {
  tabOptions: string[];
  activeOption: string;
  onChange: (tab: string) => void;
}) {
  return (
    <RowStart style={{ gap: "16px" }}>
      {tabOptions.map((option, index) => (
        <Option
          key={index}
          active={option === activeOption}
          onClick={() => onChange(option)}
        >
          {option}
        </Option>
      ))}
    </RowStart>
  );
}

export function TabModalJSX({
  tabOptions,
  activeOption,
  onChange,
  ...rest
}: {
  tabOptions: { label: string; content: string | JSX.Element }[];
  activeOption: string;
  onChange: (tab: string) => void;
  [x: string]: any;
}): JSX.Element {
  return (
    <TabWrapper width={"100%"} justifyContent={"space-between"} {...rest}>
      {tabOptions.map((tab, i) => (
        <ModalTabButton
          key={i}
          type={tab.label}
          active={tab.label === activeOption}
          onClick={() => onChange(tab.label)}
        >
          <div>{tab.content}</div>
        </ModalTabButton>
      ))}
    </TabWrapper>
  );
}
