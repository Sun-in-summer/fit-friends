import { faker } from '@faker-js/faker';
import { Training } from '@prisma/client';
import { DefaultCaloriesQty, DefaultTrainingPrice, Rating, TrainingForGenderNames, TrainingLevelNames, TrainingTimeNames, TrainingTypeNames } from './mock.constant';


export const createFitTrainings = (): Training => {
  return {
    id: faker.datatype.number({ precision: 1 , max: 10, min: 1}),
    title: faker.commerce.productName(),
    backgroundImage: faker.image.image(),
    trainingLevel: faker.helpers.arrayElement(TrainingLevelNames),
    trainingType: faker.helpers.arrayElement(TrainingTypeNames),
    trainingTime: faker.helpers.arrayElement(TrainingTimeNames),
    price: faker.datatype.number({
       min: DefaultTrainingPrice.Min,
       max: DefaultTrainingPrice.Max,
    }),
     calories: faker.datatype.number({
      min: DefaultCaloriesQty.Min,
      max: DefaultCaloriesQty.Max,
    }),
    description: faker.lorem.sentences(2),
    trainingForGender: faker.helpers.arrayElement(TrainingForGenderNames),
    isSpecialOffer: faker.datatype.boolean(),
    video: '',
    rating: faker.datatype.number({ precision: 1 , max: Rating.Max, min: Rating.Min}),
    coachId: faker.database.mongodbObjectId(),
    createdAt: faker.date.recent()
  };
};
