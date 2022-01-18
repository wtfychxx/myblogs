import { Helmet } from 'react-helmet-async'
import { useEffect, useRef, useState } from 'react'
import { Container, Grid, CssBaseline, ButtonBase } from '@material-ui/core'
import { styled } from '@material-ui/core/styles'
import { NavLink as RouterLink } from 'react-router-dom'

import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'

import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import Footer from 'src/components/Footer'

import ProfileCover from './ProfileCover'
import EducationCover from './EducationCover'
import SkillCover from './SkillCover'
import ProjectCover from './ProjectCover'
import WorkCover from './WorkCover'

function Homepage(){
    const [tableData, setTableData] = useState([])

    return(
        <>
            <Helmet>
                <title> Dynasis | About </title>
            </Helmet>

            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="stretch"
                spacing={3}
                sx={{ p: 2 }}
            >
                <Grid item xs={12}>
                    <ProfileCover />
                </Grid>
                <Grid item xs={12} md={8} mt={2}>
                    <EducationCover />
                </Grid>
                <Grid item xs={12} md={4} mt={2}>
                    <SkillCover />
                </Grid>
                <Grid item xs={12} md={7}>
                    <WorkCover />
                </Grid>
                <Grid item xs={12} md={5} mt={2}>
                    <ProjectCover />
                </Grid>
            </Grid>
            <Footer />
        </>
    )
}

export default Homepage