import { TechReviewContextProvider } from "../contexts/TechReviewContext";
import TechReview from "../templates/TechReview";

export default function TechReviewPage() {
  return (
    <TechReviewContextProvider>
      <TechReview />
    </TechReviewContextProvider>
  );
}
