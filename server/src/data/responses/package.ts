export const createPackage = {
  summary: 'Create a new subscription package',
  body: {
    type: 'object',
    properties: {
      title: {
        type: 'string',
        example: 'Pro Plan',
        description: 'Title of the package',
      },
      description: {
        type: 'string',
        example: 'Ideal for active reviewers and small teams.',
        description: 'Short description of the package',
      },
      features: {
        type: 'array',
        items: { type: 'string' },
        example: [
          'Submit up to 50 reviews',
          'View unlimited feedbacks',
          'Post and comment on discussions',
          'Dispute up to 20 reviews per month',
        ],
        description: 'List of features included in the package',
      },
      viewFeedbackLimit: {
        type: 'integer',
        example: 1000,
        description: 'Maximum number of feedbacks a user can view',
      },
      giveFeedbackLimit: {
        type: 'integer',
        example: 50,
        description: 'Maximum number of feedbacks a user can submit',
      },
      price: {
        type: 'integer',
        example: 29,
        description: 'Price of the package (optional)',
      },
      durationDays: {
        type: 'integer',
        example: 30,
        description: 'Duration of the package in days',
      },
    },
    required: ['title', 'description'],
  },
  responsesArr: [
    {
      status: 201,
      description: 'Package created successfully',
      schema: {
        type: 'object',
        properties: {
          id: { type: 'number', example: 1 },
          title: { type: 'string', example: 'Pro Plan' },
          description: {
            type: 'string',
            example: 'Ideal for active reviewers and small teams.',
          },
          features: {
            type: 'array',
            items: { type: 'string' },
            example: [
              'Submit up to 50 reviews',
              'View unlimited feedbacks',
              'Post and comment on discussions',
              'Dispute up to 20 reviews per month',
            ],
          },
          viewFeedbackLimit: { type: 'integer', example: 1000 },
          giveFeedbackLimit: { type: 'integer', example: 50 },
          price: { type: 'integer', example: 29 },
          durationDays: { type: 'integer', example: 30 },
        },
      },
    },
    {
      status: 400,
      description: 'Bad Request - Missing or invalid fields',
      schema: {
        type: 'object',
        properties: {
          status: { type: 'number', example: 400 },
          message: { type: 'string', example: 'Validation failed' },
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
              'An internal server error occurred while creating the package.',
          },
        },
      },
    },
  ],
};
