import { plainToInstance } from 'class-transformer';
import {  IsInt, IsNotEmpty, IsString,  Max,  Min,  validateSync } from 'class-validator';
import { EnvValidationMessage, Port } from './app.constant';


class EnvironmentsConfig {

  @IsString({
    message: EnvValidationMessage.RMQUserRequired
  })
  public RABBIT_USER: string;

  @IsString({
    message: EnvValidationMessage.RMQPasswordRequired
  })
  public RABBIT_PASSWORD: string;

  @IsString({
    message: EnvValidationMessage.RMQHostRequired
  })
  public RABBIT_HOST: string;

  @IsString({
    message: EnvValidationMessage.RMQSubscriberQueue
  })
  public RABBIT_TRAININGS_SERVICE_QUEUE: string;

  @IsString({
    message: EnvValidationMessage.RMQSubscriberQueue
  })
  public RABBIT_PERSONAL_TRAININGS_SERVICE_QUEUE: string;


  @IsString({ message: EnvValidationMessage.StringRequired })
  @IsNotEmpty({ message: EnvValidationMessage.Required })
  APP_HOST: string;

  @Max(Port.Max, { message: EnvValidationMessage.PortNotValid })
  @Min(Port.Min, { message: EnvValidationMessage.PortNotValid })
  @IsInt({ message: EnvValidationMessage.IntRequired })
  @IsNotEmpty({ message: EnvValidationMessage.Required })
  APP_PORT: number;

  @IsString({ message: EnvValidationMessage.StringRequired })
  @IsNotEmpty({ message: EnvValidationMessage.Required })
  @IsNotEmpty({ message: EnvValidationMessage.Required })
  DATABASE_URL: string;

  @IsString({ message: EnvValidationMessage.StringRequired })
  @IsNotEmpty({ message: EnvValidationMessage.Required })
  UPLOAD_FOLDER: string;

  @IsString({ message: EnvValidationMessage.StringRequired })
  @IsNotEmpty({ message: EnvValidationMessage.Required })
  STATIC_FOLDER: string;

}

export function validateEnvironments(config: Record<string, unknown>) {
  const environmentsConfig = plainToInstance(
    EnvironmentsConfig,
    config,
    { enableImplicitConversion: true  },
  );

  const errors = validateSync(
    environmentsConfig, {
      skipMissingProperties: false
    }
  );

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return environmentsConfig;
}
