import { AxiosInstance } from "axios";

export interface AnalyzeRepository {
  getTechReviewPdf(pdf: File): any;
}

class AnalyzeRepositoryImpl implements AnalyzeRepository {
  constructor(private readonly client: AxiosInstance) {}

  public async getTechReviewPdf(pdf: File) {
    const formData = new FormData();
    formData.append("pdf", pdf);

    const response = await this.client.post(`/techReview`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      responseType: "blob",
    });
    console.log(response);

    return response;
  }
}

export default AnalyzeRepositoryImpl;
