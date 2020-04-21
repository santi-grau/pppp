import { CompressedTextureLoader } from "three"

class Page{
    constructor( node ){
        this.node = node
    }
}

class Flow{
    constructor( page = 0 ){
        this.page = page
        this.pages = []

        var pages = document.querySelectorAll( '.page' )
        Object.values( pages ).forEach( p => {
            this.pages.push( new Page( p ) )
        })

        this.navigate( 0 )
    }

    navigate( page ){
        this.page = Math.max( 0, Math.min( page, this.pages.length - 1 ) )
        
        var footer = document.querySelector( '#footer' )
        if( this.page == 0 ) footer.dataset.navitype = 'first'
        if( this.page == this.pages.length - 1 ) footer.dataset.navitype = 'last'

        var currentPage = this.pages[ this.page ].node
        currentPage.classList.add( 'active' )
        currentPage.classList.remove( 'left' )
        currentPage.classList.remove( 'right' )

        for( var i = 0 ; i < this.page ; i++ ){
            this.pages[ i ].node.classList.remove( 'active' )
            this.pages[ i ].node.classList.add( 'left' )
        }
        
        for( var i = this.page + 1 ; i < this.pages.length ; i++ ){
            this.pages[ i ].node.classList.remove( 'active' )
            this.pages[ i ].node.classList.add( 'right' )
        }

        var headerTitle = document.querySelector( '#pageTitle' )
        headerTitle.classList.toggle( 'main', this.page == 0 ) 
        headerTitle.innerHTML = currentPage.dataset.title
        
    }
}


var flow = new Flow()
document.querySelector( '.arrow.right' ).addEventListener( 'click', ( ) => flow.navigate( ++flow.page ) )
document.querySelector( '.arrow.left' ).addEventListener( 'click', ( ) => flow.navigate( --flow.page ) )