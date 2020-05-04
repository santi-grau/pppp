
import TextToSVG from 'text-to-svg'
import helvetica from './../assets/HelveticaNowTextBold.otf'
import geogrotesque from './../assets/geogrotesque.otf'
import marsh from './../assets/marsh.otf'
import butler from './../assets/butler.otf'
import cooper from './../assets/cooper.otf'
import dmserif from './../assets/dmserif.ttf'
import archicoco from './../assets/archicoco.otf'
import kmstandard from './../assets/kmstandard.otf'
import librefranklin from './../assets/librefranklin.ttf'
import prismaset from './../assets/prismaset.otf'
import trim from './../assets/trim.otf'


import { saveSvgAsPng, svgAsPngUri } from 'save-svg-as-png'
import jsPDF from 'jspdf'

var fonts = { 
    helvetica : helvetica, 
    geogrotesque : geogrotesque, 
    marsh : marsh, 
    prismaset : prismaset, 
    trim : trim,
    butler : butler,
    cooper : cooper,
    dmserif : dmserif,
    archicoco : archicoco,
    kmstandard : kmstandard,
    librefranklin : librefranklin
}

class Poster{
    constructor(){
        this.size = 46
        this.space = -1.5
        this.height = 50
    }

    updateCopy( copy ){
        Object.values( document.querySelectorAll( '.poster.editor' ) ).forEach( p => { p.value = copy } )
    }

    updateSize( size ){
        Object.values( document.querySelectorAll( '.poster' ) ).forEach( p => { 
            p.style[ 'font-size' ] = 46 * size + 'px'
            p.style[ 'letter-spacing' ] = -1.5 * size + 'px'
            p.style[ 'line-height' ] = 50 * size + 'px'
        } )
        // this.posterExport( null )
    }

    updateFont( font ){
        Object.values( document.querySelectorAll( '.poster' ) ).forEach( p => { p.dataset.font = font } )
        // this.posterExport( null )
    }

    updateAlign( dir ){
        Object.values( document.querySelectorAll( '.poster' ) ).forEach( p => { p.style. textAlign = dir; console.log( p ) } )
        // this.posterExport( null )
    }

    updateColor( data ){
        Object.values( document.querySelectorAll( '.poster' ) ).forEach( p => {
            p.parentNode.style.backgroundColor = data.background
            p.style.color = data.foreground
        })
        // this.posterExport( null )
    }

    posterExport( format ){
    
        var textarea = document.querySelectorAll( '.poster' )[ 0 ]
        
        var composerText = document.getElementById( 'composerText' )
        composerText.style.width =  textarea.parentNode.getBoundingClientRect().width + 'px'
        composerText.style.height = textarea.parentNode.getBoundingClientRect().height + 'px'

        var inner = document.getElementById( 'composerInner' )
        inner.style.width =  textarea.getBoundingClientRect().width + 'px'
        inner.style.height = textarea.getBoundingClientRect().height + 'px'

        var svgns = 'http://www.w3.org/2000/svg'
        var vector = document.getElementsByTagName( 'svg' )[ 0 ]
        vector.setAttribute( 'width',  textarea.parentNode.getBoundingClientRect().width )
        vector.setAttribute( 'height', textarea.parentNode.getBoundingClientRect().height )

        const style = getComputedStyle( textarea )
        while (vector.lastChild) vector.removeChild( vector.lastChild )
        // console.log( style, style.backgroundColor )
        
        var rect = document.createElementNS( svgns, 'rect' );
        rect.setAttributeNS( null, 'width', textarea.parentNode.getBoundingClientRect().width )
        rect.setAttributeNS( null, 'height', textarea.parentNode.getBoundingClientRect().height )
        rect.setAttributeNS( null, 'fill', getComputedStyle( textarea.parentNode ).backgroundColor )
        vector.appendChild( rect )
        
        inner.style[ 'font-size' ] = textarea.style[ 'font-size' ]
        inner.dataset.font = textarea.dataset.font
        inner.style[ 'letter-spacing' ] = textarea.style[ 'letter-spacing' ]
        inner.style[ 'line-height' ] = textarea.style[ 'line-height' ]
        inner.style[ 'text-align' ] = textarea.style[ 'text-align' ]
        // console.log( slugify( textarea.value ) )
        document.body.appendChild( composerText )

        var content = textarea.value.split('')
        inner.innerHTML = ''
        
        content.forEach( g => {
            var skipGlyph = false
            var s = document.createElement( 'span' )
            s.innerHTML = g
            inner.appendChild( s )
            if( g.indexOf('\n') >= 0 ){
                s.innerHTML = '<br/>'
                skipGlyph = true
            }

            if( g.indexOf(' ') >= 0 ){
                s.innerHTML = ' '
                skipGlyph = true
            }

            if( !skipGlyph ){
                TextToSVG.load( fonts[ textarea.dataset.font ], ( err, textToSVG ) => {
                    const attributes = { fill: style.color }
                    const options = { 
                        x : s.offsetLeft + 5, 
                        y : s.offsetTop + 5, 
                        fontSize: parseInt( style.fontSize ), 
                        attributes: attributes,
                        anchor : 'left top'
                    }

                    var path = new DOMParser().parseFromString( textToSVG.getSVG( g, options ), 'image/svg+xml').querySelector( 'path' )
                    vector.appendChild( path )
                })
            }
        })
        var title = this.slugify( textarea.value )
        setTimeout( () => {
            if( format == 'png' ) this.downloadPNG( vector, title )
            if( format == 'pdf' ) this.downloadPDF( vector, title )
            if( format == 'svg' ) this.downloadSVG( vector, title )
        }, 1000 )
        
    }

    slugify( string ) {
        const a = 'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;', b = 'aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------',p = new RegExp(a.split('').join('|'), 'g')
        return string.toString().toLowerCase().replace(/\s+/g, '-').replace(p, c => b.charAt(a.indexOf(c))).replace(/&/g, '-and-').replace(/[^\w\-]+/g, '').replace(/\-\-+/g, '-').replace(/^-+/, '').replace(/-+$/, '')
    }

    downloadPDF( svg, title ){
        var pdf = new jsPDF({ orientation : 'portrait', unit : 'mm', format : 'a3' } )
        
        svg.querySelector( 'rect' ).setAttribute( 'fill', 'rgb( 2555, 255, 255 )' )

        Object.values( svg.querySelectorAll( 'path' ) ).forEach( l => {
            console.log( l.setAttribute( 'fill', 'rgb( 0, 0, 0 )' ) ) 
        })
        
        svgAsPngUri( svg, { scale: 2 } ).then( uri => {
            pdf.addImage( uri, 'png', 0, 0, 297, 420, 'alias', 'NONE', 0 )
            pdf.save( title + '.pdf');
        } )
    }

    downloadSVG( svg, title ){
        fetch('https://cors-anywhere.herokuapp.com/https://radiant-springs-85452.herokuapp.com/api',{ 
        // fetch('http://localhost:5000/api',{ 
            method: 'post', 
            body: JSON.stringify( { 
                data : new XMLSerializer().serializeToString( svg ),
                title : title,
                description : 'pais, fecha, etc'
            } ),
            headers: {'Content-Type': 'application/json'}
            
        } ).then( function(response) { 
            
            if( response.status == 200 ) console.log( response )
        } )
    }

    downloadPNG( svg, title ){
        saveSvgAsPng( svg, title + '.png', { scale: 0.5 } )
    }
}


export { Poster as default }