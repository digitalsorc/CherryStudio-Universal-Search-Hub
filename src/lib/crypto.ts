const ITERATIONS = 100000;
const KEY_LEN = 256;
const ALGO = 'AES-GCM';

async function deriveKey(pin: string, salt: Uint8Array): Promise<CryptoKey> {
  const enc = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    enc.encode(pin),
    { name: 'PBKDF2' },
    false,
    ['deriveBits', 'deriveKey']
  );
  return crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt,
      iterations: ITERATIONS,
      hash: 'SHA-256',
    },
    keyMaterial,
    { name: ALGO, length: KEY_LEN },
    false,
    ['encrypt', 'decrypt']
  );
}

export async function encryptData(pin: string, data: string): Promise<string> {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const key = await deriveKey(pin, salt);
  const enc = new TextEncoder();
  
  const encrypted = await crypto.subtle.encrypt(
    { name: ALGO, iv },
    key,
    enc.encode(data)
  );

  const encryptedArray = new Uint8Array(encrypted);
  const packed = new Uint8Array(salt.length + iv.length + encryptedArray.length);
  packed.set(salt, 0);
  packed.set(iv, salt.length);
  packed.set(encryptedArray, salt.length + iv.length);

  return btoa(String.fromCharCode(...packed));
}

export async function decryptData(pin: string, packedBase64: string): Promise<string> {
  const packedStr = atob(packedBase64);
  const packed = new Uint8Array(packedStr.length);
  for (let i = 0; i < packedStr.length; i++) {
    packed[i] = packedStr.charCodeAt(i);
  }

  const salt = packed.slice(0, 16);
  const iv = packed.slice(16, 28);
  const ciphertext = packed.slice(28);

  const key = await deriveKey(pin, salt);
  const decrypted = await crypto.subtle.decrypt(
    { name: ALGO, iv },
    key,
    ciphertext
  );

  const dec = new TextDecoder();
  return dec.decode(decrypted);
}
