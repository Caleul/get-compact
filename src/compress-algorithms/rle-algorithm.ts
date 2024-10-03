function rleCompress(input: string): string {
    if (!/^[01]+$/.test(input)) {
        throw new Error("The input string must contain only '0' or '1' values.");
    }

    let compressed = '';
    let count = 1;

    for (let i = 0; i < input.length; i++) {
        if (input[i] === input[i + 1]) {
            count++;
        } else {
            compressed += input[i] + count;
            count = 1;
        }
    }

    return compressed;
}

function rleDecompress(compressed: string): string {
    let decompressed = '';
    let i = 0;

    while (i < compressed.length) {
        const char = compressed[i];
        let count = '';

        i++;
        while (i < compressed.length && !isNaN(Number(compressed[i]))) {
            count += compressed[i];
            i++;
        }

        decompressed += char.repeat(Number(count));
    }

    return decompressed;
}
