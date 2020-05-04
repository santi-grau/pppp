import Page from './../Page'

class Writer extends Page{
    constructor( p ){
        super( p )
        this.textarea = this.node.querySelector( 'textarea' )
        this.textarea.addEventListener( 'change', ( e ) => this.input( e ) )
        this.textarea.addEventListener( 'input', ( e ) => this.input( e ) )
    }

    updateBox(){
        setTimeout( () => { 
            this.textarea.style.cssText = 'height:auto; padding:0'
            this.textarea.style.cssText = 'height:' + this.textarea.scrollHeight + 'px';
        } , 1 )
    }

    input( e ){
        this.emit( 'updateFlow' , { action : 'copyUpdate', data : this.textarea.value } )
    }
}

export { Writer as default }