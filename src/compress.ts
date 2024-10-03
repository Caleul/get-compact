export function compressParams(params: Record<string, any>): string {
    const jsonStr = JSON.stringify(params);
    return Buffer.from(jsonStr).toString('base64');
}

function stringToBinary(str: string): string {
    return str.split('').map(char => {
        return char.charCodeAt(0).toString(2).padStart(8, '0');
    }).join(' ');
}
