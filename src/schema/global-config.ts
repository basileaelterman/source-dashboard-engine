import { z } from "zod";

export const GlobalConfigSchema = z.object({
    schemaVersion: z.string(),
    tenant: z.object({
        id: z.string(),
        name: z.string(),
        industryCode: z.string(),
        locale: z.string(),
        currency: z.string(),
    }),
    theme: z.object({
        primaryColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
        logoUrl: z.string(),
    }),
});

export type GlobalConfig = z.infer<typeof GlobalConfigSchema>;

/**
 * validateGlobalConfig() validates the raw response data and throws
 * an error if the data is invalid or malformed.
 * 
 * @param data the raw response data.
 * @returns a GlobalConfig schema if the raw data is valid.
 */
export function validateGlobalConfig(data: unknown): GlobalConfig {
    return GlobalConfigSchema.parse(data);
}