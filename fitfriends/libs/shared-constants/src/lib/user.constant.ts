export const CurrentUserField = {
  Id: 'id',
  Email: 'email',
  Role: 'role',
} as const;

export const JPG_PNG_REG_EXP = /^.+(?:.jpg)|.+(?:.png)$/;

export const JPG_PNG_MAX_SIZE = 1000000;

export const CERTIFICATE_URL_REG_EXP = /^.+(?:.pdf)$/;

export const DEFAULT_AVATAR_FILE_NAME = 'default-avatar.jpg';
