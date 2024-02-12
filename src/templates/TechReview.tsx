import styled from "styled-components";
import DefaultLayout from "../components/DefaultLayout";
import Header from "../components/Header";
import Upload from "../components/Upload";
import BasicButton from "../components/BasicButton";
import PdfPreview from "../components/PdfPreview";
import { useTechReviewContext } from "../contexts/TechReviewContext";
import AnalyzeRepositoryImpl from "../repository/analyze";
import HttpClient from "../network/httpClient";
import { SyncLoader } from "react-spinners";
import { useState } from "react";

export default function TechReview() {
  const { techReviewPdf, setTechReviewPdf, previewUrl, setPreviewUrl } =
    useTechReviewContext();
  const [loading, setLoading] = useState(false);

  const handleFileSubmit = async () => {
    console.log("handleFileSubmit");
    console.log(techReviewPdf);
    if (!techReviewPdf || loading) return;
    setLoading(true);
    try {
      const response = await new AnalyzeRepositoryImpl(
        HttpClient
      ).getTechReviewPdf(techReviewPdf);
      console.log(response);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <>
      <Header />
      <DefaultLayout>
        <UploadContainer>
          <Upload />
          <BasicButton
            loading={loading}
            disabled={!!!techReviewPdf}
            onClick={handleFileSubmit}
          >
            검토
          </BasicButton>
        </UploadContainer>
        <MainContainer>
          <PreviewContainer>
            <div className="title">보고서 미리보기</div>
            <PdfPreview url={previewUrl} />
          </PreviewContainer>
          <ResultContainer>
            <div className="title">참조 링크</div>
            <ContentBox>
              {loading && (
                <LoadingContainer>
                  <CustomSyncLoader
                    color={"#384BA8"}
                    loading={true}
                    size={15}
                    speedMultiplier={0.5}
                  />
                  <div className="loading-text">
                    분석 중입니다.
                    <br /> 분석에는 몇 분 이상 소요될 수 있습니다.
                  </div>
                </LoadingContainer>
              )}
            </ContentBox>
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
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .loading-text {
    margin-top: 20px;
    color: #000;
    text-align: center;
  }
`;

const CustomSyncLoader = styled(SyncLoader)`
  margin-bottom: 20px;
`;
