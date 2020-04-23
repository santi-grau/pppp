import Page from './../Page'

class Writer extends Page{
    constructor( p ){
        super( p )
        document.querySelector( 'textarea' ).addEventListener( 'change', ( e ) => this.emit( 'updateFlow' , { action : 'copyUpdate', data : e.currentTarget.value } ) )
        document.querySelector( 'textarea' ).addEventListener( 'input', ( e ) => this.emit( 'updateFlow' , { action : 'copyUpdate', data : e.currentTarget.value } ) )
    }

    onEnterPage(){
        // setTimeout( () => {
            // this.node.querySelector( 'textarea' ).focus()
        // }, 1000 )
        
    }
}

export { Writer as default }