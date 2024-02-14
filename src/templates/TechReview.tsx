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
  const {
    techReviewPdf,
    setTechReviewPdf,
    previewUrl,
    setPreviewUrl,
    resultFile,
    setResultFile,
  } = useTechReviewContext();
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
      setResultFile(response.data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const tmp = () => {
    const url = window.URL.createObjectURL(
      new Blob([resultFile as BlobPart], { type: "application/pdf" })
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
            <div className="title">기술문서</div>
            <PreviewBox>
              <PdfPreview url={previewUrl} />
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
              {resultFile && (
                <PdfPreview
                  url={window.URL.createObjectURL(
                    new Blob([resultFile as BlobPart], {
                      type: "application/pdf",
                    })
                  )}
                />
              )}
            </ContentBox>
            <div className="button-wrapper">
              <BasicButton
                width={220}
                height={56}
                onClick={tmp}
                disabled={!!!resultFile}
              >
                보고서 다운로드
              </BasicButton>
            </div>
          </ResultContainer>
        </MainContainer>
        <ReportContainer>
          <div className="title">검토 결과</div>
          <div className="sub">발명의 요약</div>
          <div className="content">
            본 발명은 양말 형태의 폴리에스테르 섬유로 구성된 양말 본체; 상기 양
            말 본체의 전방 양측과 후방에 부착된 레이온 섬유 및; 상기 양말 본체의
            입구 속에 부착된 내부 고무 고무줄 및; 상기 양말 본체 중간부에 폴리에
            스테르 섬유로 구성된 신축구조;를 포함하여 구성됨으로써 양말 본체를
            구성한 강도높은 폴리에스테르 섬유 와 양말본체 중간부에 위치한 신축
            구조로 인해 신축성이 향상되어 더욱 높은 활발성과 착용감을 느낄수 있
            음은 물론, 신발 착용과정에서 양말 본체의 마찰면에 매끄러운 레이온
            섬유가 부착되어 양말을 신은 상태에서 편리하 고 빠른 신발 착용이 가
            능하다는 장점이 있을 뿐만 아니라 양말 본체 입구 내부에 고무줄이 구
            비되어 편리하게 착용하고 벗을수 있는 마찰면에 레이온 섬유가 구비된
            양말을 제공한다.
          </div>
          <div className="sub">종합 검토 의견</div>
          <div className="content">
            유사 특허 1: 맨발 걷기용 신발형 양말(10-2603725), 본 발명과 비슷한
            용도의 양말 구조에 대한 내용이 있으며, 양말의 구조와 기능적 측면에서
            유사성이 있을 수 있음. 본 발명은 신발 착용 시 마 찰을 감소시키는
            기능을 가진 양말로, 구조적인 부분에서 유사성이 있음을 주의해야 함.
            유사 특허 2: 밴드부가 커버링사로 형성된 양말(10-1549807), 양말의
            신축성과 관련된 기술적 특징을 담고 있어 본 발명의 신축구조와 유사한
            발명이 될 수 있음. 유사 특허 3: 풋헬스케어 기능성 양말(10- 2489812),
            양말의 여러 기능을 다루고 있으며, 본 발명에 포함된 내부 고무줄과
            신축구조가 해당 특허의 기능성 구성요소와 유사한 점이 있음을 주의해야
            함. 개선 방향: 양말의 마찰감소 능력과 신 발 착용 용이성을 향상시키는
            방향으로 고안되었으나, 유사한 기술 혹은 기능을 가지고 있는 특허가
            존재하기에, 본 발명에 대해서는 기존 특허들과 차별화되는 고유의
            혁신적인 특징이나 이점을 더욱 구체적으로 강조하고, 다른 구조적,
            기능적 차이를 명확히 하는 것이 필요함. 예를 들어, 마찰면에 추가적인
            기능성 소재의 적용이나 독특한 설계를 추가하여 차별화를 꾀하거나,
            기존 특허에서 다루 지 않은 새로운 기능성을 개발하고 이를 특허
            클레임에 반영해야 할 것임.
          </div>
          <div className="sub">유사 특허 정보</div>
          <div className="content">
            [유사 특허 1] 맨발 걷기용 신발형 양말(10-2603725)
            <br />
            [유사 특허 2] 밴드부가 커버링사로 형성된 양말(10-1549807)
            <br />
            [유사 특허 3] 풋헬스케어 기능성 양말(10-2489812)
          </div>
        </ReportContainer>
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
  min-height: 340px;
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
