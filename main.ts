music.onEvent(MusicEvent.BackgroundMelodyEnded, function () {
    wuKong.setAllMotor(-10, -25)
    basic.pause(1000)
    wuKong.stopAllMotor()
})
datalogger.onLogFull(function () {
    datalogger.deleteLog(datalogger.DeleteType.Fast)
})
input.onButtonPressed(Button.A, function () {
    sonar2 = cm_sonarbit()
    basic.showNumber(sonar2)
    if (sonar2 < 20) {
        GO = false
    } else {
        GO = true
        music._playDefaultBackground(music.builtInPlayableMelody(Melodies.PowerUp), music.PlaybackMode.UntilDone)
    }
})
function cm_sonarbit () {
    sensor_pin = DigitalPin.P8
    pins.setPull(sensor_pin, PinPullMode.PullNone)
    pins.digitalWritePin(sensor_pin, 0)
    control.waitMicros(2)
    pins.digitalWritePin(sensor_pin, 1)
    control.waitMicros(10)
    pins.digitalWritePin(sensor_pin, 0)
    let d = pins.pulseIn(sensor_pin, PulseValue.High, 25000)
distance = d / 58
    datalogger.log(
    datalogger.createCV("d", d),
    datalogger.createCV("distance", distance),
    datalogger.createCV("PinState", pins.digitalReadPin(sensor_pin)),
    datalogger.createCV("Pull", 0)
    )
    if (distance > 400) {
        distance = 0
    }
    return Math.floor(distance)
}
input.onButtonPressed(Button.B, function () {
    wuKong.stopAllMotor()
})
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    GO = true
})
let distance = 0
let sonar2 = 0
let GO = false
let sensor_pin = 0
sensor_pin = DigitalPin.P8
wuKong.setLightMode(wuKong.LightMode.BREATH)
wuKong.stopAllMotor()
GO = false
datalogger.setColumnTitles(
"d",
"distance",
"PinState",
"Pull"
)
wuKong.lightIntensity(100)
basic.showIcon(IconNames.Fabulous)
basic.forever(function () {
    if (GO) {
        wuKong.setAllMotor(65, 65)
        basic.pause(200)
        if (cm_sonarbit() < 15) {
            GO = false
            wuKong.stopAllMotor()
            music._playDefaultBackground(music.builtInPlayableMelody(Melodies.PowerDown), music.PlaybackMode.InBackground)
        } else {
            GO = true
        }
    }
})
