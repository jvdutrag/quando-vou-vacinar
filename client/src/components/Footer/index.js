import { Grid, Link } from '@material-ui/core';

function Footer() {
    return (
        <Grid container 
            direction="column"
            alignItems="center"
            justify="center"
            style={{ marginTop: '25px' }}
        >
            <small>Desenvolvido por <Link href="https://twitter.com/jvdutrag" target="_blank">@jvdutrag</Link></small>
        </Grid>
    )
}

export default Footer;