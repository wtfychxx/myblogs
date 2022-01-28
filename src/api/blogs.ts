import axios from 'axios'
import { sha256Generator } from 'src/lib/encryptor'
import moment from 'moment'

require('dotenv').config()

const apiurl = process.env.REACT_APP_API_URL
const apiKey = process.env.REACT_APP_API_KEY

export const getBlogs = async () => {
    try{
        const result = await axios.get(`${apiurl}/blogs`)

        return result.data
    }catch(errors){
        console.error(errors)
        return errors.response.data
    }
}

export const getBlogsDetail = async (id: string) => {
    try{

        const result = await axios.get(`${apiurl}/blogs/details/${id}`)

        return result.data
    }catch(errors){
        console.error(errors)
        return errors.response.data
    }
}

export const saveComments = async (param: any, id: string) => {
    const timestamp = moment().unix()

    const config = {
        headers: {
            securitycode: sha256Generator(apiKey+param.username+timestamp),
            timestamp: timestamp.toString()
        }
    }

    try{
        const res = await axios.post(`${apiurl}/blogs/comments/${id}`, param, config)

        return res.data
    }catch(errors){
        return errors.response.data
    }
}