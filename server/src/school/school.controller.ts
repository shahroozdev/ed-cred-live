import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { SchoolService } from "./school.service";
import { CreateSchoolDto, UpdateSchoolDto } from "./dto/school.dto";
import { CreateEmployeeDto, UpdateEmployeeDto } from "./dto/employee.dto";
import { apiWrapper } from "src/decorators/globalErrorHandlerClass";
import { ApiCustomResponse } from "src/decorators/api-decorator";
import { CreateBranchDto, UpdateBranchDto } from "./dto/branch.dto";

@Controller("school")
export class SchoolController {
  constructor(private readonly schoolService: SchoolService) {}
  // ------- Branch Endpoints -------

  @Post("branch")
  @ApiCustomResponse("createBranchSwagger")
  async createBranch(@Body() createBranchDto: CreateBranchDto) {
    return await apiWrapper(() =>
      this.schoolService.createBranch(createBranchDto)
    );
  }

  @Get("branch")
  @ApiCustomResponse("getAllBranchesSwagger")
  async findAllBranches() {
    return await apiWrapper(() => this.schoolService.findAllBranches());
  }

  @Get("branch/:id")
  @ApiCustomResponse("getSingleBranchSwagger")
  async findOneBranch(@Param("id") id: string) {
    return await apiWrapper(() => this.schoolService.findOneBranch(+id));
  }

  @Patch("branch/:id")
  @ApiCustomResponse("updateBranchSwagger")
  async updateBranch(
    @Param("id") id: string,
    @Body() updateBranchDto: UpdateBranchDto
  ) {
    return await apiWrapper(() =>
      this.schoolService.updateBranch(+id, updateBranchDto)
    );
  }

  @Delete("branch/:id")
  @ApiCustomResponse("deleteBranchSwagger")
  async removeBranch(@Param("id") id: string) {
    return await apiWrapper(() => this.schoolService.removeBranch(+id));
  }
  // ------- School Endpoints -------

  @Post()
  @ApiCustomResponse("createSchoolSwagger")
  async createSchool(@Body() createSchoolDto: CreateSchoolDto) {
    return await apiWrapper(() => this.schoolService.create(createSchoolDto));
  }

  @Get()
  @ApiCustomResponse("getAllSchoolsSwagger")
  async findAllSchools() {
    return await apiWrapper(() => this.schoolService.findAll());
  }

  @Get(":id")
  @ApiCustomResponse("getSingleSchoolSwagger")
  async findOneSchool(@Param("id") id: string) {
    return await apiWrapper(() => this.schoolService.findOne(+id));
  }

  @Patch(":id")
  @ApiCustomResponse("updateSchoolSwagger")
  async updateSchool(
    @Param("id") id: string,
    @Body() updateSchoolDto: UpdateSchoolDto
  ) {
    return await apiWrapper(() =>
      this.schoolService.update(+id, updateSchoolDto)
    );
  }

  @Delete(":id")
  @ApiCustomResponse("deleteSchoolSwagger")
  async removeSchool(@Param("id") id: string) {
    return await apiWrapper(() => this.schoolService.remove(+id));
  }

  // ------- Employee Endpoints -------

  @Post("employee")
  @ApiCustomResponse("createEmployeeSwagger")
  async createEmployee(@Body() createEmployeeDto: CreateEmployeeDto) {
    return await apiWrapper(() =>
      this.schoolService.createEmployee(createEmployeeDto)
    );
  }

  @Get("employee")
  @ApiCustomResponse("getAllEmployeesSwagger")
  async findAllEmployees() {
    return await apiWrapper(() => this.schoolService.findAllEmployee());
  }

  @Get("employee/:id")
  @ApiCustomResponse("getSingleEmployeeSwagger")
  async findOneEmployee(@Param("id") id: string) {
    return await apiWrapper(() => this.schoolService.findOneEmployee(+id));
  }

  @Patch("employee/:id")
  @ApiCustomResponse("updateEmployeeSwagger")
  async updateEmployee(
    @Param("id") id: string,
    @Body() updateEmployeeDto: UpdateEmployeeDto
  ) {
    return await apiWrapper(() =>
      this.schoolService.updateEmployee(+id, updateEmployeeDto)
    );
  }

  @Delete("employee/:id")
  @ApiCustomResponse("deleteEmployeeSwagger")
  async removeEmployee(@Param("id") id: string) {
    return await apiWrapper(() => this.schoolService.removeEmployye(+id));
  }
}
