import type {
    Hospitalization,
    PreoperativeExaminationForStentRemoval,
    StentRemoval,
} from "@prisma/client";

import {
    HospitalizationKeys,
    PreoperativeExaminationForStentRemovalKeys,
    StentRemovalKeys,
} from "./keys.js";

export type WithPrefix<Base, Prefix extends string> = {
    [K in keyof Base as `${Prefix}_${Extract<K, string>}`]: Base[K];
};

export function toWithPrefix<
    Base extends object,
    Ext extends object,
    P extends string,
>(
    src: (Ext & Partial<Record<keyof Base, unknown>>) | null,
    baseKeys: readonly (keyof Base & string)[],
    prefix: P,
): (WithPrefix<Base, P> & Omit<Ext, keyof Base>) | null {
    if (src === null) return null;

    const out: Record<string, unknown> = {};

    for (const [k, v] of Object.entries(src as Record<string, unknown>)) {
        if ((baseKeys as readonly string[]).includes(k)) {
            out[`${prefix}_${k}`] = v;
        } else {
            out[k] = v;
        }
    }

    return out as WithPrefix<Base, P> & Omit<Ext, keyof Base>;
}

const LARGE_WIDTH = 36;
const MIDDLE_WIDTH = 24;
const SMALL_WIDTH = 12;

export type HospitalizationWithPrefix = WithPrefix<
    Hospitalization,
    "Hospitalization"
>;

export function toHospitalizationWithPrefix(
    src: Hospitalization | null,
): HospitalizationWithPrefix | null {
    return toWithPrefix<Hospitalization, Hospitalization, "Hospitalization">(
        src,
        HospitalizationKeys,
        "Hospitalization",
    );
}

export type PreoperativeExaminationForStentRemovalWithPrefix = WithPrefix<
    PreoperativeExaminationForStentRemoval,
    "PreoperativeExaminationForStentRemoval"
>;

export function toPreoperativeExaminationForStentRemovalWithPrefix(
    src: PreoperativeExaminationForStentRemoval | null,
): PreoperativeExaminationForStentRemovalWithPrefix | null {
    return toWithPrefix<
        PreoperativeExaminationForStentRemoval,
        PreoperativeExaminationForStentRemoval,
        "PreoperativeExaminationForStentRemoval"
    >(
        src,
        PreoperativeExaminationForStentRemovalKeys,
        "PreoperativeExaminationForStentRemoval",
    );
}

export type StentRemovalWithPrefix = WithPrefix<StentRemoval, "StentRemoval">;

export function toStentRemovalWithPrefix(
    src: StentRemoval | null,
): StentRemovalWithPrefix | null {
    return toWithPrefix<StentRemoval, StentRemoval, "StentRemoval">(
        src,
        StentRemovalKeys,
        "StentRemoval",
    );
}

