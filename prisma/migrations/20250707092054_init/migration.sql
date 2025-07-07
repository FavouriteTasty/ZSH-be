-- CreateEnum
CREATE TYPE "Sex" AS ENUM ('male', 'female');

-- CreateEnum
CREATE TYPE "history_types" AS ENUM ('PAST_HISTORY', 'SURGERY_HISTORY', 'ALLERGIC_HISTORY', 'VACCINATION_HISTORY', 'IMPORTANT_DRUG_HISTORY', 'BLOOD_TRANSFUSION_HISTORY', 'SMOKING_HISTORY', 'DRINKING_HISTORY', 'MENSTRUAL_HISTORY', 'MARITAL_HISTORY', 'FAMILY_HISTORY');

-- CreateTable
CREATE TABLE "UserProfile" (
    "id" INTEGER NOT NULL,
    "name" TEXT,
    "sex" "Sex",
    "ethnicity" TEXT,
    "age" INTEGER,
    "birth" TEXT,
    "country" TEXT,
    "job" TEXT,
    "maritalStatus" TEXT,
    "nativePlace" TEXT,
    "address" TEXT,
    "phone" TEXT,
    "contact" TEXT,
    "relation" TEXT,
    "contactPhone" TEXT,
    "avatar" TEXT,

    CONSTRAINT "UserProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "medical_histories" (
    "id" SERIAL NOT NULL,
    "userProfileId" INTEGER NOT NULL,
    "description" TEXT,
    "date" TEXT,
    "type" "history_types",

    CONSTRAINT "medical_histories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Hospitalization" (
    "id" SERIAL NOT NULL,
    "userProfileId" INTEGER NOT NULL,
    "admissionTime" TEXT,
    "bodyTemperature" DOUBLE PRECISION,
    "heartRate" INTEGER,
    "breathe" INTEGER,
    "bloodPressure" TEXT,
    "height" DOUBLE PRECISION,
    "weight" DOUBLE PRECISION,
    "bmi" DOUBLE PRECISION,
    "chestCircumference" DOUBLE PRECISION,
    "abdominalCircumference" DOUBLE PRECISION,
    "hips" DOUBLE PRECISION,
    "bigArm" DOUBLE PRECISION,
    "forearm" DOUBLE PRECISION,
    "redBloodCellCount" DOUBLE PRECISION,
    "leukocyteCount" DOUBLE PRECISION,
    "platelets" DOUBLE PRECISION,
    "hemoglobin" DOUBLE PRECISION,
    "alt" DOUBLE PRECISION,
    "ast" DOUBLE PRECISION,
    "tb" DOUBLE PRECISION,
    "cb" DOUBLE PRECISION,
    "totalProtein" DOUBLE PRECISION,
    "albumin" DOUBLE PRECISION,
    "globulin" DOUBLE PRECISION,
    "urea" DOUBLE PRECISION,
    "creatinine" DOUBLE PRECISION,
    "na" DOUBLE PRECISION,
    "k" DOUBLE PRECISION,
    "cl" DOUBLE PRECISION,
    "fastingBloodGlucose" DOUBLE PRECISION,
    "postprandialBloodSugar" DOUBLE PRECISION,
    "glycatedHemoglobin" DOUBLE PRECISION,
    "tsh" DOUBLE PRECISION,
    "tpo" DOUBLE PRECISION,
    "ft3" DOUBLE PRECISION,
    "ft4" DOUBLE PRECISION,
    "fsh" DOUBLE PRECISION,
    "lh" DOUBLE PRECISION,
    "e2" DOUBLE PRECISION,
    "p" DOUBLE PRECISION,
    "t" DOUBLE PRECISION,
    "insulin" DOUBLE PRECISION,
    "thymosin" DOUBLE PRECISION,
    "pyy" DOUBLE PRECISION,
    "glp1" DOUBLE PRECISION,
    "totalCholesterol" DOUBLE PRECISION,
    "hdl" DOUBLE PRECISION,
    "ldl" DOUBLE PRECISION,
    "triglycerides" DOUBLE PRECISION,
    "apoe" DOUBLE PRECISION,
    "apob" DOUBLE PRECISION,
    "lipoproteinAlpha" DOUBLE PRECISION,
    "water" DOUBLE PRECISION,
    "protein" DOUBLE PRECISION,
    "inorganicSalt" DOUBLE PRECISION,
    "bodyFat" DOUBLE PRECISION,
    "skeletalMuscle" DOUBLE PRECISION,
    "leanBodyMass" DOUBLE PRECISION,
    "actionAbility" DOUBLE PRECISION,
    "selfCare" DOUBLE PRECISION,
    "dailyActivity" DOUBLE PRECISION,
    "pain" DOUBLE PRECISION,
    "anxiety" DOUBLE PRECISION,
    "healthStatus" DOUBLE PRECISION,
    "eqVas" DOUBLE PRECISION,
    "patientFrontPhoto" TEXT,
    "patientSidePhoto" TEXT,

    CONSTRAINT "Hospitalization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StentPlacement" (
    "id" SERIAL NOT NULL,
    "userProfileId" INTEGER NOT NULL,
    "operationTime" TEXT,
    "stentManufacturers" TEXT,
    "dateOfSurgery" TEXT,
    "complication" TEXT,
    "surgeon" TEXT,
    "surgeryLocation" TEXT,
    "descriptionOfSurgery" TEXT,
    "intraoperativePictures" TEXT,
    "fastingDuration" INTEGER,
    "discomfortComplaint" TEXT,
    "dischargeTime" TEXT,

    CONSTRAINT "StentPlacement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PreoperativeExaminationForStentRemoval" (
    "id" SERIAL NOT NULL,
    "userProfileId" INTEGER NOT NULL,
    "admissionTime" TEXT,
    "bodyTemperature" DOUBLE PRECISION,
    "heartRate" INTEGER,
    "breathe" INTEGER,
    "bloodPressure" TEXT,
    "height" DOUBLE PRECISION,
    "weight" DOUBLE PRECISION,
    "bmi" DOUBLE PRECISION,
    "chestCircumference" DOUBLE PRECISION,
    "abdominalCircumference" DOUBLE PRECISION,
    "hips" DOUBLE PRECISION,
    "bigArm" DOUBLE PRECISION,
    "forearm" DOUBLE PRECISION,
    "redBloodCellCount" DOUBLE PRECISION,
    "leukocyteCount" DOUBLE PRECISION,
    "platelets" DOUBLE PRECISION,
    "hemoglobin" DOUBLE PRECISION,
    "alt" DOUBLE PRECISION,
    "ast" DOUBLE PRECISION,
    "tb" DOUBLE PRECISION,
    "cb" DOUBLE PRECISION,
    "totalProtein" DOUBLE PRECISION,
    "albumin" DOUBLE PRECISION,
    "globulin" DOUBLE PRECISION,
    "urea" DOUBLE PRECISION,
    "creatinine" DOUBLE PRECISION,
    "na" DOUBLE PRECISION,
    "k" DOUBLE PRECISION,
    "cl" DOUBLE PRECISION,
    "fastingBloodGlucose" DOUBLE PRECISION,
    "postprandialBloodSugar" DOUBLE PRECISION,
    "glycatedHemoglobin" DOUBLE PRECISION,
    "tsh" DOUBLE PRECISION,
    "tpo" DOUBLE PRECISION,
    "ft3" DOUBLE PRECISION,
    "ft4" DOUBLE PRECISION,
    "fsh" DOUBLE PRECISION,
    "lh" DOUBLE PRECISION,
    "e2" DOUBLE PRECISION,
    "p" DOUBLE PRECISION,
    "t" DOUBLE PRECISION,
    "insulin" DOUBLE PRECISION,
    "thymosin" DOUBLE PRECISION,
    "pyy" DOUBLE PRECISION,
    "glp1" DOUBLE PRECISION,
    "totalCholesterol" DOUBLE PRECISION,
    "hdl" DOUBLE PRECISION,
    "ldl" DOUBLE PRECISION,
    "triglycerides" DOUBLE PRECISION,
    "apoe" DOUBLE PRECISION,
    "apob" DOUBLE PRECISION,
    "lipoproteinAlpha" DOUBLE PRECISION,
    "water" DOUBLE PRECISION,
    "protein" DOUBLE PRECISION,
    "inorganicSalt" DOUBLE PRECISION,
    "bodyFat" DOUBLE PRECISION,
    "skeletalMuscle" DOUBLE PRECISION,
    "leanBodyMass" DOUBLE PRECISION,
    "actionAbility" DOUBLE PRECISION,
    "selfCare" DOUBLE PRECISION,
    "dailyActivity" DOUBLE PRECISION,
    "pain" DOUBLE PRECISION,
    "anxiety" DOUBLE PRECISION,
    "healthStatus" DOUBLE PRECISION,
    "eqVas" DOUBLE PRECISION,
    "patientFrontPhoto" TEXT,
    "patientSidePhoto" TEXT,
    "sweetsintake" TEXT,
    "emotionalEatingFrequency" INTEGER,
    "foodServings" INTEGER,
    "physicalActivityStatus" TEXT,
    "foodComposition" TEXT,

    CONSTRAINT "PreoperativeExaminationForStentRemoval_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StentRemoval" (
    "id" SERIAL NOT NULL,
    "userProfileId" INTEGER NOT NULL,
    "operationTime" TEXT,
    "dateOfSurgery" TEXT,
    "complication" TEXT,
    "surgeon" TEXT,
    "surgeryLocation" TEXT,
    "descriptionOfSurgery" TEXT,
    "intraoperativePictures" TEXT,
    "fastingDuration" INTEGER,
    "discomfortComplaint" TEXT,
    "dischargeTime" TEXT,

    CONSTRAINT "StentRemoval_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Followup" (
    "id" SERIAL NOT NULL,
    "userProfileId" INTEGER NOT NULL,
    "admissionTime" TEXT,
    "bodyTemperature" DOUBLE PRECISION,
    "heartRate" INTEGER,
    "breathe" INTEGER,
    "bloodPressure" TEXT,
    "height" DOUBLE PRECISION,
    "weight" DOUBLE PRECISION,
    "bmi" DOUBLE PRECISION,
    "chestCircumference" DOUBLE PRECISION,
    "abdominalCircumference" DOUBLE PRECISION,
    "hips" DOUBLE PRECISION,
    "bigArm" DOUBLE PRECISION,
    "forearm" DOUBLE PRECISION,
    "redBloodCellCount" DOUBLE PRECISION,
    "leukocyteCount" DOUBLE PRECISION,
    "platelets" DOUBLE PRECISION,
    "hemoglobin" DOUBLE PRECISION,
    "alt" DOUBLE PRECISION,
    "ast" DOUBLE PRECISION,
    "tb" DOUBLE PRECISION,
    "cb" DOUBLE PRECISION,
    "totalProtein" DOUBLE PRECISION,
    "albumin" DOUBLE PRECISION,
    "globulin" DOUBLE PRECISION,
    "urea" DOUBLE PRECISION,
    "creatinine" DOUBLE PRECISION,
    "na" DOUBLE PRECISION,
    "k" DOUBLE PRECISION,
    "cl" DOUBLE PRECISION,
    "fastingBloodGlucose" DOUBLE PRECISION,
    "postprandialBloodSugar" DOUBLE PRECISION,
    "glycatedHemoglobin" DOUBLE PRECISION,
    "tsh" DOUBLE PRECISION,
    "tpo" DOUBLE PRECISION,
    "ft3" DOUBLE PRECISION,
    "ft4" DOUBLE PRECISION,
    "fsh" DOUBLE PRECISION,
    "lh" DOUBLE PRECISION,
    "e2" DOUBLE PRECISION,
    "p" DOUBLE PRECISION,
    "t" DOUBLE PRECISION,
    "insulin" DOUBLE PRECISION,
    "thymosin" DOUBLE PRECISION,
    "pyy" DOUBLE PRECISION,
    "glp1" DOUBLE PRECISION,
    "totalCholesterol" DOUBLE PRECISION,
    "hdl" DOUBLE PRECISION,
    "ldl" DOUBLE PRECISION,
    "triglycerides" DOUBLE PRECISION,
    "apoe" DOUBLE PRECISION,
    "apob" DOUBLE PRECISION,
    "lipoproteinAlpha" DOUBLE PRECISION,
    "water" DOUBLE PRECISION,
    "protein" DOUBLE PRECISION,
    "inorganicSalt" DOUBLE PRECISION,
    "bodyFat" DOUBLE PRECISION,
    "skeletalMuscle" DOUBLE PRECISION,
    "leanBodyMass" DOUBLE PRECISION,
    "actionAbility" DOUBLE PRECISION,
    "selfCare" DOUBLE PRECISION,
    "dailyActivity" DOUBLE PRECISION,
    "pain" DOUBLE PRECISION,
    "anxiety" DOUBLE PRECISION,
    "healthStatus" DOUBLE PRECISION,
    "eqVas" DOUBLE PRECISION,
    "patientFrontPhoto" TEXT,
    "patientSidePhoto" TEXT,
    "improvementOfPreviousDiseases" TEXT,

    CONSTRAINT "Followup_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "medical_histories_userProfileId_key" ON "medical_histories"("userProfileId");

-- CreateIndex
CREATE UNIQUE INDEX "Hospitalization_userProfileId_key" ON "Hospitalization"("userProfileId");

-- CreateIndex
CREATE UNIQUE INDEX "StentPlacement_userProfileId_key" ON "StentPlacement"("userProfileId");

-- CreateIndex
CREATE UNIQUE INDEX "PreoperativeExaminationForStentRemoval_userProfileId_key" ON "PreoperativeExaminationForStentRemoval"("userProfileId");

-- CreateIndex
CREATE UNIQUE INDEX "StentRemoval_userProfileId_key" ON "StentRemoval"("userProfileId");

-- CreateIndex
CREATE UNIQUE INDEX "Followup_userProfileId_key" ON "Followup"("userProfileId");

-- AddForeignKey
ALTER TABLE "medical_histories" ADD CONSTRAINT "medical_histories_userProfileId_fkey" FOREIGN KEY ("userProfileId") REFERENCES "UserProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Hospitalization" ADD CONSTRAINT "Hospitalization_userProfileId_fkey" FOREIGN KEY ("userProfileId") REFERENCES "UserProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StentPlacement" ADD CONSTRAINT "StentPlacement_userProfileId_fkey" FOREIGN KEY ("userProfileId") REFERENCES "UserProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PreoperativeExaminationForStentRemoval" ADD CONSTRAINT "PreoperativeExaminationForStentRemoval_userProfileId_fkey" FOREIGN KEY ("userProfileId") REFERENCES "UserProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StentRemoval" ADD CONSTRAINT "StentRemoval_userProfileId_fkey" FOREIGN KEY ("userProfileId") REFERENCES "UserProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Followup" ADD CONSTRAINT "Followup_userProfileId_fkey" FOREIGN KEY ("userProfileId") REFERENCES "UserProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
