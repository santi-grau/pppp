import Page from './../Page'

class Color extends Page{
    constructor( p ){
        super( p )

        this.colorList = this.node.querySelectorAll( 'li' )
        Object.values( this.colorList ).forEach( f => {
            f.style.backgroundColor = f.dataset.color
            f.addEventListener( 'click', ( e ) => this.selectColor( e ) )
        })
    }

    selectColor( e ){
        this.node.querySelector( 'li.selected' ).classList.remove( 'selected' )
        var font = e.currentTarget.dataset.font
        e.currentTarget.classList.add( 'selected' )
        this.emit( 'updateProp' , { prop : 'font', val : e.currentTarget.dataset.font } )
    }
}

export { Color as default }