import axios from 'axios'

const BASE_URL = "http://localhost/5000//api/v1"
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2MmY3ZDY5MTllNzFmMWY3N2NkNTMyMjMiLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE2NjA2NjcxMTMsImV4cCI6MTY2MDc1MzUxM30.6wfLnRK5aKtF6BON2o5UZJ2c5LACX6yLg-8c3ClHnBM"

export const publicRequests= axios.create({
    baseURL : BASE_URL,
})

export const userRequests = axios.create({
    baseURL : BASE_URL,
    headers : {token: `Bearer ${TOKEN}`}
})