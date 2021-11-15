import { Helmet } from 'react-helmet-async';
import { useState } from 'react';

import { Container, Grid, Card, CardHeader, CardContent, Divider } from '@material-ui/core';
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

import { IconButtonProps } from '@material-ui/core/IconButton';


interface ExpandMoreProps extends IconButtonProps{
    isOpen: boolean;
    selectedValue: number;
}
   
function Category({ PageTitle, PageTitleWrapper, Footer }) {

  const [open, setOpen] = useState(false)

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

  const handleClickOpen = (id: number) => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  return (
    <>
      <Helmet>
        <title>Cards - Components</title>
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
              <CardHeader title="Category List" />
              <Divider />
              <CardContent>
                <TableContainer component={Paper}>
                  <Table aria-label="Category table">
                    <TableHead>
                      <TableRow>
                        <TableCell> Name </TableCell>
                        <TableCell> Description </TableCell>
                        <TableCell> </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {tableData.map((row) => (
                        <TableRow key={row.id}>
                          <TableCell><Link href="#" underline="none" onClick={() => handleClickOpen(row.id)}>{row.name}</Link></TableCell>
                          <TableCell>{row.description}</TableCell>
                          <TableCell><Button variant="text"> Delete </Button></TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Subscribe</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Email Address"
              type="email"
              fullWidth
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleClose}>Subscribe</Button>
          </DialogActions>
        </Dialog>
      </Container>
      <Footer />
    </>
  );
}

export default Category;