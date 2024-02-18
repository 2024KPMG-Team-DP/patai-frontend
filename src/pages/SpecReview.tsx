import { SpecReviewContextProvider } from "../contexts/SpecReviewContext";
import SpecReview from "../templates/SpecReview";

export default function SpecReviewPage() {
  return (
    <SpecReviewContextProvider>
      <SpecReview />
    </SpecReviewContextProvider>
  );
}
