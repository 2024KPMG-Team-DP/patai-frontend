import styled from "styled-components";

export default function Header() {
  return (
    <Container>
      <Wrapper>
        <div className="left">
          <Feature>기술 검토</Feature>
          <Feature>명세서 작성</Feature>
          <Feature>명세서 검토</Feature>
          <Feature>의견제출통지서 검토</Feature>
        </div>
        <div className="right">
          <Feature>마이페이지</Feature>
        </div>
      </Wrapper>
    </Container>
  );
}

const Container = styled.header`
  position: sticky;
  top: 0;
  height: 96px;
  padding: 0 120px;
  background-color: #1b1d25;
  border-bottom: 2px solid rgba(249, 248, 252, 0.2);
  z-index: 100;
`;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .left {
    display: flex;
    justify-content: space-between;
    /* width: 500px; */
  }
  .right {
    display: flex;
    justify-content: space-between;
  }
`;

const Feature = styled.div`
  font-size: 16px;
  padding: 10px;
  margin-right: 10px;
  color: #f9f8fc;
  cursor: pointer;
  &:hover {
    color: #61dafb;
  }
`;
