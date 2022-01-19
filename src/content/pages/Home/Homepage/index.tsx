import { Helmet } from 'react-helmet-async'

import { Grid, Card, CardContent, Box } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

const styles = {
    paperContainer: {
        height: '100vh',
        backgroundImage: `url(${"/background.jpg"})`,
        backgroundSize: 'cover',
        borderRadius: '0 !important'
    },
    overlay: {
        background: 'rgba(0, 0, 0, .5)',
        height: '100vh'
    }
}

function Homepage(){
    console.log(styles.overlay)
    return(
        <>
            <Helmet>
                <title> Dynasis | Blogs </title>
            </Helmet>

            <Grid container
                direction="row"
                justifyContent="center"
                alignItems="stretch"
                spacing={0}>
                <Grid item xs={12}>
                    <Card sx={styles.paperContainer}>
                        <CardContent sx={styles.overlay}>
                            <Box
                                height="100%"
                                display="flex"
                                flexDirection="column"
                                justifyContent="center"
                                alignItems="center"
                                color="#fff"
                            >
                                <Typography variant="h1" pb={4}>
                                    Welcome to Fadhli Yulyanto Blogs
                                </Typography>
                                <Button color="primary" variant='contained'>
                                    Click Me
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </>
    )
}

export default Homepage