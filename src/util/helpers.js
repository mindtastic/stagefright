/** String helpers */
export const splitOnCapitals = (string) => string.replace(/([a-z0-9])([A-Z])/g, '$1 $2').split(' ');
export const capitalize = (string) => (string.charAt(0).toUpperCase() + string.substring(1));

/** Function helpers */
export const isFunction = (obj) => (typeof obj === 'function');
export const executeIfExists = (func) => { if (isFunction(func)) { func(); } };

/** Object helpers */
export const isObject = (obj) => (obj != null && (typeof obj === 'object' || typeof obj === 'function'));
export const applyIfExists = (obj, func) => ((isObject(obj)) ? func(obj) : obj);
