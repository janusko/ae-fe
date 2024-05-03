  /*
    Three potential paths for our values: 
      1. if value is primitive => just return the value,
      2. if value is array => move any nested array values into top level array,
      3. if value is object => move any nested object value into the top level object
  */

function flatten(value) {
  // an array is an object in JS => checking for an array and an object
  // exception => null => typeof null is object.
  if (typeof value !== 'object' || value === null) {
    return value;
  };

  if (Array.isArray(value)) {
    return flattenArray(value);
  };

  return flattenObject(value);
};


function flattenArray(array) {
  // if currentValue is a nested array => concat returns new array with values of both acc and curr
  // concat can take in any value => if curr !== array => concat returns new array with acc values + curr
  // curr has more nested arrays or objects inside of it => flatten.
  return array.reduce((acc, curr) => acc.concat(flatten(curr)), [])
};


function flattenObject(object) {
  // create new object to be returned
  const flattenedObject = {};

  // iterate through the original object => 
  // for each key:value pair, check if value is an object => flatten that value and add to flattenedObject
  for (const [key, value] of Object.entries(object)) {
    // Check to see if value is an object or not

    // check to see is value is an object, but not null, nor an array
    const valueisObject = typeof value === 'object' && value !== null && !Array.isArray(value);

    // check for deeply nested arrays or objects inside objects => flatten
    const flattenedValue = flatten(value);

    // if value is an object => assign all key:value pairs from that object to flattenedObject
    // if value not an object, then add flattenedValue to flattenedObject
    if (valueisObject) {
      // assign function takes in a target and a source object
      Object.assign(flattenedObject, flattenedValue)
    } else {
      flattenedObject[key] = flattenedValue
    }
  }

  return flattenedObject;
}

// Do not edit the line below.
exports.flatten = flatten;
