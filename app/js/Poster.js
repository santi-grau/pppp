class Poster{
    constructor(){
        this.node = document.getElementById( 'posterPreview' )
        this.inner = this.node.querySelector( '.inner' )
        console.log( this.inner.innerHTML.split( ' ' ) )
        this.instances = document.querySelectorAll( 'svg.poster' )
        this.instances.forEach( p => {
            p.setAttribute( 'width', this.node.offsetWidth )
            p.setAttribute( 'height', this.node.offsetHeight )
        })
    }

    updateCopy( copy ){
        this.inner.innerHTML = copy
        
    }

    updateSize( size ){
        this.inner.style.transform = 'translate3d( -50%, -50%, 0 ) scale( ' + size + ' )'
    }

    updateFont( font ){
        this.inner.className = font
    }

    updateAlign( dir ){
        this.inner.style.textAlign = dir
    }

    updateColor( data ){
        this.node.style.backgroundColor = data.background
        this.node.style.color = data.foreground
    }
}


export { Poster as default }