import { InMemoryStorage } from '@micra/in-memory-storage';
import { StorageWrapper } from '../StorageWrapper';

describe('StorageWrapper tests', () => {
  it('should persist a value', () => {
    const storage = new InMemoryStorage();
    const wrapper = new StorageWrapper(storage);

    wrapper.set('key', 'value');

    expect(storage.getItem('key')).toBe(JSON.stringify('value'));
  });

  it('should persist a non-string value', () => {
    const storage = new InMemoryStorage();
    const wrapper = new StorageWrapper(storage);

    wrapper.set('key', { object: 'value' });

    expect(storage.getItem('key')).toBe(JSON.stringify({ object: 'value' }));
  });

  it('should retrieve a value', () => {
    const storage = new InMemoryStorage();
    const wrapper = new StorageWrapper(storage);

    wrapper.set('key', 'value');

    expect(wrapper.get('key')).toBe('value');
  });

  it('should retrieve a non-string value', () => {
    const storage = new InMemoryStorage();
    const wrapper = new StorageWrapper(storage);

    wrapper.set('key', { object: 'value' });

    expect(wrapper.get('key')).toMatchObject({ object: 'value' });
  });

  it('should check if a value exists', () => {
    const storage = new InMemoryStorage();
    const wrapper = new StorageWrapper(storage);

    wrapper.set('key', 'value');

    expect(wrapper.has('key')).toBeTruthy();
  });

  it('should check if a non-string value exists', () => {
    const storage = new InMemoryStorage();
    const wrapper = new StorageWrapper(storage);

    wrapper.set('key', { object: 'value' });

    expect(wrapper.has('key')).toBeTruthy();
  });

  it('should remove a value', () => {
    const storage = new InMemoryStorage();
    const wrapper = new StorageWrapper(storage);

    wrapper.set('key', 'value');
    wrapper.remove('key');

    expect(wrapper.get('key')).toBeNull();
  });

  it('should remove a non-string value', () => {
    const storage = new InMemoryStorage();
    const wrapper = new StorageWrapper(storage);

    wrapper.set('key', { object: 'value' });
    wrapper.remove('key');

    expect(wrapper.get('key')).toBeNull();
  });

  it('should clear all values from storage', () => {
    const storage = new InMemoryStorage();
    const wrapper = new StorageWrapper(storage);

    wrapper.set('key', { object: 'value' });
    wrapper.clear();

    expect(wrapper.get('key')).toBeNull();
    expect(storage.getItem('key')).toBeNull();
  });

  it('should hydrate values from storage', () => {
    const storage = new InMemoryStorage();
    storage.setItem('key', JSON.stringify('value'));

    const wrapper = new StorageWrapper(storage);

    expect(wrapper.get('key')).toBe('value');
  });
});
