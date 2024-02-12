import styled from "styled-components";

export default function PdfPreview() {
  return (
    <Wrapper>
      <PreviewBox>preview</PreviewBox>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
`;

const PreviewBox = styled.div`
  border-radius: 10px;
  border: 2px solid rgba(0, 0, 0, 0.5);
  background: #fff;
  height: 600px;
`;
