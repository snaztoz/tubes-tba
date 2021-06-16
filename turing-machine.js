/**
 * Class utama dari keseluruhan aplikasi.
 */
 class TuringMachine
 {
    constructor(operationRules)
    {
        this.form = new Form('#form')
        this.tape = new TapeController('#tape', operationRules)

        this.start()
    }

    start()
    {
        this.form.onValidFormData(formData => {
            const {jenisOperasi, bilangan1, bilangan2} = formData
            const tapeString = Serializer
                    .serializeInput(jenisOperasi, bilangan1, bilangan2)

            this.tape.setOperation(jenisOperasi, tapeString)
            this.tape.run()
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
            'pembagian': ['required-both'],

            'faktorial': ['required-first', 'positive'],

            'modulo': ['required-both', 'positive'],
            'perpangkatan': ['required-both', 'positive'],
            'logaritma-biner': ['required-both', 'positive'],
        }
    }

    onValidFormData(callback)
    {
        $(`${this.el} #form-submit`).click(event => {
            event.preventDefault()

            const {isValid, data} = this.validate({
                jenisOperasi: $(`${this.el} #jenis-operasi`).val(),
                bilangan1: $(`${this.el} #bilangan-1`).val().trim(),
                bilangan2: $(`${this.el} #bilangan-2`).val().trim(),
            })

            if (!isValid)
            {
                // TODO: tampilkan error di form
                console.log('err: ' + data.err)
                return
            }

            callback(data)
        })
    }

    /**
     * Menjalankan validasi untuk elemen operasi yang diberikan.
     *
     * Akan mengembalikan object yang berisikan:
     *
     *      isValid -> valid atau tidaknya operasi
     *      data    -> jika valid, akan berisikan data elemen operasi
     *                 jika error, akan berisikan pesan error
     */
    validate(operationElements)
    {
        let isValid = false;

        if (!this.operationValidationRules
                .hasOwnProperty(operationElements.jenisOperasi))
        {
            return {isValid, data: {'err': 'unknown operation'}}
        }

        const jenisOperasi = operationElements.jenisOperasi
        const bilangan1 = operationElements.bilangan1
        const bilangan2 = operationElements.bilangan2

        const rules = this.operationValidationRules[jenisOperasi]

        for (const rule of rules)
        {
            const isRuleValidationPass = this.runRuleValidation(rule, bilangan1, bilangan2)
            if (!isRuleValidationPass)
            {
                return {isValid, data: {'err': 'invalid input'}}
            }
        }

        isValid = true

        return {
            isValid,
            data: {jenisOperasi, bilangan1, bilangan2}
        }
    }

    runRuleValidation(rule, bilangan1, bilangan2)
    {
        if (rule === 'required-both')
        {
            return isIntegerString(bilangan1) && isIntegerString(bilangan2)
        }
        else if (rule === 'required-first')
        {
            return isIntegerString(bilangan1)
        }
        else if (rule === 'positive')
        {
            return parseInt(bilangan1) > 0 && parseInt(bilangan2) > 0
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
    static serializeInput(jenisOperasi, bilangan1, bilangan2)
    {
        if (jenisOperasi === 'penjumlahan')
        {
            // TODO: tambahkan support untuk perhitungan negatif
            return `${'1'.repeat(bilangan1)}0${'1'.repeat(bilangan2)}`
        }
        // TODO: tambahkan jenis operasi yang lainnya
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
        this.tapeDataArray = 'B'.repeat(7).split('')
        this.operationRules = operationRules

        this.templateNull = $('#template-tape-null').html()
        this.templateData = $('#template-tape-data').html()

        $(this.tapeEl).slick({
            arrows: false,
            centerMode: true,
            slidesToShow: 5,
        })

        for (let i = 0; i < this.tapeDataArray.length; i++)
        {
            $(this.tapeEl).slick('slickAdd', this.templateNull)
        }
    }

    setOperation(jenisOperasi, tapeString)
    {
        this.jenisOperasi = jenisOperasi
        this.tapeDataArray = tapeString.split('').concat('B', 'B', 'B', 'B')

        this.applyTapeData()
    }

    /**
     * Mengaplikasikan isi dari this.tapeDataArray ke dalam
     * tape pada DOM.
     */
    applyTapeData()
    {
        this.emptyTape()

        this.tapeDataArray.forEach(data => {
            let el;

            if (data === 'B')
            {
                el = this.templateNull
            }
            else
            {
                el = $.parseHTML(this.templateData)
                $(el).html(data)
            }

            $(this.tapeEl).slick('slickAdd', el)
        })
    }

    run()
    {
        Operator
            .use(this.operationRules)
            .setOperation(this.jenisOperasi)
            .setInput(this.tapeDataArray)
            .setMovement(
                () => this.moveLeft(),
                () => this.moveRight()
            )
            .setWriteHandler(this.writeToTapeAt.bind(this))
            .run()
    }

    emptyTape()
    {
        for (let i = this.tapeDataArray.length - 1; i >= 0; i--)
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
     * Method ini akan mengubah baik value di dalam this.tapeDataArray
     * ataupun representasinya di dalam DOM itu sendiri.
     */
    writeToTapeAt(index, text)
    {
        const tapeStart = this.tapeDataArray.length - 1
        const tapeEnd = this.tapeDataArray.length - 4

        if (index === tapeStart)
        {
            this.writeToNewRoomAt(0, text)
        }
        else if (index === tapeEnd)
        {
            this.writeToNewRoomAt(tapeEnd, text)
        }
        else
        {
            this.tapeDataArray[index] = text
            $(`[data-slick-index=${index}]`).html(text)
        }
    }

    /**
     * Membuat ruang baru sekaligus menuliskan isinya.
     *
     * Seperti method this.writeToTapeAt, method ini juga akan
     * mengubah value di this.tapeDataArray dan juga pada tape
     * di DOM.
     */
    writeToNewRoomAt(index, text)
    {
        this.tapeDataArray.splice(index, 0, text)

        const el = $.parseHTML(this.templateData)
        $(el).html(text)
        $(this.tapeEl).slick('slickAdd', el, index, true)
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
     * Membaca rule operasi yang diberikan, kemudian menjalankan
     * Turing Machine sesuai dengan rules yang diberikan.
     */
    async run()
    {
        let currentState = this.rules[this.jenisOperasi]['start-state']
        const endState = this.rules[this.jenisOperasi]['end-state']

        while (currentState != endState)
        {
            await sleep(1000)

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

            if (!activeRule.hasOwnProperty('move'))
            {
                throw new Error(`state ${currentState} doesn't specify any movement`)
            }

            const {direction, nextState} = this.parseMovement(activeRule['move'])
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

            if (nextState)
            {
                if (!this.rules[this.jenisOperasi]['states']
                        .hasOwnProperty(nextState))
                {
                    throw new Error(`unknown next state ${nextState}`)
                }

                currentState = nextState
            }
        }
    }

    parseMovement(movementString)
    {
        const splittedString = movementString.split('->')

        if (splittedString.length === 1)
        {
            return {
                direction: splittedString[0].trim(),
                nextState: null
            }
        }
        else
        {
            return {
                direction: splittedString[0].trim(),
                nextState: splittedString[1].trim()
            }
        }
    }
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
