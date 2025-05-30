import { Module } from '@nestjs/common';
import { PackagesService } from './packages.service';
import { PackagesController } from './packages.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../auth/user.entity';
import { UserPackage } from './entities/user.packages.entity';
import { Package } from './entities/package.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserPackage, Package])],
  controllers: [PackagesController],
  providers: [PackagesService],
})
export class PackagesModule {}
