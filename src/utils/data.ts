/* eslint-disable @typescript-eslint/no-explicit-any */
export function filterUndefinedFields<T extends Record<string, any>>(
    data: T,
): T {
    return Object.fromEntries(
        Object.entries(data).filter(([, value]) => value !== undefined),
    ) as T;
}

export function isAllFieldsValid(obj: Record<string, any>): boolean {
    return Object.values(obj).every(
        (value) => value !== undefined && value !== null,
    );
}
