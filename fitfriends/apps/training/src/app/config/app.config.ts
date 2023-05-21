import { registerAs } from '@nestjs/config';

export const appConfig = registerAs('app', () => {
  console.log(process.env.DATABASE_URL);
  return ({

  host: process.env.APP_HOST,
  port: process.env.APP_PORT,
  database_url: process.env.DATABASE_URL,

})
});


