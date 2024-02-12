import styled from "styled-components";

interface Props {
  disabled?: boolean;
  width?: number;
  height?: number;
  children?: React.ReactNode;
}

export default function BasicButton({
  disabled,
  width,
  height,
  children,
}: Props) {
  return (
    <Wrapper disabled={disabled} width={width} height={height}>
      {children}
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
