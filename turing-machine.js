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

    writeToTapeAt(index, text)
    {
        const tapeNullLeftIndex = this.tapeDataArray.length - 1
        const tapeNullRightIndex = this.tapeDataArray.length - 3

        if (index === tapeNullLeftIndex)
        {
            const el = $.parseHTML(this.templateData)
            el.html(text)
            $(this.tapeEl).slick('slickAdd', el, true)
        }
        else if (index === tapeNullRightIndex)
        {
            const el = $.parseHTML(this.templateData)
            el.html(text)
            $(this.tapeEl).slick('slickAdd', el, tapeNullRightIndex, true)
        }
        else
        {
            $(`[data-slick-index=${index}]`).html(text)
        }
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
