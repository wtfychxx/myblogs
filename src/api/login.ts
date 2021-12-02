import axios from 'axios'
import Swal from 'sweetalert2'

const apiurl = 'http://103.8.79.68:8080'

export async function login(phone: string = ''){
    try{
        const res = await axios.post(`${apiurl}/login`, JSON.stringify({
            phone: phone
        }))
    
        return res.data
    }catch(errors){
        return errors
    }
}

export async function logout(){

}