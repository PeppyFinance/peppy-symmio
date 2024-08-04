import styled from "styled-components";
import { darken } from "polished";

import { RowCenter, RowStart } from "components/Row";

export const TabWrapper = styled(RowStart)`
  border-bottom: 1px solid ${({ theme }) => theme.border1};
`;

export const TabButton = styled(RowCenter)<{ active: boolean }>`
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

  ${({ theme }) => theme.mediaWidth.upToMedium`
    flex: 1;
  `};
`;
