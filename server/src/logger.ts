export function Log(level: string) {
  return function (target: any, methodName: string, descriptor: any) {
    const code = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const startTime = Date.now();
      try {
        const result = await code.apply(this, args);
        const timeTaken = Date.now() - startTime;

        if (level !== "ERROR") {
          console.log(
            `[${new Date().toISOString()}] Level: ${level}; method: ${methodName} worked for ${timeTaken} ms`,
          );
          console.log(`Arguments given:`, args);
          console.log(`Function returned:`, result);
        }
        return result;
      } catch (err) {
        console.error(
          `[${new Date().toISOString()}] Error; method: ${methodName} failed`,
        );
        console.error(`Why:`, err);
        throw err;
      }
    };
    return descriptor;
  };
}
