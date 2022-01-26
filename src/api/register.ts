import axios from 'axios'
import Swal from 'sweetalert2'

const apiurl = process.env.REACT_APP_API_URL

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