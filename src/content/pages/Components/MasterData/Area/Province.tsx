import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';

import PageTitle from 'src/components/PageTitle';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import Swal from 'sweetalert2';
import { Container, Grid, Card, CardHeader, CardContent, Divider, Box } from '@material-ui/core';
import Footer from 'src/components/Footer';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import { useForm, SubmitHandler } from 'react-hook-form';
import { detail, list, insert, deleteData } from 'src/api/masterData';

type Inputs = {
  id: number,
  name: string,
}

export interface SideProps{
  tableData: string[]
}

function Province() {
  const [open, setOpen] = useState(false)
  const [tableData, setTableData] = useState([])
  const [message, setMessage] = useState('')
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<Inputs>()

  const getData = async () => {
    const result = await list('province')

    if(result){
      setMessage('Maaf, belum ada data')
      if(result.data !== null){
        setTableData(result.data)
      }
    }
  }

  useEffect(() => {
    getData()
  },[])

  const handleClickOpen = (id: number = 0) => {
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
          const result = await deleteData('province', id)

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
    const endpoint = (data.id === 0) ? `province` : `province/${data.id}`
    const result = await insert(endpoint, {name: data.name})

    if(result.code === 200){
      Swal.fire({
        icon: 'success',
        title: result.message
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
        <title>Province</title>
      </Helmet>
      <PageTitleWrapper>
        <PageTitle
          heading="Province"
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
              <CardHeader title="Province List" action={<AddButton />} />
              <Divider />
              <CardContent>
                <TableContainer component={Paper}>
                  <Table aria-label="Province table">
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
                            <TableCell><Button variant="text" color="error" onClick={() => handleDelete(entry.id)}> Delete </Button></TableCell>
                          </TableRow>
                        )
                      })
                      : null
                    }
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
          <DialogTitle> Province Form </DialogTitle>
          <Box
            component="form"
            sx={{ '& .MuiTextField-root': { mt: 2, width: 1 } }}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit(onSubmit)}>
            <input
              type="hidden"
              {...register("id")}
            />
            <DialogContent>
                <TextField
                  autoFocus
                  margin="dense"
                  label="Name"
                  type="text"
                  fullWidth
                  {...register("name", {required: { value: true, message: "Name is required!" }})}
                  helperText={(errors.name) ? errors.name.message : ''}
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
  );
}

export default Province;