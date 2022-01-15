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