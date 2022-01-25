import { Helmet } from 'react-helmet-async'
import { useEffect, useRef, useState } from 'react'
import { Container, Grid, CssBaseline, ButtonBase } from '@material-ui/core'
import { styled } from '@material-ui/core/styles'
import { NavLink as RouterLink } from 'react-router-dom'

import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Footer from 'src/components/Footer'
import { getBlogs } from 'src/api/blogs'

function BlogsPage(){
    const [tableData, setTableData] = useState([])

    const getData = async () => {
        const param = {
            type: 'posts'
        }

        const data = await getBlogs()

        if(data.results.length > 0){
            setTableData(data.results)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    return(
        <>
            <Helmet>
                <title> Dynasis | Blogs </title>
            </Helmet>

            <Container maxWidth="xl">
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="stretch"
                    sx={{ p: 2 }}
                >
                    <Grid item xs={12}>
                        <Grid container
                            spacing={3}>
                            {tableData.map((entry, i) => (
                                <Grid key={i} item xs={12} sx={{ textDecoration: 'none' }} component={RouterLink} to={`/article/${entry.id}`}>
                                    <Card>
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="div">
                                                {entry.title}
                                            </Typography>
                                            <Typography>
                                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis veniam id tempora, temporibus hic tenetur iure cumque dignissimos animi fugiat!
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                            
                        </Grid>
                    </Grid>
                </Grid>
            </Container>

            <Footer />
        </>
    )
}

export default BlogsPage