import axios from 'axios'

const apiurl = 'https://api.dynasis.web.id/api';

export async function insert(endpoint: string = '', rawData: object = {}){
    const res = axios.post(`${apiurl}/${endpoint}`, rawData)

    return res;
}

export async function list(type: string = '', param: object = {}){
    const res = axios.post(`${apiurl}/MasterData`, JSON.stringify(param));

    return res;
}