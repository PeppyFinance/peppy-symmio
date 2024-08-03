import React from "react";
import styled, { keyframes, css } from "styled-components";

const keyframesShimmer = keyframes`
  0% {
    background-position: -80vw 0;
  }
  100% {
    background-position: 80vw 0;
  }
`;

const shimmerAnimation = css`
  background: linear-gradient(to right, #d8d7df80 30%, #e9e8ed4d 100%);
  background-size: 80vw 100%;
  animation: ${keyframesShimmer} 5s infinite linear;
`;

const Comment = styled.div<{
  height?: string;
  width?: string;
}>`
  height: ${({ height }) => height ?? "10px"};
  width: ${({ width }) => width ?? "50px"};
  ${shimmerAnimation}
`;

export default function ShimmerAnimation({
  width,
  height,
}: {
  width?: string;
  height?: string;
}) {
  return <Comment width={width} height={height} />;
}
