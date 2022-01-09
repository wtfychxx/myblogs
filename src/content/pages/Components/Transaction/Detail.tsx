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

import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'

import { NavLink as RouterLink } from 'react-router-dom'
import { useParams } from 'react-router'
import { styled } from '@material-ui/core/styles'
import { useLocation } from 'react-router'
import { useTheme } from '@material-ui/core/styles'

import CloseIcons from '@material-ui/icons/Close'


const ColorBox = styled(Box)(
    ({ theme, color }) => `
        padding: 1em .8em;
        background-color: ${theme.colors.alpha.white[30]};
        border: solid 2px ${color};
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

interface Props{
    isAdmin?: boolean
}

function TransactionDetail({ isAdmin = true }: Props){
    const { id } = useParams()
    const { pathname } = useLocation()
    const theme = useTheme()

    const [tableData, setTableData] = useState([])
    const [colorPhoto, setColorPhoto] = useState('')
    const [colorOptions, setColorOptions] = useState([])
    const [selectedColor, setSelectedColor] = useState('')
    const [open, setOpen] = useState(false)

    async function getData(){
        const results = await getList()

        if(results){
            if(results.data !== null && results.data.length){
                setTableData(results.data)
            }
        }
    }

    useEffect(() => {
        getData()
        setColorPhoto('https://cdn.pixabay.com/photo/2016/12/03/18/57/car-1880381_1280.jpg')
        setColorOptions([
            {
                color: "Putih",
                colorCode: "#fff",
                imageLink: "https://cdn.pixabay.com/photo/2016/12/03/18/57/car-1880381_1280.jpg"
            },
            {
                color: "Biru",
                colorCode: "#2980b9",
                imageLink: "https://cdn.pixabay.com/photo/2016/04/19/06/03/mercedes-1338063_1280.jpg"
            }
        ])
    }, [])

    const handleColorChange = (color: string, imageLink: string) => {
        setColorPhoto(imageLink)
        setSelectedColor(color)
    }


    const processPurchase = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const returnUrl = (isAdmin) ? '/management/transactions' : { pathname: '/', state: { from: pathname } }
    
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
                    spacing={2}
                >
                    <Grid item xs={12}>
                        <Card>
                            <CardMedia
                                sx={{
                                    height: 0,
                                    paddingTop: '56.25%'
                                }}
                                image={colorPhoto}
                                title="Car image" />
                        </Card>
                    </Grid>

                    <Grid item xs={12}>
                        <Card>
                            <CardContent>
                                <Box display="flex">
                                    <Tooltip arrow placement="top" title="Kembali">
                                        <IconButton color="primary" sx={{ p: 2, mr: 2 }} size="small" component={RouterLink} to={returnUrl}>
                                            <ArrowBackTwoTone fontSize="small" />
                                        </IconButton>
                                    </Tooltip>
                                    <Box>
                                        <Typography variant="h3" component="h3" gutterBottom sx={{ mt: 1.5 }}> Kembali </Typography>
                                    </Box>
                                </Box>
                                <Typography variant="h1">Rp 80.000.000</Typography>
                                <Typography variant="caption" gutterBottom>Honda Jazz 2012</Typography>
                                <Typography variant="subtitle2" sx={{ mt: 2, mb: 2 }}>Jakarta</Typography>

                                <Divider />

                                <Grid container sx={{ mt: 2, mb: 1}} spacing={1}>
                                    {colorOptions.map((entry, i) => (
                                        <Grid item xs={4} lg={2}>
                                            <ColorBox color={(selectedColor === entry.colorCode) ? theme.colors?.primary.main : theme.colors?.alpha.black[30]} onClick={() => handleColorChange(entry.colorCode, entry.imageLink)}>
                                                <Box display="flex" alignItems='center' justifyContent="space-evenly">
                                                    <ColorDot color={entry.colorCode} />
                                                    <Typography variant="subtitle1">{entry.color}</Typography>
                                                </Box>
                                            </ColorBox>
                                        </Grid>
                                    ))}
                                </Grid>

                                <Typography variant="body2" gutterBottom> DP: Rp 30.000.000 </Typography>
                                <Typography variant="caption"> Cicilan </Typography>
                                <Typography variant="h3" gutterBottom> Rp 6.666.666 / 12 Bulan </Typography>
                                <Typography variant="caption"> 25 Desember 2021 </Typography>
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

                                <Grid
                                    container
                                    justifyContent="flex-end"
                                    onClick={processPurchase}
                                    >
                                    {(!isAdmin) ? <Button variant="contained">
                                        Purchase
                                    </Button> : null }
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>

                </Grid>

                <Dialog open={open} fullWidth maxWidth="xl" style={{ zIndex: 7 }} title="test">
                    <DialogTitle>
                        Purchase Confirmation
                        <IconButton
                            onClick={handleClose}
                            arial-label="close"
                            sx={{ 
                                position: 'absolute',
                                right: 0,
                                top: 0,
                                color: (theme) => theme.palette.grey[500]
                             }}>
                                <CloseIcons />
                        </IconButton>
                    </DialogTitle>
                    <Box
                        component="form"
                        sx={{ '& .MuiTextField-root': { mt: 2, width: 1 } }}
                        noValidate
                        autoComplete='off'
                    >
                        <DialogContent>
                            <Grid container
                                spacing={2}>
                                    <Grid item xs={8}>
                                        <Typography variant="body2">
                                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum quibusdam quam neque sapiente laboriosam? Soluta ab explicabo sequi labore, dolorem eveniet pariatur voluptates excepturi ipsum praesentium sint, nesciunt consequatur iusto.
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Typography>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempore, nam sit incidunt perferendis voluptas eligendi tenetur est. Tempora, accusamus soluta.</Typography>
                                    </Grid>
                            </Grid>
                        </DialogContent>
                    </Box>
                </Dialog>
            </Container>
            <footer />
        </>
    )
}

export default TransactionDetail