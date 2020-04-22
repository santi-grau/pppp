import EventEmitter from 'EventEmitter'

class Page extends EventEmitter{
    constructor( node ){
        super()
        this.node = node
    }
}

export { Page as default }