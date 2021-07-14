/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require("chai");
const session = require("supertest-session");
const app = require("../../src/app.js");
const { Country, Activity, conn } = require("../../src/db.js");

const agent = session(app);
const activity = {
  name: "swim",
  dificulty: 2,
  duation: 30,
  season: "summer",
  country: ["argentina"],
};

describe("Activity routes", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  beforeEach(() =>
    Activity.sync({ force: true }).then(() => Activity.create(activity))
  );
  describe("GET /activity", () => {
    it("should get 200", () => agent.get("/activity").expect(200));
  });
});
