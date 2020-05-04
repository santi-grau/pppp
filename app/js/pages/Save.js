import Page from './../Page'
import domtoimage from 'dom-to-image'

class Save extends Page{
    constructor( p ){
        super( p )
        Object.values( p.querySelectorAll( '.save' ) ).forEach( b => b.addEventListener( 'click', ( e ) => this.share( e ) ) )
        // this.emit( 'updateFlow' , { action : 'posterExport', data : 'svg' } )
    }

    onEnterPage(){
        this.emit( 'updateFlow' , { action : 'posterExport', data : 'svg' } )
    }

    share( e ){
        console.log( e.target.dataset.format )
        this.emit( 'updateFlow' , { action : 'posterExport', data : e.target.dataset.format } )
    }
}

export { Save as default }