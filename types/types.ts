export interface TranslateBody {
  inputLanguage: string;
  outputLanguage: string;
  inputCode: string;
  model: string;
  apiKey: string;
}

export interface TranslateResponse {
  code: string;
}
