function extractProperties(obj) {
  const properties = [];
  const objPaths = [];
  function traverse(obj, path = '') {
    Object.keys(obj).forEach((key) => {
      const value = obj[key];
      const newPath = path ? path + '.' + key : key;

      if (typeof value === 'object' && value !== null) {
        traverse(value, newPath);
      } else {
        objPaths.push(newPath);
        properties.push({ path: newPath, value });
      }
    });
  }

  traverse(obj);
  return objPaths;
}

export default function differenceByProperties(obj1: Object, obj2: Object) {
  let differences = [];
  const paths1 = Array.from(new Set(extractProperties(obj1))).sort();
  const paths2 = Array.from(new Set(extractProperties(obj2))).sort();

  if (paths1.length < paths2.length) {
    differences = paths1.filter((path) => !paths1.includes(path));
  } else {
    differences = paths1.filter((path) => !paths1.includes(path));
  }
  return differences;
}
