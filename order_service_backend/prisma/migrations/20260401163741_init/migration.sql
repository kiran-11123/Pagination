-- CreateTable
CREATE TABLE "Orders" (
    "OrderId" SERIAL NOT NULL,
    "OrderName" TEXT NOT NULL,
    "Quantity" INTEGER NOT NULL,
    "Price" INTEGER NOT NULL,

    CONSTRAINT "Orders_pkey" PRIMARY KEY ("OrderId")
);
