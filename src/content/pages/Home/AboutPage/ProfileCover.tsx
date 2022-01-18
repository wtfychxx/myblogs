import Box from "@material-ui/core/Box"
import Typography from '@material-ui/core/Typography'
import { styled } from '@material-ui/core/styles'

// import material ui component
import Grid from '@material-ui/core/Grid'
import Avatar from '@material-ui/core/Avatar'
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import IconButton from '@material-ui/core/IconButton'
import Link from '@material-ui/core/Link'

// import icon
import FacebookIcon from '@material-ui/icons/Facebook';
import GithubIcon from '@material-ui/icons/GitHub';
import YoutubeIcon from '@material-ui/icons/YouTube';

const AvatarWrapper = styled(Card)(
    ({ theme }) => `
        position: relative;
        overflow: visible;
        display: inline-block;
        margin-top: -${theme.spacing(12)};

        .MuiAvatar-root{
            width: ${theme.spacing(24)};
            height: ${theme.spacing(24)};
        }
    `
)

const CardCover = styled(Card)(
    ({ theme }) => `
        position: relative;
        .MuiCardMedia-root{
            height: ${theme.spacing(26)};
        }
    `
)

const ProfileCover = () => {
    return(
        <>
            <Card>
                <CardCover>
                    <CardMedia image="/homepage-background.jpg" />
                </CardCover>
                <CardContent>
                    <Grid container
                        justifyContent="center"
                        alignItems="center"
                        direction="column">
                        <Grid item xs={12}>
                            <AvatarWrapper>
                                <Avatar variant="rounded" alt="profile user" src={`/static/images/avatars/PAS FOTO.png`} />
                            </AvatarWrapper>
                        </Grid>
                        <Grid item xs={12} mt={3} sx={{ textAlign: 'center' }}>
                            <Typography gutterBottom variant="h2">
                                Fadhli Yulyanto
                            </Typography>
                            <Typography gutterBottom variant="subtitle2">
                                Web Development | UI Designer
                            </Typography>
                        </Grid>

                        <Grid item xs={12} mt={2}>
                            <Grid container
                                    justifyContent="space-between">
                                <Grid item xs={4}>
                                    <IconButton target="_blank" href="https://m.facebook.com/supri.a.suci?ref=bookmarks" color="primary" size="large">
                                        <FacebookIcon />
                                    </IconButton>
                                </Grid>
                                <Grid item xs={4}>
                                    <IconButton target="_blank" href="https://github.com/wtfychxx" size="large">
                                        <GithubIcon />
                                    </IconButton>
                                </Grid>
                                <Grid item xs={4}>
                                    <IconButton target="_blank" href="https://m.youtube.com/channel/UCiOkoXEAn46UScaVXJXh2rQ" color="error" size="large">
                                        <YoutubeIcon />
                                    </IconButton>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>    
        </>
    )
}

export default ProfileCover