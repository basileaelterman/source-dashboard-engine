import { z } from "zod";

export const SessionConfigSchema = z.object({
    schemaVersion: z.string(),
    modules: z.array(z.object({
        id: z.string(),
        label: z.string(),
        path: z.string(),
        icon: z.string(),
        moduleId: z.string(),
    })),
});

export type SessionConfig = z.infer<typeof SessionConfigSchema>;

/**
 * validateSessionConfig() validates the raw response data and throws
 * an error if the data is invalid or malformed.
 * 
 * @param data the raw response data.
 * @returns a SessionConfig schema if the raw data is valid.
 */
export function validateSessionConfig(data: unknown): SessionConfig {
    return SessionConfigSchema.parse(data);
}