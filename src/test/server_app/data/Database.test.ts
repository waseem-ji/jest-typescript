import { DataBase } from "../../../app/server_app/data/DataBase";
import * as IdGenerator from "../../../app/server_app/data/IdGenerator";

type someTypeWithId = {
  id: string;
  name: string;
  role: string;
  color: string;
};

describe("Database test suite", () => {
  let sut: DataBase<someTypeWithId>;
  const fakeId = "1245";
  const someObject1 = {
    id: "",
    name: "ji",
    role: "shamty",
    color: "blue",
  };

  const someObject2 = {
    id: "",
    name: "sha",
    role: "shamollTTY",
    color: "blue",
  };

  beforeEach(() => {
    sut = new DataBase<someTypeWithId>();
    jest.spyOn(IdGenerator, "generateRandomId").mockReturnValue(fakeId);
  });

  it("should return an ID after insert operation", async () => {
    const actual = await sut.insert({
      id: "214",
    } as any);
    expect(actual).toBe(fakeId);
  });

  it("should get a object by id", async () => {
    const id = await sut.insert(someObject1);
    const actual = await sut.getBy("id", id);

    expect(actual).toEqual(someObject1);
  });

  it("Should return all elements of a specific property", async () => {
    await sut.insert(someObject1);
    await sut.insert(someObject2);

    const actual = await sut.findAllBy("color", "blue");
    const expected = [someObject1, someObject2];
    expect(actual).toEqual(expected);
  });

  it("should update color of an element", async () => {
    const id = await sut.insert(someObject1);
    await sut.update(id, "color", "rEd");

    const actual = await sut.getBy("id", id);
    expect(actual.color).toBe("rEd");
  });

  it("should delete an element from database", async () => {
    const id = await sut.insert(someObject2);
    await sut.delete(id);
    const actual = await sut.getBy("id", id);

    expect(actual).toBeUndefined();
  });

  it("should retrieve all elements from Database", async () => {
    await sut.insert(someObject1);
    await sut.insert(someObject2);
    const expected = [someObject1, someObject2];
    const actual = await sut.getAllElements();
    expect(actual).toEqual(expected);
  });
});
