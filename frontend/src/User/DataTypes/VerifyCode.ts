export interface CreateVerifyCodePayload {
  email: string;
}
export interface VerifyCodePayload {
  verificationCode: string;
  email: string;
}
