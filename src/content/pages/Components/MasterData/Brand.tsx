import { Helmet } from 'react-helmet-async';
import { useState } from 'react';

import PageTitle from 'src/components/PageTitle';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import Swal from 'sweetalert2';
import { Container, Grid, Card, CardHeader, CardContent, Divider, FormControl } from '@material-ui/core';
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
import Box from '@material-ui/core/Box';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { useTheme } from '@material-ui/core';
import { useForm, SubmitHandler } from 'react-hook-form';
import { imageValidation } from 'src/lib/imageValidation';
import { withStyles } from '@material-ui/styles';

type Inputs = {
  id: number,
  name: string,
  photoUrl: any,
  categoryId: number
}

function Brand() {

  const [open, setOpen] = useState(false)
  const theme = useTheme()
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = data => {
    console.log(data)
  }

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
          confirmButtonText: 'Do it!',
          confirmButtonColor: theme.colors.error.main
      }).then((result) => {
          if(result.value){

          }
      });
  }

  const AddButton = () => {
    return(
      <Button variant="contained" onClick={() => handleClickOpen()}> Add </Button>
    )
  }

  const fileValidation = (e:any) => {
    const isValid = imageValidation(e.target.files[0])
  }

  return (
    <>
      <Helmet>
        <title>Brand</title>
      </Helmet>
      <PageTitleWrapper>
        <PageTitle
          heading="Brand"
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
              <CardHeader title="Brand List" action={<AddButton />} />
              <Divider />
              <CardContent>
                <TableContainer component={Paper}>
                  <Table aria-label="Brand table">
                    <TableHead>
                      <TableRow>
                        <TableCell> Name </TableCell>
                        <TableCell> Category </TableCell>
                        <TableCell> </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {tableData.map((row) => (
                        <TableRow key={row.id}>
                          <TableCell><Link href="#" underline="none" onClick={() => handleClickOpen(row.id)}>{row.name}</Link></TableCell>
                          <TableCell>{row.description}</TableCell>
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
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm" style={{ zIndex: 7 }}>
          <DialogTitle> Brand Form </DialogTitle>
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
              />

              <FormControl fullWidth sx={{ mt: 1 }}>
                <InputLabel id="label-category"> Category </InputLabel>
                <Select
                  label="Category"
                  labelId="label-category"
                  {...register("categoryId", { required: { value: true, message: "Category is required!" } })}
                  >
                  <MenuItem value={''}>- Choose -</MenuItem>
                </Select>
              </FormControl>
              
              <Button
                variant="contained"
                component="label"
                sx={{ mt: 2 }}>
                  Upload Brand Logo
                  <input
                    type="file"
                    hidden
                    {...register("photoUrl")}
                    onChange={fileValidation}
                    />
              </Button>
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

export default Brand;