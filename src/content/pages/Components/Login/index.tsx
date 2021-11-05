import { Helmet } from 'react-helmet-async';
import { useState } from 'react';

import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Container, Grid, Card, CardHeader, CardContent } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/styles';

const label = { inputProps: { 'aria-label': 'Switch demo' } };

const useStyles = makeStyles({
    containerStyle: {
        margin: '1rem',
        height: '100vh'
    }
})

function Login() {
    const classes = useStyles()

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
                                autoComplete='off'>
                                    <TextField
                                        fullWidth
                                        required
                                        id="fullWidth"
                                        label="Email"
                                    />
                                    <TextField
                                        fullWidth
                                        required
                                        id="fullWidth"
                                        label="Password"
                                    />
                                    <Button variant="contained" sx={{ mt: 2 }}> Login </Button>
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
