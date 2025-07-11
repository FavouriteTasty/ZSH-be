import type {
    FollowupExtra,
    Hospitalization5E5Q5LScale,
    HospitalizationBasic,
    HospitalizationBloodLipids,
    HospitalizationBloodRoutine,
    HospitalizationBodyComposition,
    HospitalizationElectrolyte,
    HospitalizationHormone,
    HospitalizationLiverFunction,
    HospitalizationOther,
    HospitalizationSugarMetabolism,
    MedicalHistory,
    PreoperativeExaminationForStentRemovalExtra,
    StentPlacement,
    StentRemoval,
    TableActions,
    UserProfile,
} from "./table.js";

export const UserProfileKeys: (keyof UserProfile)[] = [
    "id",
    "name",
    "sex",
    "ethnicity",
    "age",
    "birth",
    "country",
    "job",
    "maritalStatus",
    "nativePlace",
    "address",
    "phone",
    "contact",
    "relation",
    "contactPhone",
    "avatar",
] as const;

export const UserProfileNumberKeys: string[] = ["age"];

export const MedicalHistoryKeys: (keyof MedicalHistory)[] = [
    "pastHistory",
    "surgeryHistory",
    "allergicHistory",
    "vaccinationHistory",
    "importantDrugHistory",
    "bloodTransfusionHistory",
    "smokingHistory",
    "drinkingHistory",
    "menstrualHistory",
    "maritalHistory",
    "familyHistory",
] as const;

export const HospitalizationBasicKeys: (keyof HospitalizationBasic)[] = [
    "admissionTime",
    "bodyTemperature",
    "heartRate",
    "breathe",
    "bloodPressure",
    "height",
    "weight",
    "bmi",
    "chestCircumference",
    "abdominalCircumference",
    "hips",
    "bigArm",
    "forearm",
] as const;

export const HospitalizationBasicNumberKeys: string[] = [
    "bodyTemperature",
    "heartRate",
    "breathe",
    "bloodPressure",
    "height",
    "weight",
    "bmi",
    "chestCircumference",
    "abdominalCircumference",
    "hips",
    "bigArm",
    "forearm",
];

export const HospitalizationBloodRoutineKeys: (keyof HospitalizationBloodRoutine)[] =
    ["redBloodCellCount", "leukocyteCount", "platelets", "hemoglobin"] as const;

export const HospitalizationBloodRoutineNumberKeys: string[] =
    HospitalizationBloodRoutineKeys;

export const HospitalizationLiverFunctionKeys: (keyof HospitalizationLiverFunction)[] =
    [
        "alt",
        "ast",
        "tb",
        "cb",
        "totalProtein",
        "albumin",
        "globulin",
        "urea",
        "creatinine",
    ] as const;

export const HospitalizationLiverFunctionNumberKeys: string[] =
    HospitalizationLiverFunctionKeys;

export const HospitalizationElectrolyteKeys: (keyof HospitalizationElectrolyte)[] =
    ["na", "k", "cl"] as const;

export const HospitalizationElectrolyteNumberKeys: string[] =
    HospitalizationElectrolyteKeys;

export const HospitalizationSugarMetabolismKeys: (keyof HospitalizationSugarMetabolism)[] =
    [
        "fastingBloodGlucose",
        "postprandialBloodSugar",
        "glycatedHemoglobin",
    ] as const;

export const HospitalizationSugarMetabolismNumberKeys: string[] =
    HospitalizationSugarMetabolismKeys;

export const HospitalizationHormoneKeys: (keyof HospitalizationHormone)[] = [
    "tsh",
    "tpo",
    "ft3",
    "ft4",
    "fsh",
    "lh",
    "e2",
    "p",
    "t",
    "insulin",
    "thymosin",
    "pyy",
    "glp1",
] as const;

export const HospitalizationHormoneNumberKeys: string[] =
    HospitalizationHormoneKeys;

export const HospitalizationBloodLipidsKeys: (keyof HospitalizationBloodLipids)[] =
    [
        "totalCholesterol",
        "hdl",
        "ldl",
        "triglycerides",
        "apoe",
        "apob",
        "lipoproteinAlpha",
    ] as const;

