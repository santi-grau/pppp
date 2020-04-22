import Page from './../Page'

class Size extends Page{
    constructor( p ){
        super( p )

        this.scale = 1

        this.selectors = this.node.querySelectorAll( '.selector' )
        Object.values( this.selectors ).forEach( s => {
            s.addEventListener( 'click', ( e ) => this.selectSize( e ) )
        })
        
    }

    selectSize( e ){
        console.log( e )
        if( e.currentTarget.dataset.action == 'more' ) this.scale *= 1.2
        if( e.currentTarget.dataset.action == 'less' ) this.scale /= 1.2

        this.node.querySelector( '.posterPreview' ).style.transform = 'translate3d( -50%, -50%, 0 ) scale( ' + this.scale + ' )'
        // this.node.querySelector( 'li.selected' ).classList.remove( 'selected' )
        // var font = e.currentTarget.dataset.font
        // e.currentTarget.classList.add( 'selected' )
        // this.emit( 'updateProp' , { prop : 'font', val : e.currentTarget.dataset.font } )
    }
}

export { Size as default }