import {
    HospitalizationKeys,
    PreoperativeExaminationForStentRemovalKeys,
    StentPlacementKeys,
    StentRemovalKeys,
    UserProfileKeys,
} from "../types/keys.js";
import type {
    Hospitalization,
    PreoperativeExaminationForStentRemoval,
    StentPlacement,
    StentRemoval,
    UserProfile,
} from "../types/table.js";

export const getOrderBy = (sortBy: string, sortOrder: "asc" | "desc") => {
    if (UserProfileKeys.includes(sortBy as keyof UserProfile)) {
        return { [sortBy]: sortOrder };
    }
    if (HospitalizationKeys.includes(sortBy as keyof Hospitalization)) {
        return { hospitalization: { [sortBy]: sortOrder } };
    }
    if (StentPlacementKeys.includes(sortBy as keyof StentPlacement)) {
        return { stentPlacement: { [sortBy]: sortOrder } };
    }
    if (
        PreoperativeExaminationForStentRemovalKeys.includes(
            sortBy as keyof PreoperativeExaminationForStentRemoval,
        )
    ) {
        return { preExamination: { [sortBy]: sortOrder } };
    }
    if (StentRemovalKeys.includes(sortBy as keyof StentRemoval)) {
        return { stentRemoval: { [sortBy]: sortOrder } };
    }
    return {};
};
