import { DataBase } from "../../../app/server_app/data/DataBase";
import { ReservationsDataAccess } from "../../../app/server_app/data/ReservationsDataAccess";
import { Reservation } from "../../../app/server_app/model/ReservationModel";
import * as IdGenerator from "../../../app/server_app/data/IdGenerator";

const insertMock = jest.fn();
const updateMock = jest.fn();
const deleteMock = jest.fn();
const getByMock = jest.fn();
const getAllElementsMock = jest.fn();

jest.mock("../../../app/server_app/data/DataBase", () => {
  return {
    DataBase: jest.fn().mockImplementation(() => {
      return {
        insert: insertMock,
        update: updateMock,
        delete: deleteMock,
        getBy: getByMock,
        getAllElements: getAllElementsMock,
      };
    }),
  };
});

describe("ReservationsDataAccess test suite", () => {
  let sut: ReservationsDataAccess;

  const sampleReservation: Reservation = {
    id: "",
    room: "Deluxe Rooms",
    user: "Ji",
    startDate: "21-August-2025",
    endDate: "5-September-20205",
  };

  const sampleId = "123ab";

  beforeEach(() => {
    sut = new ReservationsDataAccess();
    expect(DataBase).toHaveBeenCalledTimes(1);
    jest.spyOn(IdGenerator, "generateRandomId").mockReturnValueOnce(sampleId);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should create a sample reservation", async () => {
    insertMock.mockResolvedValueOnce(sampleId);

    const actual = await sut.createReservation(sampleReservation);
    expect(actual).toBe(sampleId);
    expect(insertMock).toHaveBeenCalledWith(sampleReservation);
  });

  it("should Update an reservation", async () => {
    const updatedReservation: Reservation = {
      id: "",
      room: "Deluxe Rooms",
      user: "sha",
      startDate: "21-August-2025",
      endDate: "5-September-20205",
    };

    getByMock.mockResolvedValueOnce(updatedReservation);

    const reservationId = await sut.createReservation(sampleReservation);
    console.log(reservationId);

    await sut.updateReservation(reservationId, "user", "sha");
    const newReservation = await sut.getReservation(reservationId);

    expect(newReservation).toEqual(updatedReservation);
    expect(updateMock).toHaveBeenCalledWith(reservationId, "user", "sha");
  });

  it("should get a reservation by an id", async () => {
    getByMock.mockResolvedValueOnce(sampleReservation);

    const actual = await sut.getReservation(sampleId);

    expect(actual).toEqual(sampleReservation);
    expect(getByMock).toHaveBeenCalledWith("id", sampleId);
  });

  it("should return all reservation from list", async () => {
    getAllElementsMock.mockResolvedValueOnce([
      sampleReservation,
      sampleReservation,
    ]);

    const actual = await sut.getAllReservations();

    const expected = [sampleReservation, sampleReservation];
    expect(actual).toEqual(expected);
    expect(getAllElementsMock).toHaveBeenCalledTimes(1);
  });

  it("Delete an element from list", async () => {
    await sut.deleteReservation(sampleId);

    expect(deleteMock).toHaveBeenCalledWith(sampleId);
  });
});
