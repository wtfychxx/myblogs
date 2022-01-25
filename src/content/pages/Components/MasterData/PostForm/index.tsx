import { useEffect, useState } from "react"
import { Helmet } from "react-helmet-async"
import { useCookies } from 'react-cookie'
import { imageValidation } from 'src/lib/imageValidation'
import Swal from 'sweetalert2'

import PageTitleWrapper from 'src/components/PageTitleWrapper'
import PageTitle from 'src/components/PageTitle'

import { Container, Grid, Divider, Typography, Box, experimentalStyled } from '@material-ui/core'
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

import { useForm, SubmitHandler } from 'react-hook-form'
import { detail, insert } from 'src/api/masterData'

import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { useNavigate, useParams } from "react-router"

type Inputs = {
    id: number
    title: string
    image: string
    content: string
}

const ImageWrapper = experimentalStyled(Button)(
    ({ theme }) => `
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: ${theme.palette.grey[200]};
        min-height: 200px;
        width: 100%;
        transition: all .2s;
        :hover{
            background-color: ${theme.palette.grey[400]};
            cursor: pointer;
        }
    `
)

const PostForm = () => {
    const { id } = useParams()
    const { register, handleSubmit, setValue, getValues, formState: { errors } } = useForm<Inputs>()
    const [image, setImage] = useState('')
    const [status, setStatus] = useState(0)
    const [cookie, setCookie] = useCookies(["user"])
    const navigate = useNavigate()

    const getDetail = async id => {
        const param = {
            id: id,
            sessionId: cookie.user.sessionID,
            type: 'posts'
        }

        const details = await detail('posts', param)

        if(details.results){
            setValue('id', details.results.id)
            setValue('title', details.results.title)
            setValue('content', details.results.content)

            setImage(details.results.image)
        }
    }

    useEffect(() => {
        if(typeof id !== 'undefined'){
            getDetail(id)
        }
    }, [])

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        data.image = image
        const param = {...data, status: status, userId: cookie.user.userdata.id, sessionId: cookie.user.sessionID}

        const result = await insert('posts', param)

        if(result.status === 'success'){
            Swal.fire({
                icon: 'success',
                title: result.message
            }).then(() => {
                navigate('/management/post')
            })
        }else{

        }
    }

    const handleInputChange = async (file: any) => {
        const formData = new FormData()

        formData.append('file', file)
        formData.append('upload_preset', 'blogs-preset')

        const config = { method: 'POST', body: formData }
        fetch('https://api.cloudinary.com/v1_1/ayo-belajar-company/image/upload', config)
        .then(response => response.json())
        .then(response => {
            setImage(response.secure_url)
        })
    }

    const fileValidation = async (e: any) => {
        const isValid = await imageValidation(e.target.files[0])
        const file = e.target.files[0]

        if(isValid){
            handleInputChange(file)
        }
    }
    
    return(
        <>
            <Helmet>
                <title> Post Form | Blog </title>
            </Helmet>

            <PageTitleWrapper>
                <PageTitle heading="Post Form" />
            </PageTitleWrapper>

            <Container maxWidth="lg">
                <Card>
                    <Box
                        component="form"
                        sx={{ "& .MuiTextField-root": { mt: 2, width: 1 } }}
                        noValidate
                        autoComplete="off"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <CardContent>
                                <input type="hidden" {...register("id")} />
                                <TextField
                                    margin="dense"
                                    type="text"
                                    label="Title"
                                    {...register("title")}
                                    helperText={(errors.title) ? errors.title.message : ''}
                                />

                                {(image !== '') ? <CardMedia
                                    component="img"
                                    image={image}
                                    alt="Posts Image"
                                    sx={{ mt: 2 }}
                                /> : <ImageWrapper onClick={() => document.getElementById('btnUpload').click()} sx={{ my: 2 }}>
                                    Add yout post photo
                                    <Button id="btnUpload" component="label" sx={{ display: 'none' }}>
                                        <input type="file" hidden onChange={fileValidation} />
                                        <input type="file" hidden {...register("image")} />
                                    </Button>
                                </ImageWrapper> }


                                <CKEditor
                                    editor={ClassicEditor}
                                    data={getValues('content')}
                                    onChange={(event: any, editor: any) => {
                                        const data = editor.getData()
                                        setValue('content', data)
                                    }}
                                />
                        </CardContent>
                        <CardActions>
                            <Button type="submit" sx={{ ml: 'auto' }} onClick={() => setStatus(0)}>
                                Save as draft
                            </Button>
                            <Button color="primary" variant="contained" type="submit" sx={{ ml: 'auto' }} onClick={() => setStatus(1)}>
                                Save
                            </Button>
                        </CardActions>
                    </Box>
                </Card>
            </Container>
        </>
    )
}

export default PostForm