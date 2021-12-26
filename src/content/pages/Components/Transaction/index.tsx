import { useState, useEffect } from 'react'
import { getList } from 'src/api/transaction'
import { Helmet } from 'react-helmet-async'
import PageTitle from 'src/components/PageTitle'
import PageTitleWrapper from 'src/components/PageTitleWrapper'
import Swal from 'sweetalert2'
import { Container, Grid, Card, CardHeader, CardContent, Divider, FormControl, Typography } from '@material-ui/core'
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

function Transaction(){
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
                            <CardHeader title="Transaction List" />
                            <Divider />
                            <CardContent>
                                <TableContainer component={Paper}>
                                    <Table aria-label="Problem Table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell> Product </TableCell>
                                                <TableCell> Product Color </TableCell>
                                                <TableCell> Product Tenor </TableCell>
                                                <TableCell> Total Price </TableCell>
                                                <TableCell> Status </TableCell>
                                                <TableCell> Reason </TableCell>
                                                <TableCell> Unique Code </TableCell>
                                                <TableCell> Price </TableCell>
                                            </TableRow>
                                        </TableHead>

                                        <TableBody>
                                            {
                                                (tableData.length) ? tableData.map((entry, i) => {
                                                    return(
                                                        <TableRow key={i}>
                                                            <TableCell><Button component={RouterLink} to={`/management/transactions/${entry.id}`}>{entry.product}</Button></TableCell>
                                                            <TableCell>{entry.productColor}</TableCell>
                                                            <TableCell>{entry.productTenor}</TableCell>
                                                            <TableCell>{entry.totalPrice}</TableCell>
                                                            <TableCell>{entry.status}</TableCell>
                                                            <TableCell>{entry.reason}</TableCell>
                                                            <TableCell>{entry.uniqueCode}</TableCell>
                                                            <TableCell>{entry.price}</TableCell>
                                                        </TableRow>
                                                    )
                                                }) : <TableRow>
                                                    <TableCell colSpan={8}>{message}</TableCell>
                                                </TableRow>
                                            }
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}

export default Transaction