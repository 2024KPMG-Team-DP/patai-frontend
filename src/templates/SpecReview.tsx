import styled from "styled-components";
import DefaultLayout from "../components/DefaultLayout";
import Header from "../components/Header";
import Upload from "../components/Upload";
import BasicButton from "../components/BasicButton";
import { useEffect, useState } from "react";
import { SyncLoader } from "react-spinners";
import PdfPreview from "../components/PdfPreview";
import { useSpecReviewContext } from "../contexts/SpecReviewContext";
import { b64toBlob } from "../util/convert";
import AnalyzeRepositoryImpl from "../repository/analyze";
import HttpClient from "../network/httpClient";

export default function SpecReview() {
  const [loading, setLoading] = useState(false);
  const {
    specInputToApplicate,
    setSpecInputToApplicate,
    specInputToCompare,
    setSpecInputToCompare,
    result,
    setResult,
  } = useSpecReviewContext();

  const handleFileSubmit = async () => {
    if (!specInputToApplicate || !specInputToCompare || loading) return;
    setLoading(true);
    try {
      const response = await new AnalyzeRepositoryImpl(
        HttpClient
      ).getSpecReviewPdf(specInputToApplicate, specInputToCompare);
      console.log(response);
      setResult(response.data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const handleFileDownload = () => {
    const url = window.URL.createObjectURL(
      b64toBlob(result?.pdf as string, "application/pdf")
    );
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "명세서_검토_보고서.pdf"); // 파일 이름 설정
    document.body.appendChild(link);

    link.click();
    link.parentNode?.removeChild(link);
  };

  return (
    <>
      <Header />
      <DefaultLayout>
        <UploadContainer>
          <div className="input-container">
            <div className="left">
              <Upload
                uploadId="specInputToApplicate"
                placeholder="출원할 명세서를 업로드하세요."
                setFile={setSpecInputToApplicate}
                file={specInputToApplicate}
              />
            </div>
            <div className="right">
              <Upload
                uploadId="specInputToCompare"
                placeholder="비교할 명세서를 업로드하세요."
                setFile={setSpecInputToCompare}
                file={specInputToCompare}
              />
            </div>
          </div>
          <BasicButton
            loading={false}
            disabled={!!!specInputToApplicate || !!!specInputToCompare}
            onClick={handleFileSubmit}
          >
            검토
          </BasicButton>
        </UploadContainer>
        <MainContainer>
          <PreviewContainer>
            <div className="title">명세서</div>
            <PreviewBox>
              <PdfPreview
                url={
                  specInputToApplicate &&
                  window.URL.createObjectURL(specInputToApplicate)
                }
              />
            </PreviewBox>
          </PreviewContainer>
          <ResultContainer>
            <div className="title">검토 보고서 미리보기</div>
            <ContentBox loading={loading}>
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
              {result && (
                <PdfPreview
                  url={window.URL.createObjectURL(
                    b64toBlob(result?.pdf as string, "application/pdf")
                  )}
                />
              )}
            </ContentBox>
            <div className="button-wrapper">
              <BasicButton
                width={220}
                height={56}
                onClick={handleFileDownload}
                disabled={!!!result}
              >
                보고서 다운로드
              </BasicButton>
            </div>
          </ResultContainer>
        </MainContainer>
        {result?.data && (
          <ReportContainer>
            <div className="title">명세서 검토 결과</div>
            <div className="sub">청구범위 비교 및 검토 결과</div>
            <div style={{ marginBottom: 40 }}>
              {result.data.result.claims.map((claim, index) => (
                <>
                  <div key={index} className="claim-title">
                    {claim.index}
                  </div>
                  <div className="claim-content">{claim.content}</div>
                </>
              ))}
            </div>
            <div className="sub">종합 검토의견</div>
            <div className="content">{result.data.result.conclusion}</div>
          </ReportContainer>
        )}
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

  .input-container {
    display: flex;
    width: 100%;

    .left {
      display: flex;
      align-items: center;
      width: 50%;
    }

    .right {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      width: 50%;
    }
  }
`;

const MainContainer = styled.div`
  width: 100%;
  display: flex;
  flex: 1;
  flex-shrink: 0;
  padding: 32px 0 60px;

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

const PreviewBox = styled.div`
  border-radius: 10px;
  border: 2px solid rgba(0, 0, 0, 0.5);
  background: #fff;
  height: 600px;
  overflow: scroll;
`;

const ContentBox = styled.div<{ loading: boolean }>`
  border-radius: 10px;
  border: 2px solid rgba(0, 0, 0, 0.5);
  background: #fff;
  min-height: 480px;
  max-height: 480px;
  overflow: scroll;

  ${({ loading }) =>
    loading &&
    `
    display: flex;
    justify-content: center;
    align-items: center;
  `}
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

const ReportContainer = styled.div`
  width: 100%;
  padding: 32px 20px 60px;
  border-top: 1px solid rgba(0, 0, 0, 0.5);

  .title {
    color: #000;
    font-family: Inter;
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 32px;
  }

  .sub {
    color: #000;
    font-family: Inter;
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 12px;
    font-style: italic;
  }

  .content {
    color: #000;
    font-family: Inter;
    font-size: 16px;
    font-weight: 400;
    margin-bottom: 40px;
    line-height: 1.5;
  }

  .claim-title {
    color: #000;
    font-family: Inter;
    font-size: 17px;
    font-weight: 500;
    margin-bottom: 8px;
    line-height: 1.5;
    text-decoration: underline;
  }

  .claim-content {
    color: #000;
    font-family: Inter;
    font-size: 17px;
    font-weight: 400;
    margin-bottom: 16px;
    line-height: 1.5;
  }
`;
