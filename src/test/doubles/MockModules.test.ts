jest.mock("../../app/doubles/otherUtils", () => ({
  ...jest.requireActual("../../app/doubles/otherUtils"),
  calculateComplexity: () => {
    return 10;
  },
}));

jest.mock("uuid", () => ({
  v4: () => {
    return "-1a2s2d";
  },
}));

import * as otherUtils from "../../app/doubles/otherUtils";

describe("test mocked module suit", () => {
  test("calculate omplxity test", () => {
    const actual = otherUtils.calculateComplexity({} as any);
    console.log(actual);
  });

  test("to uppercase", () => {
    const actual = otherUtils.toUpperCase("asdfg");
    expect(actual).toBe("ASDFG");
  });

  test("to lowercase with id", () => {
    const actual = otherUtils.toLowerCaseWithKey("QWERT");
    expect(actual).toBe("qwert-1a2s2d");
  });
});
