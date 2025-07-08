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
