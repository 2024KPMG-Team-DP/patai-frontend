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
    });
    console.log(response);

    return response;
  }

  public async getSpecGuidePdf(pdf: File) {
    const formData = new FormData();
    formData.append("pdf", pdf);

    const response = await this.client.post(`/specGuide`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(response);

    return response;
  }

  public async getSpecReviewPdf(pdfToApplicate: File, pdfToCompare: File) {
    const formData = new FormData();
    console.log(pdfToApplicate);
    console.log(pdfToCompare);
    formData.append("applicationSpec", pdfToApplicate);
    formData.append("targetSpec", pdfToCompare);

    const response = await this.client.post(`/specReview`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(response);

    return response;
  }
}

export default AnalyzeRepositoryImpl;
