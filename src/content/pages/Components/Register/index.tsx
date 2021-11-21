import { Container, Grid, Card, CardHeader, CardContent, Typography as Text } from '@material-ui/core';
import { Helmet } from 'react-helmet-async';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { useForm, SubmitHandler } from 'react-hook-form'
import { registerData } from 'src/api/register';

type Inputs = {
    email: string,
    name: string,
    nik: string,
    phone: string,
    address: string
}

function Register(){
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = async data => {
        const result = await registerData('register', data)
        console.log(result)
    }

    return(
        <>
        <Helmet>
            <title>Register - Otosales</title>
        </Helmet>
        <Container maxWidth="lg">
            <Box
                display="flex"
                justifyContent="center"
                justifyItems="center"
                marginY={17}
                height="60vh"
                >
                <Grid item xs={12} md={9} lg={6}>
                    <CardContent>
                        <Card>
                            <Box paddingX={2} paddingY={3} sx={{ '& .MuiTextField-root' : {width: 1} }}>
                                <Text variant="h5" align="center" gutterBottom>
                                    Register
                                </Text>

                                <Box
                                    sx={{ '& .MuiTextField-root': { mt: 2, width: 1 }, }}
                                    marginTop={2}
                                    marginBottom={2}
                                    onSubmit={handleSubmit(onSubmit)}
                                    component="form">
                                    <TextField
                                        {...register("email", {
                                            required: { value: true, message: "Email is required!"},
                                            pattern: {value: /^\S+@\S+$/i, message: 'Invalid email address!'}
                                        })}
                                        helperText={(errors.email) ? errors.email.message : ''}
                                        fullWidth
                                        label="Email"
                                        />
                                    <TextField
                                        {...register("name", {
                                            required: { value: true, message: "Name is required!"},
                                        })}
                                        helperText={(errors.name) ? errors.name.message : ''}
                                        fullWidth
                                        label="Name"
                                        />
                                    <TextField
                                        {...register("phone", {
                                            required: {
                                                value: true,
                                                message: "Phone is required!",
                                            },
                                            pattern: {
                                                value: /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/,
                                                message: "Invalid phone number"
                                            }
                                        })}
                                        helperText={errors.phone ? errors.phone.message : ''}
                                        fullWidth
                                        label="Phone"
                                        />

                                    <TextField
                                        {...register("address")}
                                        fullWidth
                                        multiline
                                        rows={4}
                                        label="Address"
                                        />
                                    <Button type="submit" variant="contained" sx={{ mt: 2 }}> Save </Button>
                                </Box>
                            </Box>
                        </Card>
                    </CardContent>
                </Grid>
            </Box>
        </Container>
        </>
    )
}

export default Register