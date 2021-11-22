import axios from 'axios'

const apiurl = 'http://103.8.79.68:8080'

export async function insert(endpoint: string = '', rawData: object = {}){
    const res = axios.post(`${apiurl}/${endpoint}`, rawData)

    return res;
}

export async function list(type: string = '', param: object = {}){
    const res = await axios.get(`${apiurl}/${type}`).catch(errors => console.error(errors))

    return res;
}