import Page from './../Page'

class Font extends Page{
    constructor( p ){
        super( p )

        this.fontList = this.node.querySelectorAll( 'li' )
        Object.values( this.fontList ).forEach( f => {
            f.addEventListener( 'click', ( e ) => this.selectFont( e ) )
        })
    }

    selectFont( e ){
        this.node.querySelector( 'li.selected' ).classList.remove( 'selected' )
        var font = e.currentTarget.dataset.font
        e.currentTarget.classList.add( 'selected' )
        this.emit( 'updateProp' , { prop : 'font', val : e.currentTarget.dataset.font } )
    }
}

export { Font as default }