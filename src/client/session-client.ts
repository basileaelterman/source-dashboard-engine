import type { SessionConfig } from "../schema/session-config";
import { validateSessionConfig } from "../schema/session-config";
import { getCached, setCached } from "./cache";

const SCOPE = 'session';
const CACHE_KEY = "session-config";
const CACHE_TTL_MS = 600000; // 10 minutes

/**
 * fetchSessionConfig() fetches the session configuration data 
 * for this particular tenant.
 * 
 * @param tenantId the ID of this tenant.
 * @param token a valid JWT token.
 * @returns an object with valid configuration data.
 */
export async function fetchSessionConfig(
    tenantId: string,
    token: string,
): Promise<SessionConfig> {
    const cached = getCached<SessionConfig>(CACHE_KEY, tenantId);

    if (cached) {
        return cached;
    }

    const apiUrl = process.env.API_URL;
    const clientId = process.env.CLIENT_ID;

    if (!apiUrl) {
        throw new Error("API_URL is not set in .env");
    }
    if (!clientId) {
        throw new Error("CLIENT_ID is not set in .env");
    }

    const url = `${apiUrl}/tenants/${tenantId}/config?scope=${SCOPE}`;
    
    const response = await fetch(url, {
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
            "X-Session-Id": clientId,
        },
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch session config: ${response.status}`);
    }

    const raw = await response.json();
    const config = validateSessionConfig(raw);

    setCached(CACHE_KEY, tenantId, config, CACHE_TTL_MS);

    return config;
}
