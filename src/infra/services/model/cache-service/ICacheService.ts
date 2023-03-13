export interface ICacheService {
  get<T>(key: string): Promise<T>
  set(key: string, value: any, ttl: number): Promise<boolean>
  del(key: string): Promise<boolean>
}