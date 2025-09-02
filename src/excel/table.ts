export interface History {
    description: string;
    date: string;
}

export type UserProfile = {
    id: string;
    name: string;
    sex: "male" | "female";
    ethnicity: string;
    age: number;
    birth: string;
    country: string;
    job: string;
    maritalStatus: string;
    nativePlace: string;
    address: string;
    phone: string;
    contact: string;
    relation: string;
    contactPhone: string;
    avatar: string;
};

export type MedicalHistory = {
    pastHistory: History[];
    surgeryHistory: History[];
    allergicHistory: History[];
    vaccinationHistory: History[];
    importantDrugHistory: History[];
    bloodTransfusionHistory: History[];
    smokingHistory: History[];
    drinkingHistory: History[];
    menstrualHistory: History[];
    maritalHistory: History[];
    familyHistory: History[];
};

export type HospitalizationBasic = {
    admissionTime: string;
    bodyTemperature: number;
    heartRate: number;
    breathe: number;
    bloodPressure: number;
    height: number;
    weight: number;
    bmi: number;
    chestCircumference: number;
    abdominalCircumference: number;
    hips: number;
    bigArm: number;
    forearm: number;
};

export type HospitalizationBloodRoutine = {
    redBloodCellCount: number;
    leukocyteCount: number;
    platelets: number;
    hemoglobin: number;
};

export type HospitalizationLiverFunction = {
    alt: number;
    ast: number;
    tb: number;
    cb: number;
    totalProtein: number;
    albumin: number;
    globulin: number;
    urea: number;
    creatinine: number;
};

export type HospitalizationElectrolyte = {
    na: number;
    k: number;
    cl: number;
};

export type HospitalizationSugarMetabolism = {
    fastingBloodGlucose: number;
    postprandialBloodSugar: number;
    glycatedHemoglobin: number;
};

export type HospitalizationHormone = {
    tsh: number;
    tpo: number;
    ft3: number;
    ft4: number;
    fsh: number;
    lh: number;
    e2: number;
    p: number;
    t: number;
    insulin: number;
    thymosin: number;
    pyy: number;
    glp1: number;
};

export type HospitalizationBloodLipids = {
    totalCholesterol: number;
    hdl: number;
    ldl: number;
    triglycerides: number;
    apoe: number;
    apob: number;
    lipoproteinAlpha: number;
};

export type HospitalizationBodyComposition = {
    water: number;
    protein: number;
    inorganicSalt: number;
    bodyFat: number;
    skeletalMuscle: number;
    leanBodyMass: number;
};

export type Hospitalization5E5Q5LScale = {
    actionAbility: number;
    selfCare: number;
    dailyActivity: number;
    pain: number;
    anxiety: number;
    healthStatus: number;
    eqVas: number;
};

export type HospitalizationOther = {
    patientFrontPhoto: string;
    patientSidePhoto: string;
};

export type Hospitalization = HospitalizationBasic &
    HospitalizationBloodRoutine &
    HospitalizationLiverFunction &
    HospitalizationElectrolyte &
    HospitalizationSugarMetabolism &
    HospitalizationHormone &
    HospitalizationBloodLipids &
    HospitalizationBodyComposition &
    Hospitalization5E5Q5LScale &
    HospitalizationOther;

export type StentPlacement = {
    operationTime: string;
    stentManufacturers: string;
    dateOfSurgery: string;
    complication: string;
    surgeon: string;
    surgeryLocation: string;
    descriptionOfSurgery: string;
    intraoperativePictures: string;
    fastingDuration: number;
    discomfortComplaint: string;
    dischargeTime: string;
};

export type PreoperativeExaminationForStentRemovalExtra = {
    sweetsIntake: string;
    emotionalEatingFrequency: string;
    foodServings: string;
    physicalActivityStatus: string;
    foodComposition: string;
};

export type PreoperativeExaminationForStentRemoval = Hospitalization &
    PreoperativeExaminationForStentRemovalExtra;

export type StentRemoval = Omit<StentPlacement, "stentManufacturers">;

export type FollowupExtra = {
    improvementOfPreviousDiseases: string;
};

export type Followup = FollowupExtra & Hospitalization;

export type Patient = UserProfile &
    MedicalHistory &
    Hospitalization &
    StentPlacement & { latestBMI?: number };
// PreoperativeExaminationForStentRemoval &
// StentRemoval & { followups: Followup[] };

export type TableActions = {
    actions: never;
};

export type TableKeys = Patient & TableActions;
