import styled from "styled-components";

interface Props {
  url?: string | null;
}

export default function PdfPreview({ url }: Props) {
  return (
    <Wrapper>
      <PreviewBox>
        <Content>{url || ""}</Content>
      </PreviewBox>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
`;

const PreviewBox = styled.div`
  width: 100%;
  border-radius: 10px;
  border: 2px solid rgba(0, 0, 0, 0.5);
  background: #fff;
`;

const Content = styled.div`
  margin: 10px;
  overflow-wrap: break-word;
  word-wrap: break-word;
  height: 600px;
  overflow-x: hidden;
  overflow-y: scroll;
`;
