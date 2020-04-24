import Page from './../Page'
import domtoimage from 'dom-to-image'

class Save extends Page{
    constructor( p ){
        super( p )
        Object.values( p.querySelectorAll( '.save' ) ).forEach( b => b.addEventListener( 'click', ( e ) => this.share( e ) ) )
    }

    share( e ){
        // console.log( e )
        // var node = document.getElementById('posterPreview')
        // node.classList.add( 'screenshot' )
        // domtoimage.toPng(node)
        // .then(function (dataUrl) {
        //     var img = new Image();
        //     img.src = dataUrl;
        //     img.style.position = 'absolute'
        //     img.style.left = 0
        //     img.style.top = 0
        //     document.body.appendChild(img);
        //     node.classList.remove( 'styleOff' )
        // })
        // .catch(function (error) {
        //     console.error('oops, something went wrong!', error);
        // });

    }
}

export { Save as default }