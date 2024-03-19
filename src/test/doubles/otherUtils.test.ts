import {
  OtherStringUtils,
  calculateComplexity,
  toUpperCasewithCb,
} from "../../app/doubles/otherUtils";

describe.skip("Other Utils test suite", () => {
  describe.only("Other string utils test class", () => {
    let sut: OtherStringUtils;

    beforeEach(() => {
      sut = new OtherStringUtils();
    });

    test("use a spy to track calls", () => {
      const toUpperCaseSpy = jest.spyOn(sut, "toUpperCase");
      sut.toUpperCase("qwerty");
      expect(toUpperCaseSpy).toHaveBeenCalledWith("qwerty");
    });

    test("spy on log function", () => {
      const consoleLogSpy = jest.spyOn(console, "log");
      sut.logString("test");
      expect(consoleLogSpy).toHaveBeenCalledWith("test");
    });

    test("Use spy to replace the implementation of method", () => {
      jest.spyOn(sut, "callExternalService").mockImplementation(() => {
        console.log("called external service");
      });
      sut.callExternalService();
    });
  });

  it("should return complexity of 10 for the test stub", () => {
    const stubInfo = {
      length: 5,
      extraInfo: {
        field1: "info1",
        field2: "info2",
      },
    };

    const actual = calculateComplexity(stubInfo as any);
    expect(actual).toBe(10);
  });

  it("should return void for invalid argument", () => {
    const actual = toUpperCasewithCb("", () => {});

    expect(actual).toBeUndefined();
  });

  it("should return uppercase for valid argument", () => {
    const actual = toUpperCasewithCb("abcde", () => {});

    expect(actual).toBe("ABCDE");
  });

  describe("tracking callbacks", () => {
    let cbArgs = [];
    let timesCalled = 0;

    function callBackMock(arg: string) {
      cbArgs.push(arg);
      timesCalled++;
    }

    afterEach(() => {
      cbArgs = [];
      timesCalled = 0;
    });

    it("should return void for invalid argument", () => {
      const actual = toUpperCasewithCb("", callBackMock);

      expect(actual).toBeUndefined();
      expect(cbArgs).toContain("Invalid Argument");
      expect(timesCalled).toBe(1);
    });

    it("should return uppercase args for valid argument", () => {
      const actual = toUpperCasewithCb("abc", callBackMock);

      expect(actual).toBe("ABC");
      expect(cbArgs).toContain("Callback triggered with arg abc");
      expect(timesCalled).toBe(1);
    });
  });

  describe("tracking callbacks with jest", () => {
    let callBackMock = jest.fn();
    afterEach(() => {
      callBackMock.mockClear();
    });

    it("should return void for invalid argument", () => {
      const actual = toUpperCasewithCb("", callBackMock);

      expect(actual).toBeUndefined();
      expect(callBackMock).toHaveBeenCalledWith("Invalid Argument");
      expect(callBackMock).toHaveBeenCalledTimes(1);
    });

    it("should return uppercase args for valid argument", () => {
      const actual = toUpperCasewithCb("abc", callBackMock);

      expect(actual).toBe("ABC");
      expect(callBackMock).toHaveBeenCalledWith(
        "Callback triggered with arg abc"
      );
      expect(callBackMock).toHaveBeenCalledTimes(1);
    });
  });
});
