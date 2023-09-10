
/** Hash function for generating hashes to be used as seeds in pseudorandom number generators (PRNG).
 *
 * @param {string} str
 *
 * Example:
 * ```
 * var seed = xmur3("apples");
 * var rand = sfc32(seed(), seed(), seed(), seed());
 * rand();
 * rand();
 * ```
 *
 * @returns new "random" 32-bit hash value each time
 */
const xmur3 = (str: string) => {
    let h = 1779033703 ^ str.length;
    for (let i = 0; i < str.length; i = i + 1) {
        h = Math.imul(h ^ str.charCodeAt(i), 3432918353);
        h = (h << 13) | (h >>> 19);
    }
    return () => {
        h = Math.imul(h ^ h >>> 16, 2246822507);
        h = Math.imul(h ^ h >>> 13, 3266489909);
        h = h ^ h >>> 16;
        return h >>> 0;
    };
};

const TWO_POW_32 = 2 ** 32;

// https://prng.di.unimi.it/
// https://vigna.di.unimi.it/ftp/papers/ScrambledLinear.pdf
const xoshiro128ss = (a: number, b: number, c: number, d: number) => () => {
    const t = b << 9;
    let r = a * 5;
    r = ((r << 7) | (r >>> 25)) * 9;
    c = c ^ a;
    d = d ^ b;
    b = b ^ c;
    a = a ^ d;
    c = c ^ t;
    d = (d << 11) | (d >>> 21);
    return (r >>> 0) / TWO_POW_32;
};

export {
    xoshiro128ss,
    xmur3
};