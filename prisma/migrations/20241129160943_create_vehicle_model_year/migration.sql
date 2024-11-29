-- CreateTable
CREATE TABLE "VehicleModelYear" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "model_id" UUID NOT NULL,
    "plate" TEXT NOT NULL,
    "renavam" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3)
);

-- CreateIndex
CREATE UNIQUE INDEX "VehicleModelYear_id_key" ON "VehicleModelYear"("id");

-- AddForeignKey
ALTER TABLE "VehicleModelYear" ADD CONSTRAINT "VehicleModelYear_model_id_fkey" FOREIGN KEY ("model_id") REFERENCES "VehicleModel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
