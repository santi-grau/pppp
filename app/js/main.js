// connect to drive
// var api_key = 'AIzaSyC8y5mzWn4GeKgezS4_s1j0OZ4wg5cATVY';
// var folderId = '1ii9A3fpD-l_otRUCC-n-96pYtpBp4uTh';
// var url = "https://www.googleapis.com/drive/v3/files?q='" + folderId + "'+in+parents&key=" + api_key;

// fetch(url).then(function(response) { return response.json(); }).then(function(myJson) {
//     console.log(myJson);
//     myJson.files.forEach( f => {
//         if( f.mimeType !== 'image/png' && f.mimeType !== 'image/jpg' ) return
//         console.log( f )
//         var url2 = "https://drive.google.com/uc?id=" + f.id ;
        
//         var im = new Image()
//         document.body.appendChild( im )
//         im.src = url2
//     })
// });
import Pages from './Pages/*.js'
import Page from './Page'

class PosterPreview{
    constructor(){
        this.node = document.getElementById( 'posterPreview' )
    }

    updateCopy( copy ){
        this.node.innerHTML = copy
    }

    updateSize( size ){
        this.node.style.transform = 'translate3d( -50%, -50%, 0 ) scale( ' + size + ' )'
    }

    updateFont( font ){
        this.node.className = font
    }

    updateAlign( dir ){
        this.node.style.textAlign = dir
    }
}

class Flow{ 
    constructor( page = 0 ){
        this.page = page
        this.pages = []

        var pages = document.querySelectorAll( '.page' )
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
                posterPreview.updateCopy( e.data )
                break;
            case 'sizeUpdate':
                posterPreview.updateSize( e.data )
                break;
            case 'fontUpdate':
                posterPreview.updateFont( e.data )
                break;
            case 'alignUpdate':
                posterPreview.updateAlign( e.data )
                break;
            default: console.log( 'no idea ')
        }
    }

    navigate( page ){
        this.page = Math.max( 0, Math.min( page, this.pages.length - 1 ) )
        
        var footer = document.querySelector( '#footer' )
        if( this.page == 0 ) footer.dataset.navitype = 'first'
        if( this.page > 0 && this.page < this.pages.length - 1 ) footer.dataset.navitype = ''
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

var posterPreview = new PosterPreview()
var flow = new Flow()
document.querySelector( '.arrow.right' ).addEventListener( 'click', ( ) => flow.navigate( ++flow.page ) )
document.querySelector( '.arrow.left' ).addEventListener( 'click', ( ) => flow.navigate( --flow.page ) )
document.querySelector( '#menuBut' ).addEventListener( 'click', ( ) => console.log( 'here' ) )
