import { updateUserPackage, uploadVerificationDocument } from "./responses/auth";
import { createBranchSwagger, deleteBranchSwagger, getAllBranchesSwagger, getSingleBranchSwagger, updateBranchSwagger } from "./responses/branch";
import { createCategory } from "./responses/categories";
import { createEmployeeSwagger, deleteEmployeeSwagger, getAllEmployeesSwagger, getSingleEmployeeSwagger, updateEmployeeSwagger } from "./responses/employee";
import { createFeedbackForm } from "./responses/feedback";
import { createPackage } from "./responses/package";
import { createSchoolSwagger, deleteSchoolSwagger, getAllSchoolsSwagger, getSingleSchoolSwagger, updateSchoolSwagger } from "./responses/school";
import { createSubcategory } from "./responses/subcategories";

export const ApiSchemas = {
  //categories
  createCategory,
  //feedbacks
  createFeedbackForm,
  //subcategories
  createSubcategory,
  //auth
  uploadVerificationDocument,
  updateUserPackage,
  //package
  createPackage,
  //school
  createSchoolSwagger,
  getAllSchoolsSwagger,
  getSingleSchoolSwagger,
  updateSchoolSwagger,
  deleteSchoolSwagger,
  //employee
  createEmployeeSwagger,
  getAllEmployeesSwagger,
  getSingleEmployeeSwagger,
  updateEmployeeSwagger,
  deleteEmployeeSwagger,
  //branch
  createBranchSwagger,
  getAllBranchesSwagger,
  getSingleBranchSwagger,
  updateBranchSwagger,
  deleteBranchSwagger,
};
