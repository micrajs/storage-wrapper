import { InMemoryStorage } from '@micra/in-memory-storage';
import { AsyncStorageWrapper } from '../AsyncStorageWrapper';

describe('AsyncStorageWrapper tests', () => {
  it('should persist a value', async () => {
    const storage = new InMemoryStorage();
    const wrapper = new AsyncStorageWrapper(storage);

    await wrapper.set('key', 'value');

    expect(storage.getItem('key')).toBe(JSON.stringify('value'));
  });

  it('should persist a non-string value', async () => {
    const storage = new InMemoryStorage();
    const wrapper = new AsyncStorageWrapper(storage);

    await wrapper.set('key', { object: 'value' });

    expect(storage.getItem('key')).toBe(JSON.stringify({ object: 'value' }));
  });

  it('should retrieve a value', async () => {
    const storage = new InMemoryStorage();
    const wrapper = new AsyncStorageWrapper(storage);

    await wrapper.set('key', 'value');

    expect(await wrapper.get('key')).toBe('value');
  });

  it('should retrieve a non-string value', async () => {
    const storage = new InMemoryStorage();
    const wrapper = new AsyncStorageWrapper(storage);

    await wrapper.set('key', { object: 'value' });

    expect(await wrapper.get('key')).toMatchObject({ object: 'value' });
  });

  it('should check if a value exists', async () => {
    const storage = new InMemoryStorage();
    const wrapper = new AsyncStorageWrapper(storage);

    await wrapper.set('key', 'value');

    expect(await wrapper.has('key')).toBeTruthy();
  });

  it('should check if a non-string value exists', async () => {
    const storage = new InMemoryStorage();
    const wrapper = new AsyncStorageWrapper(storage);

    await wrapper.set('key', { object: 'value' });

    expect(await wrapper.has('key')).toBeTruthy();
  });

  it('should remove a value', async () => {
    const storage = new InMemoryStorage();
    const wrapper = new AsyncStorageWrapper(storage);

    await wrapper.set('key', 'value');
    await wrapper.remove('key');

    expect(await wrapper.get('key')).toBeNull();
  });

  it('should remove a non-string value', async () => {
    const storage = new InMemoryStorage();
    const wrapper = new AsyncStorageWrapper(storage);

    await wrapper.set('key', { object: 'value' });
    await wrapper.remove('key');

    expect(await wrapper.get('key')).toBeNull();
  });

  it('should clear all values from storage', async () => {
    const storage = new InMemoryStorage();
    const wrapper = new AsyncStorageWrapper(storage);

    await wrapper.set('key', { object: 'value' });
    await wrapper.clear();

    expect(await wrapper.get('key')).toBeNull();
    expect(storage.getItem('key')).toBeNull();
  });

  it('should hydrate values from storage', async () => {
    const storage = new InMemoryStorage();
    storage.setItem('key', JSON.stringify('value'));

    const wrapper = new AsyncStorageWrapper(storage);

    expect(await wrapper.get('key')).toBe('value');
  });
});
