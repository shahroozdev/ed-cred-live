export const uploadVerificationDocument = {
  summary: 'Upload a user verification document',
  body: {
    type: 'object',
    properties: {
      file: {
        type: 'string',
        format: 'binary',
      },
    },
    required: ['file'],
  },
  responsesArr: [
    {
      status: 201,
      description: 'Verification document uploaded successfully',
      schema: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            example:
              'Your docuemnt has been uploaded. You will be notified when it will be approved',
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
      status: 400,
      description: 'Bad Request - Missing file or invalid input',
      schema: {
        type: 'object',
        properties: {
          status: { type: 'number', example: 400 },
          message: {
            type: 'string',
            example: 'No file provided or input is malformed.',
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
};
