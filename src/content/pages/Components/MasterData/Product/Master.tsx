import { Helmet } from "react-helmet-async"
import React, { useEffect, useState } from "react"

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
import Menu, { MenuProps } from '@material-ui/core/Menu'
import MenuItem from "@material-ui/core/MenuItem"
import { useTheme } from "@material-ui/core"
import { useForm, SubmitHandler } from "react-hook-form"
import { imageValidation } from "src/lib/imageValidation"
import { detail, list, insert, deleteData } from "src/api/masterData"
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import ReactHookFormSelect from "src/components/ReactHookFormSelect"
import { styled, alpha } from '@material-ui/core/styles'

type Inputs = {
  id: number
  name: string
  basePrice: number
  description: string
  brandId: number
  cityId: number
}

const StyleMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
    open={Boolean()}
    {...props}
    />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color: theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));

function Master() {
  const [open, setOpen] = useState(false)
  const [tableData, setTableData] = useState([])
  const [message, setMessage] = useState("")
  const [brand, setBrand] = useState([])
  const [city, setCity] = useState([])
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openAnchor = Boolean(anchorEl);

  
  const handleClickDropdown = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleCloseDropdown = () => {
    setAnchorEl(null)
  }

  const handleExcel = (event) => {
    document.getElementById('fileUpload').click()
  }

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
      if (result.data !== null) {
        setTableData(result.data)
      }else{
        setTableData([])
      }
    }
  }

  async function getBrand(){
    const results = await list('brand')

    if(results.data !== null && results.data.length){
      setBrand(results.data)
    }
  }

  async function getCity(){
    const results = await list('city')

    if(results.data !== null && results.data.length){
      setCity(results.data)
    }
  }

  useEffect(() => {
    getData()
    getBrand()
    getCity()
  }, [])

  const handleClickOpen = async (id: number = 0) => {
    reset()
    setValue("id", id)

    if (id > 0) {
      const result = await detail("product", id)

      if (result.code === 200) {
        setValue("name", result.data.name)
        setValue("basePrice", result.data.basePrice)
        setValue("description", result.data.description)
        setValue("brandId", result.data.brandId)
        setValue("cityId", result.data.cityId)
      }
    }

    // handleCloseDropdown()
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
        const result = await deleteData("product", id)

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
    const endpoint = data.id === 0 ? `product` : `product/${data.id}`
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

  const fileValidation = async (e:any) => {
    const isValid = imageValidation(e.target.files[0])
    const file = e.target.files[0]

    if(isValid){
      const formData = new FormData()
      formData.append('file', file)

      const upload = {
        status: 'success',
        message: 'ok'
      }

      if(upload.status === 'success'){
        Swal.fire({
          icon: 'success',
          title: upload.message
        })
      }
    }
  }

  const AddButton = () => {
    return (
      <div>
        <Button
          id="demo-customized-button"
          variant="contained"
          onClick={handleClickDropdown}
          aria-controls="demo-customized-menu"
          aria-haspopup="true"
          aria-expanded={openAnchor ? 'true' : undefined}
          disableElevation
          endIcon={<KeyboardArrowDownIcon />}
          >
          Add
        </Button>
        <StyleMenu
          id="demo-customized-menu"
          MenuListProps={{
            'aria-labelledby': 'demo-customized-button',
          }}
          anchorEl={anchorEl}
          open={openAnchor}
          onClose={handleCloseDropdown}
        >
          <MenuItem onClick={() => handleClickOpen()} disableRipple>
            By a Form
          </MenuItem>
          <MenuItem onClick={handleCloseDropdown} disableRipple>
            By Excel
          </MenuItem>
        </StyleMenu>
      </div>
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
              <CardHeader title="Product List" action={<div>
                <Button
                  id="demo-customized-button"
                  variant="contained"
                  onClick={handleClickDropdown}
                  aria-controls="demo-customized-menu"
                  aria-haspopup="true"
                  aria-expanded={openAnchor ? 'true' : undefined}
                  disableElevation
                  endIcon={<KeyboardArrowDownIcon />}
                  >
                  Add
                </Button>
                <StyleMenu
                  id="demo-customized-menu"
                  MenuListProps={{
                    'aria-labelledby': 'demo-customized-button',
                  }}
                  anchorEl={anchorEl}
                  open={openAnchor}
                  onClose={handleCloseDropdown}
                >
                  <MenuItem onClick={() => {handleClickOpen(); handleCloseDropdown()}} disableRipple>
                    By a Form
                  </MenuItem>
                  <MenuItem onClick={handleExcel} disableRipple>
                    <input
                      type="file"
                      id="fileUpload"
                      hidden
                      onChange={fileValidation}
                      />
                    By Excel
                  </MenuItem>
                </StyleMenu>
              </div>} />
              <Divider />
              <CardContent>
                <TableContainer component={Paper}>
                  <Table aria-label="Product table">
                    <TableHead>
                      <TableRow>
                        <TableCell> Name </TableCell>
                        <TableCell> Base Price </TableCell>
                        <TableCell> Brand </TableCell>
                        <TableCell> City </TableCell>
                        <TableCell> </TableCell>
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
                              <TableCell>{entry.basePrice}</TableCell>
                              <TableCell>{entry.brandName}</TableCell>
                              <TableCell>{entry.cityName}</TableCell>
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
                          <TableCell colSpan={5}>{message}</TableCell>
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
                  {
                    brand.map((entry, i) => {
                      return(
                        <MenuItem key={i} value={entry.id}>{entry.name}</MenuItem>
                      )
                    })
                  }
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
                  {
                    city.map((entry, i) => {
                      return(
                        <MenuItem key={i} value={entry.id}>{entry.name}</MenuItem>
                      )
                    })
                  }
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
