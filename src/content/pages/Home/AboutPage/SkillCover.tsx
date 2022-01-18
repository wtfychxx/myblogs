import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import Divider from '@material-ui/core/Divider'
import { List, ListItem, ListItemAvatar, ListSubheader, ListItemText, useTheme, Typography } from '@material-ui/core'
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

const SkillCover = () => {
    const theme = useTheme()

    return(
        <Card sx={{ height: '100%' }}>
            <CardHeader title="Skill" />
            <Divider />
            <ListWrapper disablePadding>
                <ListItem button component="a" href="https://www.javascript.com" target="_blank">
                    <ListItemAvatar>
                        <Avatar
                            sx={{ 
                                width: 38,
                                height: 38
                            }}
                            src="/static/images/logo/javascript.svg">
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primaryTypographyProps={{ 
                            variant: "h5",
                            color: `${theme.colors.alpha.black[100]}`
                        }}
                        primary="Javascript"
                        />
                </ListItem>
                <ListItem button component="a" href="https://www.typescriptlang.org" target="_blank">
                    <ListItemAvatar>
                        <Avatar
                            sx={{ 
                                width: 38,
                                height: 38
                            }}
                            src="/static/images/logo/typescript.svg">
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primaryTypographyProps={{ 
                            variant: "h5",
                            color: `${theme.colors.alpha.black[100]}`
                        }}
                        primary="Typescript"
                        />
                </ListItem>
                <ListItem button component="a" href="https://www.php.net" target="_blank">
                    <ListItemAvatar>
                        <Avatar
                            sx={{ 
                                width: 38,
                                height: 38
                            }}
                            src="/static/images/logo/php.svg">
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primaryTypographyProps={{ 
                            variant: "h5",
                            color: `${theme.colors.alpha.black[100]}`
                        }}
                        primary="PHP"
                        />
                </ListItem>
                <ListItem button component="a" href="https://www.postgresql.org" target="_blank">
                    <ListItemAvatar>
                        <Avatar
                            sx={{ 
                                width: 38,
                                height: 38
                            }}
                            src="/static/images/logo/postgresql.svg">
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primaryTypographyProps={{ 
                            variant: "h5",
                            color: `${theme.colors.alpha.black[100]}`
                        }}
                        primary="PostgreSQL"
                        />
                </ListItem>
                <ListItem button component="a" href="https://www.getbootstrap.com" target="_blank">
                    <ListItemAvatar>
                        <Avatar
                            sx={{ 
                                width: 38,
                                height: 38
                            }}
                            src="/static/images/logo/bootstrap.svg">
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primaryTypographyProps={{ 
                            variant: "h5",
                            color: `${theme.colors.alpha.black[100]}`
                        }}
                        primary="Bootstrap"
                        />
                </ListItem>
            </ListWrapper>
        </Card>
    )
}

export default SkillCover