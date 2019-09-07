const Handler = require('./Handler');

class AdjustTargetTemperatureHandler extends Handler {
    handles(event) {
        return this.namespaceFor(event) === 'Alexa.ThermostatController' &&
            event.directive.header.name === 'AdjustTargetTemperature' &&
            this.shouldDefer(event);
    }

    async handle(event) {
        try {
            let profile = await this.retrieveProfile(event);
            const service = this.createControlService(profile);
            let targetTempDelta = event.directive.payload.targetSetpointDelta.value;

            const status = await service.status();
            const output = {
                targetTemperature: status.targetTemperature + targetTempDelta,
                currentTemperature: status.currentTemperature
            }
            this.defer(event);

            return this.responseFor(event)
                .with.targetSetpoint(output.targetTemperature)
                .and.currentTemperature(output.currentTemperature)
                .response();
        } catch (e) {
            return this.responseFor(event).as.error(e).response();
        }
    }
}

module.exports = AdjustTargetTemperatureHandler;