export interface VerificationCodeData {
  verificationId: string;
  verificationCode: string;
  email: string;
  expiredTime: string;
  isused: boolean;
  createdby: string;
  createdat: string;
  modifiedby?: string;
  modifiedat?: string;
  deleteflag: boolean;
}
