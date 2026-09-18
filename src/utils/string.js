/**
 * 字符串是否非空
 * @param str
 * @returns {boolean}
 */
export function isNotBlank(str) {
  return (
    (typeof str  !=  'undefined' && str)
    && (typeof str.valueOf(str) == 'string')
    && str.length > 0
    && !/^\s+$/g.test(str)
  ) === true
}