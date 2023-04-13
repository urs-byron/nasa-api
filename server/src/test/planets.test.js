const request = require("supertest");

const { app } = require("../app");

const { testConnectMongo, disconnectMongo } = require("../util/mongo");

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
