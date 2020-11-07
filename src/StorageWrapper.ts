import { Storage } from './types';

export class StorageWrapper implements Storage {
  protected map: Map<string, number>;
  protected client: globalThis.Storage;

  constructor(client: globalThis.Storage) {
    this.client = client;
    this.map = new Map<string, number>();

    this.hydrate();
  }

  protected hydrate() {
    for (let i = 0; i < this.client.length; i += 1) {
      const key = this.client.key(i);
      if (key) {
        this.map.set(key, i);
      }
    }
  }

  public get<T = any>(key: string): T | null {
    const value = this.client.getItem(key);

    return value ? JSON.parse(value) : null;
  }

  public set<T = any>(key: string, value: T): T {
    const length = this.client.length;

    this.client.setItem(key, JSON.stringify(value));
    this.map.set(key, length);

    return value;
  }

  public remove<T = any>(key: string): T | null {
    const value = this.get(key);

    if (value) {
      this.client.removeItem(key);
      this.map.delete(key);
    }

    return value;
  }

  public has(key: string): boolean {
    return this.map.has(key);
  }

  public clear(): boolean {
    try {
      this.client.clear();
      this.map.clear();

      return true;
    } catch (e) {
      return false;
    }
  }

  public keys(): string[] {
    return Array.from(this.map.keys());
  }

  public key(index: number): string | null {
    return this.client.key(index);
  }
}
