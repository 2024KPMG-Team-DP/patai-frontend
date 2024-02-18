import { createContext, useContext, useState } from "react";
import { SpecReviewResult } from "../entity/specReview";

interface SpecReviewContext {
  specInputToApplicate: File | null;
  setSpecInputToApplicate: (file: File | null) => void;
  specInputToCompare: File | null;
  setSpecInputToCompare: (file: File | null) => void;
  result: SpecReviewResult | null;
  setResult: (result: SpecReviewResult | null) => void;
}

export const SpecReviewContext = createContext<SpecReviewContext | undefined>({
  specInputToApplicate: null,
  setSpecInputToApplicate: () => {},
  specInputToCompare: null,
  setSpecInputToCompare: () => {},
  result: null,
  setResult: () => {},
});

export const useSpecReviewContext = () => {
  const context = useContext(SpecReviewContext);
  if (!context) {
    throw new Error("Context Error");
  }
  return context;
};

export const SpecReviewContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [specInputToApplicate, setSpecInputToApplicate] = useState<File | null>(
    null
  );
  const [specInputToCompare, setSpecInputToCompare] = useState<File | null>(
    null
  );
  const [result, setResult] = useState<SpecReviewResult | null>(null);

  return (
    <SpecReviewContext.Provider
      value={{
        specInputToApplicate,
        setSpecInputToApplicate,
        specInputToCompare,
        setSpecInputToCompare,
        result,
        setResult,
      }}
    >
      {children}
    </SpecReviewContext.Provider>
  );
};
