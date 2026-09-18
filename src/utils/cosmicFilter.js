/**
 * 获取filter对象
 * @param op    操作符
 * @param value 值
 * @returns {{op, value}}
 */
export function getFilter(op, value) {
    return {op, value};
}
/**
 * 获取filter对象字符串
 * @param op    操作符
 * @param value 值
 * @returns {string}
 */
export function getFilterStr(op, value) {
    return  JSON.stringify(getFilter(op, value));
}


/**
 *  获取filter对象
 * @param key   字段名
 * @param op    操作
 * @param value 值
 * @returns {{op, value, key}}
 */
export function getFilter2(key, op, value) {
    return {key, op, value};
}

/**
 *  获取filter对象字符串
 * @param key   字段名
 * @param op    操作
 * @param value 值
 * @returns {string}
 */
export function getFilter2Str(key, op, value) {
    return JSON.stringify(getFilter2(key, op, value));
}