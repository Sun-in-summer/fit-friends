import { BadRequestException, Injectable, PayloadTooLargeException, PipeTransform } from '@nestjs/common';


export type UserFiles = {
  avatar?: Express.Multer.File[];
  certificate?: Express.Multer.File[];
};

export const USER_CONSTRAINT = {
  AVATAR_TYPE: /(jpg|jpeg|png)$/,
  CERTIFICATE_TYPE: /(jpg|jpeg|png)$/,
  FILE_SIZE: 1_000_000,
} as const;

@Injectable()
export class UserFilesValidationPipe implements PipeTransform {
  transform(files: UserFiles) {
    if(files && files.avatar) {
      const [avatar] = files.avatar;
      if (avatar.size > USER_CONSTRAINT.FILE_SIZE) {
        throw new PayloadTooLargeException();
      }

      if (!avatar.mimetype.match(USER_CONSTRAINT.AVATAR_TYPE)||
          !avatar.originalname.match(USER_CONSTRAINT.AVATAR_TYPE)){
            throw new BadRequestException();
          }
    }

    if (files && files.certificate) {
      const [certificate] = files.certificate;

      if (!certificate.mimetype.match(USER_CONSTRAINT.CERTIFICATE_TYPE) ||
      !certificate.originalname.match(USER_CONSTRAINT.CERTIFICATE_TYPE)) {
        throw new BadRequestException();
      }
    }
    return files;
  }
}
