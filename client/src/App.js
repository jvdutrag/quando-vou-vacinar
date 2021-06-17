import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';

import Home from './pages/Home';
import Header from './components/Header';

import './App.css';

const theme = createMuiTheme({
    palette: {
        type: 'dark',
        primary: {
            main: '#2fdecf'
        }
    }
});

function App() {
  return (
      <ThemeProvider theme={theme}>
        <Container>
          <Header />
          <Home />
        </Container>
      </ThemeProvider>
  );
}

export default App;
