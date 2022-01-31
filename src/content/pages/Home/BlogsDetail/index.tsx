import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useParams } from 'react-router'
import { NavLink as RouterLink } from 'react-router-dom'

import { Box, Container, Grid, Card, CardMedia, CardContent, CardActions, Typography, Divider } from '@material-ui/core'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

import moment from 'moment'

import { useForm, SubmitHandler } from 'react-hook-form'
import { getBlogsDetail, saveComments } from 'src/api/blogs'

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
    const [comments, setComments] = useState([])

    const generateRandomNumber = () => Math.floor(1000 + Math.random() * 9000)

    const { register, handleSubmit, setValue, formState: { errors } } = useForm<Inputs>({
        defaultValues: {
            username: `Anonymous #${generateRandomNumber()}`
        }
    })

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        const result = await saveComments(data, id)

        if(result.status === 'success'){
            setComments(result.results)
            setValue('username', `Anonymous #${generateRandomNumber()}`)
        }
    }

    async function getData(){
        const result = await getBlogsDetail(id)

        if(result.results){
            setData(result.results)
        }

        if(result.results.comments?.length){
            setComments(result.results.comments)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    return(
        <>
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
                                    {...register("username", { required: { value: true, message: 'Please input your name!' } })}
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

                    {(comments.length > 0) ?
                        comments.map((entry, i) => (
                            <List key={i} sx={{ width: '100%', bgcolor: 'background.paper' }}>
                                <ListItem>
                                    <ListItemText
                                        primary={entry.username}
                                        secondary={
                                            <>
                                                <Typography
                                                    sx={{ display: 'inline' }}
                                                    component="span"
                                                    variant="body2"
                                                >
                                                    {entry.commentText}
                                                </Typography>
                                                <Divider />
                                                <Typography
                                                    sx={{ display: 'inline' }}
                                                    variant="subtitle1"
                                                >
                                                    {moment(entry.createdDate).format('YYYY-MM-DD')}
                                                </Typography>
                                            </>
                                        }
                                    />
                                </ListItem>
                            </List>
                        )) : null
                    }
 
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