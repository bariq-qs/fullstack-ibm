-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(50) NOT NULL,
    "password_hash" VARCHAR(100) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "produscts" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100),
    "description" TEXT,
    "price" DECIMAL(65,30),
    "image_url" VARCHAR(255),
    "latitude" DECIMAL(65,30),
    "longtitude" DECIMAL(65,30),

    CONSTRAINT "produscts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_username_key" ON "user"("username");
