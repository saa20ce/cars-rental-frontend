export function buildFieldsParam(fields: string[]): string {
    const unique = Array.from(new Set(fields)).join(',');
    return `_fields=${encodeURIComponent(unique)}`;
}
