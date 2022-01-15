interface IMsg91OtpConstructorArgs {
  authKey: string;
  templateId: string;
  baseUrl?: string;
  apiVersion?: string;
  otpExpiry?: number;
  otpLength?: number;
}

interface IMsg91SendOtpArgs {
  templateId?: string;
  expiry?: number;
  otpLength?: number;
  email?: string;
  invisible?: 0 | 1;
  extra_param: any;
}

declare class Msg91Otp {
  constructor(args: IMsg91OtpConstructorArgs);

  send(contactNumber: string | number, args?: IMsg91SendOtpArgs): Promise<any>;

  retry(contactNumber: string | number, retryType?: string): Promise<any>;

  verify(contactNumber: string | number, otp: number | string): Promise<any>;
}

export { Msg91Otp as msg91OTP };

interface IMsg91SmsConstructorArgs {
  authKey: string;
  templateId: string;
  baseUrl?: string;
  apiVersion?: string;
  otpExpiry?: number;
  otpLength?: number;
}

interface IMsg91SendSmsArgs {
  flow_id: string;
  sender: string;
}

declare class Msg91Sms {
  constructor(args: IMsg91SmsConstructorArgs);

  send(contactNumber: string | number, args?: IMsg91SendSmsArgs, custom_vars?: any): Promise<any>;
}

export { Msg91Sms as msg91SMS };
