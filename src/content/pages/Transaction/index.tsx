import { Helmet } from 'react-helmet-async'
import { useEffect, useRef, useState } from 'react'
import PageTitle from 'src/components/PageTitle'
import PageTitleWrapper from 'src/components/PageTitleWrapper'
import Swal from 'sweetalert2'
import { Container, Grid, Box, Paper } from '@material-ui/core';
import Footer from 'src/components/Footer'
import Button from '@material-ui/core/Button'
import DialogTitle from '@material-ui/core/DialogTitle'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import { useForm, SubmitHandler } from 'react-hook-form'
import { detail, list, insert, deleteData } from 'src/api/masterData'

function Transaction(){
    const [tableData, setTableData] = useState([])

    const sampleData = [
        {
            id: 1,
            name: "Honda Jazz 2012",
            basePrice: 60000000,
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate quos adipisci neque tenetur, soluta maxime quidem, ratione earum consequatur quod reiciendis sit ducimus non quisquam ex. Nemo aut iure sapiente consequatur molestiae. Minima eaque quisquam a iure eum numquam porro?",
            brandName: "Honda",
            cityName: "Jakarta",
            imageLink: "https://apollo-singapore.akamaized.net/v1/files/2i6yz3jtsl203-ID/image",
            discuss: [
                {
                    id: 1,
                    userId: 1,
                    userName: "Muhammad Faisal R",
                    content: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
                    created: "2021-12-01 13:07:52"
                },
                {
                    id: 2,
                    userId: 2,
                    userName: "Febrianto Kabisatullah",
                    content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi itaque officia sapiente?",
                    created: "2021-12-14 22:03:42"
                },
                {
                    id: 3,
                    userId: 3,
                    userName: "Chaerul Anwar",
                    content: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Praesentium dicta quam porro eius alias cupiditate, velit debitis!",
                    created: "2021-12-15 12:00:22"
                },
            ],
            review: [
                {
                    id: 1,
                    userId: 17,
                    userName: "Reza Andriansyah",
                    rating: 3,
                    content: "Lorem ipsum dolor sit."
                },
                {
                    id: 17,
                    userId: 43,
                    userName: "Elang Pamungkas",
                    rating: 4,
                    content: "Lorem ipsum dolor sit."
                },
            ],

        },
        {
            id: 2,
            name: "Vario techno 150CC",
            basePrice: 25000000,
            description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Animi dicta nemo quis, architecto quod a veritatis et fugit sint esse!",
            brandName: "Honda",
            cityName: "Bekasi",
            imageLink: "https://imgcdnblog.carbay.com/bikeBlog/wp-content/uploads/2017/06/08040935/vario150.jpg",
            discuss: [
                {
                    id: 1,
                    userId: 1,
                    userName: "Muhammad Faisal R",
                    content: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
                    created: "2021-12-01 13:07:52"
                },
                {
                    id: 2,
                    userId: 2,
                    userName: "Febrianto Kabisatullah",
                    content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi itaque officia sapiente?",
                    created: "2021-12-14 22:03:42"
                }
            ],
            review: [
                {
                    id: 1,
                    userId: 17,
                    userName: "Reza Andriansyah",
                    rating: 3,
                    content: "Lorem ipsum dolor sit."
                },
                {
                    id: 17,
                    userId: 43,
                    userName: "Elang Pamungkas",
                    rating: 4,
                    content: "Lorem ipsum dolor sit."
                },
                {
                    id: 17,
                    userId: 43,
                    userName: "Elang Pamungkas",
                    rating: 5,
                    content: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Amet assumenda dignissimos, aspernatur autem deserunt odit beatae vero placeat?"
                },
            ],

        }
    ]

    useEffect(() => {
        setTableData(sampleData)
    }, [])

    return(
        <>
            <Helmet>
                <title> Transactions | Otosales </title>
            </Helmet>
            <PageTitleWrapper>
                <PageTitle
                    heading="Transactions"
                />
            </PageTitleWrapper>
            <Container maxWidth="lg">
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="stretch"
                    spacing={3}
                >
                    <Grid item xs={12}>
                        <Card>
                            <CardContent>
                                <Grid container spacing={4}>
                                    {(tableData.length) ?
                                        tableData.map((entry, i) => {
                                            return(
                                                <Grid item xs={12} sm={6} md={4} lg={3}>
                                                    <Card>
                                                        <CardMedia
                                                            sx={{ 
                                                                height: 0,
                                                                paddingTop: '56.25%'
                                                             }}
                                                             image={entry.imageLink}
                                                             title={entry.name+'-image'}
                                                        />

                                                        <CardContent>
                                                            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                                                                {entry.name}
                                                            </Typography>
                                                            <Typography variant="body2" sx={{ mt: 2 }}>
                                                                {entry.description.split(/\s+/, 10).join(" ")}
                                                            </Typography>
                                                        </CardContent>    
                                                    </Card>
                                                </Grid>
                                            )
                                        }) : <Typography variant="h2">No Product</Typography>
                                    }
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}

export default Transaction