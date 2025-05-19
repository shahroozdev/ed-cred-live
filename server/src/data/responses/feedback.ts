export const createFeedbackForm= {
  summary: 'Create a Feedback Form',
  body: {
    type: 'object',
    properties: {
      categoryId: { type: 'number', example: 1 },
      subCategoryId: { type: 'number', example: 5 },
      title: { type: 'string', example: 'Teacher Feedback Form' },
      isDraft: { type: 'boolean', example: false },
      details: {
        type: 'object',
        properties: {
          salary: { type: 'boolean', example: true },
          schoolName: { type: 'boolean', example: true },
          schoolWebsite: { type: 'boolean', example: false },
          schoolCountry: { type: 'boolean', example: true },
          reportingPeriod: { type: 'boolean', example: false },
          pricipalName: { type: 'boolean', example: true },
          pricipalDivison: { type: 'boolean', example: false },
          directorName: { type: 'boolean', example: true },
        },
      },
      questions: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: { type: 'string', example: 'q1' },
            text: { type: 'string', example: 'How would you rate the teacher?' },
            type: {
              type: 'string',
              enum: ['rating', 'multiple_choice', 'true_false', 'open_ended'],
              example: 'rating',
            },
            options: {
              type: 'array',
              items: { type: 'string' },
              example: ['Excellent', 'Good', 'Average', 'Poor'],
            },
            correctAnswer: { type: 'string', example: 'Excellent' },
          },
        },
      },
    },
    required: ['categoryId', 'subCategoryId', 'title', 'isDraft', 'details', 'questions'],
  },
  responsesArr: [
    {
      status: 201,
      description: 'Feedback form successfully created',
      schema: {
        type: 'object',
        properties: {
          id: { type: 'number', example: 1 },
          title: { type: 'string', example: 'Teacher Feedback Form' },
          isDraft: { type: 'boolean', example: false },
          createdAt: {
            type: 'string',
            format: 'date-time',
            example: '2025-05-19T10:00:00.000Z',
          },
        },
      },
    },
    {
      status: 409,
      description: 'Conflict - Duplicate title or constraint violation',
      schema: {
        type: 'object',
        properties: {
          status: { type: 'number', example: 409 },
          message: {
            type: 'string',
            example: 'A unique constraint violation occurred on field: title.',
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