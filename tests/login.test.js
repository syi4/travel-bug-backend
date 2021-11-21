import supertest from "supertest";
import { app } from "../index.js";

describe("login", () => {
  describe("given a username and password", () => {
    test("should respond with a 200 status code", async () => {
      const response = await supertest(app).post("/login").send({
        username: "username",
        password: "password",
      });
      expect(response.statusCode).toBe(200);
    });
  });
  describe("when the username and password is missing", () => {});
});
