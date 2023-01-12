import { Employee as EmployeeModel } from './../interfaces/employee';
import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      // required: true,
    },
    first_name: {
      type: String,
      required: true,
      trim: true,
    },
    last_name: {
      type: String,
      required: true,
      trim: true,
    },
    photo: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    number: {
      type: String,
      required: true,
      minlength: 8,
    },
    gender: {
      type: String,
      enum: ["M", "F"],
    },
  },
  {
    timestamps: true,
  }
);

const EmployeeModel = mongoose.model<EmployeeModel>('Employee', employeeSchema);

export default EmployeeModel;
