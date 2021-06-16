/**
 * Class utama dari keseluruhan aplikasi.
 */
 class TuringMachine
 {
    constructor()
    {
        this.form = new Form('#form')
        this.tape = new TapeController('#tape')

        this.start()
    }

    start()
    {
        this.form.onValidFormData(formData => {
            const {jenisOperasi, bilangan1, bilangan2} = formData
            console.log('operasi: ' + jenisOperasi)
            console.log('data tape: ' + Serializer.serializeInput(jenisOperasi, bilangan1, bilangan2))
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
            return `0${'1'.repeat(bilangan1)}0${'1'.repeat(bilangan2)}`
        }
        // TODO: tambahkan jenis operasi yang lainnya
    }
}

/**
 * Class yang mengendalikan object tape dari turing machine
 */
class TapeController
{
    constructor(tapeEl)
    {
        this.templateNull = $('#template-tape-null').html()
        this.templateData = $('#template-tape-data').html()

        for (let i = 0; i < 7; i++)
        {
            $(tapeEl).append(this.templateNull)
        }

        $(tapeEl).slick({
            arrows: false,
            centerMode: true,
            slidesToShow: 5,
        })
    }
}

// Memeriksa apakah string yang diberikan berisikan sebuah
// value integer yang valid.
function isIntegerString(text)
{
    return !isNaN(text) && parseInt(text) == text
}
