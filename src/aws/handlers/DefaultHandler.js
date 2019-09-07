const Handler = require('./Handler');

class DefaultHandler extends Handler {
    handles(event) {
        return true;
    }

    async handle(event) {
        return this.responseFor(event).as.error({
            message: 'Event is unhandled'
        }).response();
    };
}

module.exports = DefaultHandler;