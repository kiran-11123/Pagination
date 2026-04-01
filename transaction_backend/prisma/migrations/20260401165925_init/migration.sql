-- CreateTable
CREATE TABLE "Transaction" (
    "email" TEXT NOT NULL,
    "Balance" DOUBLE PRECISION NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Transaction_email_key" ON "Transaction"("email");
