// import component material ui
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import Divider from '@material-ui/core/Divider'
import { Box, Grid, Typography } from '@material-ui/core'

const EducationCover = () => {
    const educationData = [
        {
            name: "SDN Kalibaru II",
            period: "2007 - 2013",
            city: "Bekasi",
            province: "West Java"
        },
        {
            name: "SMPN 25 Kota Bekasi",
            period: "2013-2016",
            city: "Bekasi",
            province: "West Java"
        },
        {
            name: "SMKN 5 Kota Bekasi",
            period: "2016-2019",
            city: "Bekasi",
            province: "West Java"
        },
        {
            name: "Institut Teknologi & Bisnis Swadharma",
            period: "2021 - Now",
            city: "West Jakarta",
            province: "DKI Jakarta"
        }
    ]

    return(
        <>
            <Card>
                <CardHeader title="Educational History" />
                <Divider />
                <Box p={2}>
                    <Grid container spacing={0}>
                        {educationData.map((entry, i) => (
                            <Grid key={i} item xs={12} sm={6} lg={4}>
                                <Box p={3} display="flex" alignItems="flex-start" >
                                    <Box pl={2}>
                                        <Typography gutterBottom variant="h3" color="primary">
                                            {entry.name}
                                        </Typography>
                                        <Typography gutterBottom variant="subtitle2">
                                            {entry.period}
                                        </Typography>
                                        <Typography gutterBottom variant="body2">
                                            {entry.city}, {entry.province}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Card>
        </>
    )
}

export default EducationCover