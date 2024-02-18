import { createContext, useContext, useState } from "react";
import { SpecGuideResult } from "../entity/specGuide";

interface SpecGuideContext {
  techInputPdf: File | null;
  setTechInputPdf: (file: File | null) => void;
  result: SpecGuideResult | null;
  setResult: (file: SpecGuideResult | null) => void;
}

const SpecGuideContext = createContext<SpecGuideContext | undefined>({
  techInputPdf: null,
  setTechInputPdf: () => {},
  result: null,
  setResult: () => {},
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
  const [result, setResult] = useState<SpecGuideResult | null>(null);

  return (
    <SpecGuideContext.Provider
      value={{
        techInputPdf,
        setTechInputPdf,
        result,
        setResult,
      }}
    >
      {children}
    </SpecGuideContext.Provider>
  );
};
