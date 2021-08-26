const input = document.querySelector('input')
const btn = document.querySelector('button')
const cityName = document.querySelector('.city-name')
const warning = document.querySelector('.warning')
const photo = document.querySelector('.photo')
const weather = document.querySelector('.weather')
const temperature = document.querySelector('.temp')
const humidity = document.querySelector('.humidity')
const apiLink = 'https://api.openweathermap.org/data/2.5/weather?q='
const apiKey = '&APPID=7cda8be55f8bae57ca440ea99b890cc2'
const units = '&units=metric'
let city;
let url;
let weatherPhoto;

const getWeather = ()=>{
    city=(input.value) ? input.value : 'Rome'
    url = apiLink + city + apiKey + units;

    axios.get(url)
    .then(res=> {
        const temp = res.data.main.temp
        const hum = res.data.main.humidity
        console.log(res)

        cityName.textContent = res.data.name
        temperature.textContent = `${temp.toFixed(0)}°C`
        humidity.textContent = `${hum}%`
        weather.textContent = res.data.weather[0].main
        weatherPhoto = res.data.weather[0].id;
        warning.textContent = ''
        input.value = ''

        if(weatherPhoto>=200 && weatherPhoto<300){
            photo.setAttribute('src', 'thunderstorm.png')
        } else if (weatherPhoto>=300 && weatherPhoto <400){
            photo.setAttribute('src', 'drizzle.png')
        } else if (weatherPhoto>=500 && weatherPhoto<600){
            photo.setAttribute('src', 'rain.png')
        } else if (weatherPhoto>=600 && weatherPhoto<700){
            photo.setAttribute('src', 'snow.png')
        } else if (weatherPhoto>=700 && weatherPhoto<800){
            photo.setAttribute('src', 'fog.png')
        } else if (weatherPhoto=800){
            photo.setAttribute('src', 'sun.png')
        } else if (weatherPhoto>800 && weatherPhoto<900){
            photo.setAttribute('src', 'cloud.png')
        } else{
            photo.setAttribute('src', 'unknown.png')
        }
        
    }).catch(() => warning.textContent= `Enter a valid city name` )
}
getWeather()
btn.addEventListener('click', getWeather)

const enterCheck = () => {
    if(event.keyCode=== 13){
        getWeather();
    }
}
input.addEventListener('keyup', enterCheck)