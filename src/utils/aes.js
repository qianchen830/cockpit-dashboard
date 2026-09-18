import CryptoJS from "crypto-js";
const keyStr = '#@cqspb_auth_~!~'
const ivStr = '91011b3f4c32bc3a'

export default {
	encrypt: function(word) {
		let key = CryptoJS.enc.Utf8.parse(keyStr);
		let iv = CryptoJS.enc.Utf8.parse(ivStr);
		let srcs = CryptoJS.enc.Utf8.parse(word);
		let encrypted = CryptoJS.AES.encrypt(srcs, key, {
			iv,
			mode: CryptoJS.mode.CBC,
			padding: CryptoJS.pad.Pkcs7
		});
		return encrypted.ciphertext.toString().toLowerCase();
	},
	// 解密
	decrypt: function(word) {
		var key = CryptoJS.enc.Utf8.parse(keyStr);
		let iv = CryptoJS.enc.Utf8.parse(ivStr);
		word = CryptoJS.enc.Hex.parse(word)
		word = CryptoJS.enc.Base64.stringify(word)
		var decrypt = CryptoJS.AES.decrypt(word, key, {
			iv,
			mode: CryptoJS.mode.CBC,
			padding: CryptoJS.pad.Pkcs7
		});
		return decrypt.toString(CryptoJS.enc.Utf8);
	}
};