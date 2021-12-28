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
  productColorId: number,
  downPaymentAmount: number,
  monthlyAmount: number,
  duration: number
}

function Tenor() {

  const [open, setOpen] = useState(false)
  const [tableData, setTableData] = useState([])
  const [message, setMessage] = useState('')
  const [productColor, setProductColor] = useState([])
  const theme = useTheme()
  const { register, handleSubmit, setValue, control, formState: { errors } } = useForm<Inputs>()

  const getData = async () => {
    const result = await list('tenor')

    if(result){
      setMessage(result.message)
      if(result.data.length){
        setTableData(result.data)
      }else{
        setTableData([])
      }
    }
  }

  useEffect(() => {
    getData()
  },[])

  const handleClickOpen = async (id: number = 0) => {
    reset()
    setValue("id", id)

    if(id > 0){
      const result = await detail('tenor', id)

      if(result.code === 200){
        setValue('productColorId', result.data.productColorId)
        setValue('downPaymentAmount', result.data.downPaymentAmount)
        setValue('monthlyAmount', result.data.monthlyAmount)
        setValue('duration', result.data.duration)
      }
    }

    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
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

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const endpoint = (data.id === 0) ? `tenor` : `tenor/${data.id}`
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

  const AddButton = () => {
    return(
      <Button variant="contained" onClick={() => handleClickOpen()}> Add </Button>
    )
  }

  return (
    <>
      <Helmet>
        <title>Tenor</title>
      </Helmet>
      <PageTitleWrapper>
        <PageTitle
          heading="Tenor"
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
              <CardHeader title="Tenor List" action={<AddButton />} />
              <Divider />
              <CardContent>
                <TableContainer component={Paper}>
                  <Table aria-label="Tenor table">
                    <TableHead>
                      <TableRow>
                        <TableCell> Product </TableCell>
                        <TableCell> Down Payment Amount </TableCell>
                        <TableCell> Monthly Amount </TableCell>
                        <TableCell> Duration </TableCell>
                        <TableCell> </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {
                        (tableData.length) ? tableData.map((row) => (
                          <TableRow key={row.id}>
                            <TableCell><Link href="#" underline="none" onClick={() => handleClickOpen(row.id)}>{row.productName}</Link></TableCell>
                            <TableCell>{row.downPaymentAmount}</TableCell>
                            <TableCell>{row.monthlyAmount}</TableCell>
                            <TableCell>{row.duration}</TableCell>
                            <TableCell><Button variant="text" color="error" onClick={() => handleDelete(row.id)}> Delete </Button></TableCell>
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
          <DialogTitle> Tenor Form </DialogTitle>
          <Box
            component="form"
            sx={{ '& .MuiTextField-root': { mt: 2, width: 1, zIndex: '7 !important' } }}
            onSubmit={handleSubmit(onSubmit)}>
            <DialogContent>
              <input
                type="hidden"
                {...register("id")}
              />
              <ReactHookFormSelect
                control={control}
                name="productColorId"
                id="productColorId"
                label="Product Color"
                defaultValue={''}
                rules={{ required: { value: true, message: "Product Color is required!" } }}
                >
                  {productColor.map((entry, i) => {
                    return(
                      <MenuItem key={i} value={entry.id}>{entry.name}</MenuItem>
                    )
                  })}
              </ReactHookFormSelect>
              {errors.productColorId && <Typography variant="subtitle1">{errors.productColorId.message}</Typography>}

              <TextField
                autoFocus
                margin="dense"
                id="downPaymentAmount"
                label="Down Payment Amount"
                type="Text"
                fullWidth
                {...register("downPaymentAmount", { required: { value: true, message: "Down payment amount is required!" }, pattern: { value: /^[0-9]+$/i, message: "Please input only numbers!" } })}
                helperText={(errors.downPaymentAmount) ? errors.downPaymentAmount.message : ''}
              />

              <TextField
                margin="dense"
                id="monthlyAmount"
                label="Monthly Amount"
                type="Text"
                fullWidth
                {...register("monthlyAmount", { required: { value: true, message: "Monthly Amount is required!" }, pattern: { value: /^[0-9]+$/i, message: "Please input only numbers!" } })}
                helperText={(errors.monthlyAmount) ? errors.monthlyAmount.message : ''}
              />

              <TextField
                margin="dense"
                id="duration"
                label="Duration"
                type="Text"
                fullWidth
                {...register("duration", { required: { value: true, message: "Duration is required!" }, pattern: { value: /^[0-9]+$/i, message: "Please input only numbers!" } })}
                helperText={(errors.duration) ? errors.duration.message : ''}
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
  );
}

export default Tenor;