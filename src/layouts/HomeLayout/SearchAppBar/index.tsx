// react depedencies
import * as React from 'react'
import { NavLink as RouterLink } from 'react-router-dom'

import { styled, alpha } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Box from '@material-ui/core/Box'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import InputBase from '@material-ui/core/InputBase'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'
import Link from '@material-ui/core/Link'

// import icon
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import SearchIcon from '@material-ui/icons/Search'

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
}));
  
const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
            width: '20ch',
        },
        },
    },
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
    padding: '0 24px !important'
}))

const pages = ['Home', 'About', 'Blogs']
  
export default function SearchAppBar() {
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null)
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null)

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget)
    }

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget)
    }

    const handleCloseNavMenu = () => {
        setAnchorElNav(null)
    }

    const handleCloseUserMenu = () => {
        setAnchorElUser(null)
    }


    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed">
                <StyledToolbar disableGutters>
                <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appear"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                            >
                            <MenuIcon />
                        </IconButton>
                        <Menu id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{ 
                                vertical: 'bottom',
                                horizontal: 'left'
                             }}
                             keepMounted
                             transformOrigin={{ 
                                 vertical: 'top',
                                 horizontal: 'left'
                              }}
                              open={Boolean(anchorElNav)}
                              onClose={handleCloseNavMenu}
                              sx={{ display: { xs: 'block', md: 'none' } }}
                            >
                            {pages.map((page) => (
                                <MenuItem key={page} onClick={handleCloseNavMenu}>
                                    <Link component={RouterLink} to={`/${page.toLowerCase()}`}>{page}</Link>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    
                    <Typography variant="h6" noWrap component="div" sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}>
                        Fadhli Yulyanto Blogs
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <Button
                                key={page}
                                component={RouterLink}
                                to={`/${page.toLowerCase()}`}
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                                >
                                {page}
                            </Button>
                        ))}
                    </Box>

                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                        placeholder="Search…"
                        inputProps={{ 'aria-label': 'search' }}
                        />
                    </Search>
                </StyledToolbar>
            </AppBar>
        </Box>
    );
}