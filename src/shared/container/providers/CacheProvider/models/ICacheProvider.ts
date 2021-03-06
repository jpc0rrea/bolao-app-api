export default interface ICacheProvider {
  save<T>(key: string, value: T): Promise<void>;
  recover<T>(key: string): Promise<T | undefined>;
  invalidate(key: string): Promise<void>;
  invalidatePrefix(prefix: string): Promise<void>;
}
