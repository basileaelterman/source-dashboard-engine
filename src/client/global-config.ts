import type { GlobalConfig } from "../schema/global-config";
import { validateGlobalConfig } from "../schema/global-config";
import { getCached, setCached } from "./cache";

const CACHE_KEY = "global-config";
const CACHE_TTL_MS = 1800000; // 30 minutes

/**
 * fetchGlobalConfig() fetches the global configuration data 
 * for this particular tenant.
 * 
 * @param tenantId the ID of this tenant.
 * @param token a valid JWT token.
 * @returns an object with valid configuration data.
 */
export async function fetchGlobalConfig(
    tenantId: string,
    token: string,
): Promise<GlobalConfig> {
    const cached = getCached<GlobalConfig>(CACHE_KEY, tenantId);

    if (cached) {
        return cached;
    }

    const response = await fetch("", {
        headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch global config: ${response.status}`);
    }

    const raw = await response.json();
    const config = validateGlobalConfig(raw);

    setCached(CACHE_KEY, tenantId, config, CACHE_TTL_MS);

    return config;
}
