import axios from 'axios'
import crypto from 'crypto'
import { sha256Generator } from '../lib/encryptor'
require('dotenv').config()

const apiurl = process.env.REACT_APP_API_URL

export async function login(email: string = '', password: string = ''){
    try{
        const encryptedPassword = sha256Generator(password)
        const res = await axios.post(`${apiurl}/authentication`, {
            email: email,
            password: encryptedPassword,
            securityCode: sha256Generator(process.env.REACT_APP_API_KEY+email+encryptedPassword)
        })
    
        return res.data
    }catch(errors){
        return errors.response.data
    }
}

export async function logout(data: any){
    const config = {
        headers: {
            Authorization: data.session
        }
    }

    const res: any = await axios.post(`/logout`, data, config)

    return res.data
}