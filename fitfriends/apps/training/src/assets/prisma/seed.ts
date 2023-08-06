import { PrismaClient } from '@prisma/client';
import {createGyms} from './mocks/create-gyms';
import { createReviews } from './mocks/create-reviews';
import { createFitTrainings } from './mocks/create-fit-trainings';
import { DEFAULT_MOCK_RECORDS_QTY } from './mocks/mock.constant';


const prisma = new PrismaClient();

const trainings = Array.from ({length: DEFAULT_MOCK_RECORDS_QTY}, createFitTrainings);
const reviews = Array.from({length: DEFAULT_MOCK_RECORDS_QTY}, createReviews);
const gyms  = Array.from ({length: DEFAULT_MOCK_RECORDS_QTY}, createGyms);


async function fillDb() {

  for (const item of trainings) {
    await prisma.training.upsert({
      where: { id: item.id },
      update: {},
      create: {
        ...item,

      }
    });
    console.log(item);
  }
  console.info('🤘️ Database of trainings was filled');

  for (const item of gyms) {
    await prisma.gym.upsert({
      where: { id: item.id },
      update: {},
      create: {
        ...item,

      }
    });
  }
  console.info('🤘️ Database of gyms was filled');

  for (const item of reviews) {
    await prisma.review.upsert({
      where: { id: item.id },
      update: {},
      create: {
        ...item,

      }
    });
  }
  console.info('🤘️ Database of reviews was filled');
}


fillDb()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (err) => {
    console.error(err);
    await prisma.$disconnect()

    process.exit(1);
  })
