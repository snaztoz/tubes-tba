/**
 * Class utama dari keseluruhan aplikasi.
 */
 class TuringMachine
 {
    constructor(operationRules, serializingPatterns)
    {
        this.form = new Form('#form')
        this.tape = new TapeController('#tape', operationRules)

        Serializer.use(serializingPatterns)

        this.start()
    }

    start()
    {
        this.form.onValidFormData(async formData => {
            removeErrorImage()
            fillResultBox('-', '-')

            const {jenisOperasi, bilangan1, bilangan2} = formData
            const tapeString = Serializer
                    .serializeInput(jenisOperasi, bilangan1, bilangan2)

            await this.tape.setOperation(jenisOperasi, tapeString)

            const [interrupted, rawResult] = await this.tape.run()
            if (interrupted)
            {
                // ada kemungkinan operasi mendapati interupsi
                return
            }

            const cleanResult = Serializer.serializeOutput(rawResult)

            await sleep(100)
            fillResultBox(rawResult, cleanResult)
        })
    }
 }
 
/**
 * Class untuk menghandle segala urusan terkait di dalam form,
 * seperti validasi form, pesan error, dan lain-lain.
 */
class Form
{
    constructor(formEl)
    {
        this.el = formEl
        this.operationValidationRules = {
            'penjumlahan': ['required-both'],
            'pengurangan': ['required-both'],
            'perkalian': ['required-both'],
            'pembagian': [
                'required-both',
                // mencegah pembagian oleh 0
                (bil1, bil2) => {
                    return [
                        bil2 != 0,
                        'tidak dapat melakukan pembagian oleh 0'
                    ]
                },
                // mencegah pembagian bersisa
                (bil1, bil2) => {
                    return [
                        bil1 % bil2 === 0,
                        'tidak dapat melakukan pembagian bersisa'
                    ]
                }
            ],

            // Hanya satu angka input
            'faktorial': ['required-first', 'positive'],
            'logaritma-biner': [
                'required-first',
                'positive',
                // mencegah input 1 (input tersebut valid, namun hasil yang
                // diberikan tidak memenuhi syarat, yakni hasil harus bilangan
                // bulat POSITIF)
                (bil1, _) => {
                    return [
                        bil1 != 1,
                        'input valid, namun kami tidak dapat menampilkan hasil'
                            + ' perhitungan logaritma biner yang menghasilkan'
                            + ' nilai 0 (mohon maaf atas ketidaknyamanannya)'
                    ]
                },
                // mencegah input selain 2^n
                (bil1, _) => {
                    return [
                        Number.isInteger(Math.log2(bil1)),
                        'penghitungan logaritma biner hanya dapat dilakukan '
                            + 'untuk angka yang merupakan hasil pangkat 2'
                    ]
                }
            ],

            'modulo': ['required-both', 'positive'],
            'perpangkatan': ['required-both', 'positive'],
        }
    }

    onValidFormData(callback)
    {
        $(`${this.el} #form-submit`).click(event => {
            event.preventDefault()
            $('#form-err').empty()

            const [isValid, data] = this.validate({
                jenisOperasi: $(`${this.el} #jenis-operasi`).val(),
                bilangan1: $(`${this.el} #bilangan-1`).val().trim(),
                bilangan2: $(`${this.el} #bilangan-2`).val().trim(),
            })

            if (!isValid)
            {
                $('#form-err').html(data.err)
                displayErrorImage()
                return
            }

            callback(data)
        })
    }

