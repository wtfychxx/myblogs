import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useParams } from 'react-router'
import { NavLink as RouterLink } from 'react-router-dom'

import { Box, Container, Grid, Card, CardMedia, CardContent, CardActions, Typography, Divider } from '@material-ui/core'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'

import { useForm, SubmitHandler } from 'react-hook-form'

import { getBlogsDetail } from 'src/api/blogs'

interface Data{
    title: string,
    image: string,
    content: string
}

type Inputs = {
    username: string,
    commentText: string
}

const BlogsDetail = () => {
    const { id } = useParams()
    const [data, setData] = useState<Data>({
        title: '',
        image: '',
        content: ''
    })

    const generateRandomNumber = () => Math.floor(1000 + Math.random() * 9000)

    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>({
        defaultValues: {
            username: `Anonymous #${generateRandomNumber()}`
        }
    })

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        console.log(data)
    }

    async function getData(){
        const result = await getBlogsDetail(id)

        if(result.results){
            setData(result.results)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    return(<>
        <Helmet>
            <title>Blogs Detail | Blogs</title>
        </Helmet>

        <Container sx={{ p: 2 }} maxWidth="xl">
            <Card>
                <Grid container
                    justifyContent="space-between"
                    sx={{ p: 2 }}>
                    <Grid item>
                        <Button component={RouterLink} to="/blogs" startIcon={<ArrowBackIcon />}>
                            Back
                        </Button>
                    </Grid>
                </Grid>

                <CardMedia
                    component="img"
                    image={data.image}
                    alt="Paella dish"
                />

                <CardContent>
                    <Typography variant="h1">
                        {data.title}
                    </Typography>
                    <Divider />
                    <div dangerouslySetInnerHTML={{ __html: data.content }} />
                </CardContent>
            </Card>
            <Card sx={{ mt: 2 }}>
                <Box
                    component="form"
                    sx={{ "& .MuiTextField-root": { mt: 2, width: 1 } }}
                    noValidate
                    onSubmit={handleSubmit(onSubmit)}
                    >
                    <CardContent>
                        <Typography variant="h1">
                            Comments
                        </Typography>
                        <Typography variant="body2">
                            Posts your comments for this article!
                        </Typography>
                                <TextField
                                    margin="dense"
                                    type="text"
                                    {...register("username")}
                                    helperText={(errors.username) ? errors.username.message : ''}
                                />

                                <TextField
                                    margin='dense'
                                    type='text'
                                    {...register("commentText", {
                                        required: { value: true, message: 'Comments is required!' }
                                    })}
                                    multiline
                                    rows={4}
                                    helperText={(errors.commentText) ? errors.commentText.message : ''}
                                />
                    </CardContent>

                    <CardActions>
                        <Button
                            variant="contained"
                            type="submit"
                            sx={{ml: 'auto' }}>
                            Post Comment
                        </Button>
                    </CardActions>
                </Box>
            </Card>
        </Container>
    </>)
}

export default BlogsDetail