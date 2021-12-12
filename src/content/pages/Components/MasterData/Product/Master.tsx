import { Helmet } from "react-helmet-async"
import { useEffect, useState } from "react"

import PageTitle from "src/components/PageTitle"
import PageTitleWrapper from "src/components/PageTitleWrapper"
import Swal from "sweetalert2"
import {
  Container,
  Grid,
  Card,
  CardHeader,
  CardContent,
  Divider,
  FormControl,
  Typography,
} from "@material-ui/core"
import Footer from "src/components/Footer"
import Button from "@material-ui/core/Button"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableContainer from "@material-ui/core/TableContainer"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import Paper from "@material-ui/core/Paper"
import Link from "@material-ui/core/Link"
import DialogTitle from "@material-ui/core/DialogTitle"
import Dialog from "@material-ui/core/Dialog"
import DialogContent from "@material-ui/core/DialogContent"
import DialogActions from "@material-ui/core/DialogActions"
import TextField from "@material-ui/core/TextField"
import Box from "@material-ui/core/Box"
import Select from "@material-ui/core/Select"
import InputLabel from "@material-ui/core/InputLabel"
import MenuItem from "@material-ui/core/MenuItem"
import { useTheme } from "@material-ui/core"
import { useForm, SubmitHandler } from "react-hook-form"
import { imageValidation } from "src/lib/imageValidation"
import { detail, list, insert, deleteData } from "src/api/masterData"
import { IosShare, SettingsInputComponentTwoTone } from "@material-ui/icons"
import ReactHookFormSelect from "src/components/ReactHookFormSelect"

type Inputs = {
  id: number
  name: string
  basePrice: number
  discussId: number
  reviewId: number
  description: string
  brandId: number
  cityId: number
}

