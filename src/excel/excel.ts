import { type UserProfile } from "@prisma/client";
import ExcelJS from "exceljs";

import {
    columns,
    toHospitalizationWithPrefix,
    toPreoperativeExaminationForStentRemovalWithPrefix,
    toStentRemovalWithPrefix,
} from "./type.js";
import {
    history2MedicalHistory,
    medicalHistory2String,
} from "../history/utils.js";
import { prisma } from "../prisma/index.js";

async function aggregation(profiles: UserProfile[]) {
    return await Promise.all(
        profiles.map(async (profile) => {
            const history = await prisma.medicalHistory.findMany({
                where: { userProfileId: profile.id },
            });
            const medicalHistory = history2MedicalHistory(history);
            const hospitalization = await prisma.hospitalization.findUnique({
                where: { userProfileId: profile.id },
            });
            const stentPlacement = await prisma.stentPlacement.findUnique({
                where: { userProfileId: profile.id },
            });
            const preoperativeExaminationForStentRemoval =
                await prisma.preoperativeExaminationForStentRemoval.findUnique({
                    where: { userProfileId: profile.id },
                });
            const stentRemoval = await prisma.stentRemoval.findUnique({
                where: { userProfileId: profile.id },
            });

            return {
                ...toStentRemovalWithPrefix(stentRemoval),
                ...toPreoperativeExaminationForStentRemovalWithPrefix(
                    preoperativeExaminationForStentRemoval,
                ),
                ...stentPlacement,
                ...toHospitalizationWithPrefix(hospitalization),
                ...medicalHistory2String(medicalHistory),
                ...profile,
            };
        }),
    );
}

export async function ExportExcel() {
    const profiles = await prisma.userProfile.findMany();
    const workbook = new ExcelJS.stream.xlsx.WorkbookWriter({
        filename: "all-data.xlsx",
    });
    const sheet = workbook.addWorksheet("AllData");
    sheet.columns = columns;
    const pages = await aggregation(profiles);
    console.log(pages);

    for (const row of pages) {
        sheet.addRow(row).commit();
    }
    await workbook.commit();
}
