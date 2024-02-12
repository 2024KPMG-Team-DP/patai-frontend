import styled from "styled-components";

interface Props {
  children?: React.ReactNode;
}

export default function DefaultLayout({ children }: Props) {
  return <Wrapper>{children}</Wrapper>;
}

const Wrapper = styled.div`
  padding: 0 120px;
`;
