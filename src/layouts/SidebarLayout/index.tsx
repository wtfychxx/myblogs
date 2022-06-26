import { FC, ReactNode, useEffect } from 'react';
import { experimentalStyled } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import { Outlet } from 'react-router-dom';

import Sidebar from './Sidebar';
import Header from './Header';

import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'

interface SidebarLayoutProps {
  children?: ReactNode;
}

const MainWrapper = experimentalStyled(Box)(
  ({ theme }) => `
        flex: 1 1 auto;
        display: flex;
        height: 100%;
        
        @media (min-width: ${theme.breakpoints.values.lg}px) {
            padding-left: ${theme.sidebar.width};
        }
`
);

const MainContent = experimentalStyled(Box)(
  ({ theme }) => `
        margin-top: ${theme.header.height};
        flex: 1 1 auto;
        overflow: auto;
`
);

const SidebarLayout: FC<SidebarLayoutProps> = () => {
  const navigate = useNavigate()
  
  const [cookie] = useCookies()
  console.log(cookie)

  useEffect(() => {
    if(Object.keys(cookie).length === 0){
      navigate('/')
    }
  }, [])
  
  return (
    <>
      <Sidebar />
      <MainWrapper>
        <Header />
        <MainContent>
          <Outlet />
        </MainContent>
      </MainWrapper>
    </>
  );
};

export default SidebarLayout;
