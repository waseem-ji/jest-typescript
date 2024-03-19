import { v4 } from "uuid";
export type StringInfo = {
  lowerCase: string;
  uppercase: string;
  charactors: string[];
  length: number;
  extraInfo: Object | undefined;
};

export function calculateComplexity(stringInfo: StringInfo) {
  return Object.keys(stringInfo.extraInfo).length * stringInfo.length;
}

// fakes: simplified working implementation of various functionalities we use

type LoggerServiceCallback = (arg: string) => void;

export function toUpperCasewithCb(
  arg: string,
  callback: LoggerServiceCallback
) {
  if (!arg) {
    callback("Invalid Argument");
    return;
  }
  callback(`Callback triggered with arg ${arg}`);
  return arg.toUpperCase();
}

//Mocks or mockObject does two things - It tracks the arguments for a method that is called and also it tracks the times it is called.

//spies

// spies better work with classes

export class OtherStringUtils {
  public toUpperCase(arg: string) {
    return arg.toUpperCase();
  }
  public logString(arg: string) {
    console.log(arg);
  }

  public callExternalService() {
    console.log("some call to an external service");
  }
}

//mocking modules

export function toUpperCase(arg: string) {
  return arg.toUpperCase();
}

export function toLowerCaseWithKey(arg: string) {
  return arg.toLowerCase() + v4();
}
