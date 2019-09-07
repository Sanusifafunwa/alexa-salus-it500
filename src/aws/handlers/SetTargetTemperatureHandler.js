const Handler = require('./Handler');

class SetTargetTemperatureHandler extends Handler {
    handles(event) {
        return this.namespaceFor(event) === 'Alexa.ThermostatController' &&
            event.directive.header.name === 'SetTargetTemperature' &&
            this.handleImmediately(event);
    }

    async handle(event) {
        try {
            let profile = await this.retrieveProfile(event);
            const service = this.createControlService(profile);
            let targetTemp = event.directive.payload.targetSetpoint.value;
            let optionalDuration = null;
            if (event.directive.payload.schedule) {
                optionalDuration = event.directive.payload.schedule.duration;
            }
            const output = await service.setTemperature(targetTemp, optionalDuration);
            return this.responseFor(event)
                .with.targetSetpoint(output.targetTemperature)
                .and.currentTemperature(output.currentTemperature)
                .response();
        } catch (e) {
            return this.responseFor(event).as.error(e).response();
        }
    };
}

module.exports = SetTargetTemperatureHandler;