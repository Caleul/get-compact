type CaleulCompression =`${number}[${string}]`;

function stringCompressor(input: string): string {

    let compressionRounds = 0;

    // THIS ALGORITHM RETURNS THE STRING THAT REPRESENTS THE SMALLEST COMPRESSION
    // FOLLOWING THE FORMAT:
    // `COMPRESSION_ROUNDS[FINAL_COMPRESSED_STRING]`
    const caleulCompressionInput: CaleulCompression = `${compressionRounds}[${input}]`;
    let compressedOptions: CaleulCompression[] = [
        caleulCompressionInput,
    ];

    function compressBinaryString(input: string, size: number): string {
        let encoded = '';
        let count = 1;

        for (let i = 0; i < input.length; i + size) {
            // Verifica se o próximo caractere é igual ao atual
            if (
                // verifica se existe proxima string do tamanho predefinido
                i < input.length - size
                // se a substring atual (do tamanho predefinido) for igual a proxima substring (também do tamanho predefinido)
                && input.substring(i, i + size) === input.substring(i + size, i + size + size)
            ) {
                count++;
            } else {
                encoded += count + input.substring(i, i + size);
                count = 1;
            }
        }
        return encoded;
    }

    const lengthOptions = getDivisors(input);

    const results = lengthOptions.map((lengthOption) => {
        return compressBinaryString(input, lengthOption);
    })

    return findShortestString(results);
}

function isBinaryString(string: string): boolean {
    return (
        /^[01]+$/.test(string)
    );
}

function isOdd(number: number): boolean {
    return (
        number % 2 === 0
    );
}

function countZerosAndOnes(input: CaleulCompression): { zeros: number, ones: number } {
    const bracketContent = input.match(/\[(.*?)\]/)?.[1];

    let zeros = 0;
    let ones = 0;
  
    if (bracketContent) {
        for (let char of bracketContent) {
            if (char === '0') {
                zeros++;
            } else if (char === '1') {
                ones++;
            }
        }
    }
  
    return { zeros, ones };
}

function findShortestString(strings: string[]): string {      
    let shortest = strings[0];
  
    for (let i = 1; i < strings.length; i++) {
      if (strings[i].length < shortest.length) {
        shortest = strings[i];
      }
    }
  
    return shortest;
}

function getDivisors(str: string): number[] {
    const divisors: number[] = []

    for (let i = Math.floor(str.length / 2); i > 0; i--) {
        divisors.push(i);
    }

    return divisors;
}
