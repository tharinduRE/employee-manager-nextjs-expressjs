import httpStatus from "http-status";
import { connect, Mongoose } from "mongoose";
import request from "supertest";
import app from "../app";
import config from "../config";

describe("GET /employee", () => {
  let connection:Mongoose;
  beforeAll(async()=>{
    connection = await connect(String(config.mongoose.url))
  })

  it("should return 200 & valid response containing all the employees", async () => {
    const res = await request(app)
      .get(`/api/v1/employees`)
      .expect(httpStatus.OK);

    expect(res.body.results).not.toBeNull();
  });

  it("should return 200 & contains employee with matching id", async () => {
    const res = await request(app)
      .get(`/api/v1/employees/1`)
      .expect(httpStatus.OK);

      expect(res.body.id).toEqual('1')
  }); 

  afterAll(()=>{
    connection.disconnect()
  })
});
