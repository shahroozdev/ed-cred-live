export function parseNestedFormData(data: Record<string, any>) {
  const result: any = {};

  for (const [key, value] of Object.entries(data)) {
    const keys = key
      .replace(/\]/g, '')
      .split(/\[|\./) // handles "details.schoolName", "answers[0].questionId"

    keys.reduce((acc, currKey, index) => {
      const isLast = index === keys.length - 1;

      if (!acc[currKey]) {
        acc[currKey] = /^\d+$/.test(keys[index + 1]) ? [] : {};
      }

      if (isLast) {
        acc[currKey] = value;
      }

      return acc[currKey];
    }, result);
  }

  return result;
}
