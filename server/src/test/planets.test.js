const request = require("supertest");
const { app } = require("../app");
const { testConnectMongo } = require("../util/mongo");

describe("Launch API", () => {
  beforeAll(async () => {
    await testConnectMongo();
  });

  describe("Test GET /planets", () => {
    test("Should respond 200: JSON", async () => {
      const response = await request(app).get("/v1/planets").expect(200);
    });
  });
});