const hospitalizationTemplate = [
    {
        header: "采集时间",
        key: "admissionTime",
        width: SMALL_WIDTH,
    },
    {
        header: "体温",
        key: "bodyTemperature",
        width: SMALL_WIDTH,
    },
    {
        header: "心率",
        key: "heartRate",
        width: SMALL_WIDTH,
    },
    { header: "呼吸", key: "breathe", width: SMALL_WIDTH },
    { header: "血压", key: "bloodPressure", width: SMALL_WIDTH },
    { header: "身高", key: "height", width: SMALL_WIDTH },
    { header: "体重", key: "weight", width: SMALL_WIDTH },
    { header: "BMI", key: "bmi", width: SMALL_WIDTH },
    {
        header: "胸围",
        key: "chestCircumference",
        width: SMALL_WIDTH,
    },
    {
        header: "腹围",
        key: "abdominalCircumference",
        width: SMALL_WIDTH,
    },
    { header: "臀围", key: "hips", width: SMALL_WIDTH },
    { header: "上臂围", key: "bigArm", width: SMALL_WIDTH },
    { header: "前臂围", key: "forearm", width: SMALL_WIDTH },
    {
        header: "红细胞计数",
        key: "redBloodCellCount",
        width: SMALL_WIDTH,
    },
    {
        header: "白细胞计数",
        key: "leukocyteCount",
        width: SMALL_WIDTH,
    },
    { header: "血小板", key: "platelets", width: SMALL_WIDTH },
    { header: "血红蛋白", key: "hemoglobin", width: SMALL_WIDTH },
    { header: "ALT", key: "alt", width: SMALL_WIDTH },
    { header: "AST", key: "ast", width: SMALL_WIDTH },
    { header: "TB", key: "tb", width: SMALL_WIDTH },
    { header: "CB", key: "cb", width: SMALL_WIDTH },
    { header: "总蛋白", key: "totalProtein", width: SMALL_WIDTH },
    { header: "白蛋白", key: "albumin", width: SMALL_WIDTH },
    { header: "球蛋白", key: "globulin", width: SMALL_WIDTH },
    { header: "尿素", key: "urea", width: SMALL_WIDTH },
    { header: "肌酐", key: "creatinine", width: SMALL_WIDTH },
    { header: "Na", key: "na", width: SMALL_WIDTH },
    { header: "K", key: "k", width: SMALL_WIDTH },
    { header: "Cl", key: "cl", width: SMALL_WIDTH },
    {
        header: "空腹血糖",
        key: "fastingBloodGlucose",
        width: SMALL_WIDTH,
    },
    {
        header: "餐后血糖",
        key: "postprandialBloodSugar",
        width: SMALL_WIDTH,
    },
    {
        header: "糖化血红蛋白",
        key: "glycatedHemoglobin",
        width: SMALL_WIDTH,
    },
    { header: "TSH", key: "tsh", width: SMALL_WIDTH },
    { header: "TPO", key: "tpo", width: SMALL_WIDTH },
    { header: "FT3", key: "ft3", width: SMALL_WIDTH },
    { header: "FT4", key: "ft4", width: SMALL_WIDTH },
    { header: "FSH", key: "fsh", width: SMALL_WIDTH },
    { header: "LH", key: "lh", width: SMALL_WIDTH },
    { header: "E2", key: "e2", width: SMALL_WIDTH },
    { header: "P", key: "p", width: SMALL_WIDTH },
    { header: "T", key: "t", width: SMALL_WIDTH },
    { header: "胰岛素", key: "insulin", width: SMALL_WIDTH },
    { header: "胸腺素", key: "thymosin", width: SMALL_WIDTH },
    { header: "PYY", key: "pyy", width: SMALL_WIDTH },
    { header: "GLP-1", key: "glp1", width: SMALL_WIDTH },
    {
        header: "总胆固醇",
        key: "totalCholesterol",
        width: SMALL_WIDTH,
    },
    { header: "HDL", key: "hdl", width: SMALL_WIDTH },
    { header: "LDL", key: "ldl", width: SMALL_WIDTH },
    {
        header: "甘油三酯",
        key: "triglycerides",
        width: SMALL_WIDTH,
    },
    { header: "ApoE", key: "apoe", width: SMALL_WIDTH },
    { header: "ApoB", key: "apob", width: SMALL_WIDTH },
    {
        header: "脂蛋白α",
        key: "lipoproteinAlpha",
        width: SMALL_WIDTH,
    },
    { header: "水分", key: "water", width: SMALL_WIDTH },
    { header: "蛋白质", key: "protein", width: SMALL_WIDTH },
    { header: "无机盐", key: "inorganicSalt", width: SMALL_WIDTH },
    { header: "体脂", key: "bodyFat", width: SMALL_WIDTH },
    {
        header: "骨骼肌",
        key: "skeletalMuscle",
        width: SMALL_WIDTH,
    },
    {
        header: "去脂体重",
        key: "leanBodyMass",
        width: SMALL_WIDTH,
    },
    {
        header: "行动能力",
        key: "actionAbility",
        width: SMALL_WIDTH,
    },
    { header: "自理能力", key: "selfCare", width: SMALL_WIDTH },
    {
        header: "日常活动",
        key: "dailyActivity",
        width: SMALL_WIDTH,
    },
    { header: "疼痛", key: "pain", width: SMALL_WIDTH },
    { header: "焦虑", key: "anxiety", width: SMALL_WIDTH },
    {
        header: "健康状态",
        key: "healthStatus",
        width: SMALL_WIDTH,
    },
    { header: "EQ VAS", key: "eqVas", width: SMALL_WIDTH },
    {
        header: "患者正面照",
        key: "patientFrontPhoto",
        width: SMALL_WIDTH,
    },
    {
        header: "患者侧面照",
        key: "patientSidePhoto",
        width: SMALL_WIDTH,
    },
];

const hospitalizationColumns = (headerPrefix: string, keyPrefix: string) => {
    return hospitalizationTemplate.map((item) => ({
        header: `${headerPrefix}-${item.header}`,
        key: `${keyPrefix}_${item.key}`,
        width: item.width,
    }));
};

