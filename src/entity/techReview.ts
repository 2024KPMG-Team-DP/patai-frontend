export interface TechReviewResult {
  data: {
    info: {
      company: string;
      name: string;
      nowDate: string;
      report: string;
      summary: string;
    };
    result: {
      conclusion: string;
      guide: string;
      otherPatents: {
        analysis: string;
        company: string;
        index: number;
        name: string;
        registerDate: string;
        registration: string;
        similarity: string;
      }[];
    };
  };
  pdf: string;
}
