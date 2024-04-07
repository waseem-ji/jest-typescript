import { DataBase } from "../../../app/server_app/data/DataBase";
import { SessionTokenDataAccess } from "../../../app/server_app/data/SessionTokenDataAccess";
import { Account } from "../../../app/server_app/model/AuthModel";
import * as IdGenerator from "../../../app/server_app/data/IdGenerator";

const insertMock = jest.fn();
const updateMock = jest.fn();
const getByMock = jest.fn();

jest.mock("../../../app/server_app/data/DataBase", () => {
  return {
    DataBase: jest.fn().mockImplementation(() => {
      return {
        insert: insertMock,
        update: updateMock,
        getBy: getByMock,
      };
    }),
  };
});

describe("SessionTokenDataAccess test suite", () => {
  let sut: SessionTokenDataAccess;

  const sampleAccount: Account = {
    id: "",
    userName: "admin",
    password: "password",
  };

  const sampleToken = "123AB";

  jest.spyOn(global.Date, "now").mockReturnValue(0);
  jest.spyOn(IdGenerator, "generateRandomId").mockReturnValue(sampleToken);

  beforeEach(() => {
    sut = new SessionTokenDataAccess();
    expect(DataBase).toHaveBeenCalledTimes(1);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should create a token on insertion ", async () => {
    await sut.generateToken(sampleAccount);

    expect(insertMock).toHaveBeenCalledTimes(1);
    expect(insertMock).toHaveBeenCalledWith({
      id: "",
      userName: sampleAccount.userName,
      valid: true,
      expirationDate: new Date(1000 * 60 * 60),
    });
  });

  it("should invalidate token", async () => {
    await sut.invalidateToken(sampleToken);

    expect(updateMock).toHaveBeenCalledWith(sampleToken, "valid", false);
  });

  it("should check valid token", async () => {
    getByMock.mockResolvedValueOnce({ valid: true });

    const actual = await sut.isValidToken({} as any);

    expect(actual).toBe(true);
  });

  it("should check invalid token", async () => {
    getByMock.mockResolvedValueOnce({ valid: false });

    const actual = await sut.isValidToken({} as any);

    expect(actual).toBe(false);
  });

  it("should check inexistent token", async () => {
    getByMock.mockResolvedValueOnce(undefined);

    const actual = await sut.isValidToken({} as any);

    expect(actual).toBe(false);
  });
});
