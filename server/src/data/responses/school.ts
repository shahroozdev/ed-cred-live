export const createSchoolSwagger = {
  summary: 'Create a new school',
  body: {
    type: 'object',
    properties: {
      title: { type: 'string', example: 'ABC International School' },
      country: { type: 'string', example: 'Pakistan' },
      division: { type: 'string', example: 'Punjab' },
      website: { type: 'string', example: 'https://abcschool.edu.pk' },
    },
    required: ['title'],
  },
  responsesArr: [
    {
      status: 201,
      description: 'School created successfully',
      schema: {
        type: 'object',
        properties: {
          id: { type: 'number' },
          title: { type: 'string' },
          country: { type: 'string' },
          division: { type: 'string' },
          website: { type: 'string' },
          createdAt: { type: 'string', format: 'date-time' },
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
          message: { type: 'string', example: 'Unexpected error occurred' },
        },
      },
    },
  ],
};
export const getAllSchoolsSwagger = {
  summary: 'Get all schools',
  responsesArr: [
    {
      status: 200,
      description: 'List of all schools',
      schema: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: { type: 'number' },
            title: { type: 'string' },
            country: { type: 'string' },
            division: { type: 'string' },
            website: { type: 'string' },
            createdAt: { type: 'string', format: 'date-time' },
          },
        },
      },
    },
  ],
};
export const getSingleSchoolSwagger = {
  summary: 'Get a single school by ID',
  responsesArr: [
    {
      status: 200,
      description: 'School found',
      schema: {
        type: 'object',
        properties: {
          id: { type: 'number' },
          title: { type: 'string' },
          country: { type: 'string' },
          division: { type: 'string' },
          website: { type: 'string' },
          createdAt: { type: 'string', format: 'date-time' },
        },
      },
    },
    {
      status: 404,
      description: 'School not found',
      schema: {
        type: 'object',
        properties: {
          status: { type: 'number', example: 404 },
          message: { type: 'string', example: 'School with ID 1 not found' },
        },
      },
    },
  ],
};
export const updateSchoolSwagger = {
  summary: 'Update a school by ID',
  body: {
    type: 'object',
    properties: {
      title: { type: 'string' },
      country: { type: 'string' },
      division: { type: 'string' },
      website: { type: 'string' },
    },
  },
  responsesArr: [
    {
      status: 200,
      description: 'School updated successfully',
      schema: {
        type: 'object',
        properties: {
          id: { type: 'number' },
          title: { type: 'string' },
          country: { type: 'string' },
          division: { type: 'string' },
          website: { type: 'string' },
          createdAt: { type: 'string', format: 'date-time' },
        },
      },
    },
    {
      status: 404,
      description: 'School not found',
      schema: {
        type: 'object',
        properties: {
          status: { type: 'number' },
          message: { type: 'string' },
        },
      },
    },
  ],
};
export const deleteSchoolSwagger = {
  summary: 'Delete a school by ID',
  responsesArr: [
    {
      status: 200,
      description: 'School deleted successfully',
      schema: {
        type: 'object',
        properties: {
          message: { type: 'string', example: 'School deleted successfully' },
        },
      },
    },
    {
      status: 404,
      description: 'School not found',
      schema: {
        type: 'object',
        properties: {
          status: { type: 'number' },
          message: { type: 'string' },
        },
      },
    },
  ],
};
