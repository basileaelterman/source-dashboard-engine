import type { ClientConfig } from "../schema/client-config";
import { validateClientConfig } from "../schema/client-config";
import { getCached, setCached } from "./cache";

const SCOPE = 'client';
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
            "X-Client-Id": clientId,
        },
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch client config: ${response.status}`);
    }

    const raw = await response.json();
    const config = validateClientConfig(raw);

    setCached(CACHE_KEY, tenantId, config, CACHE_TTL_MS);

    return config;
}
