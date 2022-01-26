import Swal from 'sweetalert2'

export const imageValidation = async (files: any) => {
    const filename = files.name
    const filesize = files.size
    const filetype = files.type
    
    const allowedFileType = ['image/png', 'image/jpg', 'image/jpeg']

    if(allowedFileType.indexOf(filetype) === -1){
        Swal.fire({
            icon: 'warning',
            title: "Files must be type png!",
        })
        return
    }

    if(filesize > 2048000){
        Swal.fire({
            icon: 'warning',
            title: 'Files must be belo 2Mb'
        })
        return
    }

    return true

    const results = await toBase64(files)

    return results
}

const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
})