import { createContext, useContext, useState } from "react";
import { TechReviewResult } from "../entity/techReview";

interface TechReviewContext {
  techReviewPdf: File | null;
  setTechReviewPdf: (file: File | null) => void;
  result: TechReviewResult | null;
  setResult: (result: TechReviewResult | null) => void;
}

const TechReviewContext = createContext<TechReviewContext | undefined>({
  techReviewPdf: null,
  setTechReviewPdf: () => {},
  result: null,
  setResult: () => {},
});

export const useTechReviewContext = () => {
  const context = useContext(TechReviewContext);
  if (!context) {
    throw new Error("Context Error");
  }
  return context;
};

export const TechReviewContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [techReviewPdf, setTechReviewPdf] = useState<File | null>(null);
  const [result, setResult] = useState<TechReviewResult | null>(null);

  return (
    <TechReviewContext.Provider
      value={{
        techReviewPdf,
        setTechReviewPdf,
        result,
        setResult,
      }}
    >
      {children}
    </TechReviewContext.Provider>
  );
};
