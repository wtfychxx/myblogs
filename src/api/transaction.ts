import axios from 'axios'

const apiurl = 'http://103.8.79.68:8080'

export async function getList(){
    try{
        const res = await axios.get(`${apiurl}/transaction`).then(response => response)

        return res.data
    }catch(errors){
        console.error(errors)
    }
}