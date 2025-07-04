import { Injectable, NotFoundException } from "@nestjs/common";
import { Employee } from "./entities/employee.entity";
import { CreateEmployeeDto, UpdateEmployeeDto } from "./dto/employee.dto";
import { CreateSchoolDto, UpdateSchoolDto } from "./dto/school.dto";
import { School } from "./entities/school.entity";
import { Branch } from "./entities/branch.entity";
import { Brackets, ILike, Like, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateBranchDto, UpdateBranchDto } from "./dto/branch.dto";
import { Category } from "../category/category.entity";
import { response } from "../types";
import { Dispute } from "../dispute/entities/dispute.entity";


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
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(Dispute)
    private readonly disputeRepository: Repository<Dispute>
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

  // async findAllBranches(
  //   query?: Record<string, any>
  // ): Promise<response & { branches?: Branch[] }> {
  //   const {
  //     page = 1,
  //     pageSize = 10,
  //     school,
  //     categoryId,
  //     country,
  //     ratting,
  //     search,
  //   } = query;
  //   // console.log(school, categoryId, country, ratting, search, 'filters');
  //   const where: any = {
  //     employees: {
  //       responses: {
  //         accepted: true,
  //       },
  //     },
  //   };
  //   if (school) {
  //     where.name = ILike(`%${school}%`);
  //   }
  //   if (categoryId) {
  //     where.employees = {
  //       ...(where.employees || {}),
  //       category: { id: Number(categoryId) },
  //     };
  //   }
  //   if (country) {
  //     where.country = country;
  //   }

  //   if (ratting) {
  //     where.employees = {
  //       ...(where.employees || {}),
  //       responses: {
  //         ...(where.employees?.responses || {}),
  //         avgRatting: Number(ratting),
  //       },
  //     };
  //   }

  //   // Flexible search across multiple fields
  //   if (search) {
  //     where.OR = [
  //       { country: ILike(`%${search}%`) },
  //       { name: ILike(`%${search}%`) },
  //       { employees: { name: ILike(`%${search}%`) } },
  //       { employees: { category: { name: ILike(`%${search}%`) } } },
  //       { employees: { responses: { form: { name: ILike(`%${search}%`) } } } },
  //     ];
  //   }
  //   const [branches, total] = await this.branchRepository.findAndCount({
  //     where,
  //     relations: [
  //       "school",
  //       "employees",
  //       "employees.responses",
  //       "employees.branch",
  //       "employees.category",
  //     ],
  //     skip: (page - 1) * pageSize,
  //     take: pageSize,
  //     order: {
  //       createdAt: "DESC",
  //     },
  //   });

  //   return {
  //     status: 200,
  //     message: "All Branches List.",
  //     branches,
  //     total,
  //     currentPage: Number(page),
  //     pageSize,
  //   };
  // }
async findAllBranches(
  query?: Record<string, any>
): Promise<response & { branches?: Branch[] }> {
  const {
    page = 1,
    pageSize = 10,
    school,
    categoryId,
    country,
    ratting,
    search,
  } = query;

  const qb = this.branchRepository
    .createQueryBuilder("branch")
    .leftJoinAndSelect("branch.school", "school")
    .leftJoinAndSelect("branch.employees", "employee")
    .leftJoinAndSelect("employee.responses", "response")
    .leftJoinAndSelect("response.feedbackForm", "feedbackForm")
    .leftJoinAndSelect("employee.category", "category")
    .leftJoinAndSelect("employee.branch", "empBranch");

  // 🔍 Base filter: accepted responses only
  qb.where("response.accepted = :accepted", { accepted: true });

  // 🏫 School name filter
  if (school) {
    qb.andWhere("branch.name ILIKE :school", { school: `%${school}%` });
  }

  // 📂 Category filter
  if (categoryId) {
    qb.andWhere("category.id = :categoryId", { categoryId: Number(categoryId) });
  }

  // 🌍 Country filter
  if (country) {
    qb.andWhere("branch.country = :country", { country });
  }

  // ⭐ Rating filter
  if (ratting) {
    qb.andWhere("response.avgRatting = :ratting", { ratting: Number(ratting) });
  }

  // 🔎 Search (OR across multiple fields)
  if (search) {
    qb.andWhere(
      new Brackets((qb) => {
        qb.where("branch.country ILIKE :search", { search: `%${search}%` })
          .orWhere("branch.name ILIKE :search", { search: `%${search}%` })
          .orWhere("employee.name ILIKE :search", { search: `%${search}%` })
          .orWhere("category.name ILIKE :search", { search: `%${search}%` })
          .orWhere("feedbackForm.title ILIKE :search", { search: `%${search}%` }); // If form is a relation, you'll need another join
      })
    );
  }

  // 📦 Pagination
  const [branches, total] = await qb
    .skip((page - 1) * pageSize)
    .take(pageSize)
    .orderBy("branch.createdAt", "DESC")
    .getManyAndCount();

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

  async findOneEmployee(id: number, query?:Record<string, any>): Promise<Employee> {
    const {userId} = query;
    const employee = await this.employeeRepository.findOne({
      where: { id },
      relations: [
        "branch",
        "branch.school",
        "responses",
        "category",
        "responses.feedbackForm",
        "responses.author",
        "responses.feedbackForm.questions",
      ],
    });
    const disputes = userId  && !isNaN(Number(userId))?await this.disputeRepository
    .createQueryBuilder("dispute")
    .leftJoin("dispute.feedbackResponse", "feedbackResponse")
    .leftJoin("dispute.disputedBy", "user")
    .where("user.id = :userId", { userId: Number(userId) })
    .select(["dispute.id", "feedbackResponse.id"])
    .getMany()
    :null
    const disputesResponsesIds=disputes?.flatMap((item)=>(item?.feedbackResponse?.id));
    if (!employee) throw new NotFoundException(`Employee ID ${id} not found`);
    (employee.responses as any[]).forEach(element => {
      if (disputesResponsesIds?.includes(element?.id)) {
        element.is_disputed = true;
      } else {
        element.is_disputed = false;
      }
      element.is_owned =element.author.id === Number(userId)
      delete element.author;
    });
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
