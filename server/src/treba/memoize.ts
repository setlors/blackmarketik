type eviction = "LRU" | "LFU" | "Time-Based";

export function memoize(
  func: Function,
  limit: number,
  policy: eviction,
  time: number, //for Time-Based policy
) {
  const cache = new Map();
  return function (...args: any[]) {
    const key = JSON.stringify(args);
    if (cache.get(key) !== undefined) {
      const cached = cache.get(key);

      if (policy === "Time-Based" && Date.now() - cached.timestamp > time) {
        cache.delete(key);
      } else {
        cached.counter += 1;
        cached.timestamp = Date.now();
        return cached.val;
      }
    }

    const value = func(...args);

    if (cache.size >= limit) {
      if (policy === "LRU") {
        let oldestKey;

        let oldest = Date.now();

        for (const [k, v] of cache) {
          if (v.timestamp < oldest) {
            oldestKey = k;

            oldest = v.timestamp;
          }
        }

        cache.delete(oldestKey);
      } else if (policy === "LFU") {
        let minKey;
        let minCounter = Infinity;

        for (const [k, v] of cache) {
          if (v.counter < minCounter) {
            minKey = k;
            minCounter = v.counter;
          }
        }
        cache.delete(minKey);
      }
    }
    cache.set(key, { val: value, counter: 1, timestamp: Date.now() }); //counter's for LFU; timestamp's for LRU and Time-Based policies
    return value;
  };
}
