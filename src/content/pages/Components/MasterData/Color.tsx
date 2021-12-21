import { Helmet } from 'react-helmet-async'
import { useEffect, useState } from 'react'

import PageTitle from 'src/components/PageTitle'
import PageTitleWrapper from 'src/components/PageTitleWrapper'
import Swal from 'sweetalert2'
import { Container, Grid, Card, CardHeader, CardContent, Divider, FormControl } from '@material-ui/core'
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
import Box from '@material-ui/core/Box'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import { useTheme } from '@material-ui/core'
import { useForm, SubmitHandler } from 'react-hook-form'
import { imageValidation } from 'src/lib/imageValidation'
import { detail, list, insert, deleteData } from 'src/api/masterData';

type Inputs = {
  id: number,
  name: string,
  hex: string
}

function Color() {

  const [open, setOpen] = useState(false)
  const [tableData, setTableData] = useState([])
  const [message, setMessage] = useState('')
  const theme = useTheme()
  const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm<Inputs>()

  const getData = async () => {
    const result = await list('colour')

    if(result){
      setMessage(result.message)
      if(result.data !== null){
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
      const result = await detail('colour', id)

      if(result.code === 200){
        setValue("id", id)
        setValue("name", result.data.name)
        setValue("hex", result.data.hex)
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
          const result = await deleteData('colour', id)

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
    const endpoint = (data.id === 0) ? `colour` : `colour/${data.id}`
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
        <title>Color</title>
      </Helmet>
      <PageTitleWrapper>
        <PageTitle
          heading="Color"
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
              <CardHeader title="Color List" action={<AddButton />} />
              <Divider />
              <CardContent>
                <TableContainer component={Paper}>
                  <Table aria-label="Color table">
                    <TableHead>
                      <TableRow>
                        <TableCell> Name </TableCell>
                        <TableCell> Hex Code </TableCell>
                        <TableCell> </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {
                        tableData.length ? tableData.map((row) => (
                          <TableRow key={row.id}>
                            <TableCell><Button variant="text" onClick={() => handleClickOpen(row.id)}>{row.name}</Button></TableCell>
                            <TableCell>{row.hex}</TableCell>
                            <TableCell><Button variant="text" color="error" onClick={() => handleDelete(row.id)}> Delete </Button></TableCell>
                          </TableRow>
                        )) : (
                          <TableRow>
                            <TableCell colSpan={3}>{message}</TableCell>
                          </TableRow>
                        )
                      }
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm" style={{ zIndex: 7 }}>
          <DialogTitle> Color Form </DialogTitle>
          <Box
            component="form"
            sx={{ '& .MuiTextField-root': { mt: 2, width: 1, zIndex: '7 !important' } }}
            onSubmit={handleSubmit(onSubmit)}>
            <DialogContent>
              <input
                type="hidden"
                {...register("id")}
              />
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Name"
                type="Text"
                fullWidth
                {...register("name", { required: { value: true, message: "Name is required!" } })}
                helperText={(errors.name) ? errors.name.message : ''}
              />

              <TextField
                margin="dense"
                id="Hex Code"
                label="Hex Code"
                type="Text"
                fullWidth
                {...register("hex", { required: { value: true, message: "Hex Code is required!" }, pattern: { value: /^#([0-9A-F]{3}){1,2}$/i, message: "Please insert a valid hexa color code!" } })}
                helperText={(errors.hex) ? errors.hex.message : ''}
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

export default Color;