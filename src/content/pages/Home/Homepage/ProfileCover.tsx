import Box from "@material-ui/core/Box"
import Typography from '@material-ui/core/Typography'
import { styled } from '@material-ui/core/styles'

import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'

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
            <CardCover>
                <CardMedia image="/homepage-background.jpg" />
            </CardCover>

        </>
    )
}

export default ProfileCover