const { Employee } = require('../models/employee'); // Adjust the path based on your project structure

const employeeResolver = {
  Query: {
    getAllEmployees: async () => {
      try {
        const employees = await Employee.find();
        return employees;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    getEmployeeById: async (_, { _id }) => {
      try {
        const employee = await Employee.findById(_id);
        return employee;
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },
  Mutation: {
    addEmployee: async (_, { input }) => {
      try {
        const newEmployee = new Employee(input);
        await newEmployee.save();
        return newEmployee;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    updateEmployeeById: async (_, { _id, input }) => {
      try {
        const updatedEmployee = await Employee.findByIdAndUpdate(_id, input, { new: true });
        return updatedEmployee;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    deleteEmployeeById: async (_, { _id }) => {
      try {
        await Employee.findByIdAndDelete(_id);
        return 'Employee deleted successfully';
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },
};

module.exports = employeeResolver;
