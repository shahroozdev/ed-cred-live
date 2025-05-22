export const  createCategory = {
  summary: 'Create a Category',
  body: {
    type: 'object',
    properties: {
      name: { type: 'string', example: 'Education' },
      status: {
        type: 'string',
        enum: ['active', 'draft'],
        example: 'active',
      },
      permissions: {
        type: 'array',
        items: { type: 'string', enum: ['post', 'feedback', 'review'] },
        example: ['post', 'feedback'],
      },
      requiresVerification: { type: 'boolean', example: true },
      iconUrl: { type: 'string', example: 'categoryIcons/education.png' },
    },
    required: ['name', 'requiresVerification'],
  },
  responsesArr: [
    {
      status: 201,
      description: 'Category successfully created',
      schema: {
        type: 'object',
        properties: {
          id: { type: 'number', example: 1 },
          name: { type: 'string', example: 'Education' },
          status: { type: 'string', example: 'active' },
          createdAt: {
            type: 'string',
            format: 'date-time',
            example: '2025-05-10T10:00:00.000Z',
          },
          permissions: {
            type: 'array',
            items: { type: 'string' },
            example: ['post', 'feedback'],
          },
          requiresVerification: { type: 'boolean', example: true },
          iconUrl: {
            type: 'string',
            example: 'categoryIcons/education.png',
          },
        },
      },
    },
    {
      status: 409,
      description: 'Conflict - Category name already exists',
      schema: {
        type: 'object',
        properties: {
          status: { type: 'number', example: 409 },
          message: {
            type: 'string',
            example:
              'A unique constraint violation occurred on field: name.',
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
            example:
              'An internal server error occurred. Please try again later.',
          },
        },
      },
    },
  ],
}

