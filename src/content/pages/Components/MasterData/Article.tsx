import { Helmet } from 'react-helmet-async'
import { useEffect, useRef, useState } from 'react'
import PageTitle from 'src/components/PageTitle'
import PageTitleWrapper from 'src/components/PageTitleWrapper'
import Swal from 'sweetalert2'
import { Container, Grid, Card, CardHeader, CardContent, Divider, Box, Paper} from '@material-ui/core';
import CardMedia from '@material-ui/core/CardMedia'
import CardActions from '@material-ui/core/CardActions'
import Footer from 'src/components/Footer'
import Button from '@material-ui/core/Button'
import DialogTitle from '@material-ui/core/DialogTitle'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'
import { useForm, SubmitHandler } from 'react-hook-form'
import { detail, list, insert, deleteData } from 'src/api/masterData'
import { useTheme } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close';

type Inputs = {
  id: number,
  title: string,
  content: string,
  created: Date,
  creator: number,
  tags: string[],
  likes: number
}

export interface SideProps{
  tableData: string[]
}

function Article() {
  const [open, setOpen] = useState(false)
  const [tableData, setTableData] = useState([])
  const [message, setMessage] = useState('')
  const { register, handleSubmit, setValue, formState: { errors }, getValues } = useForm<Inputs>({
    defaultValues: {
      tags: []
    }
  })

  const theme = useTheme()

  const getData = async () => {
    const result = await list('articles')

    setTableData([
      {
        id: 1,
        title: "Judul artikel",
        content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque quo non accusantium dolorem nisi, cumque asperiores exercitationem adipisci neque facere minima dignissimos blanditiis, consequatur labore rem laboriosam in explicabo deleniti, sed cupiditate ipsum illo numquam perspiciatis. Velit voluptas hic temporibus cum nam laboriosam, dolore aut veritatis atque alias ab, minima ipsa deserunt quidem quisquam? Aperiam hic eos ipsum voluptas ipsa amet nisi quam quaerat culpa. Nulla mollitia, recusandae iste ut reprehenderit laboriosam voluptatibus, praesentium tenetur deserunt accusantium, minus autem. Quos incidunt distinctio laborum fuga, eius dignissimos consequatur magni modi, molestiae eveniet quidem voluptates delectus harum sapiente a alias, quisquam voluptatibus obcaecati repellat doloribus culpa nihil maxime maiores perferendis! Provident labore rerum asperiores pariatur, facere dolorum quo deleniti et nihil ratione!",
        created: "2020-08-24",
        creator: "Fadhli Yulyanto",
        tags: "Otomotif, Motor, Mobil",
        likes: "200"
      }
    ])
    if(result){
      setMessage(result.message)
      if(result.data !== null){
        setTableData(result.data)
      }
    }
  }

  useEffect(() => {
    getData()
  },[])

  const handleClickOpen = async (id: number = 0) => {
    setOpen(true)

    setValue("id", id)
    setValue("title", "")
    
    if(id > 0){
      const result = await detail('articles', id)
      
      if(result.code === 200){
        setValue("title", result.data.title)
      }
    }
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
            const result = await deleteData('articles', id)

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
    const endpoint = (data.id === 0) ? `articles` : `articles/${data.id}`
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

  const handleAddition = (tags) => {
    const tagsValue = getValues("tags")

    setValue("tags", [...tagsValue, tags])
    console.log(getValues("tags"))
  }

  const keyCodes = {
    comma: 188,
    enter: 13
  }

  const delimiter = [keyCodes.comma, keyCodes.enter]

  const addTags = (e: any) => {
    if(e.keyCode === 13){
      alert('masuk')
    }
  }

  return (
    <>
      <Helmet>
        <title>Article</title>
      </Helmet>
      <PageTitleWrapper>
        <PageTitle
          heading="Article"
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
              <CardHeader title="Article List" action={<AddButton />} />
              <CardContent>
                <Grid container spacing={4}>
                  {tableData.map((entry, i) => {
                    return(
                    <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
                      <Card>
                        <CardHeader title={<Link href="#" underline="none" onClick={() => handleClickOpen(entry.id)}>{entry.title}</Link>} action={<CloseIcon sx={{ cursor: 'pointer' }}  onClick={() => handleDelete(entry.id)} />} />
                        <CardContent>
                          <Typography gutterBottom variant="body2" color="text.secondary">
                            {entry.content.split(/\s+/, 20).join(" ")}
                          </Typography>
                          <Typography variant="h5" component="div" sx={{ color: theme.colors.primary.main }}>
                            {entry.creator} - {entry.created}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                    )
                  })}
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        {/* Modal Dialog */}
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm" style={{ zIndex: 7 }}>
          <DialogTitle> Article Form </DialogTitle>
          <Box
            component="form"
            sx={{ '& .MuiTextField-root': { mt: 2, width: 1 } }}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit(onSubmit)}>
            <DialogContent>
              <input
              type="hidden"
              {...register("id")}
              />
              <TextField
                autoFocus
                margin="dense"
                label="Name"
                type="text"
                fullWidth
                {...register("title", {required: { value: true, message: "Title is required!" }})}
                helperText={(errors.title) ? errors.title.message : ''}
              />

              <TextField
                margin="dense"
                label="Content"
                type="text"
                fullWidth
                multiline
                rows={4}
                {...register("content", {required: { value: true, message: "Content is required!" }})}
                helperText={(errors.content) ? errors.content.message : ''}
              />

              <TextField
                label="Content"
                type="text"
                fullWidth
                {...register("tags")}
                helperText={(errors.tags) ? (errors.tags as any)?.message : ''}
              />

            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit" variant="contained">Save</Button>
            </DialogActions>
          </Box>
        </Dialog>
        {/* End Modal Dialog */}
      </Container>
      <Footer />
    </>
  );
}

export default Article;