import axios from 'axios'
import Swal from 'sweetalert2'

const apiurl = 'http://103.8.79.68:8080'

export async function registerData(endpoint: string, rawData: object){
    try{
        return await axios.
            post(`${apiurl}/${endpoint}`, rawData)
            .catch(errors => {
                Swal.fire({
                    icon: 'warning',
                    title: "Oops..Something went wrong"
                });
                console.error(errors);
                return
            })
    }catch(errors){
        console.log(errors)
    }
}