import { FC, ReactNode } from 'react'
import { experimentalStyled } from '@material-ui/core'
import { Box } from '@material-ui/core'
import { Outlet } from 'react-router-dom'
import { styled } from '@material-ui/core/styles'


import SearchAppBar from './SearchAppBar'

interface HomeLayoutProps{
    children?: ReactNode
}

const MainContent = styled(Box)(
    ({ theme }) => `
        margin-top: calc(${theme.header.height} - 15px)
    `
)

const HomeLayout: FC<HomeLayoutProps> = () => {
    return(
        <>
            <SearchAppBar />

            <MainContent>
                <Outlet />
            </MainContent>
        </>
    )
}

export default HomeLayout