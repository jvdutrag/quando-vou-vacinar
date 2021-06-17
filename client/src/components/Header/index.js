import { Grid } from '@material-ui/core';

function Header() {
    return (
        <Grid container 
            direction="column"
            alignItems="center"
            justify="center"
        >
            <img src="logo.png" alt="Quando Vou Vacinar Logo" />
            <h1>Quando vou vacinar?</h1>
        </Grid>
    )
}

export default Header;