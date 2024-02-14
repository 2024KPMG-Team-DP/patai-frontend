import styled from "styled-components";

interface Props {
  placeholder: string;
  setFile: (file: File | null) => void;
  file: File | null;
}

export default function Upload({ placeholder, setFile, file }: Props) {
  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = (e) => {
      console.log(file.name);
      setFile(file);
    };

    reader.readAsDataURL(file);
  };

  return (
    <Wrapper>
      <label htmlFor="pdf-upload">
        <InputBox>
          <BrowseButton>Browse</BrowseButton>
          {file ? file.name : placeholder}
        </InputBox>
      </label>
      <input
        type="file"
        id="pdf-upload"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  margin-right: 20px;
`;

const InputBox = styled.div`
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 64px;
  border-radius: 15px;
  border: 2px solid rgba(0, 0, 0, 0.5);
  background: #fff;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25) inset;
  padding: 0 10px;
`;

const BrowseButton = styled.div`
  position: absolute;
  left: 10px;
  border-radius: 15px;
  border: 1px solid #05365f;
  background: #fff;
  display: flex;
  height: 44px;
  padding: 0px 20px;
  justify-content: center;
  align-items: center;
`;

const InputPlaceholder = styled.div`
  color: rgba(0, 0, 0, 0.4);
  text-align: center;
  font-family: Inter;
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;
