import axios from "axios";
import { EmployeeInterface } from "../interfaces/EmployeeInterface";

const apiClient = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true,
  timeout: 120000,
});

const loginUser = (data: { f_userName: string; f_pwd: string }) => {
  return apiClient.post("/user/login-user", data);
};

const registerUser = (data: { f_userName: string; f_pwd: string }) => {
  return apiClient.post("/user/register-user", data);
};

const getEmployees = (data: {
  pageNo: number;
  itemsPerPage: number;
  sortCategory?: string;
  isDescendingOrder: boolean;
  searchedValue: string;
}) => {
  const reqData = { ...data };
  return apiClient.post("employee/all-employees", reqData);
};

const searchEmployees = (data: {
  pageNo: number;
  itemsPerPage: number;
  sortCategory: string;
  isDescendingOrder: boolean;
  searchedValue: string;
}) => {
  return apiClient.post("employee/search-employees", data);
};

const uploadImage = async (data: File) => {
  const formData = new FormData();
  formData.append("image", data);

  return apiClient.post("/employee/upload-image", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

const addEmployee = async (data: {
  f_name: string;
  f_email: string;
  f_mobile: string;
  f_designation: string;
  f_gender: string;
  f_course: string;
  f_image: string;
}) => {
  return apiClient.post("/employee/add-employee", data);
};

const updateEmployee = (data: EmployeeInterface) => {
  return apiClient.post("/employee/edit-employee", data);
};

const deleteEmployee = (data: { _id: string }) => {
  return apiClient.delete("/employee/delete-employee/" + data._id);
};
export {
  loginUser,
  getEmployees,
  uploadImage,
  addEmployee,
  updateEmployee,
  deleteEmployee,
  registerUser,
};
