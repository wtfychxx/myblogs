import Swal from 'sweetalert2'

interface filesProps{
    lastModififed: number,
    name: string
    size: number,
    type: string
}

export const imageValidation = (files: filesProps) => {
    const filename = files.name
    const filesize = files.size
    const filetype = files.type

    if(filetype !== 'image/png'){
        Swal.fire({
            icon: 'warning',
            title: "Files must be type png!",
        })
        return
    }
}