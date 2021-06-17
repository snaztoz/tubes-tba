const serializers = {
    'penjumlahan': {
        // CONTOH FORMAT:
        //      1 + 3   => X01X000
        //      2 - 4   => X001Y0000
        'input': (bil1, bil2) => {
            const getSignOf = num => {
                if (num === 0)
                {
                    // untuk bilangan 0, dibuat blank saja
                    return 'B'
                }
                return num > 0 ? 'X' : 'Y'
            }
            return `${getSignOf(bil1)}${'0'.repeat(bil1)}1${getSignOf(bil2)}${'0'.repeat(bil2)}`
        },

        'output': rawResult => {
            const zeroCharIndex = rawResult.indexOf('0')
            const ones =  rawResult
                    .substring(zeroCharIndex + 1, rawResult.length)
            return ones.length
        }
    },

    'pengurangan': {
        'input': (bil1, bil2) => { /* logika serializer input */},
        'output': rawResult => { /* logika serializer output */}
    },

    'perkalian': {
        'input': (bil1, bil2) => { /* logika serializer input */},
        'output': rawResult => { /* logika serializer output */}
    },

    'pembagian': {
        'input': (bil1, bil2) => { /* logika serializer input */},
        'output': rawResult => { /* logika serializer output */}
    },

    'faktorial': {
        'input': (bil1, bil2) => { /* logika serializer input */},
        'output': rawResult => { /* logika serializer output */}
    },

    'modulo': {
        'input': (bil1, bil2) => { /* logika serializer input */},
        'output': rawResult => { /* logika serializer output */}
    },

    'perpangkatan': {
        'input': (bil1, bil2) => { /* logika serializer input */},
        'output': rawResult => { /* logika serializer output */}
    },

    'logaritma-biner': {
        'input': (bil1, bil2) => { /* logika serializer input */},
        'output': rawResult => { /* logika serializer output */}
    }
}
