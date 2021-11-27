import { Link } from 'react-router-dom'
import { ReactComponent as Logo } from '../../svg/logo-02.svg'

function HeaderLogo() {
  return (
    <>
      <Link to="/dashboards">
        <Logo style={{ width: 100 }} />
      </Link>
    </>

  );
}

export default HeaderLogo;