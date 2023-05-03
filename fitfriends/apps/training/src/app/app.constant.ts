export const ENV_FILE_PATH = 'environments/.training.env';

export enum EnvValidationMessage {
  RMQHostRequired = 'RabbitMQ host is required',
  RMQUserRequired = 'RabbitMQ user is required',
  RMQPasswordRequired = 'RabbitMQ password is required',
  RMQSubscriberQueue = 'RabbitMQ Subscribers Queue is required',
  Required = 'required',
  StringRequired = 'must be string',
  IntRequired ='must be integer',
  PortNotValid=  'port must be between 0 and 65535',
}

export enum Port {
  Min = 0,
  Max = 65535

}
