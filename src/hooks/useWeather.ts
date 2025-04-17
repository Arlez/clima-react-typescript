import axios from "axios"
import { object, string, number, InferOutput, parse } from "valibot"
import { SearchType } from "../types"
import { useMemo, useState } from "react"

//schema valibot
const WeatherSchema = object({
    name: string(),
    main: object({
        temp: number(),
        temp_max: number(),
        temp_min: number()
    })
})

const initialState = {
    name: '',
    main: {
        temp: 0,
        temp_max: 0,
        temp_min: 0
    }
}
export type Weather = InferOutput<typeof WeatherSchema>

export default function useWeather() {
    const [weather, setWeather] = useState<Weather>(initialState)
    const [loading, setLoading] = useState(false)
    const [notFound, setNotFound] = useState(false)

    const fetchWeather = async (search: SearchType) => {
        setLoading(true) 
        setWeather(initialState)
        setNotFound(false)
        const appId = import.meta.env.VITE_API_KEY
        try {
            const geoURL = `http://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&appid=${appId}`
            
            const {data} = await axios.get(geoURL)
            
            if(data.length == 0){
                setNotFound(true)
            }

            const lat = data[0].lat
            const lon = data[0].lon

            const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appId}`

            const { data: weatherResult } = await axios(weatherUrl)
            const result = parse(WeatherSchema, weatherResult)
            
            if(result){
                setWeather(result)                           
            }   
        } catch (error) {
            console.log(error)            
        } finally{
            setLoading(false)
        }
    }

    const hasWeatherData = useMemo(()=> weather.name, [weather])

    return {
        weather,
        loading,
        notFound,
        fetchWeather,
        hasWeatherData
    }
}

