-- CreateTable
CREATE TABLE "food_diary" (
    "id" SERIAL NOT NULL,
    "caloriesQty" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "meal" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "food_diary_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "training_diary" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "trainingId" INTEGER,
    "spentCalories" INTEGER NOT NULL DEFAULT 0,
    "spentTime" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "training_diary_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_balance" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "trainingId" INTEGER,
    "trainingAvaliable" INTEGER NOT NULL DEFAULT 0,
    "trainingSpent" INTEGER NOT NULL DEFAULT 0,
    "subscriptionId" INTEGER,
    "subscriptionAvaliable" INTEGER NOT NULL DEFAULT 0,
    "subscriptionSpent" INTEGER NOT NULL DEFAULT 0,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_balance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subscription" (
    "id" SERIAL NOT NULL,
    "trainingId" INTEGER NOT NULL,
    "trainingsQtyIncluded" INTEGER NOT NULL,

    CONSTRAINT "subscription_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "training_diary" ADD CONSTRAINT "training_diary_trainingId_fkey" FOREIGN KEY ("trainingId") REFERENCES "trainings"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_balance" ADD CONSTRAINT "user_balance_trainingId_fkey" FOREIGN KEY ("trainingId") REFERENCES "trainings"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_balance" ADD CONSTRAINT "user_balance_subscriptionId_fkey" FOREIGN KEY ("subscriptionId") REFERENCES "subscription"("id") ON DELETE SET NULL ON UPDATE CASCADE;
