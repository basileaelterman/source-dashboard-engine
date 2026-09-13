import type { ClientConfig } from "../schema/client-config";
import { validateClientConfig } from "../schema/client-config";
import { getCached, setCached } from "./cache";

const CLIENT_SCOPE = 'client';
const CACHE_KEY = "client-config";
const CACHE_TTL_MS = 600000; // 10 minutes

/**
 * fetchClientConfig() fetches the client configuration data 
 * for this particular tenant.
 * 
 * @param tenantId the ID of this tenant.
 * @param token a valid JWT token.
 * @returns an object with valid configuration data.
 */
export async function fetchClientConfig(
    tenantId: string,
    token: string,
): Promise<ClientConfig> {
    const cached = getCached<ClientConfig>(CACHE_KEY, tenantId);

    if (cached) {
        return cached;
    }

    const url = `${import.meta.env.VITE_API_URL}/tenant/${tenantId}/config?scope=${CLIENT_SCOPE}`;

    const response = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch client config: ${response.status}`);
    }

    const raw = await response.json();
    const config = validateClientConfig(raw);

    setCached(CACHE_KEY, tenantId, config, CACHE_TTL_MS);

    return config;
}
