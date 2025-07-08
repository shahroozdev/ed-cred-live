import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateDocumentDto } from "./dto/create-document.dto";
import { UpdateDocumentDto } from "./dto/update-document.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { DocumentLog } from "./entities/document-log.entity";
import { Document } from "./entities/document.entity";

@Injectable()
export class DocumentsService {
  constructor(
    @InjectRepository(Document)
    private documentRepository: Repository<Document>,

    @InjectRepository(DocumentLog)
    private documentLogRepository: Repository<DocumentLog>
  ) {}

  async create(createDocumentDto: CreateDocumentDto) {
    const document = this.documentRepository.create(createDocumentDto);
    const saved = await this.documentRepository.save(document);

    await this.logDocumentChange(saved, "Created");

    return saved;
  }

  async findAll(query?: Record<string, string>) {
    const where : any = {};
    if (query.type) {
      where.type = query?.type;
    }
    return await this.documentRepository.find({
      where,
    });
  }

  async findOne(id: string) {
    const doc = await this.documentRepository.findOne({ where: { id } });
    if (!doc) throw new NotFoundException(`Document #${id} not found`);
    return doc;
  }

  async update(id: string, updateDto: UpdateDocumentDto) {
    const doc = await this.documentRepository.findOne({ where: { id } });
    if (!doc) throw new NotFoundException(`Document #${id} not found`);

    const updated = this.documentRepository.merge(doc, updateDto);
    const result = await this.documentRepository.save(updated);

    await this.logDocumentChange(result, "Updated");

    return result;
  }

  async remove(id: string) {
    const doc = await this.documentRepository.findOne({ where: { id } });
    if (!doc) throw new NotFoundException(`Document #${id} not found`);

    await this.documentRepository.softDelete(id); // soft delete using DeleteDateColumn
    await this.logDocumentChange(doc, "Deleted");

    return { message: `Document #${id} deleted.` };
  }
  async findLogsByType(type: string) {
    return await this.documentLogRepository.find({
      where: { type },
      order: { createdAt: "DESC" },
    });
  }
  private async logDocumentChange(
    document: Document,
    action: "Created" | "Updated" | "Deleted"
  ) {
    const log = this.documentLogRepository.create({
      documentId: document.id,
      name: `[${action}] ${document.name}`,
      type: document.type,
      desc: document.desc,
    });
    await this.documentLogRepository.save(log);
  }
}
