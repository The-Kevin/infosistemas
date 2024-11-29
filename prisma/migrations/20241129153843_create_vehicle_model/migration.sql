-- CreateTable
CREATE TABLE "VehicleModel" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "brand_id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3)
);

-- CreateIndex
CREATE UNIQUE INDEX "VehicleModel_id_key" ON "VehicleModel"("id");

-- AddForeignKey
ALTER TABLE "VehicleModel" ADD CONSTRAINT "VehicleModel_brand_id_fkey" FOREIGN KEY ("brand_id") REFERENCES "Brand"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
