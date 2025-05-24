import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import * as fs from 'fs';

/**
 * Custom decorator to handle single file uploads using Multer
 * @param fieldName The name of the field in the form-data
 * @param folder Optional subfolder name inside root 'uploads'
 */
export function UploadFile(fieldName: string, folder: string = '') {
  const uploadPath = join(process.cwd(), 'uploads', folder);

  if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
  }

  return applyDecorators(
    UseInterceptors(
      FileInterceptor(fieldName, {
        storage: diskStorage({
          destination: uploadPath,
          filename: (req, file, cb) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
            const ext = extname(file.originalname);
            cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
          },
        }),
        limits: { fileSize: 5 * 1024 * 1024 }, // Optional: 5MB
        // fileFilter: (req, file, cb) => {
        //   if (!file.mimetype.startsWith('image/')) {
        //     return cb(new Error('Only image files are allowed!'), false);
        //   }
        //   cb(null, true);
        // },
      }),
    ),
  );
}
