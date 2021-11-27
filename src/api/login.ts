import axios from 'axios'

const apiurl = 'http://103.8.79.68:8080'

export async function login(email: string = '', password: string = ''){
    const res = await axios.post(`${apiurl}/login`, {
        email: email,
        password: password
    })

    return res
}

export async function logout(){

}