import axios from 'axios'
import { sha256Generator } from 'src/lib/encryptor'
import moment from 'moment'

require('dotenv').config()
const apiurl = process.env.REACT_APP_API_URL
const apiKey = process.env.REACT_APP_API_KEY

interface ServerResponse{
    code?: number,
    results?: ServerData[],
    message: string,
    status: string
}

interface ServerData{
    id: number,
    title: string
}

interface ParamData{
    endpoint: string,
    rawData: rawData
}

interface rawData{
    id: any,
    name: string
}

const deleteParam = ['timestamp']

export async function insert(endpoint, rawData){
    const timestamp = moment().unix()

    const config = {
        headers: {
            securitycode: sha256Generator(apiKey+rawData.sessionId+timestamp),
            timestamp: moment().unix().toString()
        }
    }

    try{

        if(rawData.id === ''){
            const res: any = await axios.post(`${apiurl}/${endpoint}`, rawData, config)

            return res.data
        }else{
            const res = await axios.put(`${apiurl}/${endpoint}`, rawData, config)

            return res.data
        }
    
    }catch(errors){
        console.error(errors);
        return errors.response.data
    }
}

export async function list(type: string = '', data: any){
    try{
        const timestamp = moment().unix().toString()
        const config = {
            headers: {
                session: data.sessionId,
                securityCode: sha256Generator(process.env.REACT_APP_API_KEY+data.sessionId+timestamp),
                timestamp: timestamp
            }
        }

        // deleteParam.forEach((e: string) => delete data[e])

        const res = await axios.get<ServerResponse>(`${apiurl}/${type}`, config)
        
        return res.data
    }catch(errors){
        console.error(errors)
        return errors.response.data
        // return errors
    }
}
export async function detail(type: string, data: any){
    try{
        const timestamp = moment().unix().toString()
        const config = {
            headers: {
                session: data.sessionId,
                securityCode: sha256Generator(apiKey+data.sessionId+timestamp),
                timestamp: timestamp
            }
        }

        const res = await axios.get(`${apiurl}/${type}/details/${data.id}`, config)

        return res.data
    }catch(errors){
        console.error(errors)
        return errors.response.data
    }
}

export async function deleteData(type: string, id: number){
    try{
        const res = await axios.delete(`${apiurl}/${type}/${id}`).then(response => response)

        return res.data
    }catch(errors){
        console.error(errors)
    }
}

export async function uploadImage(files: any){
    return {
        message: 'Your files has success to upload!',
        status: 'success'
    }
}