type CacheEntry<T> = {
  timestamp: number
  data: T
}

type CacheOptions = {
  ttlMs?: number
  storage?: Storage
}

export function createStorageCache(prefix: string, options?: CacheOptions) {
  const ttl = options?.ttlMs ?? 3600_000 // default 1 hour
  const storage = options?.storage ?? localStorage

  function getKey(key: string) {
    return `${prefix}:${key}`
  }

  function get<T>(key: string): T | null {
    const raw = storage.getItem(getKey(key))
    if (!raw) return null

    try {
      const entry: CacheEntry<T> = JSON.parse(raw)
      const isExpired = Date.now() - entry.timestamp > ttl
      if (isExpired) {
        storage.removeItem(getKey(key))
        return null
      }
      return entry.data
    } catch {
      storage.removeItem(getKey(key))
      return null
    }
  }

  function set<T>(key: string, data: T) {
    const entry: CacheEntry<T> = {
      timestamp: Date.now(),
      data,
    }
    storage.setItem(getKey(key), JSON.stringify(entry))
  }

  function clear(key: string) {
    storage.removeItem(getKey(key))
  }

  return {
    get,
    set,
    clear,
  }
}
