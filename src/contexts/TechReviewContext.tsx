import { createContext, useContext, useState } from "react";

interface TechReviewContext {
  techReviewPdf: File | null;
  setTechReviewPdf: (file: File | null) => void;
  previewUrl: string | null;
  setPreviewUrl: (url: string | null) => void;
}

const TechReviewContext = createContext<TechReviewContext | undefined>({
  techReviewPdf: null,
  setTechReviewPdf: () => {},
  previewUrl: null,
  setPreviewUrl: () => {},
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
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  return (
    <TechReviewContext.Provider
      value={{ techReviewPdf, setTechReviewPdf, previewUrl, setPreviewUrl }}
    >
      {children}
    </TechReviewContext.Provider>
  );
};