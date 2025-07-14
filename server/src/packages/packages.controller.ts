import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { PackagesService } from "./packages.service";
import { CreatePackageDto } from "./dto/create-package.dto";
import { UpdatePackageDto } from "./dto/update-package.dto";
import { CreateUserPackageDto } from "./dto/create-user-package.dto";
import { ApiCustomResponse } from "../decorators/api-decorator";
import { apiWrapper } from "../decorators/globalErrorHandlerClass";
import { Public } from "src/decorators/public.decorator";

@Controller("packages")
export class PackagesController {
  constructor(private readonly packagesService: PackagesService) {}

  // ────────────────────── PACKAGE ROUTES ──────────────────────

  @Post()
  @ApiCustomResponse("createPackage")
  async createPackage(@Body() createPackageDto: CreatePackageDto) {
    return await apiWrapper(() =>
      this.packagesService.createPackage(createPackageDto)
    );
  }
  @Public()
  @Get()
  async findAllPackages() {
    return await apiWrapper(() => this.packagesService.findAllPackages());
  }

  @Get(":id")
  @ApiCustomResponse("findOnePackage")
  async findOnePackage(@Param("id") id: string) {
    return await apiWrapper(() => this.packagesService.findOnePackage(+id));
  }

  @Patch(":id")
  async updatePackage(
    @Param("id") id: string,
    @Body() updatePackageDto: UpdatePackageDto
  ) {
    return await apiWrapper(() =>
      this.packagesService.updatePackage(+id, updatePackageDto)
    );
  }

  @Delete(":id")
  async removePackage(@Param("id") id: string) {
    return await apiWrapper(() => this.packagesService.removePackage(+id));
  }

  // ────────────────────── USER PACKAGE ROUTES ──────────────────────

  @Post("user")
  async createUserPackage(@Body() dto: CreateUserPackageDto) {
    return await apiWrapper(() => this.packagesService.createUserPackage(dto));
  }

  @Get("user")
  async findAllUserPackages() {
    return await apiWrapper(() => this.packagesService.findAllUserPackage());
  }

  @Get("user/:id")
  async findOneUserPackage(@Param("id") id: string) {
    return await apiWrapper(() => this.packagesService.findOneUserPackage(+id));
  }

  @Patch("user/:id")
  async updateUserPackage(
    @Param("id") id: string,
    @Body() updateDto: Partial<CreateUserPackageDto>
  ) {
    return await apiWrapper(() =>
      this.packagesService.updateUserPackage(+id, updateDto)
    );
  }

  @Delete("user/:id")
  async removeUserPackage(@Param("id") id: string) {
    return await apiWrapper(() => this.packagesService.removeUserPackage(+id));
  }
}
