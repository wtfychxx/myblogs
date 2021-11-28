import axios from 'axios'

const apiurl = 'http://103.8.79.68:8080'

export async function login(phone: string = ''){
    const res = await axios.post(`${apiurl}/login`, JSON.stringify({
        phone: phone
    }))

    return res.data
}

export async function logout(){

}