export const HospitalizationBloodLipidsNumberKeys: string[] =
    HospitalizationBloodLipidsKeys;

export const HospitalizationBodyCompositionKeys: (keyof HospitalizationBodyComposition)[] =
    [
        "water",
        "protein",
        "inorganicSalt",
        "bodyFat",
        "skeletalMuscle",
        "leanBodyMass",
    ] as const;

export const HospitalizationBodyCompositionNumberKeys: string[] =
    HospitalizationBodyCompositionKeys;

export const Hospitalization5E5Q5LScaleKeys: (keyof Hospitalization5E5Q5LScale)[] =
    [
        "actionAbility",
        "selfCare",
        "dailyActivity",
        "pain",
        "anxiety",
        "healthStatus",
        "eqVas",
    ] as const;

export const Hospitalization5E5Q5LScaleNumberKeys: string[] =
    Hospitalization5E5Q5LScaleKeys;

export const HospitalizationOtherKeys: (keyof HospitalizationOther)[] = [
    "patientFrontPhoto",
    "patientSidePhoto",
] as const;

export const HospitalizationKeys = [
    ...HospitalizationBasicKeys,
    ...HospitalizationBloodRoutineKeys,
    ...HospitalizationLiverFunctionKeys,
    ...HospitalizationElectrolyteKeys,
    ...HospitalizationSugarMetabolismKeys,
    ...HospitalizationHormoneKeys,
    ...HospitalizationBloodLipidsKeys,
    ...HospitalizationBodyCompositionKeys,
    ...Hospitalization5E5Q5LScaleKeys,
    ...HospitalizationOtherKeys,
] as const;

export const HospitalizationNumberKeys: string[] = [
    ...HospitalizationBasicNumberKeys,
    ...HospitalizationBloodRoutineNumberKeys,
    ...HospitalizationLiverFunctionNumberKeys,
    ...HospitalizationElectrolyteNumberKeys,
    ...HospitalizationSugarMetabolismNumberKeys,
    ...HospitalizationHormoneNumberKeys,
    ...HospitalizationBloodLipidsNumberKeys,
    ...HospitalizationBodyCompositionNumberKeys,
    ...Hospitalization5E5Q5LScaleNumberKeys,
];

export const StentPlacementKeys: (keyof StentPlacement)[] = [
    "operationTime",
    "stentManufacturers",
    "dateOfSurgery",
    "complication",
    "surgeon",
    "surgeryLocation",
    "descriptionOfSurgery",
    "intraoperativePictures",
    "fastingDuration",
    "discomfortComplaint",
    "dischargeTime",
] as const;

export const StentPlacementNumberKeys: string[] = ["fastingDuration"];

export const PreoperativeExaminationForStentRemovalExtraKeys: (keyof PreoperativeExaminationForStentRemovalExtra)[] =
    [
        "sweetsIntake",
        "emotionalEatingFrequency",
        "foodServings",
        "physicalActivityStatus",
        "foodComposition",
    ] as const;

export const PreoperativeExaminationForStentRemovalKeys = [
    ...HospitalizationKeys,
    ...PreoperativeExaminationForStentRemovalExtraKeys,
] as const;

export const PreoperativeExaminationForStentRemovalNumberKeys: string[] = [
    ...HospitalizationNumberKeys,
];

export const StentRemovalKeys: (keyof StentRemoval)[] = [
    "operationTime",
    "dateOfSurgery",
    "complication",
    "surgeon",
    "surgeryLocation",
    "descriptionOfSurgery",
    "intraoperativePictures",
    "fastingDuration",
    "discomfortComplaint",
    "dischargeTime",
] as const;

export const StentRemovalNumberKeys: string[] = StentPlacementNumberKeys;

export const FollowUpExtraKeys: (keyof FollowupExtra)[] = [
    "improvementOfPreviousDiseases",
] as const;

export const FollowupKeys = [
    ...HospitalizationKeys,
    ...FollowUpExtraKeys,
] as const;

export const FollowupNumberKeys: string[] = [...HospitalizationNumberKeys];

export const tableActionsKeys: (keyof TableActions)[] = ["actions"] as const;
