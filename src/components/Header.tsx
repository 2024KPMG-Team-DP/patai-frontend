import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function Header() {
  const path = useLocation().pathname;
  const navigate = useNavigate();

  return (
    <Container>
      <Wrapper>
        <div className="left">
          <Feature
            selected={path === "/tech_review"}
            onClick={() => {
              navigate("/tech_review");
            }}
          >
            기술 검토
          </Feature>
          <Feature
            selected={path === "/spec_guide"}
            onClick={() => {
              navigate("/spec_guide");
            }}
          >
            명세서 작성
          </Feature>
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
  background-color: #fff;
  /* border-bottom: 2px solid rgba(88, 88, 88, 0.604); */
  z-index: 100;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
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

const Feature = styled.div<{ selected?: boolean }>`
  font-size: 18px;
  padding: 10px;
  margin-right: 10px;
  color: ${({ selected }) => (selected ? "#05365f" : "#4a4a4a")};
  font-weight: ${({ selected }) => (selected ? "bold" : "500")};
  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  user-select: none;
  cursor: pointer;
  &:hover {
    color: #05365f;
  }
`;
