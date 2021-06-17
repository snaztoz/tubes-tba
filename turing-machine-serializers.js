const serializers = {
    'penjumlahan': {
        'input': (bil1, bil2) => {
            return `${'1'.repeat(bil1)}0${'1'.repeat(bil2)}`
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
