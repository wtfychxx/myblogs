import { Helmet } from 'react-helmet-async';

import { Container, Grid, Card, CardHeader, CardContent } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/styles';
import { useForm, SubmitHandler } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { login } from 'src/api/login'
import Swal from 'sweetalert2';

const useStyles = makeStyles({
    containerStyle: {
        margin: '1rem',
        height: '100vh'
    }
})

type Inputs = {
    phone: string
}

function Login() {
    const classes = useStyles()
    const navigate = useNavigate()

    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = async data => {
        const result = await login(data.phone)
        result.code = 200

        if(result.code === 200){
            navigate('/dashboards')
        }else{
            Swal.fire({
                icon: 'warning',
                title: result.message
            })
        }
    }

    return (
    <>
        <Helmet>
        <title>Login - Otosales</title>
        </Helmet>
        <Container maxWidth="lg">
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={2}
                className={classes.containerStyle}>
                <Grid item xs={12} md={9} lg={6}>
                    <Card>
                        <CardHeader title="Otosales Login form" />
                        <CardContent>
                            <Box
                                component="form"
                                sx={{ '& .MuiTextField-root': { mt: 2, width: 1 }, }}
                                noValidate
                                autoComplete='off'
                                onSubmit={handleSubmit(onSubmit)}>                                    
                                    <TextField
                                        fullWidth
                                        id="fullWidth"
                                        label="Phone"
                                        {...register("phone", { required: { value: true, message: "Phone is required!"}, pattern: {value: /^[0-9]+$/i, message: 'Invalid phone number!'} })}
                                        helperText={(errors.phone) ? errors.phone.message : ''}
                                        />
                                    <Button type="submit" variant="contained" sx={{ mt: 2 }}> Login </Button>
                                    <Button type="button" variant="text" sx={{ mt: 2, float: 'right' }} onClick={() => navigate('/register')}> Daftar </Button>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    </>
    );
}

export default Login;
