export function decompressParams<T>(compressed: string): T {
    const decoded = Buffer.from(compressed, 'base64').toString();
    return JSON.parse(decoded) as T;
}
  