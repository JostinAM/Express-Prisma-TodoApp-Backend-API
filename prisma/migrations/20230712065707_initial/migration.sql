-- CreateTable
CREATE TABLE "Todo" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "state" TEXT NOT NULL DEFAULT 'Not Started',
    "description" TEXT,
    "priority" TEXT NOT NULL DEFAULT 'Low'
);
