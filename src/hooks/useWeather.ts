import axios from "axios"

export default function useWeather() {

    const fetchWeather = async () => {
        try {
            const geoURL = `http://api.openweathermap.org/geo/1.0/direct?q=${cityname},${statecode},${countrycode}&limit=${limit}&appid=${APIkey}`
        } catch (error) {
            console.log(error)            
        }
    }

    return {
        fetchWeather
    }
}

