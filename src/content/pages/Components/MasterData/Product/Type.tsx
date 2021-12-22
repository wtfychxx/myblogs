import PageTitleWrapper from "src/components/PageTitleWrapper"
import PageTitle from "src/components/PageTitle"
import {
  Container,
  Grid,
  Card,
  CardHeader,
  CardContent,
  Divider,
  FormControl,
  Typography,
  Paper
} from "@material-ui/core"
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import DialogTitle from '@material-ui/core/DialogTitle'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import FormControlLabel from'@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import FormGroup from '@material-ui/core/FormGroup'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import { useEffect, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { deleteData, detail, insert, list } from 'src/api/masterData'
import { Helmet } from "react-helmet-async"
import Swal from 'sweetalert2'

type Inputs = {
    id: number,
    name: string
}

function ProductType(){
    const [open, setOpen] = useState(false)
    const [tableData, setTableData] = useState([])
    const [message, setMessage] = useState('')

    const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm<Inputs>()

    const getData = async() => {
        const result = await list('productType')

        if(result){
            setMessage("Maaf, belum ada data")
            if(result.data !== null){
                setTableData(result.data)
            }else{
                setTableData([])
            }
        }
    }

    useEffect(() => {
        getData()
    }, [])

    const handleClickOpen = async(id: number = 0) => {
        reset()
        setValue('id', id)

        if(id > 0){
            const result = await detail('productType', id)

            if(result.code === 200){
                setValue('name', result.data.name)
            }
        }

        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleDelete = (id: number) => {
        return Swal.fire({
            icon: 'question',
            title: 'Are you sure to delete?',
            text: "You won't be able to revert this!",
            showCancelButton: true,
            confirmButtonText: "Yes, Do It!"
        }).then(async (result) => {
            if(result.value){
                const result = await deleteData("productType", id)

                if(result.code === 200){
                    Swal.fire({
                        icon: 'success',
                        title: result.message
                    }).then(() => {
                        getData()
                    })
                }
            }
        })
    }

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        const endpoint = (data.id === 0) ? 'productType' : `productType${data.id}`
        const result = await insert(endpoint, data)

        if(result.code === 200){
            Swal.fire({
                icon: 'success',
                title: result.message
            }).then(() => {
                getData()
                setOpen(false)
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
            <Button
                variant="contained"
                onClick={() => handleClickOpen()}
                >
                Add
            </Button>
        )
    }

    return(
        <>
            <Helmet>
                <title>Product Type</title>
            </Helmet>
            <PageTitleWrapper>
                <PageTitle heading="Product Type" />
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
                            <CardHeader title="Product Type" action={<AddButton />} />
                            <Divider />
                            <CardContent>
                                <TableContainer component={Paper}>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell> Name </TableCell>
                                                <TableCell> </TableCell>
                                            </TableRow>
                                        </TableHead>

                                        <TableBody>
                                            {
                                                (tableData.length) ? tableData.map((entry, i) => {
                                                    return(
                                                        <TableRow key={i}>
                                                            <TableCell><Button variant="text" onClick={() => handleClickOpen(entry.id)}>{entry.name}</Button></TableCell>
                                                            <TableCell><Button variant="text" onClick={() => handleDelete(entry.id)}> Delete </Button></TableCell>
                                                        </TableRow>
                                                    )
                                                }) : <TableRow>
                                                    <TableCell colSpan={2}>{message}</TableCell>
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
                    <DialogTitle> Product Type Form </DialogTitle>
                    <Box
                        component="form"
                        sx={{ '& .MuiTextField-root': { mt: 2, width: 1 } }}
                        noValidate
                        autoComplete="off"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <DialogContent>
                            <input type="hidden" {...register("id")} />

                            <TextField
                                margin="dense"
                                label="Name"
                                type="text"
                                fullWidth
                                variant="outlined"
                                {...register("name", { required: { value: true, message: "Name is required!"} })}
                                helperText={errors.name && errors.name.message}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button variant="contained" type="submit"> Save </Button>
                        </DialogActions>
                    </Box>
                </Dialog>
            </Container>
        </>
    )
}

export default ProductType