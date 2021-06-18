const serializers = {
    'input': {
        /**
         * Mengubah ke dalam format:
         *      3       => X000
         *
         * Asumsinya adalah bilangan yang diberikan *selalu*
         * bernilai positif
         */
        'one-number': bil => {
            console.assert(bil > 0)
            return `X${'0'.repeat(bil)}`
        },

        // CONTOH FORMAT:
        //      1 + 3   => X01X000
        //      2 - 4   => X001Y0000
        'two-number': (bil1, bil2) => {
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
    },

    /**
     * Mengubah format tape data (string) menjadi bilangan dalam
     * format integer
     *
     * Asumsi di sini adalah, output dari tiap operasi akan mengikuti
     * format:
     *      'X000'   => 3
     *      'Y0'     => -1
     *      ''       => 0
     */
    'output': rawResult => {
        if (rawResult === '')
        {
            return 0
        }

        const sign = (rawResult.shift() === 'X') ? 1 : -1
        const num = rawResult.length

        return sign * num
    },
}
