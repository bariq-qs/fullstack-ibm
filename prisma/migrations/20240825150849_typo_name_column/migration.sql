/*
  Warnings:

  - You are about to drop the `produscts` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "produscts";

-- CreateTable
CREATE TABLE "products" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100),
    "description" TEXT,
    "price" DECIMAL(65,30),
    "image_url" VARCHAR(255),
    "latitude" DECIMAL(65,30),
    "longtitude" DECIMAL(65,30),

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);
