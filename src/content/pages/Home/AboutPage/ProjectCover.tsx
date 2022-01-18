import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import Divider from '@material-ui/core/Divider'
import { List, ListItem, ListItemAvatar,  ListItemText, useTheme } from '@material-ui/core'
import Avatar from '@material-ui/core/Avatar'

import { styled } from '@material-ui/core/styles'

const ListWrapper = styled(List)(
    () => `
        .MuiListItem-root{
            border-radius: 0;
            margin: 0;
        }
    `
)

const ProjectCover = () => {
    const theme = useTheme()

    return(
        <Card sx={{ height: '100%' }}>
            <CardHeader title="Projects" />
            <Divider />
            <ListWrapper disablePadding>
                <ListItem button component="a" href="https://pemilo.id" target="_blank">
                    <ListItemAvatar>
                        <Avatar
                            sx={{ 
                                width: 38,
                                height: 38
                             }}
                            src="/static/images/logo/pemilo.svg"
                        />
                    </ListItemAvatar>
                    <ListItemText
                        primaryTypographyProps={{ 
                            variant: 'h5',
                            color: `${theme.colors.alpha.black[100]}`
                        }}
                        primary="Pemilo"
                    />
                </ListItem>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar
                            sx={{ 
                                width: 38,
                                height: 38,
                                background: `${theme.colors.info.main}`,
                                color: `${theme.palette.info.contrastText}`
                             }}>
                            ART
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primaryTypographyProps={{ 
                            variant: 'h5',
                            color: `${theme.colors.alpha.black[100]}`
                        }}
                        primary="Aplikasi Running Test"
                    >

                    </ListItemText>
                </ListItem>
            </ListWrapper>
        </Card>
    )
}

export default ProjectCover