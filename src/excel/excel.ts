import { type UserProfile } from "@prisma/client";
import ExcelJS from "exceljs";

import { FollowupKeys } from "./keys.js";
import {
    columns,
    followupColumn,
    toHospitalizationWithPrefix,
    toPreoperativeExaminationForStentRemovalWithPrefix,
    toStentRemovalWithPrefix,
    toWithDynamicPrefix,
} from "./type.js";
import {
    history2MedicalHistory,
    medicalHistory2String,
} from "../history/utils.js";
import { prisma } from "../prisma/index.js";

export async function aggregation(profiles: UserProfile[], periods: string[]) {
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

            const followups = await prisma.followup.findMany({
                where: { userProfileId: profile.id, period: { in: periods } },
            });
            const followupsWithPrefix = followups.flatMap((followup) =>
                toWithDynamicPrefix(
                    followup,
                    FollowupKeys,
                    `followup_${followup.period ?? "default"}`,
                ),
            );
            const followupsWithPrefixObject = followupsWithPrefix.reduce(
                (acc, cur) => Object.assign(acc as object, cur),
                {},
            ) as object;

            return {
                ...followupsWithPrefixObject,
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

export async function ExportExcel(periods: string[]) {
    const profiles = await prisma.userProfile.findMany();
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("AllData");
    sheet.columns = [...columns, ...periods.flatMap(followupColumn)];

    const pages = await aggregation(profiles, periods);

    for (const row of pages) {
        sheet.addRow(row).commit();
    }

    const buffer = await workbook.xlsx.writeBuffer();
    return buffer;
}
