import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Package } from './entities/package.entity';
import { CreatePackageDto } from './dto/create-package.dto';
import { UpdatePackageDto } from './dto/update-package.dto';
import { UserPackage } from './entities/user.packages.entity';
import { User } from '../auth/user.entity';
import { CreateUserPackageDto } from './dto/create-user-package.dto';

@Injectable()
export class PackagesService {
  constructor(
    @InjectRepository(UserPackage)
    private readonly userPackageRepository: Repository<UserPackage>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Package)
    private readonly packageRepository: Repository<Package>,
  ) {}

  // Package CRUD
  async createPackage(dto: CreatePackageDto): Promise<Package> {
    const pkg = this.packageRepository.create(dto);
    return this.packageRepository.save(pkg);
  }

  async findAllPackages(): Promise<Package[]> {
    return this.packageRepository.find();
  }

  async findOnePackage(id: number): Promise<Package> {
    const pkg = await this.packageRepository.findOneBy({ id });
    if (!pkg) throw new NotFoundException(`Package with ID ${id} not found`);
    return pkg;
  }

  async updatePackage(id: number, dto: UpdatePackageDto): Promise<Package> {
    const pkg = await this.packageRepository.findOneBy({ id });
    if (!pkg) throw new NotFoundException(`Package with ID ${id} not found`);

    Object.assign(pkg, dto);
    return this.packageRepository.save(pkg);
  }

  async removePackage(id: number): Promise<void> {
    const pkg = await this.packageRepository.findOneBy({ id });
    if (!pkg) throw new NotFoundException(`Package with ID ${id} not found`);

    await this.packageRepository.remove(pkg);
  }

  // UserPackage CRUD
  async createUserPackage(dto: CreateUserPackageDto): Promise<UserPackage> {
    const user = await this.userRepository.findOneBy({ id: dto.userId });
    if (!user) throw new NotFoundException(`User with ID ${dto.userId} not found`);

    const pkg = await this.packageRepository.findOneBy({ id: dto.packageId });
    if (!pkg) throw new NotFoundException(`Package with ID ${dto.packageId} not found`);

    const expiresAt = new Date(dto.expiresAt);
    if (expiresAt <= new Date()) {
      throw new BadRequestException('expiresAt must be a future date');
    }

    const userPackage = this.userPackageRepository.create({
      user,
      package: pkg,
      expiresAt,
      viewedFeedbackIds: [],
      givenFeedbackCount: 0,
    });

    return this.userPackageRepository.save(userPackage);
  }

  async findAllUserPackage(): Promise<UserPackage[]> {
    return this.userPackageRepository.find({ relations: ['user', 'package'] });
  }

  async findOneUserPackage(id: number): Promise<UserPackage> {
    const userPackage = await this.userPackageRepository.findOne({
      where: { id },
      relations: ['user', 'package'],
    });
    if (!userPackage) {
      throw new NotFoundException(`UserPackage with ID ${id} not found`);
    }
    return userPackage;
  }

  async updateUserPackage(
    id: number,
    dto: Partial<CreateUserPackageDto>,
  ): Promise<UserPackage> {
    const userPackage = await this.userPackageRepository.findOneBy({ id });
    if (!userPackage) throw new NotFoundException(`UserPackage with ID ${id} not found`);

    if (dto.userId) {
      const user = await this.userRepository.findOneBy({ id: dto.userId });
      if (!user) throw new NotFoundException(`User with ID ${dto.userId} not found`);
      userPackage.user = user;
    }

    if (dto.packageId) {
      const pkg = await this.packageRepository.findOneBy({ id: dto.packageId });
      if (!pkg) throw new NotFoundException(`Package with ID ${dto.packageId} not found`);
      userPackage.package = pkg;
    }

    if (dto.expiresAt) {
      const expiresAt = new Date(dto.expiresAt);
      if (expiresAt <= new Date()) {
        throw new BadRequestException('expiresAt must be a future date');
      }
      userPackage.expiresAt = expiresAt;
    }

    return this.userPackageRepository.save(userPackage);
  }

  async removeUserPackage(id: number): Promise<void> {
    const userPackage = await this.userPackageRepository.findOneBy({ id });
    if (!userPackage) throw new NotFoundException(`UserPackage with ID ${id} not found`);
    await this.userPackageRepository.remove(userPackage);
  }
}