    /**
     * Menjalankan validasi untuk elemen operasi yang diberikan.
     *
     * Akan mengembalikan array yang berisikan:
     *
     *      isValid -> valid atau tidaknya operasi
     *      data    -> jika valid, akan berisikan data elemen operasi
     *                 jika error, akan berisikan pesan error
     */
    validate(operationElements)
    {
        const valid = true

        if (!this.operationValidationRules
                .hasOwnProperty(operationElements.jenisOperasi))
        {
            return [!valid, {'err': 'operasi tidak valid!'}]
        }

        const jenisOperasi = operationElements.jenisOperasi
        const bilangan1 = operationElements.bilangan1
        let bilangan2 = operationElements.bilangan2

        const rules = this.operationValidationRules[jenisOperasi]

        // input spoofing.
        //
        // Asumsinya adalah jika operasi memiliki rule required-first,
        // maka bilangan kedua dari input TIDAK AKAN digunakan, oleh
        // karenanya dia opsional (boleh ada ataupun tidak).
        //
        // Namun, jika terdapat rule lain yang membutuhkan kedua bilangan,
        // maka rule tersebut akan fail jika input kedua tidak diberikan.
        // Maka, spoofing berikut ini dilakukan untuk mencegah hal tersebut.
        if (rules.includes('required-first'))
        {
            bilangan2 = 9999999
        }

        for (const rule of rules)
        {
            const [passValidation, err] = this.runRuleValidation(rule, bilangan1, bilangan2)
            if (!passValidation)
            {
                return [!valid, {'err': err}]
            }
        }

        return [
            valid,
            {jenisOperasi, bilangan1, bilangan2}
        ]
    }

    /**
     * Menjalankan validasi rule.
     *
     * Mengembalikan array yang berisikan nilai
     *      [apakahError?, pesanError]
     */
    runRuleValidation(rule, bilangan1, bilangan2)
    {
        let valid

        if (rule === 'required-both')
        {
            valid = isIntegerString(bilangan1) && isIntegerString(bilangan2)
            return [
                valid,
                valid? null : 'kedua input tidak boleh kosong dan harus ' +
                                'berupa bilangan bulat'
            ]
        }
        else if (rule === 'required-first')
        {
            valid = isIntegerString(bilangan1)
            return [
                valid,
                valid? null : 'bilangan pertama tidak boleh kosong dan ' +
                                'harus berupa bilangan bulat'
            ]
        }
        else if (rule === 'positive')
        {
            valid = parseInt(bilangan1) > 0 && parseInt(bilangan2) > 0
            return [
                valid,
                valid? null : 'bilangan harus bernilai positif'
            ]
        }
        else if (typeof rule === 'function')
        {
            return rule(bilangan1, bilangan2)
        }

        throw new Error('unknown validation rule')
    }
}

/**
 * Class untuk mengubah format object data form menjadi string
 * yang akan dipahami oleh turing machine.
 */
class Serializer
{
    static use(patterns)
    {
        this.patterns = patterns
    }

    static serializeInput(jenisOperasi, bilangan1, bilangan2)
    {
        if (['faktorial', 'logaritma-biner'].includes(jenisOperasi))
        {
            return this.patterns['input']['one-number'](bilangan1)
        }
        else if (['penjumlahan', 'pengurangan', 'perkalian',
                'pembagian', 'modulo', 'perpangkatan'].includes(jenisOperasi))
        {
            return this.patterns['input']['two-number'](bilangan1, bilangan2)
        }

        throw new Error(`unknown operation ${jenisOperasi}`)
    }

    static serializeOutput(rawResult)
    {
        return this.patterns['output'](rawResult)
    }
}

/**
 * Class yang mengendalikan object tape dari turing machine
 */
class TapeController
{
    constructor(tapeEl, operationRules)
    {
        this.tapeEl = tapeEl

        this.operation = {
            rules: operationRules,

            currentData: 'B'.repeat(7).split(''),
            currentType: null,

            context: new OperatorContext()
        }

        this.template = {
            nullTape: $('#template-tape-null').html(),
            dataTape: $('#template-tape-data').html()
        }

        $(this.tapeEl).slick({
            arrows: false,
            centerMode: true,
            slidesToShow: 5,
        })

        for (let i = 0; i < this.operation.currentData.length; i++)
        {
            $(this.tapeEl).slick('slickAdd', this.template.nullTape)
        }
    }

    async setOperation(jenisOperasi, tapeString)
    {
        if (this.operation.context.getStatus() === 'RUNNING')
        {
            await this.operation.context.waitToStop()
        }

        this.emptyTape()

        this.operation.currentType = jenisOperasi
        this.operation.currentData = tapeString.split('').concat('B', 'B', 'B', 'B')

        this.applyTapeData()
    }

