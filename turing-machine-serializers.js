const serializers = {
    'input': {
        /**
         * Mengubah ke dalam format:
         *      3       => X1110
         *
         * Asumsinya adalah bilangan yang diberikan *selalu*
         * bernilai positif
         */
        'one-number': bil => {
            console.assert(bil > 0)
            return `X${'1'.repeat(bil)}0`
        },

        /**
         * Mengubah ke dalam format:
         *      3 + 2      => X1110X11
         *      2 * (-1)   => X110Y1
         *      2 + 0      => X110Z
         *     -1 + 3      => Y10X111
         *
         * Dimana:
         *      X -> positif
         *      Y -> negatif
         *      Z -> nol
         */
        'two-number': (bil1, bil2) => {
            const getTapeReprOf = num => {
                if (num > 0)
                {
                    return `X${'1'.repeat(num)}`
                }
                else if (num < 0)
                {
                    return `Y${'1'.repeat(Math.abs(num))}`
                }
                else
                {
                    return 'Z'
                }
            }

            return `${getTapeReprOf(bil1)}0${getTapeReprOf(bil2)}`
        },
    },

    /**
     * Mengubah format tape data (string) menjadi bilangan dalam
     * format integer
     *
     * Asumsi di sini adalah, output dari tiap operasi akan mengikuti
     * format:
     *      'X111'   => 3
     *      'Y1'     => -1
     *      'Z'      => 0
     */
    'output': rawResult => {
        if (rawResult === 'Z')
        {
            return 0
        }

        const sign = (rawResult[0] === 'X') ? 1 : -1
        const num = rawResult.length - 1

        return sign * num
    },
}
