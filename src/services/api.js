import axios from 'axios'



const spotifyApi = axios.create({
    baseURL: 'https://api.spotify.com/v1'
})

const spotperApi = axios.create({
    baseURL: 'http://localhost:8080/api/v1'
})



export { spotifyApi, spotperApi }