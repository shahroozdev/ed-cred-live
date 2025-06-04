import { updateUserPackage, uploadVerificationDocument } from "./responses/auth";
import { createCategory } from "./responses/categories";
import { createFeedbackForm } from "./responses/feedback";
import { createPackage } from "./responses/package";
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
};
