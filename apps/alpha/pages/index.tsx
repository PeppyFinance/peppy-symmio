import React, { useEffect } from "react";
import { updateAccount } from "@symmio/frontend-sdk/state/user/actions";
import Link from "next/link";
import { useAppDispatch } from "@symmio/frontend-sdk/state";
import { useUserAccounts } from "@symmio/frontend-sdk/hooks/useAccounts";
import styled from "styled-components";
import { Box } from "rebass/styled-components";
import { NavBarLogo } from "components/Icons";
import { useIsMobile } from "lib/hooks/useWindowSize";

export const Row = styled(Box)<{
  width?: string;
  align?: string;
  justify?: string;
  padding?: string;
  border?: string;
  gap?: string;
}>`
  width: ${({ width }) => width ?? "100%"};
  display: flex;
  padding: 0;
  gap: ${({ gap }) => gap && `${gap}`};
  align-items: ${({ align }) => align ?? "center"};
  justify-content: ${({ justify }) => justify ?? "flex-start"};
  padding: ${({ padding }) => padding};
  padding: ${({ padding }) => padding};
`;

export const RowCenter = styled(Row)`
  justify-content: center;
`;

export const BaseButton = styled(RowCenter)<{
  active?: boolean;
  disabled?: boolean;
}>`
  padding: 1rem;
  height: 100%;
  font-weight: 600;
  border-radius: 2px;
  outline: none;
  text-decoration: none;
  cursor: pointer;
  position: relative;
  z-index: 1;
  &:disabled {
    opacity: 50%;
    cursor: auto;
    pointer-events: none;
  }
  will-change: transform;
  transition: transform 450ms ease;
  transform: perspective(1px) translateZ(0);
  > * {
    user-select: none;
  }
  > a {
    text-decoration: none;
  }
`;

const Wrapper = styled(RowCenter)`
  flex-direction: column-reverse;
  align-items: center;
  width: fit-content;
  align-items: center;
`;

export const TabHome = styled(RowCenter)`
  height: 40px;
  position: relative;
  cursor: pointer;
  margin-top: 30px;
  text-align: center;
  overflow: hidden;
  border-radius: 2px;
  box-shadow: 0px 0px 6px 0px #c2f2f9, 0px 4px 4px 0px #00000040;
  text-transform: uppercase;
  font-weight: 400;
  color: ${({ theme }) => theme.text8};
  background: ${({ theme }) => theme.bg9};

  opacity: 0px;
`;

export default function MyFunction() {
  const dispatch = useAppDispatch();
  const { accounts } = useUserAccounts();
  const mobileVersion = useIsMobile();

  useEffect(() => {
    if (accounts !== null) {
      const lastSubAccount = accounts[accounts.length - 1];
      dispatch(updateAccount(lastSubAccount));
    }
  }, [accounts, dispatch]);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Wrapper>
        <TabHome style={!mobileVersion ? { width: "50%" } : { width: "85%" }}>
          <Link
            href="/trade"
            style={{
              textDecoration: "none",
            }}
          >
            <p
              style={{
                fontSize: "20px",
                textTransform: "uppercase",
                textDecoration: "none",
                lineHeight: "25.52px",
                letterSpacing: "11%",
              }}
            >
              Start Trading
            </p>
          </Link>
        </TabHome>
        <div
          style={
            !mobileVersion
              ? { width: "100%", padding: "20px", backdropFilter: "blur(15px)" }
              : { width: "85%", padding: "20px", backdropFilter: "blur(15px)" }
          }
        >
          <p>Trade yourself to the moon with up to 100x leverage 🐸</p>
        </div>

        <NavBarLogo
          width={mobileVersion ? 258 : 308}
          height={mobileVersion ? 258 : 308}
        />
      </Wrapper>
    </div>
  );
}
