/**
 * Class utama dari keseluruhan aplikasi.
 */
 class TuringMachine
 {
     constructor()
     {
         this.form = new Form('#form')
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
        this.init()
    }

    init()
    {
        $(`${this.el} #form-submit`).click(event => {
            event.preventDefault()
            console.log('CLICKED')
        })
    }
}
