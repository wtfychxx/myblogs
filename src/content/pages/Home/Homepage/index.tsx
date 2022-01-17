import { Helmet } from 'react-helmet-async'
import { useEffect, useRef, useState } from 'react'
import { Container, Grid, CssBaseline, ButtonBase } from '@material-ui/core'
import { styled } from '@material-ui/core/styles'
import { NavLink as RouterLink } from 'react-router-dom'

import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'

import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'

import Footer from 'src/components/Footer'
import ProfileCover from './ProfileCover'

function Homepage(){
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
            cashOnly: false,
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
            cashOnly: true,
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
                <title> Dynasis | Blogs </title>
            </Helmet>

            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="stretch"
                sx={{ p: 1 }}
            >
                <Grid item xs={12}>
                    <ProfileCover />
                </Grid>
            </Grid>
            <Footer />
        </>
    )
}

export default Homepage