import { Box, Container, Link, Typography } from '@material-ui/core';
import { experimentalStyled } from '@material-ui/core/styles';
import moment from 'moment'

const FooterWrapper = experimentalStyled(Box)(
  ({ theme }) => `
        border-radius: 0;
        margin: ${theme.spacing(3)} 0;
`
);

function Footer() {
  const currentYear = moment().format('YYYY')
  return (
    <FooterWrapper>
      <Container maxWidth="lg">
        <Box
          py={3}
          display={{ xs: 'block', md: 'flex' }}
          alignItems="center"
          textAlign={{ xs: 'center', md: 'left' }}
          justifyContent="space-between"
        >
          <Box>
            <Typography variant="subtitle1">
              &copy; {currentYear} - Fadhli Yulyanto
            </Typography>
          </Box>
          <Typography sx={{ pt: { xs: 2, md: 0 } }} variant="subtitle1">
            Crafted by <Link href="https://bloomui.com" target="_blank" rel="noopener noreferrer">BloomUI.com</Link>
          </Typography>
        </Box>
      </Container>
    </FooterWrapper>
  );
}

export default Footer;
