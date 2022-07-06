/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
interface Mime {
  mime: string;
  pattern: (number | undefined)[];
}

// @todo: make support of more file types
const imageMimes: Mime[] = [
  {
    mime: 'image/png',
    pattern: [0x89, 0x50, 0x4e, 0x47],
  },
  {
    mime: 'image/jpeg',
    pattern: [0xff, 0xd8, 0xff],
  },
  {
    mime: 'image/gif',
    pattern: [0x47, 0x49, 0x46, 0x38],
  },
  {
    mime: 'image/webp',
    pattern: [0x52, 0x49, 0x46, 0x46, undefined, undefined, undefined, undefined, 0x57, 0x45, 0x42, 0x50, 0x56, 0x50],
  },
];

function isMime(bytes: Uint8Array, mime: Mime): boolean {
  return mime.pattern.every((p, i) => !p || bytes[i] === p);
}

/**
 * Converts a base64 encoded raw binary picture data into its original raw binary buffer.
 * Ex: "iVe89...." ---> âPNGIHDR...
 */
function base64FileToBuffer(base64Picture: string): Buffer {
  return Buffer.from(base64Picture, 'base64');
}

function fileMimeType(rawOrBase64ImageData: Buffer | string): Promise<string> {
  if (typeof rawOrBase64ImageData === 'string') { rawOrBase64ImageData = base64FileToBuffer(rawOrBase64ImageData); }

  const numBytesNeeded = Math.max(...imageMimes.map((m) => m.pattern.length));
  const blob = new Blob([rawOrBase64ImageData.slice(0, numBytesNeeded)]); // Read the needed bytes of the file

  const fileReader = new FileReader();
  const p = new Promise<string>((resolve) => {
    fileReader.onloadend = (e) => {
      // console.log("DEBUG ONLOADEND", e);
      if (!e || !fileReader.result) {
        resolve(null);
        return;
      }

      const bytes = new Uint8Array(fileReader.result as ArrayBuffer);

      const mime = imageMimes.find((m) => isMime(bytes, m));

      if (!mime) resolve(null);
      else resolve(mime.mime);
    };
  });

  fileReader.readAsArrayBuffer(blob);

  return p;
}

/**
 * Encodes a raw binary picture data into a base64 string.
 * Ex: âPNGIHDR... ---> "iVe89...."
 */
function rawFileToBase64(rawData: Buffer): string {
  if (!rawData) { return null; }

  return Buffer.from(rawData).toString('base64');
}

/**
 * Converts a raw binary picture data to a base64 data url usable on UI.
 * Ex: âPNGIHDR... ---> "data:image/png;base64,iVe89...."
 */
async function fromBufferToBase64DataURL(rawData: Buffer): Promise<string> {
  if (!rawData) { return null; }

  const mimeType = await fileMimeType(rawData);
  if (!mimeType) {
    console.warn('FileHelper.fromBufferToBase64DataURL', 'Unable to extract mime type from picture buffer. rawFileToBase64DataUrl() returns null picture.');
    return null;
  }

  return `data:${mimeType};base64,${rawFileToBase64(rawData)}`;
}

export default {
  fromBufferToBase64DataURL
}
