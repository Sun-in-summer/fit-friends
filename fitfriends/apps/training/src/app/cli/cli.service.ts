// import { faker } from '@faker-js/faker';
import { FitTrainingService } from '../fit-training/fit-training.service';
import { OrderService } from '../order/order.service';
import { ConfigService } from '@nestjs/config';
import { GymService } from '../gym/gym.service';
import { FoodDiaryService } from '../food-diary/food-diary.service';
import { TrainingDiaryService } from '../training-diary/training-diary.service';
import { UserRole } from '@fitfriends/shared-types';
import { PrismaService } from '../prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CliService {
  constructor(

    // private readonly prisma: PrismaService,
    // private readonly fitTrainingService: FitTrainingService,
    // private readonly orderService: OrderService,
    // private readonly config: ConfigService,
    // private readonly gymService: GymService,
    // private readonly foodDiaryService: FoodDiaryService,
    // private readonly trainingDiaryService: TrainingDiaryService
  ) {}

  async execution() {
  //   await this.generateSportGyms();
  //   await this.generateUsers();
  //   await this.generateFriends([...customers, ...trainers]);
  //   await this.generatePersonalTrainings([...customers, ...trainers]);
  //   await this.generateWorkouts(trainers);
  //   const workouts = await this.prisma.workout.findMany();
  //   const sportGyms = await this.prisma.sportGym.findMany();
  //   await this.generateReviews(customers, workouts);
  //   await this.generateWorkoutOrders(workouts, customers);
  //   await this.generateSportGymOrders(sportGyms, customers);
  //   await this.generateWorkoutDiary(customers);
  //   await this.generateFoodDiary(customers);
  // }

  // async generateSportGyms() {
  //   await Promise.all(
  //     Array.from(
  //       { length: MOCKS_DEFAULT.GENERATE.SPORT_GYM_COUNT },
  //       async () => {
  //         await this.sportGymService.create(createSportGym());
  //       }
  //     )
  //   ).then(() => {
  //     console.log('Sport Gyms were generated');
  //   });
  // }

  // async generateUsers() {
  //   await Promise.all(
  //     Array.from({ length: MOCKS_DEFAULT.GENERATE.USER_COUNT }, async () => {
  //       const customer = createCustomer();
  //       const user = await this.authService.register(customer);
  //       await this.profileService.update(user.id, customer);
  //       await this.prisma.profile.update({
  //         where: { userId: user.id },
  //         data: {
  //           avatar: 'http://localhost:3333/test-content/test-img/photo-1.png',
  //         },
  //       });
  //     })
  //   ).then(() => {
  //     console.log('Customers were generated');
  //   });

  //   await Promise.all(
  //     Array.from({ length: MOCKS_DEFAULT.GENERATE.USER_COUNT }, async () => {
  //       const trainer = createTrainer();
  //       const user = await this.authService.register(trainer);
  //       await this.profileService.update(user.id, trainer);
  //       await this.prisma.profile.update({
  //         where: { userId: user.id },
  //         data: {
  //           avatar:
  //             'http://localhost:3333/test-content/test-img/photo-1-coach.png',
  //           certificates: [
  //             'http://localhost:3333/test-content/test-img/certificate-1.jpg',
  //             'http://localhost:3333/test-content/test-img/certificate-2.jpg',
  //             'http://localhost:3333/test-content/test-img/certificate-3.jpg',
  //             'http://localhost:3333/test-content/test-img/certificate-4.jpg',
  //           ],
  //         },
  //       });
  //     })
  //   ).then(() => {
  //     console.log('Trainers were generated');
  //   });
  // }

  // async generateFriends(users: User[]) {
  //   await Promise.all(
  //     Array.from(
  //       { length: MOCKS_DEFAULT.GENERATE.FRIENDS_ROUNDS },
  //       async () => {
  //         const [user, ...rest] = faker.helpers.shuffle(users);
  //         const friends = faker.helpers.arrayElements(
  //           rest,
  //           MOCKS_DEFAULT.GENERATE.FRIENDS_COUNT
  //         );
  //         for (const friend of friends) {
  //           await this.profileService.addFriend(user.id, friend.id);
  //         }
  //       }
  //     )
  //   ).then(() => {
  //     console.log('Friends were assigned');
  //   });
  // }

  // async generateWorkouts(trainers: User[]) {
  //   await Promise.all(
  //     Array.from(trainers, async (trainer) => {
  //       const workoutsCount = faker.datatype.number({
  //         min: MOCKS_DEFAULT.GENERATE.WORKOUTS_COUNT.MIN,
  //         max: MOCKS_DEFAULT.GENERATE.WORKOUTS_COUNT.MAX,
  //       });
  //       for (let i = 0; i < workoutsCount; i++) {
  //         await this.workoutService.create(createWorkout(), trainer.id);
  //       }
  //     })
  //   ).then(() => {
  //     console.log('Workouts were generated');
  //   });
  // }

  // async generateWorkoutOrders(workouts: Workout[], customers: User[]) {
  //   await Promise.all(
  //     Array.from(workouts, async (workout) => {
  //       const ordersCount = faker.datatype.number({
  //         min: MOCKS_DEFAULT.GENERATE.ORDERS_COUNT.MIN,
  //         max: MOCKS_DEFAULT.GENERATE.ORDERS_COUNT.MAX,
  //       });
  //       for (let i = 0; i < ordersCount; i++) {
  //         const user = faker.helpers.arrayElement(customers);
  //         await this.orderService.create(createWorkoutOrder(workout), user.id);
  //       }
  //     })
  //   ).then(() => {
  //     console.log('Workout orders were generated');
  //   });
  // }

  // async generateSportGymOrders(sportGyms: SportGym[], customers: User[]) {
  //   await Promise.all(
  //     Array.from(sportGyms, async (gym) => {
  //       const user = faker.helpers.arrayElement(customers);
  //       await this.orderService.create(createSportGymOrder(gym), user.id);
  //     })
  //   ).then(() => {
  //     console.log('Sport Gym orders were generated');
  //   });
  // }

  // async generatePersonalTrainings(users: User[]) {
  //   await Promise.all(
  //     Array.from(
  //       { length: MOCKS_DEFAULT.GENERATE.PERSONAL_TRAINING_ROUNDS },
  //       async () => {
  //         const [user, ...rest] = faker.helpers.shuffle(users);
  //         const conductors = faker.helpers.arrayElements(
  //           rest,
  //           MOCKS_DEFAULT.GENERATE.PERSONAL_TRAINING_COUNT
  //         );
  //         for (const conductor of conductors) {
  //           await this.personalTrainingService.create(
  //             { conductorId: conductor.id },
  //             user.id
  //           );
  //         }
  //       }
  //     )
  //   ).then(() => {
  //     console.log('Personal Trainings were assigned');
  //   });
  // }

  // async generateReviews(customers: User[], workouts: Workout[]) {
  //   await Promise.all(
  //     workouts.map(async (workout) => {
  //       const users = faker.helpers.arrayElements(
  //         customers,
  //         faker.datatype.number({
  //           min: 0,
  //           max: MOCKS_DEFAULT.GENERATE.REVIEW_COUNT,
  //         })
  //       );

  //       for (const user of users) {
  //         await this.reviewService.create(createReview(workout), user.id);
  //       }
  //     })
  //   ).then(() => {
  //     console.log('Reviews were generated');
  //   });
  // }

  // async generateFoodDiary(customers: User[]) {
  //   await Promise.all(
  //     customers.map((user) => {
  //       Array.from(
  //         { length: MOCKS_DEFAULT.GENERATE.FOOD_DIARY_COUNT },
  //         async () => {
  //           const foodDiaryRecord = {
  //             userId: user.id,
  //             ...createFoodDiary(),
  //           };
  //           await this.prisma.foodDiary.upsert({
  //             where: {
  //               dateOfMeal_typeOfMeal_userId: {
  //                 dateOfMeal: foodDiaryRecord.dateOfMeal,
  //                 typeOfMeal: foodDiaryRecord.typeOfMeal,
  //                 userId: foodDiaryRecord.userId,
  //               },
  //             },
  //             create: {
  //               ...foodDiaryRecord,
  //             },
  //             update: {
  //               ...foodDiaryRecord,
  //             },
  //           });
  //         }
  //       );
  //     })
  //   ).then(() => {
  //     console.log('Food Diary records were generated');
  //   });
  // }

  // async generateWorkoutDiary(customers: User[]) {
  //   await Promise.all(
  //     customers.map(async (user) => {
  //       const workoutOrders = await this.prisma.order.findMany({
  //         where: {
  //           userId: user.id,
  //           orderType: OrderType.Workout,
  //         },
  //       });
  //       Array.from(
  //         { length: MOCKS_DEFAULT.GENERATE.WORKOUT_DIARY_COUNT },
  //         async () => {
  //           const order = faker.helpers.arrayElement(workoutOrders);
  //           await this.workoutDiaryService.create(
  //             user.id,
  //             createWorkoutDiary(order.workoutId)
  //           );
  //         }
  //       );
  //     })
  //   ).then(() => {
  //     console.log('Workout Diary records were generated');
  //   });
  }
}
