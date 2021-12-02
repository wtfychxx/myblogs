
import { experimentalStyled } from '@material-ui/core';
import { Link } from 'react-router-dom'
import { ReactComponent as Logo } from '../../svg/logo-01.svg'

const LogoWrapper = experimentalStyled(Link)(
  () => `
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%
  `
)

function SidebarLogo() {
  return (
    <LogoWrapper to="/dashboards">
      <Logo style={{ width: 220 }} />
    </LogoWrapper>
  );
}

export default SidebarLogo;
