export const MockStorage: globalThis.Storage = {
  getItem: jest.fn((key: string) => (this as any)[key] || null),
  setItem: jest.fn((key: string, val = '') => {
    (this as any)[key] = val + '';
  }),
  removeItem: jest.fn((key: string) => {
    delete (this as any)[key];
  }),
  clear: jest.fn(() => {
    Object.keys(this as any).map((key: string) => delete (this as any)[key]);
  }),
  toString: jest.fn(() => {
    return '[object Storage]';
  }),
  key: jest.fn((idx: number) => Object.keys(this as any)[idx] || null),
  get length() {
    return Object.keys(this).length;
  },
  get __STORE__() {
    return this;
  },
}
