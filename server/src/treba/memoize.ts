type eviction = "LRU" | "LFU" | "Time-Based";

export function memoize(func: Function, limit: number, policy: eviction) {
  const cache = new Map();
  return function (...args: any[]) {
    const key = JSON.stringify(args);
    if (cache.get(key) !== undefined) return cache.get(key);
    else {
      const value = func(...args);
      cache.set(key, value);
      return value;
    }
  };
}
