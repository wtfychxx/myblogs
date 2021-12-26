import { useState, useEffect } from 'react'
import { getList } from 'src/api/transaction'
import { Helmet } from 'react-helmet-async'
import PageTitle from 'src/components/PageTitle'
import PageTitleWrapper from 'src/components/PageTitleWrapper'
import Swal from 'sweetalert2'
import { Container, Grid, Divider, FormControl, Typography } from '@material-ui/core'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Footer from 'src/components/Footer'
import Button from '@material-ui/core/Button'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import { NavLink as RouterLink } from 'react-router-dom'
import { useParams } from 'react-router'

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
                    spacing={3}
                >
                    <Grid item xs={12}>
                        <Card>
                            <Divider />
                            <CardContent>
                                <CardMedia
                                    sx={{
                                        height: 0,
                                        paddingTop: '56.25%'
                                    }}
                                    image={`https://apollo-singapore.akamaized.net/v1/files/2i6yz3jtsl203-ID/image`}
                                    title="Car iamge" />
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}

export default TransactionDetail