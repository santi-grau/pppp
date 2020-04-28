import Page from './../Page'

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


class Gallery extends Page{
    constructor( p ){
        super( p )

        var images = 20
        for( var i = 0 ; i < 20 ; i++ ){
            this.addItem( i )
        }
    }

    addItem( i ){

        var list = this.node.querySelector( 'ul' )

        var listItem = document.createElement( 'li' )
        listItem.classList.add( 'poster', 'clearfix' )

        var topContainer = document.createElement( 'div' )
        topContainer.classList.add( 'title', 'clearfix' )
        listItem.appendChild( topContainer )

        var date = document.createElement( 'span' )
        date.classList.add( 'date' )
        date.innerHTML = '01.01.20'
        topContainer.appendChild( date )
        
        var util = document.createElement( 'span' )
        util.classList.add( 'util' )
        topContainer.appendChild( util )
        util.innerHTML = 'Descarga '

        var linkjpg = document.createElement( 'a' )
        linkjpg.setAttribute( 'href', 'javascript : void( 0 )')
        linkjpg.innerHTML = 'JPG '
        util.appendChild( linkjpg )

        var linkpdf = document.createElement( 'a' )
        linkpdf.setAttribute( 'href', 'javascript : void( 0 )')
        linkpdf.innerHTML = 'PDF '
        util.appendChild( linkpdf )

        var imgCont = document.createElement( 'div' )
        imgCont.classList.add( 'imgCont' )
        listItem.appendChild( imgCont )

        var img = document.createElement( 'img' )
        img.setAttribute( 'src', 'https://picsum.photos/seed/' + Math.floor( Math.random( ) * 100 ) + '/297/420' )
        img.setAttribute( 'width', '100%' )
        img.setAttribute( 'height', 'auto' )

        imgCont.appendChild( img )

        list.appendChild( listItem )
        
    }
}

export { Gallery as default }