function Master() {
  const [open, setOpen] = useState(false)
  const [tableData, setTableData] = useState([])
  const [message, setMessage] = useState("")
  const theme = useTheme()
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    control,
    formState: { errors }
  } = useForm<Inputs>()

  const getData = async () => {
    const result = await list("product")

    if (result) {
      setMessage("Maaf, belum ada data")
      if (result.data.length) {
        setTableData(result.data)
      }
    }
  }

  useEffect(() => {
    getData()
  }, [])

  const handleClickOpen = async (id: number = 0) => {
    reset()
    setValue("id", id)

    if (id > 0) {
      const result = await detail("product", id)

      if (result.code === 200) {
        setValue("name", result.data.name)
        setValue("basePrice", result.data.basePrice)
        setValue("discussId", result.data.discussId)
        setValue("reviewId", result.data.reviewId)
        setValue("description", result.data.description)
        setValue("brandId", result.data.brandId)
        setValue("cityId", result.data.cityId)
      }
    }

    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleDelete = (id: number) => {
    return Swal.fire({
      icon: "question",
      title: "Are you sure to delete?",
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonText: "Do it!",
    }).then(async (result) => {
      if (result.value) {
        const result = await deleteData("category", id)

        if (result.code === 200) {
          Swal.fire({
            icon: "success",
            title: result.message,
          }).then(() => {
            getData()
          })
        }
      }
    })
  }

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const endpoint = data.id === 0 ? `category` : `category/${data.id}`
    const result = await insert(endpoint, data)

    if (result.code === 200) {
      Swal.fire({
        icon: "success",
        title: result.message,
      }).then(() => {
        setOpen(false)
        getData()
      })
    } else {
      Swal.fire({
        icon: "warning",
        title: result.message,
      })
    }
  }

  const AddButton = () => {
    return (
      <Button variant="contained" onClick={() => handleClickOpen()}>
        Add
      </Button>
    )
  }

  return(
    <>
      <Helmet>
        <title>Product</title>
      </Helmet>
      <PageTitleWrapper>
        <PageTitle heading="Product" />
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
              <CardHeader title="Product List" action={<AddButton />} />
              <Divider />
              <CardContent>
                <TableContainer component={Paper}>
                  <Table aria-label="Product table">
                    <TableHead>
                      <TableRow>
                        <TableCell> Name </TableCell>
                        <TableCell> Base Price </TableCell>
                        <TableCell> Discuss </TableCell>
                        <TableCell> Review </TableCell>
                        <TableCell> Description </TableCell>
                        <TableCell> Brand </TableCell>
                        <TableCell> City </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {tableData.length ? (
                        tableData.map((entry, i) => {
                          return (
                            <TableRow key={i}>
                              <TableCell>
                                <Button
                                  variant="text"
                                  onClick={() => handleClickOpen(entry.id)}
                                >
                                  {entry.name}
                                </Button>
                              </TableCell>
                              <TableCell>
                                <Button
                                  variant="text"
                                  color="error"
                                  onClick={() => handleDelete(entry.id)}
                                >
                                  Delete
                                </Button>
                              </TableCell>
                            </TableRow>
                          )
                        })
                      ) : (
                        <TableRow>
                          <TableCell colSpan={2}>{message}</TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Dialog
          open={open}
          onClose={handleClose}
          fullWidth
          maxWidth="sm"
          style={{ zIndex: 7 }}
        >
          <DialogTitle> Product Form </DialogTitle>
          <Box
            component="form"
            sx={{ "& .MuiTextField-root": { mt: 2, width: 1 } }}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit(onSubmit)}
          >
            <input type="hidden" {...register("id")} />
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                label="Name"
                type="text"
                fullWidth
                {...register("name", {
                  required: { value: true, message: "Name is required!" },
                })}
                helperText={errors.name ? errors.name.message : ""}
              />

              <TextField
                autoFocus
                margin="dense"
                label="Base Price"
                type="text"
                {...register("basePrice", {
                  required: { value: true, message: "Base Price is required!" },
                  pattern: { value: /\d+/g, message: "Please input a valid numbers!" }
                })}
                helperText={errors.basePrice ? errors.basePrice.message : ""} />

              <ReactHookFormSelect
                control={control}
                name="discussId"
                id="discussId"
                label="Discuss"
                defaultValue={''}
                rules={{ required: { value: true, message: `Discuss is required!`} }}
                >

              </ReactHookFormSelect>
              {errors.discussId ? <Typography sx={{ ml: 1 }} variant="subtitle1"> {errors.discussId.message} </Typography>: ''}

              <ReactHookFormSelect
                control={control}
                name="reviewId"
                id="reviewId"
                label="Review"
                defaultValue={''}
                rules={{ required: { value: true, message: `Review is required!`} }}
                >

              </ReactHookFormSelect>
              {errors.reviewId ? <Typography sx={{ ml: 1 }} variant="subtitle1"> {errors.reviewId.message} </Typography>: ''}

              <TextField
                autoFocus
                margin="dense"
                label="Description"
                type="text"
                {...register("description")}
                multiline
                rows={4}
                helperText={errors.description ? errors.description.message : ""} />

              <ReactHookFormSelect
                control={control}
                name="brandId"
                id="brandId"
                label="Brand"
                defaultValue={''}
                rules={{ required: { value: true, message: `Brand is required!`} }}
                >

              </ReactHookFormSelect>
              {errors.brandId ? <Typography sx={{ ml: 1 }} variant="subtitle1"> {errors.brandId.message} </Typography>: ''}

              <ReactHookFormSelect
                control={control}
                name="cityId"
                id="cityId"
                label="City"
                defaultValue={''}
                rules={{ required: { value: true, message: `City is required!`} }}
                >

              </ReactHookFormSelect>
              {errors.brandId ? <Typography sx={{ ml: 1 }} variant="subtitle1"> {errors.brandId.message} </Typography>: ''}
                
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit" variant="contained">
                Save
              </Button>
            </DialogActions>
          </Box>
        </Dialog>
      </Container>
      <Footer />
    </>
  )
}

export default Master
