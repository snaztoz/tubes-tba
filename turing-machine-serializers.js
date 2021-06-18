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

        /**
         * Mengubah ke dalam format:
         *      3 + 2      => X0001X00
         *      2 * (-1)   => X001Y0
         *      2 + 0      => X001
         *     -1 + 3      => X01Y000
         *
         * Bilangan kedua akan memiliki sign 'Y' jika ia berbeda
         * tanda dengan bilangan pertama
         */
        'two-number': (bil1, bil2) => {
            let bil2Sign = 'X'

            if (bil1 * bil2 === 0)
            {
                bil2Sign = ''
            }
            else if (bil1 * bil2 < 0)
            {
                bil2Sign = 'Y'
            }

            return `X${'0'.repeat(bil1)}1${bil2Sign}${'0'.repeat(bil2)}`
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
