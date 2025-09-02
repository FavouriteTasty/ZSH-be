import type { $Enums, MedicalHistory } from "@prisma/client";

import {
    defaultDate,
    type MedicalHistory as TableMedicalHistory,
    type History,
} from "../types/table.js";

export type UnknownMedicalHistory = Omit<MedicalHistory, "id">;

export const medicalHistory2History = (
    tmh: TableMedicalHistory,
    profileId: string,
): UnknownMedicalHistory[] => {
    return [
        ...tmh.pastHistory.map((i) => ({
            description: i.description,
            date: i.date,
            type: "PAST_HISTORY" as const,
            userProfileId: profileId,
        })),
        ...tmh.surgeryHistory.map((i) => ({
            description: i.description,
            date: i.date,
            type: "SURGERY_HISTORY" as const,
            userProfileId: profileId,
        })),
        ...tmh.allergicHistory.map((i) => ({
            description: i.description,
            date: i.date,
            type: "ALLERGIC_HISTORY" as const,
            userProfileId: profileId,
        })),
        ...tmh.vaccinationHistory.map((i) => ({
            description: i.description,
            date: i.date,
            type: "VACCINATION_HISTORY" as const,
            userProfileId: profileId,
        })),
        ...tmh.importantDrugHistory.map((i) => ({
            description: i.description,
            date: i.date,
            type: "IMPORTANT_DRUG_HISTORY" as const,
            userProfileId: profileId,
        })),
        ...tmh.bloodTransfusionHistory.map((i) => ({
            description: i.description,
            date: i.date,
            type: "BLOOD_TRANSFUSION_HISTORY" as const,
            userProfileId: profileId,
        })),
        ...tmh.smokingHistory.map((i) => ({
            description: i.description,
            date: i.date,
            type: "SMOKING_HISTORY" as const,
            userProfileId: profileId,
        })),
        ...tmh.drinkingHistory.map((i) => ({
            description: i.description,
            date: i.date,
            type: "DRINKING_HISTORY" as const,
            userProfileId: profileId,
        })),
        ...tmh.menstrualHistory.map((i) => ({
            description: i.description,
            date: i.date,
            type: "MENSTRUAL_HISTORY" as const,
            userProfileId: profileId,
        })),
        ...tmh.maritalHistory.map((i) => ({
            description: i.description,
            date: i.date,
            type: "MARITAL_HISTORY" as const,
            userProfileId: profileId,
        })),
        ...tmh.familyHistory.map((i) => ({
            description: i.description,
            date: i.date,
            type: "FAMILY_HISTORY" as const,
            userProfileId: profileId,
        })),
    ];
};

export const filterHistory = (
    history: MedicalHistory[],
    key: $Enums.HistoryType,
): History[] => {
    const filtered = history.filter(
        (item) =>
            item.type === key &&
            item.date !== null &&
            item.description !== null,
    );
    return filtered.map((item) => ({
        date: item.date ?? defaultDate,
        description: item.description ?? "",
    }));
};

export const history2MedicalHistory = (
    history: MedicalHistory[],
): TableMedicalHistory => {
    return {
        pastHistory: filterHistory(history, "PAST_HISTORY"),
        surgeryHistory: filterHistory(history, "SURGERY_HISTORY"),
        allergicHistory: filterHistory(history, "ALLERGIC_HISTORY"),
        vaccinationHistory: filterHistory(history, "VACCINATION_HISTORY"),
        importantDrugHistory: filterHistory(history, "IMPORTANT_DRUG_HISTORY"),
        bloodTransfusionHistory: filterHistory(
            history,
            "BLOOD_TRANSFUSION_HISTORY",
        ),
        smokingHistory: filterHistory(history, "SMOKING_HISTORY"),
        drinkingHistory: filterHistory(history, "DRINKING_HISTORY"),
        menstrualHistory: filterHistory(history, "MENSTRUAL_HISTORY"),
        maritalHistory: filterHistory(history, "MARITAL_HISTORY"),
        familyHistory: filterHistory(history, "FAMILY_HISTORY"),
    };
};

export const history2String = (history: History) => {
    return `病史: ${history.description}, 时间: ${history.date}`;
};

export const medicalHistory2String = (history: TableMedicalHistory) => {
    return {
        pastHistory: history.pastHistory
            .map((i) => history2String(i))
            .join(" ; "),
        surgeryHistory: history.surgeryHistory
            .map((i) => history2String(i))
            .join(" ; "),
        allergicHistory: history.allergicHistory
            .map((i) => history2String(i))
            .join(" ; "),
        vaccinationHistory: history.vaccinationHistory
            .map((i) => history2String(i))
            .join(" ; "),
        importantDrugHistory: history.importantDrugHistory
            .map((i) => history2String(i))
            .join(" ; "),
        bloodTransfusionHistory: history.bloodTransfusionHistory
            .map((i) => history2String(i))
            .join(" ; "),
        smokingHistory: history.smokingHistory
            .map((i) => history2String(i))
            .join(" ; "),
        drinkingHistory: history.drinkingHistory
            .map((i) => history2String(i))
            .join(" ; "),
        menstrualHistory: history.menstrualHistory
            .map((i) => history2String(i))
            .join(" ; "),
        maritalHistory: history.maritalHistory
            .map((i) => history2String(i))
            .join(" ; "),
        familyHistory: history.familyHistory
            .map((i) => history2String(i))
            .join(" ; "),
    };
};
