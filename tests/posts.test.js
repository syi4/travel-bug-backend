import supertest from "supertest";
import { app } from "../index.js";

describe("posts", () => {
  describe("get posts route", () => {
    describe("given that posts does not exist  ", () => {
      it("should return a 404", async () => {
        await supertest(app).get("/").expect(404);
      });
    });
  });
});
