import axios from 'axios'
require('dotenv').config()
const apiurl = process.env.REACT_APP_API_URL
const apiKey = process.env.REACT_APP_API_KEY

export const getBlogs = async () => {
    try{
        const result = await axios.get(`${apiurl}/blogs`)

        return result.data
    }catch(errors){
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