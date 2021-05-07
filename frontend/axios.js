import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://gibquotes.herokuapp.com'
})

export default instance;