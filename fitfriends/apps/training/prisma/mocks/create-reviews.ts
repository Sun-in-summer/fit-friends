import { faker } from '@faker-js/faker';

export const  createReviews= () => {
  return {
    id: faker.datatype.number({ precision: 1 , max: 15, min: 1}),
    userId: faker.database.mongodbObjectId(),
    trainingId: faker.datatype.number({ precision: 1 , max: 15}),
    rating: faker.datatype.number({ precision: 1 , max: 5, min: 1}),
    text: faker.lorem.sentence(2),
  };
}
