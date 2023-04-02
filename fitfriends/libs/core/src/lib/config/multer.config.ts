import { registerAs } from '@nestjs/config';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import  {diskStorage} from 'multer';
import { extname } from 'path';


function generateFilename(file) {
  return `${Date.now()}${extname(file.originalname)}`;
}

export const fileUploadOptions = registerAs('multer', () => ({
  uploadDirectory: process.env.UPLOAD_DIRECTORY
}));

export function getFileInterceptorOptions(): MulterOptions {
  return {
    storage: diskStorage({
      destination: "./uploads",
      filename: (req, file, callback) => {
          callback(null, generateFilename(file));

       }
    }),
  }
}


