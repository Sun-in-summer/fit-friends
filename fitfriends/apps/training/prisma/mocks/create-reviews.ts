import { faker } from '@faker-js/faker';
import { Rating } from './mock.constant';

export const  createReviews= () => {
  return {
    id: faker.datatype.number({ precision: 1 , max: 10, min: 1}),
    userId: faker.database.mongodbObjectId(),
    trainingId: faker.datatype.number({ precision: 1 , max: 15}),
    rating: faker.datatype.number({ precision: 1 , max: Rating.Max, min: Rating.Min}),
    text: faker.lorem.sentence(2),
  };
}
