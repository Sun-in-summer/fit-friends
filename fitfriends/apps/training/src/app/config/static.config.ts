import { ConfigService, registerAs } from '@nestjs/config';
import { ServeStaticModuleAsyncOptions } from '@nestjs/serve-static';
import path from 'node:path';

export function getStaticConfig(): ServeStaticModuleAsyncOptions {
  return {
    useFactory: async (configService: ConfigService) => {
      const staticFolder = configService.get<string>('static.folder');
      const rootPath = path.resolve(staticFolder);

      return [
        {
          rootPath,
          serveStaticOptions: {
            index: false,
          },
        },
      ];
    },
    inject: [ConfigService],
  };
}


export const staticConfig = registerAs('static', () => ({
  folder: process.env.STATIC_FOLDER,
  upload: process.env.UPLOAD_FOLDER,
}));

