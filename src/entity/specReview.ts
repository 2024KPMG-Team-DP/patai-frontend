export interface SpecReviewResult {
  data: {
    info: {
      nowDate: string;
      report: string;
    };
    result: {
      claims: {
        index: string;
        content: string;
      }[];
      conclusion: string;
    };
  };
  pdf: string;
}
