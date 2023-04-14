const request = require("supertest");
require("dotenv").config();

const { app } = require("../src/app");

const { testConnectMongo, disconnectMongo } = require("../src/util/mongo");

describe("Connect to MongoDB", () => {
  beforeAll(async () => {
    await testConnectMongo();
  });

  afterAll(async () => {
    await disconnectMongo();
  });

  describe("Test GET /planets", () => {
    test("Should respond 200: JSON", async () => {
      const response = await request(app).get("/v1/planets").expect(200);
    });
  });
});
