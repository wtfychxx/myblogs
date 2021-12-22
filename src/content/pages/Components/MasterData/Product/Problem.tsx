import { Helmet } from 'react-helmet-async'
import { useEffect, useState } from 'react'

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
import Link from '@material-ui/core/Link'
import DialogTitle from '@material-ui/core/DialogTitle'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import Box from '@material-ui/core/Box'
import { useTheme } from '@material-ui/core'
import { useForm, SubmitHandler } from 'react-hook-form'
import { detail, list, insert, deleteData } from 'src/api/masterData';
import numeral, { reset } from 'numeral'
import ReactHookFormSelect from 'src/components/ReactHookFormSelect'

type Inputs = {
    id: number,
    problemId: number,
    value: string
}

function Problem(){
    const [open, setOpen] = useState(false)
    const [tableData, setTableData] = useState([])
    const [message, setMessage] = useState('')
    const [problemTitle, setProblemTitle] = useState('')
    const [problemDescription, setProblemDescription] = useState('')
    const { register, handleSubmit, setValue, control, formState: { errors } } = useForm<Inputs>()
    const theme = useTheme()

    const sampleData = [
        {
            id: 1,
            transactionId: 23,
            transactionName: 'Transaction 1',
            title: 'Example masalah satu',
            value: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corporis accusantium esse quasi totam atque vitae sed, suscipit cumque rerum delectus dolorum perferendis voluptatum, consequuntur non hic aliquid mollitia minus aut!',
            status: 'New'
        },
        {
            id: 2,
            transactionId: 26,
            transactionName: 'Transaction 2',
            title: 'Example masalah dua',
            value: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corporis accusantium esse quasi totam atque vitae sed, suscipit cumque rerum delectus dolorum perferendis voluptatum, consequuntur non hic aliquid mollitia minus aut!',
            status: 'Solved'
        }
    ]

    const getData = async() => {
        const results = await list('problem')

        if(results){
            setMessage("Maaf, belum ada data")
            if(results.data !== null){
                setTableData(results.data)
            }
        }
    }

    useEffect(() => {
        getData()
        setTableData(sampleData)
    },[])

    const handleClickOpen = async (id: number = 0) => {
        const resultProblem = await detail('problem', id)
        
        setValue('problemId', id)
        if(resultProblem){
            if(resultProblem.data !== null){
                setProblemTitle(resultProblem.data.title)
                setProblemDescription(resultProblem.data.value)
                
                const resultProblemAnswer = await detail('problemAnswer', id)
                if(resultProblemAnswer.data !== null){
                    setValue('id', id)
                    setValue('value', resultProblemAnswer.data.value)
                }
            }
        }

        setOpen(true)
    }

    const handleClose = () => {
        setProblemTitle('')
        setProblemDescription('')
        setOpen(false)
    }
    
    const handleDelete = (id: number) => {
        return Swal.fire({
            icon: 'question',
            title: 'Are you sure to delete?',
            text: "You won't be able to revert this!",
            showCancelButton: true,
            confirmButtonText: 'Do it!'
        }).then(async (result) => {
            if(result.value){
                const result = await deleteData('tenor', id)

                if(result.code === 200){
                Swal.fire({
                    icon: 'success',
                    title: result.message
                }).then(() => {
                    getData()
                })
                }
            }
        });
    }

    const onSubmit: SubmitHandler<Inputs> = async(data) => {
        
    }

    return(
        <>
            <Helmet>
                <title>Problem</title>
            </Helmet>
            <PageTitleWrapper>
                <PageTitle
                heading="Problem"
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
                    <CardHeader title="Problem List" />
                    <Divider />
                    <CardContent>
                        <TableContainer component={Paper}>
                        <Table aria-label="Problem table">
                            <TableHead>
                            <TableRow>
                                <TableCell> Title </TableCell>
                                <TableCell> Transaction </TableCell>
                                <TableCell> Status </TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {
                                (tableData.length) ? tableData.map((entry, i) => (
                                <TableRow key={i}>
                                    <TableCell><Link href="#" underline="none" onClick={() => handleClickOpen(entry.id)}>{entry.title}</Link></TableCell>
                                    <TableCell>{entry.transactionName}</TableCell>
                                    <TableCell>{entry.status.toLowerCase() === 'new' ? <Typography variant='overline' sx={{ color: theme.colors.primary.main }}>{entry.status}</Typography> : <Typography variant='overline' sx={{ color: theme.colors.success.main }}>{entry.status}</Typography>}</TableCell>
                                </TableRow>
                                )) : <TableRow>
                                <TableCell colSpan={5}>{message}</TableCell>
                                </TableRow>
                            }
                            </TableBody>
                        </Table>
                        </TableContainer>
                    </CardContent>
                    </Card>
                </Grid>
                </Grid>
                <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm" style={{ zIndex: 7 }}>
                <DialogTitle> Problem Form </DialogTitle>
                    <Box
                        component="form"
                        sx={{ '& .MuiTextField-root': { mt: 2, width: 1, zIndex: '7 !important' } }}
                        onSubmit={handleSubmit(onSubmit)}>
                        <DialogContent>
                            <input
                                type="hidden"
                                {...register("id")}
                            />
                            <input
                                type="hidden"
                                {...register('problemId')}
                            />

                            <TextField
                                type="text"
                                value={problemTitle}
                                variant="outlined"
                                label="title"
                                inputProps={
                                    { readOnly: true }
                                }
                            />

                            <TextField
                                type="text"
                                value={problemDescription}
                                variant="outlined"
                                label="Problem Description"
                                multiline
                                rows={4}
                                inputProps={
                                    { readOnly: true }
                                }
                            />

                            <TextField
                                type="text"
                                variant="outlined"
                                label="Your answer"
                                multiline
                                rows={4}
                            />

                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button variant="contained" type="submit">Save</Button>
                        </DialogActions>
                    </Box>
                </Dialog>
            </Container>
            <Footer />
        </>
    )
}

export default Problem