import { useState, useEffect } from 'react'
import { getList } from 'src/api/transaction'
import { Helmet } from 'react-helmet-async'
import PageTitle from 'src/components/PageTitle'
import PageTitleWrapper from 'src/components/PageTitleWrapper'
import { Container, Box, Grid, Divider, Typography, Tooltip, IconButton } from '@material-ui/core'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import ArrowBackTwoTone from '@material-ui/icons/ArrowBackTwoTone'
import Footer from 'src/components/Footer'
import Button from '@material-ui/core/Button'
import { NavLink as RouterLink } from 'react-router-dom'
import { useParams } from 'react-router'
import { styled } from '@material-ui/core/styles'

const ColorBox = styled(Box)(
    ({ theme }) => `
        padding: 1em .8em;
        background-color: ${theme.colors.alpha.white[30]};
        border: solid 2px ${theme.colors.alpha.black[30]};
        border-radius: ${theme.spacing(1)};
        cursor: pointer
    `
)

const ColorDot = styled(Box)(
    ({ theme, color }) => `
        height: 20px;
        width: 20px;
        border-radius: 100%;
        background-color: ${color};
        border: solid .5px ${theme.colors.alpha.black[10]}
    `
)

const Separator = styled(Box)(
    ({ theme }) => `
        border-bottom: solid 1px ${theme.colors.alpha.black[10]}
    `
)

function TransactionDetail(){
    const { transactionId } = useParams()

    const [message, setMessage] = useState('')
    const [tableData, setTableData] = useState([])

    async function getData(){
        const results = await getList()

        if(results){
            setMessage('Belum ada transaksi')
            if(results.data !== null && results.data.length){
                setTableData(results.data)
            }
        }
    }

    useEffect(() => {
        getData()
    }, [])

    const handleColorChange = (color: string) => {
        console.log(color)
    }
    
    return(
        <>
            <Helmet>
                <title> Transaction | Otosales </title>
            </Helmet>

            <PageTitleWrapper>
                <PageTitle heading="Transaction" />
            </PageTitleWrapper>

            <Container maxWidth="lg">
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="stretch"
                    sx={{ p: 1 }}
                    spacing={2}
                >
                    <Grid item xs={12} lg={8}>
                        <Card>
                            <Divider />
                            <CardContent>
                                <CardMedia
                                    sx={{
                                        height: 0,
                                        paddingTop: '56.25%'
                                    }}
                                    image={`https://apollo-singapore.akamaized.net/v1/files/2i6yz3jtsl203-ID/image`}
                                    title="Car image" />
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={12} lg={4}>
                        <Card>
                            <Divider />
                            <CardContent>
                                <Box display="flex">
                                    <Tooltip arrow placement="top" title="Kembali">
                                        <IconButton color="primary" sx={{ p: 2, mr: 2 }} size="small" component={RouterLink} to="/management/transactions">
                                            <ArrowBackTwoTone fontSize="small" />
                                        </IconButton>
                                    </Tooltip>
                                    <Box>
                                        <Typography variant="h3" component="h3" gutterBottom sx={{ mt: 1.5 }}> Kembali </Typography>
                                    </Box>
                                </Box>
                                <Typography variant="h1">Rp 80.000.000</Typography>
                                <Typography variant="caption" gutterBottom>Honda Jazz 2012</Typography>
                                <Typography variant="subtitle2" sx={{ mt: 2 }}>Jakarta</Typography>
                            </CardContent>
                        </Card>
                        <Card sx={{ mt: 3 }}>
                            <Divider />
                            <CardContent>
                                <Grid container sx={{ mt: 1, mb: 4 }} spacing={1}>
                                    <Grid item xs={3} lg={4}>
                                        <ColorBox onClick={() => handleColorChange('#fff')}>
                                            <Box display="flex" alignItems='center' justifyContent="space-evenly">
                                                <ColorDot color="#fff" />
                                                <Typography variant="subtitle1"> Putih </Typography>
                                            </Box>
                                        </ColorBox>
                                    </Grid>
                                    <Grid item xs={3} lg={4}>
                                        <ColorBox>
                                            <Box display="flex" alignItems='center' justifyContent="space-evenly">
                                                <ColorDot color="#4834d4" />
                                                <Typography variant="subtitle1"> Biru </Typography>
                                            </Box>
                                        </ColorBox>
                                    </Grid>
                                </Grid>

                                <Typography variant="caption" gutterBottom> Cicilan </Typography>
                                <Typography variant="h3"> Rp 6.666.666 / 12 Bulan </Typography>
                                <Typography variant="body1" sx={{ mt: 3 }}> 25 Desember 2021 </Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={12}>
                        <Card>
                            <CardContent>
                                <Typography variant="h1" gutterBottom> Deskripsi </Typography>

                                <Typography variant="body2" gutterBottom align='justify'>
                                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolorum soluta, eaque cum neque pariatur dolores quas, reprehenderit sint voluptates iste ex architecto. Expedita sunt, pariatur molestiae quas laborum asperiores porro doloremque ratione, enim quasi qui repudiandae cupiditate esse nulla iusto neque at dolores facere quidem dolorem? Reiciendis, iusto nisi! Iste!
                                </Typography>

                                <Separator />

                                <Typography variant="h1" sx={{ mt: 1 }}>
                                    Spesifikasi
                                </Typography>

                                <Grid
                                    container
                                    direction="row"
                                    justifyContent="center"
                                    alignItems="stretch"
                                    sx={{ p: 2 }}
                                    spacing={2}
                                    >
                                        <Grid item xs={6}>
                                            <Typography variant="body2" sx={{ fontWeight: 'bold' }}> CC </Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography variant="body2"> 1198cc </Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography variant="body2" sx={{ fontWeight: 'bold' }}> Engine Type </Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography variant="body2"> 5-Silinder </Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography variant="body2" sx={{ fontWeight: 'bold' }}> Max Torque </Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography variant="body2"> 110 Nm @ 4800 rpm </Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography variant="body2" sx={{ fontWeight: 'bold' }}> Transmission </Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography variant="body2"> Automatic </Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography variant="body2" sx={{ fontWeight: 'bold' }}> Type </Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography variant="body2"> MPV </Typography>
                                        </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
            <footer />
        </>
    )
}

export default TransactionDetail