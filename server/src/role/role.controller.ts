import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto, Permissions } from './dto/create-role.dto';

@Controller('role')
export class RoleController {
    constructor(private readonly roleService: RoleService) {}

    @Post()
    async create(@Body() createRoleDto: CreateRoleDto) {
        return this.roleService.create(createRoleDto);
    }

    @Get()
    async findAll() {
        return this.roleService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: number) {
        return this.roleService.findOne(id);
    }

    @Patch(':id')
    async update(@Param('id') id: number, @Body() updateRoleDto: Permissions) {
        return this.roleService.update(id, updateRoleDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: number) {
        return this.roleService.remove(id);
    }
}
