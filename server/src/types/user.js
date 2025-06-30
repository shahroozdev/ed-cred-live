"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserCategory = exports.UserRole = exports.SubscriptionPlan = exports.Permission = void 0;
var UserRole;
(function (UserRole) {
    UserRole["ADMIN"] = "admin";
    UserRole["MODERATOR"] = "moderator";
    UserRole["USER"] = "user";
})(UserRole || (exports.UserRole = UserRole = {}));
var UserCategory;
(function (UserCategory) {
    UserCategory["STUDENT"] = "student";
    UserCategory["TEACHER"] = "teacher";
    UserCategory["CUSTOMER"] = "customer";
    UserCategory["EMPLOYEE"] = "employee";
})(UserCategory || (exports.UserCategory = UserCategory = {}));
var Permission;
(function (Permission) {
    Permission["VIEW_POST"] = "view_post";
    Permission["CREATE_POST"] = "create_post";
    Permission["CREATE_FEEDBACK_FORM"] = "create_feedback_form";
    Permission["ANSWER_FEEDBACK_FORM"] = "answer_feedback_form";
})(Permission || (exports.Permission = Permission = {}));
var SubscriptionPlan;
(function (SubscriptionPlan) {
    SubscriptionPlan["FREE"] = "free";
    SubscriptionPlan["BASIC"] = "basic";
    SubscriptionPlan["PREMIUM"] = "premium";
    SubscriptionPlan["ENTERPRISE"] = "enterprise";
})(SubscriptionPlan || (exports.SubscriptionPlan = SubscriptionPlan = {}));
//# sourceMappingURL=user.js.map