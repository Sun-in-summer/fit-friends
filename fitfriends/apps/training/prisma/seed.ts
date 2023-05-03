import { PrismaClient } from '@prisma/client';
import {createGyms} from './mocks/create-gyms';
import { createReviews } from './mocks/create-reviews';


const prisma = new PrismaClient();




const reviews = Array.from({length: 5}, createReviews);
const gyms  = Array.from ({length: 5}, createGyms);

async function fillDb() {

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
