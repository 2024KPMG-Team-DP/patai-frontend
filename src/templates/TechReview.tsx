import styled from "styled-components";
import DefaultLayout from "../components/DefaultLayout";
import Header from "../components/Header";
import Upload from "../components/Upload";
import BasicButton from "../components/BasicButton";
import PdfPreview from "../components/PdfPreview";
import { useTechReviewContext } from "../contexts/TechReviewContext";

export default function TechReview() {
  const { techReviewPdf, setTechReviewPdf, previewUrl, setPreviewUrl } =
    useTechReviewContext();

  return (
    <>
      <Header />
      <DefaultLayout>
        <UploadContainer>
          <Upload />
          <BasicButton disabled={!!!techReviewPdf}>검토</BasicButton>
        </UploadContainer>
        <MainContainer>
          <PreviewContainer>
            <div className="title">보고서 미리보기</div>
            <PdfPreview url={previewUrl} />
          </PreviewContainer>
          <ResultContainer>
            <div className="title">참조 링크</div>
            <ContentBox></ContentBox>
            <div className="button-wrapper">
              <BasicButton width={220} height={56}>
                보고서 다운로드
              </BasicButton>
            </div>
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
  align-items: center;
  padding: 60px 0 60px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.5);
`;

const MainContainer = styled.div`
  width: 100%;
  display: flex;
  flex: 1;
  flex-shrink: 0;
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
  width: 50%;
  padding: 0 20px;
`;

const ResultContainer = styled.div`
  width: 50%;
  padding: 0 20px;

  .button-wrapper {
    display: flex;
    justify-content: center;
    margin-top: 40px;
  }
`;

const ContentBox = styled.div`
  border-radius: 10px;
  border: 2px solid rgba(0, 0, 0, 0.5);
  background: #fff;
  height: 340px;
`;
