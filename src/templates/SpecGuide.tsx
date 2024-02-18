import styled from "styled-components";
import DefaultLayout from "../components/DefaultLayout";
import Header from "../components/Header";
import Upload from "../components/Upload";
import BasicButton from "../components/BasicButton";
import { useSpecGuideContext } from "../contexts/SpecGuideContext";
import { useState } from "react";
import PdfPreview from "../components/PdfPreview";
import { SyncLoader } from "react-spinners";
import AnalyzeRepositoryImpl from "../repository/analyze";
import HttpClient from "../network/httpClient";
import { b64toBlob } from "../util/convert";

export default function SpecGuide() {
  const { techInputPdf, setTechInputPdf, result, setResult } =
    useSpecGuideContext();
  const [loading, setLoading] = useState(false);

  const handleFileSubmit = async () => {
    if (!techInputPdf || loading) return;
    setLoading(true);
    try {
      const response = await new AnalyzeRepositoryImpl(
        HttpClient
      ).getSpecGuidePdf(techInputPdf);
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
    link.setAttribute("download", "report.pdf"); // 파일 이름 설정
    document.body.appendChild(link);

    link.click();
    link.parentNode?.removeChild(link);
  };

  return (
    <>
      <Header />
      <DefaultLayout>
        <UploadContainer>
          <Upload
            placeholder="기술 문서를 업로드하세요."
            setFile={setTechInputPdf}
            file={techInputPdf}
          />
          <BasicButton
            loading={loading}
            disabled={!!!techInputPdf}
            onClick={handleFileSubmit}
          >
            검토
          </BasicButton>
        </UploadContainer>
        <MainContainer>
          <PreviewContainer>
            <div className="title">기술문서</div>
            <PreviewBox>
              <PdfPreview
                url={techInputPdf && window.URL.createObjectURL(techInputPdf)}
              />
            </PreviewBox>
          </PreviewContainer>
          <ResultContainer>
            <div className="title">명세서 초안 미리보기</div>
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
            <div className="title">명세서 초안 가이드</div>
            <div className="sub">발명의 요약</div>
            <div className="content">{result.data.info.summary}</div>
            <div className="sub">발명의 설명</div>
            <div className="sub">[발명의 명칭]</div>
            <div className="content">{result.data.result.name}</div>
            <div className="sub">[기술분야]</div>
            <div className="content">{result.data.result.techField}</div>
            <div className="sub">[발명의 배경이 되는 기술]</div>
            <div className="content">{result.data.result.backgroundTech}</div>
            <div className="sub">[해결해고자 하는 과제]</div>
            <div className="content">
              {result.data.result.content.problemToSolve}
            </div>
            <div className="sub">[과제의 해결 수단]</div>
            <div className="content">
              {result.data.result.content.problemToSolve}
            </div>
            <div className="sub">[발명의 효과]</div>
            <div className="content">
              {result.data.result.content.effectOfInvent}
            </div>
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
`;
