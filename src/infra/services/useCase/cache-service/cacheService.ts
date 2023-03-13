import { ICacheService } from "../../model/cache-service/ICacheService";
import { CustomError, LogLevel } from "../error/error";

class CacheService implements ICacheService {
  private cache: Map<string, any> = new Map();

  public async get<T>(key: string): Promise<T> {
    const value = this.cache.get(key);
    if (value === undefined) {
      throw new CustomError(`Key ${key} not found in cache`, 404);
    }
    return value as T;
  }

  public async set(key: string, value: any, ttlSeconds = 30): Promise<boolean> {
    try {
      this.cache.set(key, value);
      await new Promise(resolve => setTimeout(resolve, ttlSeconds * 1000));
      this.cache.delete(key);
      return true;
    } catch (error) {
      throw new CustomError(`Error setting key ${key} in cache: ${(error as Error).message}`, 500);
    }
  }

  public async del(key: string): Promise<boolean> {
    const deleted = this.cache.delete(key);
    if (!deleted) {
      throw new CustomError(`Key ${key} not found in cache`, 404, LogLevel.Error);
    }
    return deleted;
  }
}

export {
  CacheService
}