-- DropForeignKey
ALTER TABLE "VehicleModel" DROP CONSTRAINT "VehicleModel_brand_id_fkey";

-- DropForeignKey
ALTER TABLE "VehicleModelYear" DROP CONSTRAINT "VehicleModelYear_model_id_fkey";

-- AddForeignKey
ALTER TABLE "VehicleModel" ADD CONSTRAINT "VehicleModel_brand_id_fkey" FOREIGN KEY ("brand_id") REFERENCES "Brand"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VehicleModelYear" ADD CONSTRAINT "VehicleModelYear_model_id_fkey" FOREIGN KEY ("model_id") REFERENCES "VehicleModel"("id") ON DELETE CASCADE ON UPDATE CASCADE;