    /**
     * Mengaplikasikan isi dari this.operation.currentData ke dalam
     * tape pada DOM.
     */
    applyTapeData()
    {
        this.operation.currentData.forEach(data => {
            let el;

            if (data === 'B')
            {
                el = this.template.nullTape
            }
            else
            {
                el = $.parseHTML(this.template.dataTape)
                $(el).html(data)
            }

            $(this.tapeEl).slick('slickAdd', el)
        })
    }

    /**
     * Menjalankan operator untuk mengerjakan operasi
     * yang diberikan
     *
     * Method ini akan mengembalikan array:
     *      [interrupted?, cloneDataTape]
     *
     * Jika method ini diinterupsi, data akan tetap diberikan,
     * namun isinya cacat.
     */
    async run()
    {
        const interrupted = await Operator
            .use(this.operation.rules)
            .setOperation(this.operation.currentType)
            .setContext(this.operation.context)
            .setInput(this.operation.currentData)
            .setMovement(
                () => this.moveLeft(),
                () => this.moveRight()
            )
            .setWriteHandler(this.writeToTapeAt.bind(this))
            .run()

        const trimmedTape = this.getTrimmedTapeData()
        return [interrupted, trimmedTape.join('')]
    }

    emptyTape()
    {
        for (let i = this.operation.currentData.length - 1; i >= 0; i--)
        {
            $(this.tapeEl).slick('slickRemove', i)
        }
    }

    moveLeft()
    {
        $(this.tapeEl).slick('slickPrev')
    }

    moveRight()
    {
        $(this.tapeEl).slick('slickNext')
    }

    /**
     * Menulis text tertentu pada index yang diberikan.
     *
     * Method ini akan mengubah baik value di dalam this.operation.currentData
     * ataupun representasinya di dalam DOM itu sendiri.
     */
    writeToTapeAt(index, text)
    {
        const tapeStart = -1
        const tapeEnd = this.operation.currentData.length - 4

        if (index === tapeStart)
        {
            this.writeToNewRoomAt(tapeStart, text)
        }
        else if (index === tapeEnd)
        {
            this.writeToNewRoomAt(tapeEnd, text)
        }
        else
        {
            this.operation.currentData[index] = text
            $(`[data-slick-index=${index}]`).html(text)
        }
    }

    /**
     * Membuat ruang baru sekaligus menuliskan isinya.
     *
     * Seperti method this.writeToTapeAt, method ini juga akan
     * mengubah value di this.operation.currentData dan juga
     * pada tape di DOM.
     */
    writeToNewRoomAt(index, text)
    {
        if (index === -1)
        {
            this.operation.currentData.splice(0, 0, text)
        }
        else
        {
            this.operation.currentData.splice(index, 0, text)
        }

        const el = $.parseHTML(this.template.dataTape)
        $(el).html(text)
        $(this.tapeEl).slick('slickAdd', el, index, true)
    }

    /**
     * Menghapus blank dari depan dan belakang data tape.
     *
     * Asumsinya adalah output yang dihasilkan memiliki nilai "bersih"
     * hanya di posisi tengah
     *
     * Misal seperti:
     *      BBBX000BBB (tidak ada blank yang dijepit oleh non-blank)
     *
     * dan bukan:
     *      B0BBX00BB0 (ada blank yang dijepit oleh non-blank)
     */
    getTrimmedTapeData()
    {
        const clonnedTapeData = [...this.operation.currentData]

        if (!clonnedTapeData.some(data => data !== 'B'))
        {
            return []
        }

        // trim depan
        while (clonnedTapeData[0] === 'B')
        {
            clonnedTapeData.shift()
        }

        // trim belakang
        while (true)
        {
            const lastIndex = clonnedTapeData.length - 1
            if (clonnedTapeData[lastIndex] !== 'B')
            {
                break
            }
            clonnedTapeData.pop()
        }

        return clonnedTapeData
    }
}

class Operator
{
    static _operator = new Operator()

    static use(rules)
    {
        this._operator.rules = rules
        return this._operator
    }

    setOperation(jenisOperasi)
    {
        this.jenisOperasi = jenisOperasi
        return this
    }

    setContext(context)
    {
        this.context = context
        return this
    }

    setInput(input)
    {
        this.input = input
        this.headIndex = 0
        return this
    }

    setMovement(moveLeft, moveRight)
    {
        this.moveLeft = moveLeft
        this.moveRight = moveRight
        return this
    }

