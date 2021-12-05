import { Link } from 'react-router-dom'
import { ReactComponent as Logo } from '../../svg/logo-01.svg'

function HeaderLogo() {
  return (
    <>
      <Link to="/dashboards">
        <Logo style={{ width: 200, height: 'auto' }} />
      </Link>
    </>

  );
}

export default HeaderLogo;