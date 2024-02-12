import { HtmlHTMLAttributes } from "react";
import styled from "styled-components";
import { PulseLoader } from "react-spinners";
interface Props {
  disabled?: boolean;
  width?: number;
  height?: number;
  loading?: boolean;
  children?: React.ReactNode;
}

export default function BasicButton({
  disabled,
  width,
  height,
  loading,
  children,
  ...props
}: Props & HtmlHTMLAttributes<HTMLDivElement>) {
  return (
    <Wrapper {...props} disabled={disabled} width={width} height={height}>
      {loading ? (
        <CustomPulseLoader
          color={"#384BA8"}
          loading={true}
          size={10}
          speedMultiplier={0.6}
        />
      ) : (
        children
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div<{
  disabled?: boolean;
  width?: number;
  height?: number;
}>`
  height: 64px;
  min-width: 74px;
  border-radius: 15px;
  background: #05365f;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px 20px;
  color: #fff;
  font-size: 18px;
  font-weight: 500;
  cursor: pointer;

  ${({ width }) =>
    width &&
    `
    width: ${width}px;
  `}

  ${({ height }) =>
    height &&
    `
    height: ${height}px;
  `}

  ${({ disabled }) =>
    disabled &&
    `
    opacity: 0.2;
    color: #fff;
    box-shadow: none;
    cursor: not-allowed;
  `}
`;

const CustomPulseLoader = styled(PulseLoader)``;