    setWriteHandler(writeHandler)
    {
        this.writeHandler = writeHandler
        return this
    }

    /**
     * Membaca daftar rule operasi yang diberikan, kemudian menjalankan
     * Turing Machine sesuai dengan operasi yang dilakukan.
     */
    async run()
    {
        const interrupted = true

        let currentState = this.rules[this.jenisOperasi]['start-state']
        const endState = this.rules[this.jenisOperasi]['end-state']

        this.context.setStatus('RUNNING')

        while (currentState != endState)
        {
            if (this.context.getStatus() === 'ABORT')
            {
                this.context.setStatus('STOP')
                return interrupted
            }

            await sleep(800)

            // mencegah index out of bound, buat room baru
            // di ujung kiri tape
            if (this.headIndex === -1)
            {
                this.writeHandler(this.headIndex, 'B')
                this.headIndex = 0
            }

            const stateRules = this.rules[this.jenisOperasi]['states'][currentState]
            const input = this.input[this.headIndex]
            let activeRule;

            for (const rule of stateRules)
            {
                if (rule['receive'] == input)
                {
                    activeRule = rule
                    break
                }
            }

            if (!activeRule)
            {
                throw new Error(`state ${currentState} can't receive input ${input}`)
            }

            if (activeRule.hasOwnProperty('write'))
            {
                const textToWrite = activeRule['write'] ?? 'B'
                this.writeHandler(this.headIndex, textToWrite)
            }

            const [stateChanging, nextState] =
                    this.handleStateRuleMovement(currentState, activeRule)

            if (stateChanging)
            {
                if (!this.rules[this.jenisOperasi]['states']
                        .hasOwnProperty(nextState))
                {
                    throw new Error(`unknown next state ${nextState}`)
                }

                currentState = nextState
            }
        }

        this.context.setStatus('STOP')
        return !interrupted
    }

    handleStateRuleMovement(stateName, rule)
    {
        if (!rule.hasOwnProperty('move'))
        {
            throw new Error(`state ${stateName} doesn't specify any movement`)
        }

        const [direction, nextState] = this.parseMovementString(rule['move'])
        if (direction === 'left')
        {
            this.moveLeft()
            this.headIndex--
        }
        else
        {
            this.moveRight()
            this.headIndex++
        }

        let stateChanging = false
        if (nextState)
        {
            stateChanging = true
        }

        return [stateChanging, nextState]
    }

    parseMovementString(movementString)
    {
        const splittedString = movementString.split('->')

        const direction = splittedString[0].trim()

        let nextState = null
        if (splittedString.length > 1)
        {
            nextState = splittedString[1].trim()
        }

        return [direction, nextState]
    }
}

/**
 * Memberikan sinyal kepada operator untuk memberitahukan
 * keadaan dari operasi yang sedang dilakukan (apakah lanjut
 * terus atau operasi harus dihentikan).
 */
class OperatorContext
{
    constructor()
    {
        this.status = 'STOP'
    }

    getStatus()
    {
        return this.status
    }

    setStatus(status)
    {
        this.status = status
    }

    async waitToStop()
    {
        this.setStatus('ABORT')

        while (this.status !== 'STOP')
        {
            await sleep(100)
        }
    }
}

// Mengubah isi dari result box pada DOM.
function fillResultBox(rawValue, cleanValue)
{
    $('#result #value-tape').html(rawValue)
    $('#result #value-number').html(cleanValue)
}

// Memeriksa apakah string yang diberikan berisikan sebuah
// value integer yang valid.
function isIntegerString(text)
{
    return !isNaN(text) && parseInt(text) == text
}

function sleep(ms)
{
    return new Promise(resolve => setTimeout(resolve, ms));
}



// Ini tidak penting sebenarnya, tapi yasudahlah :D
let isErrorImageDisplayed = false

function displayErrorImage()
{
    if (!isErrorImageDisplayed)
    {
        $('#error-image').removeClass('d-none')
        isErrorImageDisplayed = true
    }
}

function removeErrorImage()
{
    if (isErrorImageDisplayed)
    {
        $('#error-image').addClass('d-none')
        isErrorImageDisplayed = false
    }
}
