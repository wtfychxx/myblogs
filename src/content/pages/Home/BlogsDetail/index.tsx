import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useParams } from 'react-router'
import { NavLink as RouterLink } from 'react-router-dom'

import { Container, Grid, Card, CardMedia, CardHeader, CardContent, Typography, Divider } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'

import { getBlogsDetail } from 'src/api/blogs'

interface Data{
    title: string,
    image: string,
    content: string
}

const BlogsDetail = () => {
    const { id } = useParams()
    const [data, setData] = useState<Data>({
        title: '',
        image: '',
        content: ''
    })

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
        </Container>
    </>)
}

export default BlogsDetail