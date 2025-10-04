import CryptoJs from 'crypto-js'

const _PASSKEY = "ihjkfdjalksjfduokjreikjsmfdlkjsalkdjfl";
export const encryptData = (dataToEncrypt: any) => {
  const data= CryptoJs.AES.encrypt(
    JSON.stringify(dataToEncrypt),
    _PASSKEY
  ).toString();
  return data
};

export const decryptData = (dataToDecrypt: string) => {
  const bytes = CryptoJs.AES.decrypt(dataToDecrypt, _PASSKEY); 
  return JSON.parse(bytes.toString(CryptoJs.enc.Utf8));
};
