import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function fillDb() {
  await prisma.gym.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: 'Какое-то название1',
      location: "Пионерская",
      isVerified: true,
      features: 'бассейн',
      photos: '1.jpg',
      description: 'Просторный фитнес от 990₽/мес. Без очередей.',
      oneTrainingPrice: 150,
    }
  });
  await prisma.gym.upsert({
    where: { id: 2 },
    update: {},
    create: {
      name: 'Какое-то название2',
      location: "Удельная",
      isVerified: false,
      features: 'бесплатная парковка',
      photos: '2.jpg',
      description: 'Просторный2 фитнес от 990₽/мес. Без очередей.',
      oneTrainingPrice: 1150,
    }
  });
  await prisma.gym.upsert({
    where: { id: 3},
    update: {},
    create: {
      name: 'Какое-то название3',
      location: "Звёздная",
      isVerified: false,
      features: ['детская комната', 'массаж'],
      photos: '3.jpg',
      description: 'Просторный3 фитнес от 990₽/мес. Без очередей.',
      oneTrainingPrice: 2150,
    }
  });
    await prisma.gym.upsert({
    where: { id: 4},
    update: {},
    create: {
      name: 'Какое-то название4',
      location: "Спортивная",
      isVerified: false,
      features: 'массаж',
      photos: '4.jpg',
      description: 'Просторный4 фитнес от 990₽/мес. Без очередей.',
      oneTrainingPrice: 3150,
    }
  });
   await prisma.gym.upsert({
    where: { id: 5},
    update: {},
    create: {
      name: 'Какое-то название5',
      location: "Петроградская",
      isVerified: false,
      features: 'бассейн',
      photos: '5.jpg',
      description: 'Просторный5 фитнес от 990₽/мес. Без очередей.',
      oneTrainingPrice: 4150,
    }
  });
  console.info('🤘️ Database of gyms was filled')
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
