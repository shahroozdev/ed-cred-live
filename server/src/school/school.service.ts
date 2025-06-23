import { Injectable, NotFoundException } from "@nestjs/common";
import { Employee } from "./entities/employee.entity";
import { CreateEmployeeDto, UpdateEmployeeDto } from "./dto/employee.dto";
import { CreateSchoolDto, UpdateSchoolDto } from "./dto/school.dto";
import { School } from "./entities/school.entity";
import { Branch } from "./entities/branch.entity";
import { Like, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateBranchDto, UpdateBranchDto } from "./dto/branch.dto";
import { Category } from "src/category/category.entity";
import { response } from "types";

@Injectable()
export class SchoolService {
  constructor(
    @InjectRepository(School)
    private readonly schoolRepository: Repository<School>,
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
    @InjectRepository(Branch)
    private readonly branchRepository: Repository<Branch>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>
  ) {}
  // ----------------- Branch Methods -----------------

  async createBranch(dto: CreateBranchDto): Promise<Branch> {
    const school = await this.schoolRepository.findOne({
      where: { id: dto.schoolId },
    });

    if (!school) {
      throw new NotFoundException(`School with ID ${dto.schoolId} not found`);
    }

    const branch = this.branchRepository.create({
      name: dto.name,
      school,
    });

    return await this.branchRepository.save(branch);
  }

  async findAllBranches(
    query?: Record<string, any>
  ): Promise<response & { branches?: Branch[] }> {
    const {page = 1, pageSize=10, school, categoryId, country, search} = query


    const where: any = {
      employees: {
        responses: {
          accepted: true,
        },
      },
    };
    if(school){
      where.name= Like(`%${school}%`)
    }
    if(categoryId){
      where.employee.category.id = categoryId;
    }
    if(country){
      where.country = country;
    }
    const [branches, total] = await this.branchRepository.findAndCount({
      where,
      relations: [
        "school",
        "employees",
        "employees.responses",
        "employees.branch",
        "employees.category",
      ],
      skip: (page - 1) * pageSize,
      take: pageSize,
      order: {
        createdAt: "DESC",
      },
    });
    return {
      status: 200,
      message: "All Branches List.",
      branches,
      total,
      currentPage: Number(page),
      pageSize,
    };
  }

  async findOneBranch(id: number): Promise<Branch> {
    const branch = await this.branchRepository.findOne({
      where: { id },
      relations: ["school", "employees"],
    });

    if (!branch) {
      throw new NotFoundException(`Branch with ID ${id} not found`);
    }

    return branch;
  }

  async updateBranch(id: number, dto: UpdateBranchDto): Promise<Branch> {
    const branch = await this.findOneBranch(id);

    if (dto.schoolId) {
      const school = await this.schoolRepository.findOne({
        where: { id: dto.schoolId },
      });

      if (!school) {
        throw new NotFoundException(`School with ID ${dto.schoolId} not found`);
      }

      branch.school = school;
    }

    Object.assign(branch, dto);
    return await this.branchRepository.save(branch);
  }

  async removeBranch(id: number): Promise<void> {
    const branch = await this.findOneBranch(id);
    await this.branchRepository.remove(branch);
  }
  // ----------------- School Methods -----------------
  async create(createSchoolDto: CreateSchoolDto): Promise<School> {
    const school = this.schoolRepository.create(createSchoolDto);
    return await this.schoolRepository.save(school);
  }

  async findAll(): Promise<School[]> {
    return await this.schoolRepository.find({
      relations: ["branches", "branches.employees"],
    });
  }

  async findOne(id: number): Promise<School> {
    const school = await this.schoolRepository.findOne({
      where: { id },
      relations: ["branches", "branches.employees"],
    });

    if (!school) throw new NotFoundException(`School with ID ${id} not found`);
    return school;
  }

  async update(id: number, dto: UpdateSchoolDto): Promise<School> {
    const school = await this.findOne(id);
    Object.assign(school, dto);
    return await this.schoolRepository.save(school);
  }

  async remove(id: number): Promise<void> {
    const school = await this.findOne(id);
    await this.schoolRepository.remove(school);
  }

  // ----------------- Employee Methods -----------------

  async createEmployee(dto: CreateEmployeeDto): Promise<Employee> {
    const branch = await this.branchRepository.findOne({
      where: { id: dto.branchId },
      relations: ["school"],
    });

    if (!branch) {
      throw new NotFoundException(`Branch with ID ${dto.branchId} not found`);
    }

    const category = await this.categoryRepository.findOne({
      where: { id: dto.categoryId },
    });

    if (!category) {
      throw new NotFoundException(
        `Category with ID ${dto.categoryId} not found`
      );
    }

    const employee = this.employeeRepository.create({
      name: dto.name,
      branch,
      category,
    });

    return await this.employeeRepository.save(employee);
  }

  async findAllEmployee(): Promise<Employee[]> {
    return await this.employeeRepository.find({
      relations: ["branch", "branch.school"],
    });
  }

  async findOneEmployee(id: number): Promise<Employee> {
    const employee = await this.employeeRepository.findOne({
      where: { id },
      relations: ["branch", "branch.school"],
    });

    if (!employee) throw new NotFoundException(`Employee ID ${id} not found`);
    return employee;
  }

  async updateEmployee(id: number, dto: UpdateEmployeeDto): Promise<Employee> {
    const employee = await this.employeeRepository.findOne({
      where: { id },
      relations: ["branch", "category"],
    });

    if (!employee) throw new NotFoundException(`Employee ID ${id} not found`);

    if (dto.branchId) {
      const branch = await this.branchRepository.findOne({
        where: { id: dto.branchId },
      });
      if (!branch) {
        throw new NotFoundException(`Branch ID ${dto.branchId} not found`);
      }
      employee.branch = branch;
    }

    if (dto.categoryId) {
      const category = await this.categoryRepository.findOne({
        where: { id: dto.categoryId },
      });
      if (!category) {
        throw new NotFoundException(`Category ID ${dto.categoryId} not found`);
      }
      employee.category = category;
    }

    if (dto.name !== undefined) {
      employee.name = dto.name;
    }

    return await this.employeeRepository.save(employee);
  }

  async removeEmployye(id: number): Promise<void> {
    const employee = await this.findOneEmployee(id);
    await this.employeeRepository.remove(employee);
  }
}
