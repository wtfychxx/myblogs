import { Helmet } from 'react-helmet-async';

import { Container, Grid, Card, CardHeader, CardContent } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/styles'
import { useForm, SubmitHandler } from 'react-hook-form'

const label = { inputProps: { 'aria-label': 'Switch demo' } };

const useStyles = makeStyles({
    containerStyle: {
        margin: '1rem',
        height: '100vh'
    }
})

type Inputs = {
    email: string,
    password: string
}

function Login() {
    const classes = useStyles()

    const { register, handleSubmit, control, formState: { errors } } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = data => {
        
    }

    return (
    <>
        <Helmet>
        <title>Login - Components</title>
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
                        <CardHeader title="Login Form" />
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
                                        label="Email *"
                                        {...register("email", { required: { value: true, message: "Email is required!"}, pattern: {value: /^\S+@\S+$/i, message: 'Invalid email address!'} })}
                                        helperText={(errors.email) ? errors.email.message : ''}
                                        />

                                    <TextField
                                        fullWidth
                                        required
                                        id="fullWidth"
                                        type="password"
                                        label="Password"
                                        {...register("password", { required: {
                                            value: true,
                                            message: "Password is required!"
                                        }})}
                                        helperText={(errors.password) ? errors.password.message : ''}
                                    />
                                    <Button type="submit" variant="contained" sx={{ mt: 2 }}> Login </Button>
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
