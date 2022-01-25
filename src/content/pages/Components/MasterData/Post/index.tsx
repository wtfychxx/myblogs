import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { NavLink as RouterLink } from 'react-router-dom'

import PageTitle from 'src/components/PageTitle'
import PageTitleWrapper from 'src/components/PageTitleWrapper'
import { Container, Grid, Card, CardHeader, CardContent, Divider, Box, Paper } from '@material-ui/core'

import TableContainer from '@material-ui/core/TableContainer'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import TableBody from '@material-ui/core/TableBody'
import Button from '@material-ui/core/Button'

import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'

import TextField from '@material-ui/core/TextField'

import { useCookies } from 'react-cookie'
import moment from 'moment'

import { list } from 'src/api/masterData'

const Post = () => {
    const [tableData, setTableData] = useState([])
    const [cookie, setCookie] = useCookies(["user"])

    const getData = async () => {
        const param = {
            sessionId: cookie.user.sessionID,
            type: 'posts'
        }

        const data = await list('posts', param)

        if(data.results.length > 0){
            setTableData(data.results)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    const AddButton = () => (
        <Button variant="contained" component={RouterLink} to="/management/postform">
            Add
        </Button>
    )

    return(
        <>
            <Helmet>
                <title> Post | Blog </title>
            </Helmet>

            <PageTitleWrapper>
                <PageTitle heading="Posts" />
            </PageTitleWrapper>

            <Container maxWidth="lg">
                <Card>
                    <CardHeader title="Posts list" action={<AddButton />} />
                    <CardContent>
                        <TableContainer component={Paper}>
                            <Table aria-label="Posts list">
                                <TableHead>
                                    <TableRow>
                                        <TableCell> Title </TableCell>
                                        <TableCell> Published </TableCell>
                                        <TableCell>  </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {tableData.map((entry, i) => (
                                        <TableRow key={i}>
                                            <TableCell><Button component={RouterLink} to={`/management/postform/${entry.id}`}>{entry.title}</Button></TableCell>
                                            <TableCell>{entry.publishedDate}</TableCell>
                                            <TableCell>hehe</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </CardContent>
                </Card>
            </Container>
        </>
    )
}

export default Post