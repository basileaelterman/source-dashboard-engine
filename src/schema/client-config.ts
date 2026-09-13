import { z } from "zod";

export const ClientConfigSchema = z.object({
    schemaVersion: z.string(),
    modules: z.array(z.object({
        id: z.string(),
        label: z.string(),
        path: z.string(),
        icon: z.string(),
        moduleId: z.string(),
    })),
});

export type ClientConfig = z.infer<typeof ClientConfigSchema>;

/**
 * validateClientConfig() validates the raw response data and throws
 * an error if the data is invalid or malformed.
 * 
 * @param data the raw response data.
 * @returns a ClientConfig schema if the raw data is valid.
 */
export function validateClientConfig(data: unknown): ClientConfig {
    return ClientConfigSchema.parse(data);
}