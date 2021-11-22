import axios from 'axios'
import Swal from 'sweetalert2'

const apiurl = 'http://103.8.79.68:8080'

export async function registerData(endpoint: string, rawData: object){
    const res = await axios.
        post(`${apiurl}/${endpoint}`, JSON.stringify(rawData))
        .then(response => response)
        .catch(errors => {
            Swal.fire({
                icon: 'warning',
                title: "Oops..Something went wrong"
            });
            console.error(errors);
        })

    return res
}