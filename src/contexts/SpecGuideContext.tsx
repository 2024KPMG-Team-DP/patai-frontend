import { createContext, useContext, useState } from "react";

interface SpecGuideContext {
  techInputPdf: File | null;
  setTechInputPdf: (file: File | null) => void;
  resultFile: Blob | null;
  setResultFile: (file: Blob | null) => void;
}

const SpecGuideContext = createContext<SpecGuideContext | undefined>({
  techInputPdf: null,
  setTechInputPdf: () => {},
  resultFile: null,
  setResultFile: () => {},
});

export const useSpecGuideContext = () => {
  const context = useContext(SpecGuideContext);
  if (!context) {
    throw new Error("Context Error");
  }
  return context;
};

export const SpecGuideContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [techInputPdf, setTechInputPdf] = useState<File | null>(null);
  const [resultFile, setResultFile] = useState<Blob | null>(null);

  return (
    <SpecGuideContext.Provider
      value={{
        techInputPdf,
        setTechInputPdf,
        resultFile,
        setResultFile,
      }}
    >
      {children}
    </SpecGuideContext.Provider>
  );
};
