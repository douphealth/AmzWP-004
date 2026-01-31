import { injectable } from 'inversify';

export interface ICacheService {
  get<T>(key: string): Promise<T | null>;
  set<T>(key: string, value: T, ttlMs?: number): Promise<void>;
  delete(key: string): Promise<void>;
  clear(): Promise<void>;
}

@injectable()
export class LocalStorageCacheService implements ICacheService {
  async get<T>(key: string): Promise<T | null> {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return null;
      const parsed = JSON.parse(raw) as { value: T; expiresAt?: number };
      if (parsed.expiresAt && Date.now() > parsed.expiresAt) {
        localStorage.removeItem(key);
        return null;
      }
      return parsed.value;
    } catch {
      return null;
    }
  }

  async set<T>(key: string, value: T, ttlMs?: number): Promise<void> {
    try {
      const payload = {
        value,
        expiresAt: ttlMs ? Date.now() + ttlMs : undefined,
      };
      localStorage.setItem(key, JSON.stringify(payload));
    } catch {
      // ignore quota errors
    }
  }

  async delete(key: string): Promise<void> {
    try {
      localStorage.removeItem(key);
    } catch {
      // ignore
    }
  }

  async clear(): Promise<void> {
    try {
      Object.keys(localStorage)
        .filter((k) => k.startsWith('amzwp_') || k.startsWith('ai:') || k.startsWith('analysis:') || k.startsWith('wp:'))
        .forEach((k) => localStorage.removeItem(k));
    } catch {
      // ignore
    }
  }
}
