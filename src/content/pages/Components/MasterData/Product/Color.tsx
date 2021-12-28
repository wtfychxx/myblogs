import PageTitleWrapper from "src/components/PageTitleWrapper"
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
import { useEffect, useState } from "react"
import { Helmet } from "react-helmet-async"
import { SubmitHandler, useForm, Controller } from "react-hook-form"
import { insert, deleteData, detail, list, uploadImage } from "src/api/masterData"
import Swal from "sweetalert2"
import PageTitle from "src/components/PageTitle"
import ReactHookFormSelect from "src/components/ReactHookFormSelect"
import { imageValidation } from 'src/lib/imageValidation'

type Inputs = {
    id: number,
    image: string,
    colorId: number,
    fUseSpecialPrice: boolean,
    productId: number,
    fCashOnly: boolean
}

function Color(){
    const [open, setOpen] = useState(false)
    const [tableData, setTableData] = useState([])
    const [message, setMessage] = useState('')
    const [color, setColor] = useState([])
    const [product, setProduct] = useState([])
    
    const { register, handleSubmit, setValue, reset, control, formState: { errors } } = useForm<Inputs>()

    const getData = async () => {
        const result = await list('productColor')

        if(result){
            setMessage("Maaf, belum ada data")
            if(result.data !== null){
                setTableData(result.data)
            }else{
                setTableData([])
            }
        }
    }

    async function getColor(){
        const result = await list('colour')

        if(result.data !== null && result.data.length){
            setColor(result.data)
        }
    }

    async function getProduct(){
        const result = await list('product')

        if(result.data !== null && result.data.length){
            setProduct(result.data)
        }
    }
    useEffect(() => {
        getColor()
        getData()
        getProduct()
    }, [])

    const handleClickOpen = async (id: number = 0) => {
        reset()
        setValue('id', id)

        if(id > 0){
            const result = await detail('productColor', id)

            if(result.code === 200){
                setValue("colorId", result.data.colorId)
                setValue("fUseSpecialPrice", result.data.fUseSpecialPrice)
                setValue("productId", result.data.productId)
                setValue("fCashOnly", result.data.fCashOnly)
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
                const result = await deleteData("productColour", id)

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
        const endpoint = (data.id === 0) ? 'productColour' : `productColor/${data.id}`
        const result = await insert(endpoint, data)

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

    const fileValidation = async (e:any) => {
        const isValid = imageValidation(e.target.files[0])
        const file = e.target.files[0]
    
        if(isValid){
          const formData = new FormData()
          formData.append('file', file)
    
          const upload = await uploadImage(formData)
    
          if(upload.status === 'success'){
            Swal.fire({
              icon: 'success',
              title: upload.message
            })
          }
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
                <title>Product Color</title>
            </Helmet>
            <PageTitleWrapper>
                <PageTitle heading="Product Color" />
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
                            <CardHeader title="Product Color List" action={<AddButton />}></CardHeader>
                            <Divider />
                            <CardContent>
                                <TableContainer component={Paper}>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell> Color </TableCell>
                                                <TableCell> Use Special Price </TableCell>
                                                <TableCell> Product </TableCell>
                                                <TableCell> Cash Only </TableCell>
                                                <TableCell> </TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {
                                                (tableData.length) ? tableData.map((entry, i) => {
                                                    return(
                                                        <TableRow>
                                                            <TableCell><Button variant="text" onClick={() => handleClickOpen(entry.id)}>{entry.colorName}</Button></TableCell>
                                                            <TableCell>{entry.fUseSpecialPrice}</TableCell>
                                                            <TableCell>{entry.productName}</TableCell>
                                                            <TableCell>{entry.fCashOnly}</TableCell>
                                                            <TableCell><Button variant="text" color="error" onClick={() => handleDelete(entry.id)}> Delete </Button></TableCell>
                                                        </TableRow>
                                                    )
                                                }) : <TableRow>
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
                    <DialogTitle> Product Color Form </DialogTitle>
                    <Box
                        component="form"
                        sx={{ '& .MuiTextField-root': { mt: 2, width: 1 } }}
                        noValidate
                        autoComplete="off"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <DialogContent>
                            <input type="hidden" {...register("id")} />
                            <ReactHookFormSelect
                                control={control}
                                name="colorId"
                                id="colorId"
                                label="Color"
                                defaultValue={''}
                                rules={{ required: { value: true, message: "Color is required!" } }}
                            >
                            {color.map((entry, i) => {
                                return (
                                    <MenuItem key={i} value={entry.id}>{entry.name}</MenuItem>
                                )
                            })}
                            </ReactHookFormSelect>
                            {errors.colorId && <Typography variant="subtitle1">{errors.colorId.message}</Typography>}

                            <ReactHookFormSelect
                                control={control}
                                name="productId"
                                id="productId"
                                label="Product"
                                defaultValue={''}
                                rules={{ required: { value: true, message: "Product is required!"} }}
                            >
                                {product.map((entry, i) => {
                                    return(
                                        <MenuItem key={i} value={entry.id}>{entry.name}</MenuItem>
                                    )
                                })}
                            </ReactHookFormSelect>
                            {errors.productId && <Typography variant="subtitle1">{errors.productId.message}</Typography>}

                            <FormGroup row>
                                <FormControlLabel
                                    control={<Controller
                                        name="fUseSpecialPrice"
                                        control={control}
                                        defaultValue={false}
                                        render={({ field }) => <Checkbox {...field} />}
                                    />}
                                    label="Use Special Price"
                                />

                                <FormControlLabel
                                    control={<Controller
                                        name="fCashOnly"
                                        control={control}
                                        defaultValue={false}
                                        render={({ field }) => <Checkbox {...field} />}
                                    />}
                                    label="Cash Only"
                                />
                            </FormGroup>
                            
                            <Button
                                variant="contained"
                                component="label"
                                sx={{ mt: 2 }}>
                                Upload Image
                                <input
                                    type="file"
                                    hidden
                                    {...register("image")}
                                    onChange={fileValidation}
                                    />
                            </Button>
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

export default Color