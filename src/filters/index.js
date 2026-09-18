/**
 * 格式化金额
 * 12345.6格式化为12,345.60
 * @param s 金额
 * @param n 小数点保留几位
 * @returns {string}
 */
export function fmoney(s, n) {
  s = parseFloat((s + '').replace(/[^\d\.-]/g, ''))
  if (isNaN(s)) {
    return '0.00'
  }
  n = n > 0 && n <= 20 ? n : 2;
  // s = (Math.floor(s * 100) / 100).toFixed(n) + '';
  s = s.toFixed(n) + '';
  let l = s.split('.')[0].split('').reverse(), r = s.split('.')[1];
  let t = '';
  for (let i = 0; i < l.length; i++) {
    t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? ',' : '');
  }
  return t.split('').reverse().join('') + '.' + r;
}

/**
 * 格式化面积
 * 12345格式化为12,345
 * @param s
 * @returns {string}
 */
export function farea(s) {
  return fmoney(s, 2).split('.00')[0]
}

/**
 * 格式化百分率
 * @param s
 * @returns {string}
 */
export function frate(s) {
  s = parseFloat(s)
  if (isNaN(s)) {
    return '0%'
  }
  return (s * 100).toFixed(2) + '%'
}

/**
 * 金额转换单位，万 | 亿
 * @param num
 * @returns {string|number}
 */
export function funit(num) {
  if (!num || isNaN(num)) {
    return '0.00' + '元'
  }
  // 此处为防止字符串形式的数值进来，因为toFixed方法只能用于数值型数
  num = parseFloat(num)
  if (Math.abs(num) >= 100000000) {
    return (num / 100000000).toFixed(2) + '亿'
  } else if (Math.abs(num) >= 10000) {
    return (num / 10000).toFixed(2) + '万'
  } else {
    return num.toFixed(2) + '元'
  }
}