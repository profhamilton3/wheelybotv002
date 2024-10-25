input.onButtonPressed(Button.A, function () {
    sonar2 = cm_sonarbit()
    if (sonar2 < 25) {
        music.play(music.tonePlayable(262, music.beat(BeatFraction.Whole)), music.PlaybackMode.UntilDone)
    } else {
        music.stopAllSounds()
        music._playDefaultBackground(music.builtInPlayableMelody(Melodies.Nyan), music.PlaybackMode.InBackground)
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
    if (distance < 400) {
        distance = 0
    }
    return Math.floor(distance)
}
let distance = 0
let sonar2 = 0
let sensor_pin = 0
sensor_pin = DigitalPin.P8
wuKong.setLightMode(wuKong.LightMode.BREATH)
wuKong.lightIntensity(100)
wuKong.stopAllMotor()
datalogger.setColumnTitles(
"d",
"distance",
"PinState",
"Pull"
)
basic.forever(function () {
	
})
