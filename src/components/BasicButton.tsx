import styled from "styled-components";

interface Props {
  children?: React.ReactNode;
}

export default function BasicButton({ children }: Props) {
  return <Wrapper>{children}</Wrapper>;
}

const Wrapper = styled.div`
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
`;
