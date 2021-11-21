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
import { list } from 'src/api/masterData';

type Inputs = {
  id: number,
  name: string,
  description: string
}

function Category() {
  const [open, setOpen] = useState(false)
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<Inputs>()

  const getData = async () => {
    const data = await list('/', {module_table__id: 1});

    return data;
  }

  const tableData2 = getData();
  console.log(tableData2);

  const tableData = [
    {
      id: 1,
      name: 'Category 1',
      description: 'This is category 1'
    },
    {
      id: 2,
      name: 'Category 2',
      description: 'This is category 2'
    },
    {
      id: 3,
      name: 'Category 3',
      description: 'This is category 3'
    },
    {
      id: 4,
      name: 'Category 4',
      description: 'This is category 4'
    }
  ]

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
      }).then((result) => {
          if(result.value){

          }
      });
  }

  const onSubmit: SubmitHandler<Inputs> = data => {
    console.log(data)
  }

  const AddButton = () => {
    return(
      <Button variant="contained" onClick={() => handleClickOpen()}> Add </Button>
    )
  }

  return (
    <>
      <Helmet>
        <title>Category</title>
      </Helmet>
      <PageTitleWrapper>
        <PageTitle
          heading="Category"
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
              <CardHeader title="Category List" action={<AddButton />} />
              <Divider />
              <CardContent>
                <TableContainer component={Paper}>
                  <Table aria-label="Category table">
                    <TableHead>
                      <TableRow>
                        <TableCell> Name </TableCell>
                        <TableCell> </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {tableData.map((row) => (
                        <TableRow key={row.id}>
                          <TableCell><Link href="#" underline="none" onClick={() => handleClickOpen(row.id)}>{row.name}</Link></TableCell>
                          <TableCell><Button variant="text" color="error" onClick={() => handleDelete(row.id)}> Delete </Button></TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
          <DialogTitle> Category Form </DialogTitle>
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

export default Category;