export const columns = [
    { header: "身份证", key: "id", width: LARGE_WIDTH },
    { header: "姓名", key: "name", width: SMALL_WIDTH },
    { header: "性别", key: "sex", width: SMALL_WIDTH },
    { header: "民族", key: "ethnicity", width: SMALL_WIDTH },
    { header: "年龄", key: "age", width: SMALL_WIDTH },
    { header: "出生日期", key: "birth", width: MIDDLE_WIDTH },
    { header: "国籍", key: "country", width: SMALL_WIDTH },
    { header: "工作", key: "job", width: SMALL_WIDTH },
    { header: "婚姻状况", key: "maritalStatus", width: SMALL_WIDTH },
    { header: "籍贯", key: "nativePlace", width: SMALL_WIDTH },
    { header: "家庭住址", key: "address", width: SMALL_WIDTH },
    { header: "手机号码", key: "phone", width: SMALL_WIDTH },
    { header: "联系人", key: "contact", width: SMALL_WIDTH },
    { header: "与本人关系", key: "relation", width: SMALL_WIDTH },
    { header: "联系人电话", key: "contactPhone", width: SMALL_WIDTH },

    { header: "既往史", key: "pastHistory", width: MIDDLE_WIDTH },
    { header: "手术史", key: "surgeryHistory", width: MIDDLE_WIDTH },
    { header: "过敏史", key: "allergicHistory", width: MIDDLE_WIDTH },
    { header: "预防接种史", key: "vaccinationHistory", width: MIDDLE_WIDTH },
    {
        header: "重要药物服用史",
        key: "importantDrugHistory",
        width: MIDDLE_WIDTH,
    },
    { header: "输血史", key: "bloodTransfusionHistory", width: MIDDLE_WIDTH },
    { header: "吸烟史", key: "smokingHistory", width: MIDDLE_WIDTH },
    { header: "饮酒史", key: "drinkingHistory", width: MIDDLE_WIDTH },
    { header: "月经史", key: "menstrualHistory", width: MIDDLE_WIDTH },
    { header: "婚育史", key: "maritalHistory", width: MIDDLE_WIDTH },
    { header: "家族史", key: "familyHistory", width: MIDDLE_WIDTH },

    ...hospitalizationColumns("入院情况", "Hospitalization"),

    { header: "支架置入-手术时间", key: "operationTime", width: SMALL_WIDTH },
    {
        header: "支架置入-支架厂家",
        key: "stentManufacturers",
        width: SMALL_WIDTH,
    },
    { header: "支架置入-手术日期", key: "dateOfSurgery", width: SMALL_WIDTH },
    { header: "支架置入-并发症", key: "complication", width: SMALL_WIDTH },
    { header: "支架置入-手术医生", key: "surgeon", width: SMALL_WIDTH },
    { header: "支架置入-手术地点", key: "surgeryLocation", width: SMALL_WIDTH },
    {
        header: "支架置入-手术描述",
        key: "descriptionOfSurgery",
        width: SMALL_WIDTH,
    },
    {
        header: "支架置入-术中图片",
        key: "intraoperativePictures",
        width: SMALL_WIDTH,
    },
    { header: "支架置入-禁食时长", key: "fastingDuration", width: SMALL_WIDTH },
    {
        header: "支架置入-不适主诉",
        key: "discomfortComplaint",
        width: SMALL_WIDTH,
    },
    { header: "支架置入-出院时间", key: "dischargeTime", width: SMALL_WIDTH },

    ...hospitalizationColumns(
        "支架取出术前检查",
        "PreoperativeExaminationForStentRemoval",
    ),
    {
        header: "支架取出术前检查-甜食摄入",
        key: "PreoperativeExaminationForStentRemoval_sweetsIntake",
        width: SMALL_WIDTH,
    },
    {
        header: "支架取出术前检查-情绪化饮食次数",
        key: "PreoperativeExaminationForStentRemoval_emotionalEatingFrequency",
        width: SMALL_WIDTH,
    },
    {
        header: "支架取出术前检查-食物分量",
        key: "PreoperativeExaminationForStentRemoval_foodServings",
        width: SMALL_WIDTH,
    },
    {
        header: "支架取出术前检查-体育活动状况",
        key: "PreoperativeExaminationForStentRemoval_physicalActivityStatus",
        width: SMALL_WIDTH,
    },
    {
        header: "支架取出术前检查-食物组成",
        key: "PreoperativeExaminationForStentRemoval_foodComposition",
        width: SMALL_WIDTH,
    },

    {
        header: "支架取出-手术时间",
        key: "StentRemoval_operationTime",
        width: SMALL_WIDTH,
    },
    {
        header: "支架取出-手术日期",
        key: "StentRemoval_dateOfSurgery",
        width: SMALL_WIDTH,
    },
    {
        header: "支架取出-并发症",
        key: "StentRemoval_complication",
        width: SMALL_WIDTH,
    },
    {
        header: "支架取出-手术医生",
        key: "StentRemoval_surgeon",
        width: SMALL_WIDTH,
    },
    {
        header: "支架取出-手术地点",
        key: "StentRemoval_surgeryLocation",
        width: SMALL_WIDTH,
    },
    {
        header: "支架取出-手术描述",
        key: "StentRemoval_descriptionOfSurgery",
        width: SMALL_WIDTH,
    },
    {
        header: "支架取出-术中图片",
        key: "StentRemoval_intraoperativePictures",
        width: SMALL_WIDTH,
    },
    {
        header: "支架取出-禁食时长",
        key: "StentRemoval_fastingDuration",
        width: SMALL_WIDTH,
    },
    {
        header: "支架取出-不适主诉",
        key: "StentRemoval_discomfortComplaint",
        width: SMALL_WIDTH,
    },
    {
        header: "支架取出-出院时间",
        key: "StentRemoval_dischargeTime",
        width: SMALL_WIDTH,
    },
];
