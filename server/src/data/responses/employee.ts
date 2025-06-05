export const createEmployeeSwagger = {
  summary: 'Create a new employee under a branch',
  body: {
    type: 'object',
    properties: {
      name: { type: 'string', example: 'Ali Raza' },
      branchId: { type: 'number', example: 1 },
      categoryId: { type: 'number', example: 3 },
    },
    required: ['name', 'branchId', 'categoryId'],
  },
  responsesArr: [
    {
      status: 201,
      description: 'Employee created successfully',
      schema: {
        type: 'object',
        properties: {
          id: { type: 'number' },
          name: { type: 'string' },
          branch: {
            type: 'object',
            properties: {
              id: { type: 'number' },
              name: { type: 'string' },
              school: { type: 'object' },
            },
          },
          category: {
            type: 'object',
            properties: {
              id: { type: 'number' },
              name: { type: 'string' },
            },
          },
        },
      },
    },
    {
      status: 404,
      description: 'Branch or Category not found',
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
export const getAllEmployeesSwagger = {
  summary: 'Get all employees',
  responsesArr: [
    {
      status: 200,
      description: 'List of employees',
      schema: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: { type: 'number' },
            name: { type: 'string' },
            branch: {
              type: 'object',
              properties: {
                id: { type: 'number' },
                name: { type: 'string' },
                school: { type: 'object' },
              },
            },
            category: {
              type: 'object',
              properties: {
                id: { type: 'number' },
                name: { type: 'string' },
              },
            },
          },
        },
      },
    },
  ],
};
export const getSingleEmployeeSwagger = {
  summary: 'Get employee by ID',
  responsesArr: [
    {
      status: 200,
      description: 'Employee found',
      schema: {
        type: 'object',
        properties: {
          id: { type: 'number' },
          name: { type: 'string' },
          branch: {
            type: 'object',
            properties: {
              id: { type: 'number' },
              name: { type: 'string' },
              school: { type: 'object' },
            },
          },
          category: {
            type: 'object',
            properties: {
              id: { type: 'number' },
              name: { type: 'string' },
            },
          },
        },
      },
    },
    {
      status: 404,
      description: 'Employee not found',
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
export const updateEmployeeSwagger = {
  summary: 'Update an employee',
  body: {
    type: 'object',
    properties: {
      name: { type: 'string', example: 'Ahsan Ali' },
      branchId: { type: 'number', example: 2 },
      categoryId: { type: 'number', example: 4 },
    },
  },
  responsesArr: [
    {
      status: 200,
      description: 'Employee updated successfully',
      schema: {
        type: 'object',
        properties: {
          id: { type: 'number' },
          name: { type: 'string' },
          branch: {
            type: 'object',
            properties: {
              id: { type: 'number' },
              name: { type: 'string' },
              school: { type: 'object' },
            },
          },
          category: {
            type: 'object',
            properties: {
              id: { type: 'number' },
              name: { type: 'string' },
            },
          },
        },
      },
    },
    {
      status: 404,
      description: 'Employee, Branch, or Category not found',
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
export const deleteEmployeeSwagger = {
  summary: 'Delete an employee by ID',
  responsesArr: [
    {
      status: 200,
      description: 'Employee deleted successfully',
      schema: {
        type: 'object',
        properties: {
          message: { type: 'string', example: 'Employee deleted successfully' },
        },
      },
    },
    {
      status: 404,
      description: 'Employee not found',
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
