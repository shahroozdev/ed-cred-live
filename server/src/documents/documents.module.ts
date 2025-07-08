import { Module } from "@nestjs/common";
import { DocumentsService } from "./documents.service";
import { DocumentsController } from "./documents.controller";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Document } from "./entities/document.entity";
import { DocumentLog } from "./entities/document-log.entity";

@Module({
  imports: [ConfigModule.forRoot(), TypeOrmModule.forFeature([Document, DocumentLog])],
  controllers: [DocumentsController],
  providers: [DocumentsService],
})
export class DocumentsModule {}
