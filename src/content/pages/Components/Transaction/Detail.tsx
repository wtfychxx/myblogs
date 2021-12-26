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
        border-radius: ${theme.spacing(1)}
    `
)

const ColorDot = styled(Box)(
    ({ theme, color }) => `
        height: 20px;
        width: 20px;
        border-radius: 100%;
        background-color: ${color}
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
                    sx={{ p: 2 }}
                >
                    <Grid item xs={12}>
                        <Card>
                            <Divider />
                            <CardContent>
                                <Grid
                                    container
                                    maxWidth="lg"
                                    spacing={4}
                                    >
                                        <Grid item xs={12} sm={6}>
                                            <CardMedia
                                                sx={{
                                                    height: 0,
                                                    paddingTop: '56.25%'
                                                }}
                                                image={`https://apollo-singapore.akamaized.net/v1/files/2i6yz3jtsl203-ID/image`}
                                                title="Car image" />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <Box display="flex">
                                                <Tooltip arrow placement="top" title="Kembali">
                                                    <IconButton color="primary" sx={{ p: 2, mr: 2 }} size="small">
                                                        <ArrowBackTwoTone fontSize="small" />
                                                    </IconButton>
                                                </Tooltip>
                                                <Box>
                                                    <Typography variant="h3" component="h3" gutterBottom sx={{ mt: 1.5 }}> Kembali </Typography>
                                                </Box>
                                            </Box>
                                            <Typography variant="caption" sx={{ fontSize: '.8rem' }}>Honda</Typography>
                                            <Typography variant="h1">Honda Jazz 2012</Typography>

                                            <Grid container sx={{ mt: 1, mb: 4 }}>
                                                <Grid item xs={3}>
                                                    <ColorBox>
                                                        <Box display="flex" alignItems='center' justifyContent="space-evenly">
                                                            <ColorDot color="#000" />
                                                            <Typography variant="subtitle1">Hitam</Typography>
                                                        </Box>
                                                    </ColorBox>
                                                </Grid>
                                            </Grid>

                                            <Typography variant="h1">Rp 80.000.000</Typography>
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