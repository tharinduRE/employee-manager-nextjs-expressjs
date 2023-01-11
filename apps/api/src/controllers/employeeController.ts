import { PaginatedResults } from './../interfaces/pagination';
import { Employee} from './../interfaces/employee';
import { Request, Response } from "express";
import httpStatus from "http-status";
import mongoose from "mongoose";
import ApiError from "../errors/apiError";
import EmployeeModel from "../models/employee.model";
import asyncHandler from "../utils/asyncHandler";

/**
 *  Create 
 */
export const create = asyncHandler(async (req: Request, res: Response) => {
  const employee = await new EmployeeModel(req.body).save();
  if(employee){
    res.status(httpStatus.CREATED).send(employee);
  }
});

export const getOne = asyncHandler(async (req: Request, res: Response) => {
  if (typeof req.params["empId"] === "string") {
    const employee = await EmployeeModel.findOne({ _id: req.params["empId"] });
    if (!employee) {
      throw new ApiError(httpStatus.NOT_FOUND, "employee not found");
    }
    res.send(employee);
  }
});
export const updateOne = asyncHandler(async (req: Request, res: Response) => {
  if (typeof req.params["empId"] === "string") {
    const employee = await EmployeeModel.findByIdAndUpdate(
      new mongoose.Types.ObjectId(req.params["empId"]),
      req.body
    );
    res.send(employee);
  }
});
export const deleteOne = asyncHandler(async (req: Request, res: Response) => {
  if (typeof req.params["empId"] === "string") {
    await EmployeeModel.findOneAndDelete(
      new mongoose.Types.ObjectId(req.params["empId"])
    );
    res.status(httpStatus.NO_CONTENT).send();
  }
});


/**
 * Get All
 */
export const getAll = asyncHandler(
  async (req: Request, res: Response<PaginatedResults<Employee>>) => {

    const { order, orderBy, filters } = req.query;
    const sortOrder = order == "asc" ? 1 : -1;
    let page = Number(req.query.page || 0)
    let pageSize = Number(req.query.pageSize || 10)

    let filterQuery;
    if (filters) {
      filterQuery = JSON.parse(filters as string);
    }
    // console.log(filterQuery);
    let query = EmployeeModel.find(filterQuery);
    
    const employees = await query
      .sort({ [String(orderBy)]: sortOrder })
      .skip(((page + 1) - 1) * pageSize)
      .limit(pageSize)
      .collation({ locale: "en_US",strength:2 });

    const count = await EmployeeModel.countDocuments(filterQuery)

    res.status(httpStatus.OK).json({
      data: employees,
      pagination: {
        count,
        page,
        pageSize
      },
    });
  }
);
