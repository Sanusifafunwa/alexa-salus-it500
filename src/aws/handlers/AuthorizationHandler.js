const Handler = require('./Handler');

class AuthorizationHandler extends Handler {
    handles(event) {
        return this.namespaceFor(event) === 'Alexa.Authorization';
    }

    async handle(event) {
        return this.responseFor(event).and.acceptAuthorizationRequest().response();
    }
}

module.exports = AuthorizationHandler;