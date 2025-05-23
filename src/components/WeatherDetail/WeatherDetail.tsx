import { Weather } from "../../hooks/useWeather"
import { formatTemperature } from "../../utils"
import styles from './WeatherDetail.module.css'

type WeatherDetailProps = {
    weather: Weather
}

export default function WeatherDetail({weather}: WeatherDetailProps) {
    return (
        <div className={styles.container}>
            <h2>Clima de: {weather.name}</h2>
            <p className={styles.current}>{formatTemperature(weather.main.temp)} °C</p>
            <div className={styles.temperatures}>
                <p>Mínima: <span>{formatTemperature(weather.main.temp_min)} °C</span></p>
                <p>Máxima: <span>{formatTemperature(weather.main.temp_max)} °C</span></p>
            </div>            
        </div>
    )
}
