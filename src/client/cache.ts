interface CacheEntry<T> {
    value: T;
    expiresAt: number;
}

const cache = new Map<string, CacheEntry<unknown>>();

/**
 * cacheKey() generates a key that will be used to store and 
 * retrieve data from the cache.
 * 
 * @param key the key to access the data.
 * @param scope the scope of the data.
 * @returns a cache key that will be able to access cached data.
 */
function cacheKey(key: string, scope: string): string {
    return `${scope}:${key}`;
}

/**
 * getCached() returns the cached data by its key and scope.
 * 
 * @param key the key of the cached data.
 * @param scope the scope of the cached data.
 * @returns the data that is stored with this key.
 */
export function getCached<T>(key: string, scope: string): T | null {
    const entry = cache.get(cacheKey(key, scope));
    
    if (!entry) {
        return null;
    }

    if (Date.now() > entry.expiresAt) {
        cache.delete(cacheKey(key, scope));
        return null;
    }

    return entry.value as T;
}

/**
 * setCached() replaces or creates a new value in the cache with a key and scope.
 * 
 * @param key the key of the to be cached data.
 * @param scope the scope of the to be cached data.
 * @param value the data that will be cached.
 * @param ttlMs how long the data should be cached (in miliseconds).
 */
export function setCached<T>(
    key: string, 
    scope: string,
    value: T,
    ttlMs: number,
): void {
    cache.set(cacheKey(key, scope), { value, expiresAt: Date.now() + ttlMs });
}