import { Base64 } from "js-base64";
//环境参数
let env = import.meta.env;

/**
 * 加密
 * @param content 明文
 * @returns {string}
 */
export function encrypt(content) {
  return Base64.encode(content + process.env.VUE_APP_SSO_KEY);
}



