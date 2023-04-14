const request = require("supertest");
require("dotenv").config();

const { app } = require("../src/app");

const { loadLaunches, deleteLaunches } = require("../src/model/launch.model");
const { testConnectMongo, disconnectMongo } = require("../src/util/mongo");

describe("Connect to MongoDB", () => {
  beforeAll(async () => {
    await testConnectMongo();
  });

  // With these steps, test data will be wholly dependent on the external APIs of the server
  afterAll(async () => {
    await deleteLaunches();
    await loadLaunches();
    await disconnectMongo();
  }, 50000);

  describe("Test GET /v1/launches", () => {
    test("Response should be 200: JSON", async () => {
      const response = await request(app)
        .get("/v1/launches")
        .expect("Content-Type", /json/)
        .expect(200);
    });
  });

  describe("Test PUT /v1/launches", () => {
    const validLaunch = {
      mission: "Test Mission",
      rocket: "Test Rocket",
      target: "Test Target",
      launchDate: "January 1 1",
    };
    test("Response should be 201: JSON", async () => {
      const response = await request(app)
        .put("/v1/launches")
        .send(validLaunch)
        .expect("Content-Type", /json/)
        .expect(201);
    });

    const dateInvalidLaunch = {
      mission: "Test Mission",
      rocket: "Test Rocket",
      target: "Test Target",
      launchDate: "not a date",
    };
    const err_400 = { error_type: 400, error_msg: "Bad Request" };

    test("Response should be 400: JSON", async () => {
      const response = await request(app)
        .put("/v1/launches")
        .send(dateInvalidLaunch)
        .expect("Content-Type", /json/)
        .expect(400);

      expect(response.body).toMatchObject(err_400);
    });

    const formInvalidLaunch = {
      mission: "",
      rocket: "Test Rocket",
      target: "Test Target",
      launchDate: "not a date",
    };
    test("Response should be 400: JSON", async () => {
      const response = await request(app)
        .put("/v1/launches")
        .send(formInvalidLaunch)
        .expect("Content-Type", /json/)
        .expect(400);

      expect(response.body).toMatchObject(err_400);
    });
  });

  describe("Test DELETE /v1/launches", () => {
    const validId = "200";

    test("Response should be 200: JSON", async () => {
      const response = await request(app)
        .delete(`/v1/launches/${validId}`)
        .expect("Content-Type", /json/)
        .expect(200);
    });

    const inValidId = "300";
    // inValidId should be greater than 2 since the test above PUTS a successful launch, adding length to the data
    test("Response should be 404: JSON", async () => {
      const response = await request(app)
        .delete(`/v1/launches/${inValidId}`)
        .expect("Content-Type", /json/)
        .expect(404);

      expect(response.body).toMatchObject({
        error_type: 404,
        error_msg: "Item not Found",
      });
    });
  });
});
