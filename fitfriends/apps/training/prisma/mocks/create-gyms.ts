import { faker } from '@faker-js/faker';
import { Gym,  } from '@fitfriends/shared-types';
import {GymLocationStations , DefaultGymPrice,DEFAULT_IMAGE_COUNT, GymFeaturesNames } from './mock.constant'





function makeArray<T>(length: number, generator: () => T): T[] {
  return Array.from({ length }, generator)
}

export const createGyms = (): Gym => {
  return {
    id: faker.datatype.number({ precision: 1 , max: 15, min: 1}),
    name: faker.commerce.productName(),
    location: faker.helpers.arrayElement(GymLocationStations),
    description: faker.lorem.sentences(2),
    isVerified: faker.datatype.boolean(),
    oneTrainingPrice: faker.datatype.number({
      min: DefaultGymPrice.Min,
      max: DefaultGymPrice.Max,
    }),
    features: faker.helpers.arrayElements(
      GymFeaturesNames,
      faker.datatype.number({ min: 1, max: GymFeaturesNames.length })
    ),
    photos: makeArray(DEFAULT_IMAGE_COUNT, faker.image.image)
  };
};


