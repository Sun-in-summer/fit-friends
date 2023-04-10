import {plainToInstance, ClassConstructor} from 'class-transformer';
import { CommandEvent } from '@fitfriends/shared-types';

export function fillObject<T, V>(someDto: ClassConstructor<T>, plainObject: V) {
  return plainToInstance(someDto, plainObject, {excludeExtraneousValues: true});
}

export function getMongoConnectionString({username, password, host, port, databaseName, authDatabase}): string {
  console.log(`mongodb://${username}:${password}@${host}:${port}/${databaseName}?authSource=${authDatabase}`);
  return `mongodb://${username}:${password}@${host}:${port}/${databaseName}?authSource=${authDatabase}`;
}

export function transformToMin(value: unknown, borderMin: number, borderMax: number) {
  const min = +value;
  if (!min || (min < borderMin) || (min > borderMax)) {
    return borderMin;
  }

  return min;
}

export function transformToMax(value: unknown, borderMin: number, borderMax: number) {
  const max = +value;
  if (!max || (max < borderMin) || (max > borderMax)) {
    return borderMax;
  }

  return max;
}


export function createEvent(commandEvent: CommandEvent) {
  return { cmd: commandEvent}
}
