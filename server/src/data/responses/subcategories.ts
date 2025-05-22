export const createSubcategory = {
  summary: 'Create a Subcategory',
  body: {
    type: 'object',
    properties: {
      name: { type: 'string', example: 'Physics' },
      status: {
        type: 'string',
        enum: ['active', 'draft'],
        example: 'active',
      },
      // Uncomment below when parentCategory is used
      // categoryId: { type: 'number', example: 1 }
    },
    required: ['name', 'status'],
  },
  responsesArr: [
    {
      status: 200,
      description: 'Subcategory created successfully',
      schema: {
        type: 'object',
        properties: {
          status: { type: 'number', example: 200 },
          message: { type: 'string', example: 'Subcategory created successfully' },
          subcategory: {
            type: 'object',
            properties: {
              id: { type: 'number', example: 5 },
              name: { type: 'string', example: 'Physics' },
              status: { type: 'string', enum: ['active', 'draft'], example: 'active' },
              createdAt: {
                type: 'string',
                format: 'date-time',
                example: '2025-05-19T12:00:00.000Z',
              },
              deletedAt: {
                type: 'string',
                format: 'date-time',
                nullable: true,
                example: null,
              },
            },
          },
        },
      },
    },
    {
      status: 409,
      description: 'Conflict - Subcategory name already exists',
      schema: {
        type: 'object',
        properties: {
          status: { type: 'number', example: 409 },
          message: {
            type: 'string',
            example: 'A unique constraint violation occurred on field: name.',
          },
        },
      },
    },
    {
      status: 400,
      description: 'Bad Request - Validation error or malformed input',
      schema: {
        type: 'object',
        properties: {
          status: { type: 'number', example: 400 },
          message: {
            type: 'string',
            example: 'Validation failed for input fields.',
          },
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
