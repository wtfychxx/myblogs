import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import Divider from '@material-ui/core/Divider'
import { List, ListItem, ListItemAvatar,  ListItemText, useTheme } from '@material-ui/core'
import Avatar from '@material-ui/core/Avatar'

import { styled } from '@material-ui/core/styles'

const ListWrapper = styled(List)(
    () => `
        .MuiListItem-root {
          border-radius: 0;
          margin: 0;
        }
  `
  );  

const WorkCover = () => {
    const theme = useTheme()

    return(
        <Card sx={{ height: '100%' }}>
            <CardHeader title="Work Experience" />
            <Divider />
            <ListWrapper disablePadding>
                <ListItem button component="a" href="https://sisapp.com" target="_blank">
                    <ListItemAvatar>
                        <Avatar
                            sx={{ 
                                width: 38,
                                height: 38
                                }}
                            src="/static/images/logo/SIS.jpg"
                        />
                    </ListItemAvatar>
                    <ListItemText
                        primaryTypographyProps={{ 
                            variant: 'h5',
                            color: `${theme.colors.alpha.black[100]}`
                        }}
                        primary="PT. Sentra Inovasi Solusindo"
                    />
                    <ListItemText
                        primaryTypographyProps={{ 
                            variant: 'subtitle2'
                        }}
                        primary="November 2019 - Present"
                    />
                </ListItem>
            </ListWrapper>
        </Card>
    )
}

export default WorkCover