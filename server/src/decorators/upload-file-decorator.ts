// import { applyDecorators, UseInterceptors } from '@nestjs/common';
// import { FileInterceptor } from '@nestjs/platform-express';
// import { diskStorage } from 'multer';
// import { extname, join } from 'path';
// import * as fs from 'fs';

// /**
//  * Custom decorator to handle single file uploads using Multer
//  * @param fieldName The name of the field in the form-data
//  * @param folder Optional subfolder name inside root 'uploads'
//  */
// export function UploadFile(fieldName: string, folder: string = '') {
//   const uploadPath = join(process.cwd(), 'uploads', folder);

//   if (!fs.existsSync(uploadPath)) {
//     fs.mkdirSync(uploadPath, { recursive: true });
//   }

//   return applyDecorators(
//     UseInterceptors(
//       FileInterceptor(fieldName, {
//         storage: diskStorage({
//           destination: uploadPath,
//           filename: (req, file, cb) => {
//             const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
//             const ext = extname(file.originalname);
//             cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
//           },
//         }),
//         limits: { fileSize: 5 * 1024 * 1024 }, // Optional: 5MB
//         fileFilter: (req, file, cb) => {
//           if (!file.mimetype.startsWith('image/')) {
//             return cb(new Error('Only image files are allowed!'), false);
//           }
//           cb(null, true);
//         },
//       }),
//     ),
//   );
// }

import {
  applyDecorators,
  BadRequestException,
  UseInterceptors,
  InternalServerErrorException,
} from "@nestjs/common";
import { FileInterceptor, FilesInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname, join } from "path";
import { mkdir } from "fs/promises";
import type { FileFilterCallback, Multer } from "multer";

interface UploadFileOptions {
  folder?: string;
  multiple?: boolean;
  maxSizeInMB?: number;
  maxCount?: number;
  type?: ("image" | "video" | "doc" | "audio" | "all")[];
}

const mimeTypeMap = {
  image: ["image/jpeg", "image/png", "image/gif", "image/webp"],
  video: ["video/mp4", "video/quicktime", "video/x-msvideo"],
  doc: [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "text/csv",
  ],
  audio: [
    "audio/mpeg",
    "audio/ogg",
    "audio/wav",
  ],
  all: [
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/webp",
    "video/mp4",
    "video/quicktime",
    "video/x-msvideo",
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "text/csv",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    "audio/mpeg",
    "audio/ogg",
    "audio/wav",
  ],
};

export function UploadFile(fieldName: string, options: UploadFileOptions = {}) {
  const {
    folder = "",
    multiple = false,
    maxSizeInMB = 5,
    maxCount = 10,
    type = ["image"],
  } = options;

  const uploadPath = join(process.cwd(), "uploads", folder);

  const storage = diskStorage({
    destination: async (req, file, cb) => {
      try {
        await mkdir(uploadPath, { recursive: true });
        cb(null, uploadPath);
      } catch (err) {
        cb(new InternalServerErrorException("Upload directory creation failed"),"");
      }
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      const ext = extname(file.originalname);
      cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
    },
  });

    const fileFilter = (
    req: Express.Request,
    file: Express.Multer.File,
    cb: FileFilterCallback
  ) => {
    const allowedTypes = type.flatMap((t) => mimeTypeMap[t] || []);
    
    // 1. Check MIME type
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(
        new BadRequestException(
          `Unsupported file type: ${file.mimetype}. Allowed types: ${type.join(", ")}`
        )
      );
    }

    // 2. Check file extension (security measure)
    const validExtensions = [".jpg", ".jpeg", ".png", ".gif", ".mp4", ".pdf", ".doc", ".docx", ".xls", ".xlsx", ".csv"];
    const ext = extname(file.originalname).toLowerCase();
    if (!validExtensions.includes(ext)) {
      return cb(
        new BadRequestException(`Invalid file extension: ${ext}`)
      );
    }

    cb(null, true);
  };

  const limits = {
    fileSize: maxSizeInMB * 1024 * 1024,
    files: multiple ? maxCount : 1,
  };

  const Interceptor = multiple
    ? FilesInterceptor(fieldName, maxCount, { storage, fileFilter, limits })
    : FileInterceptor(fieldName, { storage, fileFilter, limits });

  return applyDecorators(UseInterceptors(Interceptor));
}
