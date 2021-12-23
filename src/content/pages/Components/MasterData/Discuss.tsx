import { Container, Grid, Card, CardHeader, CardContent, Divider, Box} from '@material-ui/core';
import { useEffect, useState } from 'react'
import Footer from 'src/components/Footer'
import Button from '@material-ui/core/Button'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import DialogTitle from '@material-ui/core/DialogTitle'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import Stack from '@material-ui/core/Stack'
import Typography from '@material-ui/core/Typography'
import { Helmet } from 'react-helmet-async'
import { SubmitHandler, useForm } from 'react-hook-form'
import { list, detail, deleteData, insert } from 'src/api/masterData'
import PageTitleWrapper from 'src/components/PageTitleWrapper'
import Swal from 'sweetalert2'
import PageTitle from 'src/components/PageTitle';

type Inputs = {
    id: number,
    discussId: number,
    user_id: number,
    content: string,
    created: Date
}

function Discuss(){
    const [open, setOpen] = useState(false)
    const [tableData, setTableData] = useState([])
    const [message, setMessage] = useState('')
    const [contentDiscuss, setContentDiscuss] = useState('')
    const { register, handleSubmit, setValue, reset, formState: { errors }, getValues } = useForm<Inputs>()

    const getData = async () => {
        const result = await list('discuss')

        if(result){
            setMessage(result.message)
            if(result.data !== null){
                setTableData(result.data)
            }
        }
    }

    useEffect(() => {
        getData()
    }, [])

    const handleClickOpen = async (id: number = 0) => {
        reset()
        setValue('discussId', id)

        if(id > 0){
            const resultDiscuss = await detail('discuss', id)

            if(resultDiscuss.code === 200){
                setContentDiscuss(resultDiscuss.data.content)
                
                const resultReplied = await detail('repliedDiscuss', id)
                if(resultReplied){
                    if(resultReplied.data !== null){
                        setValue("content", resultReplied.data.content)
                    }
                }
            }
        }

        setOpen(true)
    }

    const handleClose = () => {

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
              const result = await deleteData('discussReplied', id)
  
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

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        const endpoint = (data.id === 0) ? `discussReplied` : `discussReplied/${data.id}`
        const result = await insert(endpoint, {title: data.content})

        if(result.code === 200){
            Swal.fire({
                icon: 'success',
                title: result.message
            }).then(() => {
                setOpen(false)
                getData()
            })
        }else{
            Swal.fire({
                icon: 'warning',
                title: result.message
            })
        }
    }

    const AddButton = () => {
        return(
            <Button variant="contained" onClick={() => handleClickOpen()}> Add </Button>
        )
    }

    return(
        <>
            <Helmet>
                <title>Article</title>
            </Helmet>
            <PageTitleWrapper>
                <PageTitle
                heading="Discuss"
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
                            <CardHeader title="Discuss List" action={<AddButton />} />
                            <Divider />
                            <CardContent>
                                <TableContainer component={Paper}>
                                    <Table aria-label="Discuss table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell> Title </TableCell>
                                                <TableCell> Created </TableCell>
                                                <TableCell> Creator </TableCell>
                                                <TableCell> Tags </TableCell>
                                                <TableCell> Likes </TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                        {
                                        (tableData.length) ? tableData.map((entry, i) => {
                                            return(
                                            <TableRow key={i}>
                                                <TableCell><Button variant="text" onClick={() => handleClickOpen(entry.id)}>{entry.title}</Button></TableCell>
                                                <TableCell>{entry.created}</TableCell>
                                                <TableCell>{entry.creator}</TableCell>
                                                <TableCell>{entry.tags}</TableCell>
                                                <TableCell>{entry.likes}</TableCell>
                                            </TableRow>
                                            )
                                        })
                                        : <TableRow>
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
                    <DialogTitle> Discuss Form </DialogTitle>
                    <Box
                        component="form"
                        sx={{ '& .MuiTextField-root': { mt: 2, width: 1 } }}
                        noValidate
                        autoComplete="off"
                        onSubmit={handleSubmit(onSubmit)}>
                        <DialogContent>
                            <input
                            type="hidden"
                            {...register("id")}
                            />

                            <TextField
                                margin="dense"
                                label="Discuss Content"
                                type="text"
                                fullWidth
                                multiline
                                rows={4}
                                value={contentDiscuss}
                                inputProps={
                                    { readonly: true }
                                }
                            />

                            <TextField
                                margin="dense"
                                label="Your Reply"
                                type="text"
                                fullWidth
                                multiline
                                rows={4}
                                {...register("content", {required: { value: true, message: "Content is required!" }})}
                                helperText={(errors.content) ? errors.content.message : ''}
                            />

                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button type="submit" variant="contained">Save</Button>
                        </DialogActions>
                    </Box>
                </Dialog>
            </Container>
            <Footer />
        </>
    )
}

export default Discuss