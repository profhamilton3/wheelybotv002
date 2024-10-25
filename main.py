def on_button_pressed_a():
    global sonar2
    sonar2 = cm_sonarbit()
    if sonar2 < 25:
        music.play(music.tone_playable(262, music.beat(BeatFraction.WHOLE)),
            music.PlaybackMode.UNTIL_DONE)
    else:
        music.stop_all_sounds()
        music._play_default_background(music.built_in_playable_melody(Melodies.NYAN),
            music.PlaybackMode.IN_BACKGROUND)
input.on_button_pressed(Button.A, on_button_pressed_a)

def cm_sonarbit():
    global sensor_pin, distance
    sensor_pin = DigitalPin.P8
    pins.set_pull(sensor_pin, PinPullMode.PULL_NONE)
    pins.digital_write_pin(sensor_pin, 0)
    control.wait_micros(2)
    pins.digital_write_pin(sensor_pin, 1)
    control.wait_micros(10)
    pins.digital_write_pin(sensor_pin, 0)
    d = pins.pulse_in(sensor_pin, PulseValue.HIGH, 25000)
    distance = d / 58
    if distance < 400:
        distance = 0
    return Math.floor(distance)
distance = 0
sonar2 = 0
sensor_pin = 0
sensor_pin = DigitalPin.P8
wuKong.set_light_mode(wuKong.LightMode.BREATH)
wuKong.light_intensity(100)
wuKong.stop_all_motor()
datalogger.set_column_titles("d", "distance")

def on_forever():
    pass
basic.forever(on_forever)
