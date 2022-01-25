import { useContext } from 'react'
import { Scrollbars } from 'react-custom-scrollbars-2'
import { SidebarContext } from 'src/contexts/SidebarContext'
import { Box, Drawer, Hidden, Typography } from '@material-ui/core'
import { experimentalStyled } from '@material-ui/core/styles'
import SidebarMenu from './SidebarMenu'
import SidebarLogo from 'src/components/OtosalesLogo/SidebarLogo'

const SidebarWrapper = experimentalStyled(Box)(
  ({ theme }) => `
        width: ${theme.sidebar.width};
        color: ${theme.sidebar.textColor};
        background: ${theme.sidebar.background};
        box-shadow: ${theme.sidebar.boxShadow};
        height: 100%;
        
        @media (min-width: ${theme.breakpoints.values.lg}px) {
            position: fixed;
            z-index: 10;
            border-top-right-radius: ${theme.general.borderRadius};
            border-bottom-right-radius: ${theme.general.borderRadius};
        }
`
);

const TopSection = experimentalStyled(Box)(
  ({ theme }) => `
        display: flex;
        height: 88px;
        align-items: center;
        justify-content: center;
        margin: 0 ${theme.spacing(2)} ${theme.spacing(2)};
        border-bottom: ${theme.sidebar.dividerBg} solid 1px;
`
);

function Sidebar() {
  const { sidebarToggle, toggleSidebar } = useContext(SidebarContext);
  const closeSidebar = () => toggleSidebar();

  return (
    <>
      <Hidden lgDown>
        <SidebarWrapper>
          <Scrollbars autoHide>
            <TopSection>
              <Typography variant="h3" color="primary">
                wtfychxx Blogs
              </Typography>
            </TopSection>
            <SidebarMenu />
          </Scrollbars>
        </SidebarWrapper>
      </Hidden>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          open={sidebarToggle}
          onClose={closeSidebar}
          variant="temporary"
          elevation={9}
        >
          <SidebarWrapper>
            <Scrollbars autoHide>
              <TopSection>
                <Typography variant="h2" color="primary">
                  wtfychxx Blogs
                </Typography>
              </TopSection>
              <SidebarMenu />
            </Scrollbars>
          </SidebarWrapper>
        </Drawer>
      </Hidden>
    </>
  );
}

export default Sidebar;
