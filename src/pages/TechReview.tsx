import styled from "styled-components";
import DefaultLayout from "../components/DefaultLayout";
import Header from "../components/Header";
import Upload from "../components/Upload";
import BasicButton from "../components/BasicButton";
import PdfPreview from "../components/PdfPreview";

export default function TechReviewPage() {
  return (
    <>
      <Header />
      <DefaultLayout>
        <UploadContainer>
          <Upload />
          <BasicButton>검토</BasicButton>
        </UploadContainer>
        <MainContainer>
          <PreviewContainer>
            <div className="title">보고서 미리보기</div>
            <PdfPreview></PdfPreview>
          </PreviewContainer>
          <ResultContainer>
            <div className="title">참조 링크</div>
            <ContentBox></ContentBox>
          </ResultContainer>
        </MainContainer>
      </DefaultLayout>
    </>
  );
}

const UploadContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 60px 0 60px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.5);
`;

const MainContainer = styled.div`
  display: flex;
  flex: 1;
  padding: 32px 0;

  .title {
    color: #000;
    font-family: Inter;
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 12px;
  }
`;

const PreviewContainer = styled.div`
  flex-basis: 50%;
  padding: 0 20px;
`;

const ResultContainer = styled.div`
  flex-basis: 50%;
  padding: 0 20px;
`;

const ContentBox = styled.div`
  border-radius: 10px;
  border: 2px solid rgba(0, 0, 0, 0.5);
  background: #fff;
  height: 340px;
`;
