export interface Storage {
  get(key: string): string | null;
  set(key: string, value: string): string | null;
  remove(key: string): string | null;
  has(key: string): boolean;
  keys(): string[];
  key(index: number): string | null;
  clear(): boolean;
}

export interface AsyncStorage {
  get(key: string): Promise<string | null>;
  set(key: string, value: string): Promise<string | null>;
  remove(key: string): Promise<string | null>;
  has(key: string): Promise<boolean>;
  keys(): Promise<string[]>;
  key(index: number): Promise<string | null>;
  clear(): Promise<boolean>;
}
