export const createBranchSwagger = {
  summary: 'Create a new branch under a school',
  body: {
    type: 'object',
    properties: {
      name: { type: 'string', example: 'Main Campus' },
      schoolId: { type: 'number', example: 1 },
    },
    required: ['name', 'schoolId'],
  },
  responsesArr: [
    {
      status: 201,
      description: 'Branch created successfully',
      schema: {
        type: 'object',
        properties: {
          id: { type: 'number' },
          name: { type: 'string' },
          school: {
            type: 'object',
            properties: {
              id: { type: 'number' },
              title: { type: 'string' },
            },
          },
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
export const getAllBranchesSwagger = {
  summary: 'Get all branches',
  responsesArr: [
    {
      status: 200,
      description: 'List of all branches',
      schema: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: { type: 'number' },
            name: { type: 'string' },
            school: {
              type: 'object',
              properties: {
                id: { type: 'number' },
                title: { type: 'string' },
              },
            },
          },
        },
      },
    },
  ],
};
export const getSingleBranchSwagger = {
  summary: 'Get a branch by ID',
  responsesArr: [
    {
      status: 200,
      description: 'Branch found',
      schema: {
        type: 'object',
        properties: {
          id: { type: 'number' },
          name: { type: 'string' },
          school: {
            type: 'object',
            properties: {
              id: { type: 'number' },
              title: { type: 'string' },
            },
          },
        },
      },
    },
    {
      status: 404,
      description: 'Branch not found',
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
export const updateBranchSwagger = {
  summary: 'Update a branch',
  body: {
    type: 'object',
    properties: {
      name: { type: 'string', example: 'North Campus' },
      schoolId: { type: 'number', example: 2 },
    },
  },
  responsesArr: [
    {
      status: 200,
      description: 'Branch updated successfully',
      schema: {
        type: 'object',
        properties: {
          id: { type: 'number' },
          name: { type: 'string' },
          school: {
            type: 'object',
            properties: {
              id: { type: 'number' },
              title: { type: 'string' },
            },
          },
        },
      },
    },
    {
      status: 404,
      description: 'Branch or School not found',
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
export const deleteBranchSwagger = {
  summary: 'Delete a branch by ID',
  responsesArr: [
    {
      status: 200,
      description: 'Branch deleted successfully',
      schema: {
        type: 'object',
        properties: {
          message: { type: 'string', example: 'Branch deleted successfully' },
        },
      },
    },
    {
      status: 404,
      description: 'Branch not found',
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
