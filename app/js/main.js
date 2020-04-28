import Pages from './Pages/*.js'
import Page from './Page'
import Poster from './Poster'

class Flow{ 
    constructor( page = 0 ){
        this.node = document.querySelector( '#mainFlow' )
        this.page = page
        this.pages = []

        var pages = this.node.querySelectorAll( '.page' )
        Object.values( pages ).forEach( p => {
            var pageObject
            if( p.dataset.class ) pageObject = new Pages[ p.dataset.class ].default( p )
            else pageObject = new Page( p )
            pageObject.on( 'updateFlow', ( e ) => this.update( e ) )
            this.pages.push( pageObject )
        })

        this.navigate( 0 )
    }

    update( e ){
        switch( e.action ) {
            case 'copyUpdate':
                poster.updateCopy( e.data )
                break;
            case 'sizeUpdate':
                poster.updateSize( e.data )
                break;
            case 'fontUpdate':
                poster.updateFont( e.data )
                break;
            case 'alignUpdate':
                poster.updateAlign( e.data )
                break;
            case 'colorUpdate':
                poster.updateColor( e.data )
                break;
            default: console.log( 'no idea ')
        }
    }

    navigate( page ){
        this.page = Math.max( 0, Math.min( page, this.pages.length - 1 ) )
        
        var footer = document.querySelector( '#footer' )
        if( this.page == 0 ) footer.dataset.navitype = 'first'
        if( this.page > 0 && this.page < this.pages.length - 1 ) footer.dataset.navitype = 'middle'
        if( this.page == this.pages.length - 1 ) footer.dataset.navitype = 'last'

        var currentPage = this.pages[ this.page ].node
        currentPage.classList.add( 'active' )
        currentPage.classList.remove( 'left' )
        currentPage.classList.remove( 'right' )

        this.pages[ this.page ].onEnterPage()
        // if( this.page > 0 ) this.pages[ this.page - 1 ].onLeavePage()

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

class Menu{
    constructor(){
        this.node = document.querySelector( '#menu' )
        this.pages = []

        var pages = this.node.querySelectorAll( '.page' )
        Object.values( pages ).forEach( p => {
            var pageObject
            if( p.dataset.class ) pageObject = new Pages[ p.dataset.class ].default( p )
            else pageObject = new Page( p )
            // pageObject.on( 'updateFlow', ( e ) => this.update( e ) )
            this.pages.push( pageObject )
        })

        Object.values( document.querySelectorAll( '.menuItem' ) ).forEach( m => {
            m.addEventListener( 'click', ( e ) => {
                this.node.querySelector( '.page[data-pid=menu]' ).classList.add( 'left' )
                this.node.querySelector( '.page[data-pid=menu]' ).classList.remove( 'active' )
                this.node.querySelector( '.page[data-pid=' + e.target.dataset.target + ']' ).classList.remove( 'right' )
                this.node.querySelector( '.page[data-pid=' + e.target.dataset.target + ']' ).classList.add( 'active' )
                footer.dataset.navitype = 'inMenu'

                var headerTitle = document.querySelector( '#pageTitle' )
                headerTitle.innerHTML = this.node.querySelector( '.page[data-pid=' + e.target.dataset.target + ']' ).dataset.title
            } )
        } ) 
    }

    backToHome( ){
        this.node.querySelector( '.active' ).classList.add( 'right' )
        this.node.querySelector( '.active' ).classList.remove( 'active' )
        this.node.querySelector( '.page[data-pid=menu]' ).classList.remove( 'left' )
        this.node.querySelector( '.page[data-pid=menu]' ).classList.add( 'active' )
        footer.dataset.navitype = 'none'
        var headerTitle = document.querySelector( '#pageTitle' )
        headerTitle.innerHTML = 'Menu'
    }

    toggleActive( ){
        this.node.classList.toggle( 'active' )
        if( this.node.classList.contains( 'active' ) ){
            var footer = document.querySelector( '#footer' )
            footer.dataset.navitype = 'none'

            var header = document.querySelector( '#header' )
            header.classList.add( 'inMenu' )

            var headerTitle = document.querySelector( '#pageTitle' )
            headerTitle.classList.remove( 'main' )
            headerTitle.innerHTML = 'Menu'

        } else {
            var header = document.querySelector( '#header' )
            header.classList.remove( 'inMenu' )
            flow.navigate( flow.page )
        }
    }
}

var poster = new Poster()
var flow = new Flow()
var menu = new Menu()

document.querySelector( '.arrow.right' ).addEventListener( 'click', ( ) => flow.navigate( ++flow.page ) )
document.querySelector( '.arrow.left' ).addEventListener( 'click', ( ) => flow.navigate( --flow.page ) )
document.querySelector( '.arrow.menu' ).addEventListener( 'click', ( ) => menu.backToHome( ) )
document.querySelector( '#menuBut' ).addEventListener( 'click', ( ) => menu.toggleActive() )

// menu.toggleActive()
