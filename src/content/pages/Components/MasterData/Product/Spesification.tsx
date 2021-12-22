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
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import { useEffect, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { deleteData, detail, insert, list } from 'src/api/masterData'
import { Helmet } from "react-helmet-async"
import Swal from 'sweetalert2'
import ReactHookFormSelect from "src/components/ReactHookFormSelect"

type Inputs = {
    id: number,
    centimeterCubic: number,
    engineType: string,
    maxTorque: number,
    transmission: string,
    typeId: number,
    productId: number
}

function ProductSpesification(){
    const [open, setOpen] = useState(false)
    const [tableData, setTableData] = useState([])
    const [message, setMessage] = useState('')
    const [productType, setProductType] = useState([])
    const [product, setProduct] = useState([])

    const { register, handleSubmit, setValue, reset, control, formState: { errors } } = useForm<Inputs>()

    const getData = async() => {
        const result = await list('productSpesification')

        if(result){
            setMessage("Maaf, belum ada data")
            if(result.data !== null){
                setTableData(result.data)
            }else{
                setTableData([])
            }
        }
    }

    async function getProductType(){
        const result = await list('productType')

        if(result.data !== null && result.data.length){
            setProductType(result.data)
        }
    }

    async function getProductId(){
        const result = await list('productType')

        if(result.data !== null && result.data.length){
            setProduct(result.data)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    const handleClickOpen = async(id: number = 0) => {
        reset()
        setValue('id', id)

        if(id > 0){
            const result = await detail('productSpesification', id)

            if(result.code === 200){
                setValue('centimeterCubic', result.data.centimeterCubic)
                setValue('engineType', result.data.engineType)
                setValue('maxTorque', result.data.maxTorque)
                setValue('transmission', result.data.transmission)
                setValue('typeId', result.data.typeId)
                setValue('productId', result.data.productId)
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
                const result = await deleteData("productSpesification", id)

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
        const endpoint = (data.id === 0) ? 'productSpesification' : `productSpesification${data.id}`
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
                <title>Product Spesification</title>
            </Helmet>
            <PageTitleWrapper>
                <PageTitle heading="Product Spesification" />
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
                            <CardHeader title="Product Spesification" action={<AddButton />} />
                            <Divider />
                            <CardContent>
                                <TableContainer component={Paper}>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell> Product </TableCell>
                                                <TableCell> Centimeter Cubic </TableCell>
                                                <TableCell> Engine Type </TableCell>
                                                <TableCell> Max Torque </TableCell>
                                                <TableCell> Transmission </TableCell>
                                                <TableCell> Type </TableCell>
                                                <TableCell>  </TableCell>
                                            </TableRow>
                                        </TableHead>

                                        <TableBody>
                                            {
                                                (tableData.length) ? tableData.map((entry, i) => {
                                                    return(
                                                        <TableRow key={i}>
                                                            <TableCell><Button variant="text" onClick={() => handleClickOpen(entry.id)}>{entry.productName}</Button></TableCell>
                                                            <TableCell>{entry.centimeterCubic}</TableCell>
                                                            <TableCell>{entry.engineType}</TableCell>
                                                            <TableCell>{entry.maxTorque}</TableCell>
                                                            <TableCell>{entry.transmission}</TableCell>
                                                            <TableCell>{entry.type}</TableCell>
                                                            <TableCell><Button variant="text" onClick={() => handleDelete(entry.id)}> Delete </Button></TableCell>
                                                        </TableRow>
                                                    )
                                                }) : <TableRow>
                                                    <TableCell colSpan={7}>{message}</TableCell>
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
                    <DialogTitle> Product Spesification Form </DialogTitle>
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
                                label="Centimeter Cubic"
                                type="text"
                                fullWidth
                                variant="outlined"
                                {...register("centimeterCubic", { required: { value: true, message: "Centimeter Cubic is required!"}, pattern: { value: /^[0-9]+$/i, message: "Please input only numbers!" } })}
                                helperText={errors.centimeterCubic && errors.centimeterCubic.message}
                            />

                            <TextField
                                margin="dense"
                                label="Engine Type"
                                type="text"
                                fullWidth
                                variant="outlined"
                                {...register("engineType", { required: { value: true, message: "Engine Type is required!"} })}
                                helperText={errors.engineType && errors.engineType.message}
                            />

                            <TextField
                                margin="dense"
                                label="Max Torque"
                                type="text"
                                fullWidth
                                variant="outlined"
                                {...register("maxTorque", { required: { value: true, message: "Max Torque is required!"}, pattern: { value: /^[0-9],+$/i, message: "Please input only numbers!" } })}
                                helperText={errors.maxTorque && errors.maxTorque.message}
                            />

                            <TextField
                                margin="dense"
                                label="Transmission"
                                type="text"
                                fullWidth
                                variant="outlined"
                                {...register("transmission", { required: { value: true, message: "Transmission is required!"} })}
                                helperText={errors.transmission && errors.transmission.message}
                            />

                            <ReactHookFormSelect
                                control={control}
                                name="typeId"
                                id="typeId"
                                label="Type"
                                defaultValue={''}
                                rules={{ required: {  value: true, message: "Type is required!"} }}
                            >
                                {productType.map((entry, i) => {
                                    return(
                                        <MenuItem key={i} value={entry.id}>{entry.name}</MenuItem>
                                    )
                                })}
                            </ReactHookFormSelect>

                            <ReactHookFormSelect
                                control={control}
                                name="productId"
                                id="productId"
                                label="Product"
                                defaultValue={''}
                                rules={{ required: {  value: true, message: "Product is required!"} }}
                            >
                                {product.map((entry, i) => {
                                    return(
                                        <MenuItem key={i} value={entry.id}>{entry.name}</MenuItem>
                                    )
                                })}
                            </ReactHookFormSelect>

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

export default ProductSpesification