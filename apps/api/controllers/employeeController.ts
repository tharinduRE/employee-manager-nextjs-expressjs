import { Request, Response } from "express";
import httpStatus from "http-status";
import mongoose from "mongoose";
import ApiError from "../errors/apiError";
import Employee from "../models/employee.model";
import asyncHandler from "../utils/asyncHandler";

export const create = asyncHandler(async (req: Request, res: Response) => {
  const employee = await new Employee(req.body).save();
  if(employee){
    res.status(httpStatus.CREATED).send(employee);
  }
});

export const getOne = asyncHandler(async (req: Request, res: Response) => {
  if (typeof req.params["empId"] === "string") {
    const employee = await Employee.findOne({ _id: req.params["empId"] });
    if (!employee) {
      throw new ApiError(httpStatus.NOT_FOUND, "employee not found");
    }
    res.send(employee);
  }
});
export const updateOne = asyncHandler(async (req: Request, res: Response) => {
  if (typeof req.params["empId"] === "string") {
    const employee = await Employee.findByIdAndUpdate(
      new mongoose.Types.ObjectId(req.params["empId"]),
      req.body
    );
    res.send(employee);
  }
});
export const deleteOne = asyncHandler(async (req: Request, res: Response) => {
  if (typeof req.params["empId"] === "string") {
    await Employee.findOneAndDelete(
      new mongoose.Types.ObjectId(req.params["empId"])
    );
    res.status(httpStatus.NO_CONTENT).send();
  }
});

export const getAll = asyncHandler
(async (req: Request, res: Response) => {
  const {order,orderBy} = req.query

  const sortOrder = order == "asc" ? 1 : -1;
  const employees = await Employee.find()
    .sort({ [String(orderBy)]: sortOrder })
    .collation({ locale: "en_US" });
  res.status(200).json(employees);
});
