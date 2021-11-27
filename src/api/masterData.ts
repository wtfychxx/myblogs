import axios from 'axios'

const apiurl = 'http://103.8.79.68:8080'

export async function insert(endpoint: string = '', rawData: object = {}){
    const res = axios.post(`${apiurl}/${endpoint}`, rawData)

    return res;
}

export async function list(type: string = ''){
    const res = await axios.get(`${apiurl}/${type}`).catch(errors => console.error(errors))

    return res;
}

export async function uploadImage(files: any){
    return {
        message: 'Your files has success to upload!',
        status: 'success'
    }
}