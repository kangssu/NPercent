import { ErrorHttpStatus } from 'src/enum/errorHttpStatus.enum';

type SuccessResult<T> = T extends void
  ? { success: true }
  : { success: true; data: T };

type FailResult = {
  success: false;
  errorCode: ErrorHttpStatus;
  message: string;
};

export type ApiResult<T> = SuccessResult<T> | FailResult;
