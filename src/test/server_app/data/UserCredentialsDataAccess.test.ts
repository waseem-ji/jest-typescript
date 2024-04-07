import { DataBase } from "../../../app/server_app/data/DataBase";
import { UserCredentialsDataAccess } from "../../../app/server_app/data/UserCredentialsDataAccess";
import { Account } from "../../../app/server_app/model/AuthModel";

const insertMock = jest.fn();
const getByMock = jest.fn();

jest.mock("../../../app/server_app/data/DataBase", () => {
  return {
    DataBase: jest.fn().mockImplementation(() => {
      return {
        insert: insertMock,
        getBy: getByMock,
      };
    }),
  };
});

describe("UserCredentialsDatAccess Test suite", () => {
  let sut: UserCredentialsDataAccess;
  const someAccount: Account = {
    id: "",
    userName: "rest@test.com",
    password: "password",
  };
  const randomId = "1244";

  beforeEach(() => {
    sut = new UserCredentialsDataAccess();
    expect(DataBase).toHaveBeenCalledTimes(1);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should add an user and return ID", async () => {
    insertMock.mockResolvedValueOnce(randomId);

    const actual = await sut.addUser(someAccount);

    expect(actual).toBe(randomId);
  });

  it("should get a user by ID", async () => {
    getByMock.mockResolvedValueOnce(someAccount);
    await sut.addUser(someAccount);

    const actual = await sut.getUserById(randomId);

    expect(actual).toBe(someAccount);
  });

  it("should get an user by user name", async () => {
    getByMock.mockResolvedValueOnce(someAccount);
    await sut.addUser(someAccount);

    const actual = await sut.getUserByUserName(someAccount.userName);

    expect(actual).toEqual(someAccount);
  });
});
