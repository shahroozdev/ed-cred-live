import { changePasswordDoc, createOrUpdateUserSchema, deleteUser, forgotPassword, getUserProfile, getUsersSwagger, loginUser, resetPassword, sendVerificationEmailSwagger, setUserCategory, setUserRoleDoc, signup, updateProfileSwagger, updateUserCategoryDoc, updateUserPackage, uploadVerificationDocument, verifyEmail, verifyUser } from "./responses/auth";
import { createBranchSwagger, deleteBranchSwagger, getAllBranchesSwagger, getSingleBranchSwagger, updateBranchSwagger } from "./responses/branch";
import { createCategory } from "./responses/categories";
import { createEmployeeSwagger, deleteEmployeeSwagger, getAllEmployeesSwagger, getSingleEmployeeSwagger, updateEmployeeSwagger } from "./responses/employee";
import { createFeedbackForm } from "./responses/feedback";
import { createPackage, findOnePackage } from "./responses/package";
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
  signup,
  loginUser,
  forgotPassword,
  resetPassword,
  changePasswordDoc,
  getUserProfile,
  getUsersSwagger,
  setUserRoleDoc,
  setUserCategory,
  updateUserCategoryDoc,
  verifyUser,
  sendVerificationEmailSwagger,
  verifyEmail,
  updateProfileSwagger,
  deleteUser,
  uploadVerificationDocument,
  updateUserPackage,
  createOrUpdateUserSchema,
  //package
  createPackage,
  findOnePackage,
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
