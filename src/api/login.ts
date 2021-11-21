const apiurl = 'http://localhost:70/api'
import axios from 'axios'

export async function login(email: string = '', password: string = ''){
    const res = await axios.post(apiurl, {
        email: email,
        password: password
    });

    return res;
}

export async function logout(){

}