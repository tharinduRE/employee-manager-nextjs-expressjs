import { Employee } from './../../../web/interfaces/employee';
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

  let employee:Employee;

  it("should return 200 & valid response containing all the employees", async () => {
    const res = await request(app)
      .get(`/api/v1/employees`)
      .expect(httpStatus.OK);

    employee = res.body[0]
    expect(res.body).not.toBeNull()
    expect(res.body.length).toBeGreaterThan(0);
  });

  it("should return 200 & contains employee with matching id", async () => {
    const res = await request(app)
      .get(`/api/v1/employees/${employee?._id}`)
      .expect(httpStatus.OK);

      expect(res.body._id).toEqual(employee?._id)
  }); 

  afterAll(()=>{
    connection.disconnect()
  })
});
