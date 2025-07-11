export const uploadVerificationDocument = {
  summary: "Upload a user verification document",
  requiresAuth: true,
  body: {
    type: "object",
    properties: {
      file: {
        type: "string",
        format: "binary",
      },
    },
    required: ["file"],
  },
  responsesArr: [
    {
      status: 201,
      description: "Verification document uploaded successfully",
      schema: {
        type: "object",
        properties: {
          message: {
            type: "string",
            example:
              "Your docuemnt has been uploaded. You will be notified when it will be approved",
          },
        },
      },
    },
    {
      status: 404,
      description: "User not found",
      schema: {
        type: "object",
        properties: {
          status: { type: "number", example: 404 },
          message: {
            type: "string",
            example: "User not found",
          },
        },
      },
    },
    {
      status: 400,
      description: "Bad Request - Missing file or invalid input",
      schema: {
        type: "object",
        properties: {
          status: { type: "number", example: 400 },
          message: {
            type: "string",
            example: "No file provided or input is malformed.",
          },
        },
      },
    },
    {
      status: 500,
      description: "Internal Server Error",
      schema: {
        type: "object",
        properties: {
          status: { type: "number", example: 500 },
          message: {
            type: "string",
            example:
              "An internal server error occurred. Please try again later.",
          },
        },
      },
    },
  ],
};
export const updateUserPackage = {
  summary: "Subscribe user to a pricing plan",
  body: {
    type: "object",
    properties: {
      packageName: {
        type: "string",
        enum: ["basic", "Pro", "Enterprise"],
        description: "The name of the subscription package to assign the user.",
        example: "Pro",
      },
    },
    required: ["packageName"],
  },
  responsesArr: [
    {
      status: 200,
      description: "Package subscribed successfully",
      schema: {
        type: "object",
        properties: {
          status: { type: "number", example: 200 },
          message: {
            type: "string",
            example: "User package has been subscribed successfully.",
          },
        },
      },
    },
    {
      status: 404,
      description: "User not found",
      schema: {
        type: "object",
        properties: {
          status: { type: "number", example: 404 },
          message: { type: "string", example: "User not found" },
        },
      },
    },
    {
      status: 400,
      description: "Bad Request - Invalid or missing package name",
      schema: {
        type: "object",
        properties: {
          status: { type: "number", example: 400 },
          message: {
            type: "string",
            example: "Nothing to update",
          },
        },
      },
    },
    {
      status: 500,
      description: "Internal Server Error",
      schema: {
        type: "object",
        properties: {
          status: { type: "number", example: 500 },
          message: {
            type: "string",
            example:
              "An internal server error occurred. Please try again later.",
          },
        },
      },
    },
  ],
};
export const signup = {
  summary: 'Register a new user account',
  isPublic: true, // Optional, depending on how you handle public metadata
  body: {
    type: 'object',
    properties: {
      username: { type: 'string', example: 'john_doe' },
      email: { type: 'string', format: 'email', example: 'john@example.com' },
      password: { type: 'string', format: 'password', example: 'P@ssw0rd123' },
    },
    required: ['username', 'email', 'password'],
  },
  responsesArr: [
    {
      status: 200,
      description: 'User registered successfully',
      schema: {
        type: 'object',
        properties: {
          status: { type: 'number', example: 200 },
          message: { type: 'string', example: 'Sign Up Successfully.' },
          token: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6...' },
          user: {
            type: 'object',
            properties: {
              id: { type: 'number', example: 1 },
              username: { type: 'string', example: 'john_doe' },
              email: { type: 'string', example: 'john@example.com' },
              role: { type: 'string', example: 'user' },
              subscription: {
                type: 'object',
                nullable: true,
                properties: {
                  plan: { type: 'string', example: 'free' },
                  status: { type: 'string', example: 'subscribed' },
                  expiresAt: { type: 'string', format: 'date-time', example: '2025-12-31T23:59:59.000Z' },
                },
              },
              category: { type: 'string', nullable: true, example: null },
              permissions: {
                type: 'array',
                items: { type: 'string' },
                example: [],
              },
              createdAt: { type: 'string', format: 'date-time' },
            },
          },
        },
      },
    },
    {
      status: 409,
      description: 'Username or email already in use',
      schema: {
        type: 'object',
        properties: {
          statusCode: { type: 'number', example: 409 },
          message: { type: 'string', example: 'Username already taken' },
        },
      },
    },
    {
      status: 500,
      description: 'Internal server error',
      schema: {
        type: 'object',
        properties: {
          statusCode: { type: 'number', example: 500 },
          message: { type: 'string', example: 'Internal server error' },
        },
      },
    },
  ],
};
export const loginUser = {
  summary: 'Login user and return token',
  body: {
    type: 'object',
    properties: {
      identifier: {
        type: 'string',
        example: 'user@example.com or username123',
      },
      password: {
        type: 'string',
        example: 'securePassword123',
      },
    },
    required: ['identifier', 'password'],
  },
  responsesArr: [
    {
      status: 200,
      description: 'Login successful',
      schema: {
        type: 'object',
        properties: {
          status: { type: 'number', example: 200 },
          message: { type: 'string', example: 'Log In Successfully.' },
          token: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6...' },
          user: {
            type: 'object',
            properties: {
              id: { type: 'number', example: 1 },
              username: { type: 'string', example: 'johndoe' },
              email: { type: 'string', example: 'johndoe@example.com' },
              role: { type: 'string', example: 'user' },
              category: { type: 'string', nullable: true },
              subscription: {
                type: 'object',
                example: {
                  plan: 'enterprise',
                  status: 'subscribed',
                  expiresAt: '2025-07-05T08:14:19.537Z',
                },
              },
              permissions: {
                type: 'array',
                items: { type: 'string' },
                example: ['VIEW_DASHBOARD', 'EDIT_PROFILE'],
              },
            },
          },
        },
      },
    },
    {
      status: 400,
      description: 'Invalid credentials',
      schema: {
        type: 'object',
        properties: {
          status: { type: 'number', example: 400 },
          message: { type: 'string', example: 'Invalid credentials' },
        },
      },
    },
    {
      status: 500,
      description: 'Internal Server Error',
      schema: {
        type: 'object',
        properties: {
          status: { type: 'number', example: 500 },
          message: {
            type: 'string',
            example: 'An internal server error occurred.',
          },
        },
      },
    },
  ],
};
export const forgotPassword = {
  summary: 'Request password reset email',
  body: {
    type: 'object',
    properties: {
      email: {
        type: 'string',
        format: 'email',
        example: 'user@example.com',
      },
    },
    required: ['email'],
  },
  responsesArr: [
    {
      status: 200,
      description: 'Password reset email sent successfully',
      schema: {
        type: 'object',
        properties: {
          status: { type: 'number', example: 200 },
          message: {
            type: 'string',
            example: 'Password reset email sent successfully',
          },
        },
      },
    },
    {
      status: 404,
      description: 'User not found',
      schema: {
        type: 'object',
        properties: {
          status: { type: 'number', example: 404 },
          message: { type: 'string', example: 'User not found' },
        },
      },
    },
    {
      status: 500,
      description: 'Internal server error',
      schema: {
        type: 'object',
        properties: {
          status: { type: 'number', example: 500 },
          message: {
            type: 'string',
            example: 'An internal server error occurred',
          },
        },
      },
    },
  ],
  requiresAuth: false, // ✅ It's a public route
};
export const resetPassword = {
  summary: 'Reset password using token',
  requiresAuth: false, // ✅ Public route — no auth required
  body: {
    type: 'object',
    properties: {
      token: {
        type: 'string',
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
      },
      password: {
        type: 'string',
        example: 'newSecurePassword123!',
      },
    },
    required: ['token', 'password'],
  },
  responsesArr: [
    {
      status: 200,
      description: 'Password reset successfully',
      schema: {
        type: 'object',
        properties: {
          status: { type: 'number', example: 200 },
          message: { type: 'string', example: 'Password reset successfully' },
          token: { type: 'string', example: 'new-jwt-token' },
          user: {
            type: 'object',
            properties: {
              id: { type: 'number', example: 1 },
              username: { type: 'string', example: 'johndoe' },
              email: { type: 'string', example: 'johndoe@example.com' },
              role: { type: 'string', example: 'user' },
              category: { type: 'object' }, // You can add more detail if needed
              subscription: { type: 'object' },
              permissions: {
                type: 'array',
                items: { type: 'string' },
              },
            },
          },
        },
      },
    },
    {
      status: 404,
      description: 'Invalid token or user not found',
      schema: {
        type: 'object',
        properties: {
          status: { type: 'number', example: 404 },
          message: { type: 'string', example: 'token is not valid or expired' },
        },
      },
    },
    {
      status: 500,
      description: 'Internal Server Error',
      schema: {
        type: 'object',
        properties: {
          status: { type: 'number', example: 500 },
          message: {
            type: 'string',
            example: 'An internal server error occurred. Please try again later.',
          },
        },
      },
    },
  ],
};
export const changePasswordDoc = {
  summary: "Change password for logged-in user",
  requiresAuth: true, // ✅ Ensure it applies @ApiBearerAuth()
  body: {
    type: "object",
    properties: {
      oldPassword: {
        type: "string",
        example: "OldPassword123!",
      },
      newPassword: {
        type: "string",
        example: "NewPassword456!",
      },
    },
    required: ["oldPassword", "newPassword"],
  },
  responsesArr: [
    {
      status: 200,
      description: "Password changed successfully",
      schema: {
        type: "object",
        properties: {
          status: { type: "number", example: 200 },
          message: {
            type: "string",
            example: "Password changed successfully",
          },
        },
      },
    },
    {
      status: 404,
      description: "User not found or old password is incorrect",
      schema: {
        type: "object",
        properties: {
          status: { type: "number", example: 404 },
          message: {
            type: "string",
            example: "User not found",
          },
        },
      },
    },
    {
      status: 500,
      description: "Internal Server Error",
      schema: {
        type: "object",
        properties: {
          status: { type: "number", example: 500 },
          message: {
            type: "string",
            example: "Something went wrong. Please try again later.",
          },
        },
      },
    },
  ],
};
export const getUserProfile = {
  summary: 'Get authenticated user profile',
  requiresAuth: true,
  responsesArr: [
    {
      status: 200,
      description: 'Successfully fetched user profile',
      schema: {
        type: 'object',
        properties: {
          name: { type: 'string', example: 'john_doe' },
          id: { type: 'number', example: 9 },
          username: { type: 'string', example: 'john_doe' },
          email: { type: 'string', example: 'john@example.com' },
          category: {
            type: 'object',
            nullable: true,
            example: {
              id: 1,
              title: 'Engineering',
            },
          },
          role: { type: 'string', example: 'user' },
          subscription: {
            type: 'object',
            nullable: true,
            example: {
              plan: 'enterprise',
              status: 'subscribed',
              expiresAt: '2025-07-05T08:14:19.537Z',
            },
          },
          isVerified: { type: 'boolean', example: true },
          verificationDocumentUrl: {
            type: 'string',
            example: '/uploads/verification-documents/file.jpg',
          },
          profilePictureUrl: {
            type: 'string',
            example: '/uploads/profile-images/profile.jpg',
          },
          country: { type: 'string', nullable: true, example: null },
          state: { type: 'string', nullable: true, example: null },
          education: { type: 'string', nullable: true, example: null },
          profession: { type: 'string', nullable: true, example: null },
          bio: { type: 'string', nullable: true, example: null },
          fname: { type: 'string', nullable: true, example: 'John' },
          lname: { type: 'string', nullable: true, example: 'Doe' },
          UserPackage: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: { type: 'number', example: 1 },
                package: {
                  type: 'object',
                  properties: {
                    id: { type: 'number', example: 3 },
                    title: { type: 'string', example: 'Enterprise' },
                    description: { type: 'string', example: 'Maximum control.' },
                    features: {
                      type: 'array',
                      items: { type: 'string' },
                      example: ['Unlimited reviews submission'],
                    },
                    viewFeedbackLimit: { type: 'number', example: 0 },
                    giveFeedbackLimit: { type: 'number', example: 0 },
                    price: { type: 'number', example: 99 },
                    durationDays: { type: 'number', example: 30 },
                  },
                },
                startedAt: {
                  type: 'string',
                  format: 'date-time',
                  example: '2025-06-05T03:14:22.880Z',
                },
                expiresAt: {
                  type: 'string',
                  format: 'date-time',
                  example: '2025-07-05T08:14:19.895Z',
                },
                viewedFeedbackIds: {
                  type: 'array',
                  items: { type: 'number' },
                  example: [],
                },
                givenFeedbackCount: { type: 'number', example: 0 },
              },
            },
          },
        },
      },
    },
    {
      status: 401,
      description: 'Unauthorized - Token missing or invalid',
      schema: {
        type: 'object',
        properties: {
          statusCode: { type: 'number', example: 401 },
          message: { type: 'string', example: 'User not found' },
        },
      },
    },
  ],
};
export const getUsersSwagger = {
  summary: "Get a paginated list of all users (role = user)",

  requiresAuth: true, // ✅ Route is protected with JWT

  parameters: [
    {
      name: "page",
      in: "query",
      required: false,
      schema: { type: "integer", example: 1 },
      description: "Page number for pagination",
    },
    {
      name: "pageSize",
      in: "query",
      required: false,
      schema: { type: "integer", example: 10 },
      description: "Number of users per page",
    },
    {
      name: "categoryId",
      in: "query",
      required: false,
      schema: { type: "integer", example: 2 },
      description: "Filter users by category ID",
    },
    {
      name: "username",
      in: "query",
      required: false,
      schema: { type: "string", example: "johndoe" },
      description: "Filter users by username",
    },
    {
      name: "status",
      in: "query",
      required: false,
      schema: { type: "boolean", example: true },
      description: "Filter users by verification status (true/false)",
    },
  ],

  responsesArr: [
    {
      status: 200,
      description: "Successfully fetched user list",
      schema: {
        type: "object",
        properties: {
          status: { type: "number", example: 200 },
          message: {
            type: "string",
            example: "All Feedbacks List.",
          },
          users: {
            type: "array",
            items: {
              type: "object",
              properties: {
                id: { type: "number", example: 1 },
                username: { type: "string", example: "johndoe" },
                email: { type: "string", example: "john@example.com" },
                isVerified: { type: "boolean", example: true },
                createdAt: { type: "string", format: "date-time" },
                category: {
                  type: "object",
                  nullable: true,
                  properties: {
                    id: { type: "number", example: 2 },
                    name: { type: "string", example: "Education" },
                  },
                },
                UserPackage: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      id: { type: "number", example: 1 },
                      startedAt: { type: "string", format: "date-time" },
                      expiresAt: { type: "string", format: "date-time" },
                      package: {
                        type: "object",
                        properties: {
                          title: { type: "string", example: "Enterprise" },
                          price: { type: "number", example: 99 },
                          durationDays: { type: "number", example: 30 },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          total: { type: "number", example: 25 },
          currentPage: { type: "number", example: 1 },
          pageSize: { type: "number", example: 10 },
        },
      },
    },
    {
      status: 500,
      description: "Internal server error",
      schema: {
        type: "object",
        properties: {
          status: { type: "number", example: 500 },
          message: {
            type: "string",
            example: "An error occurred while fetching users",
          },
        },
      },
    },
  ],
};
export const setUserRoleDoc = {
  summary: "Set a user's role (Admin only)",
  requiresAuth: true,
  body: {
    type: 'object',
    properties: {
      userId: {
        type: 'number',
        example: 12,
        description: 'The ID of the user whose role is to be updated',
      },
      userRole: {
        type: 'string',
        enum: ['admin', 'user', 'moderator'], // Adjust based on your actual enum
        example: 'moderator',
        description: 'The new role to assign to the user',
      },
    },
    required: ['userId', 'userRole'],
  },
  responsesArr: [
    {
      status: 200,
      description: 'User role updated successfully',
      schema: {
        type: 'object',
        properties: {
          status: { type: 'number', example: 200 },
          message: {
            type: 'string',
            example: 'User role is Updated as moderator',
          },
          user: {
            type: 'object',
            properties: {
              id: { type: 'number', example: 12 },
              email: { type: 'string', example: 'user@example.com' },
              role: { type: 'string', example: 'moderator' },
              // Add more fields if necessary
            },
          },
        },
      },
    },
    {
      status: 403,
      description: 'Forbidden - Not an admin',
      schema: {
        type: 'object',
        properties: {
          statusCode: { type: 'number', example: 403 },
          message: {
            type: 'string',
            example: 'You do not have permission to change a users role',
          },
          error: { type: 'string', example: 'Forbidden' },
        },
      },
    },
    {
      status: 404,
      description: 'User not found',
      schema: {
        type: 'object',
        properties: {
          statusCode: { type: 'number', example: 404 },
          message: { type: 'string', example: 'User not found' },
          error: { type: 'string', example: 'Not Found' },
        },
      },
    },
  ],
};
export const setUserCategory = {
  summary: 'Set category for a user',
  requiresAuth: true, // 🔐 Protected route — require Bearer token
  body: {
    type: 'object',
    properties: {
      categoryId: {
        type: 'number',
        example: 5,
        description: 'The ID of the category to assign to the user',
      },
    },
    required: ['categoryId'],
  },
  responsesArr: [
    {
      status: 200,
      description: 'User category updated successfully',
      schema: {
        type: 'object',
        properties: {
          status: { type: 'number', example: 200 },
          message: {
            type: 'string',
            example: 'User Category is Updated as Management',
          },
          user: {
            type: 'object',
            properties: {
              id: { type: 'number', example: 9 },
              username: { type: 'string', example: 'johndoe' },
              email: { type: 'string', example: 'johndoe@example.com' },
              category: {
                type: 'object',
                properties: {
                  id: { type: 'number', example: 5 },
                  name: { type: 'string', example: 'Management' },
                },
              },
              // Add more user fields if needed (excluding password)
            },
          },
        },
      },
    },
    {
      status: 404,
      description: 'User or category not found',
      schema: {
        type: 'object',
        properties: {
          status: { type: 'number', example: 404 },
          message: {
            type: 'string',
            example: 'User not found',
          },
        },
      },
    },
    {
      status: 400,
      description: 'Bad request - missing or invalid categoryId',
      schema: {
        type: 'object',
        properties: {
          status: { type: 'number', example: 400 },
          message: {
            type: 'string',
            example: 'Invalid category ID',
          },
        },
      },
    },
  ],
};
export const updateUserCategoryDoc = {
  summary: "Update a user's category",
  requiresAuth: true,
  body: {
    type: 'object',
    properties: {
      userId: {
        type: 'number',
        example: 9,
        description: 'ID of the user whose category needs to be updated',
      },
      categoryId: {
        type: 'number',
        example: 3,
        description: 'ID of the new category (subcategory)',
      },
    },
    required: ['userId', 'categoryId'],
  },
  responsesArr: [
    {
      status: 200,
      description: 'User category updated successfully',
      schema: {
        type: 'object',
        properties: {
          status: { type: 'number', example: 200 },
          message: {
            type: 'string',
            example: 'User Category is Updated as Education',
          },
          user: {
            type: 'object',
            properties: {
              id: { type: 'number', example: 9 },
              username: { type: 'string', example: 'john_doe' },
              email: { type: 'string', example: 'john@example.com' },
              category: {
                type: 'object',
                properties: {
                  id: { type: 'number', example: 3 },
                  name: { type: 'string', example: 'Education' },
                },
              },
              // ... add more user fields if needed
            },
          },
        },
      },
    },
    {
      status: 404,
      description: 'User or category not found',
      schema: {
        type: 'object',
        properties: {
          status: { type: 'number', example: 404 },
          message: {
            type: 'string',
            example: 'User not found',
          },
        },
      },
    },
    {
      status: 401,
      description: 'Unauthorized (token missing or invalid)',
      schema: {
        type: 'object',
        properties: {
          status: { type: 'number', example: 401 },
          message: { type: 'string', example: 'Unauthorized' },
        },
      },
    },
  ],
};
export const verifyUser = {
  summary: 'Approve or Reject a User\'s Verification Document',
  requiresAuth: true,
  body: {
    type: 'object',
    properties: {
      userId: {
        type: 'number',
        example: 9,
        description: 'ID of the user to verify or reject',
      },
      action: {
        type: 'string',
        enum: ['approve', 'reject'],
        example: 'approve',
        description: 'Verification action to perform',
      },
    },
    required: ['userId', 'action'],
  },
  responsesArr: [
    {
      status: 200,
      description: 'User status updated successfully',
      schema: {
        type: 'object',
        properties: {
          status: { type: 'number', example: 200 },
          message: { type: 'string', example: 'User Status Updated.' },
        },
      },
    },
    {
      status: 404,
      description: 'User not found',
      schema: {
        type: 'object',
        properties: {
          status: { type: 'number', example: 404 },
          message: { type: 'string', example: 'User not found' },
        },
      },
    },
    {
      status: 500,
      description: 'Internal Server Error',
      schema: {
        type: 'object',
        properties: {
          status: { type: 'number', example: 500 },
          message: { type: 'string', example: 'An unexpected error occurred.' },
        },
      },
    },
  ],
};
export const sendVerificationEmailSwagger = {
  summary: "Send user email verification token",
  body: {
    type: 'object',
    properties: {
      email: {
        type: 'string',
        example: 'user@example.com',
      },
    },
    required: ['email'],
  },
  responsesArr: [
    {
      status: 200,
      description: 'Verification Email Sent Successfully.',
      schema: {
        type: 'object',
        properties: {
          status: { type: 'number', example: 200 },
          message: { type: 'string', example: 'Verification Email Sent Successfully.' },
        },
      },
    },
    {
      status: 404,
      description: 'User not found',
      schema: {
        type: 'object',
        properties: {
          status: { type: 'number', example: 404 },
          message: { type: 'string', example: 'User not found' },
        },
      },
    },
    {
      status: 500,
      description: 'Internal Server Error',
      schema: {
        type: 'object',
        properties: {
          status: { type: 'number', example: 500 },
          message: {
            type: 'string',
            example: 'An internal error occurred while sending the verification email.',
          },
        },
      },
    },
  ],
};
export const verifyEmail = {
  summary: 'Verify user email via token (public route)',
  parameters: [
    {
      name: 'token',
      in: 'path',
      required: true,
      schema: { type: 'string' },
      description: 'Email verification token sent to user email',
    },
  ],
  responsesArr: [
    {
      status: 302,
      description: 'Redirect to welcome page on successful verification',
      schema: {
        type: 'string',
        example: 'Redirected to frontend welcome page',
      },
    },
    {
      status: 400,
      description: 'Verification failed',
      schema: {
        type: 'string',
        example: 'Verification failed. Please contact support.',
      },
    },
    {
      status: 404,
      description: 'User not found',
      schema: {
        type: 'object',
        properties: {
          status: { type: 'number', example: 404 },
          message: { type: 'string', example: 'User not found' },
        },
      },
    },
  ],
};
export const updateProfileSwagger = {
  summary: 'Update user profile (with optional profile image)',
  requiresAuth: true,
  consumes: ['multipart/form-data'],
  body: {
    type: 'object',
    properties: {
      file: {
        type: 'string',
        format: 'binary',
        description: 'Optional profile picture file (image)',
      },
      username: {
        type: 'string',
        example: 'new_username',
      },
      email: {
        type: 'string',
        example: 'user@example.com',
      },
      fname: {
        type: 'string',
        example: 'John',
      },
      lname: {
        type: 'string',
        example: 'Doe',
      },
      bio: {
        type: 'string',
        example: 'Software developer and tech enthusiast.',
      },
      country: {
        type: 'string',
        example: 'Pakistan',
      },
      state: {
        type: 'string',
        example: 'Punjab',
      },
    },
  },
  responsesArr: [
    {
      status: 200,
      description: 'Profile data is updated successfully.',
      schema: {
        type: 'object',
        properties: {
          status: { type: 'number', example: 200 },
          message: {
            type: 'string',
            example: 'Profile data is updated successfully.',
          },
        },
      },
    },
    {
      status: 400,
      description: 'Bad Request - Nothing to update',
      schema: {
        type: 'object',
        properties: {
          status: { type: 'number', example: 400 },
          message: {
            type: 'string',
            example: 'Nothing to update',
          },
        },
      },
    },
    {
      status: 404,
      description: 'User not found',
      schema: {
        type: 'object',
        properties: {
          status: { type: 'number', example: 404 },
          message: { type: 'string', example: 'User not found' },
        },
      },
    },
  ],
};
export const deleteUser = {
  summary: 'Delete a user by ID',
  requiresAuth: true, // 🔐 Protected route (requires bearer token)
  parameters: [
    {
      name: 'id',
      in: 'path',
      required: true,
      schema: {
        type: 'string',
        example: '1',
      },
      description: 'The ID of the user to delete',
    },
  ],
  responsesArr: [
    {
      status: 200,
      description: 'User deleted successfully',
      schema: {
        type: 'object',
        properties: {
          status: { type: 'number', example: 200 },
          message: {
            type: 'string',
            example: 'User has been deleted successfully.',
          },
        },
      },
    },
    {
      status: 404,
      description: 'User not found',
      schema: {
        type: 'object',
        properties: {
          status: { type: 'number', example: 404 },
          message: {
            type: 'string',
            example: 'User not found',
          },
        },
      },
    },
    {
      status: 401,
      description: 'Unauthorized - Missing or invalid token',
      schema: {
        type: 'object',
        properties: {
          status: { type: 'number', example: 401 },
          message: {
            type: 'string',
            example: 'Missing or invalid token',
          },
        },
      },
    },
    {
      status: 403,
      description: 'Forbidden - Insufficient role (e.g. not admin)',
      schema: {
        type: 'object',
        properties: {
          status: { type: 'number', example: 403 },
          message: {
            type: 'string',
            example: 'Access denied: Admins only',
          },
        },
      },
    },
  ],
};
export const createOrUpdateUserSchema = {
  summary: 'Create or Update a User',
  requiresAuth: true,
  body: {
    type: 'object',
    properties: {
      id: { type: 'number', example: 1, description: 'Required only for update' },
      fname: { type: 'string', example: 'John' },
      lname: { type: 'string', example: 'Doe' },
      username: { type: 'string', example: 'john_doe' },
      email: { type: 'string', example: 'john@example.com' },
      password: { type: 'string', example: 'securePass123' },
      country: { type: 'string', example: 'USA' },
      state: { type: 'string', example: 'California' },
      education: { type: 'string', example: 'Bachelors in CS' },
      profession: { type: 'string', example: 'Software Engineer' },
      bio: { type: 'string', example: 'Tech enthusiast and full-stack developer.' },
      role: {
        type: 'string',
        enum: ['user', 'admin', 'super_admin'],
        example: 'user',
      },
      status: {
        type: 'string',
        enum: ['active', 'inactive'],
        example: 'active',
      },
      categoryId: {
        type: 'string',
        example: '2',
      },
    },
    required: ['username', 'email', 'password', 'categoryId'],
  },
  responsesArr: [
    {
      status: 200,
      description: 'User Created or Updated Successfully',
      schema: {
        type: 'object',
        properties: {
          status: { type: 'number', example: 200 },
          message: {
            type: 'string',
            example: 'User Created Successfully',
          },
        },
      },
    },
    {
      status: 404,
      description: 'User not found when updating',
      schema: {
        type: 'object',
        properties: {
          statusCode: { type: 'number', example: 404 },
          message: { type: 'string', example: 'User with ID 1 not found' },
        },
      },
    },
    {
      status: 400,
      description: 'Validation error',
      schema: {
        type: 'object',
        properties: {
          statusCode: { type: 'number', example: 400 },
          message: { type: 'array', items: { type: 'string' }, example: ['email must be an email'] },
          error: { type: 'string', example: 'Bad Request' },
        },
      },
    },
    {
      status: 500,
      description: 'Internal Server Error',
      schema: {
        type: 'object',
        properties: {
          statusCode: { type: 'number', example: 500 },
          message: { type: 'string', example: 'Something went wrong' },
        },
      },
    },
  ],
};





