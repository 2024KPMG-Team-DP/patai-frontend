export interface SpecGuideResult {
  data: {
    info: {
      company: string;
      name: string;
      nowDate: string;
      report: string;
      summary: string;
    };
    result: {
      name: string;
      techField: string;
      backgroundTech: string;
      content: {
        problemToSolve: string;
        methodForSolve: string;
        effectOfInvent: string;
      };
    };
  };
  pdf: string;
}
