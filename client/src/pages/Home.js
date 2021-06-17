import axios from 'axios';
import moment from 'moment';

import { useState, useEffect } from 'react';

import { Grid, FormControl, InputLabel, Select, MenuItem, Button, Link, FormHelperText } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import DatePicker from '../components/DatePicker';

import { getMaxDate, getMinDate, parseErrorCodeToMessage } from '../utils';

import './Home.css';

import 'moment/locale/pt-br';
moment.locale('pt-br');

function Home() {
  const [selectedDoB, setSelectedDoB] = useState(getMaxDate());
  const [selectedState, setSelectedState] = useState('');

  const [stateList, setStateList] = useState([]);

  const [successResult, setSuccessResult] = useState(null);
  const [errorResult, setErrorResult] = useState(null);

  useEffect(() => {
    axios.get('/api/states')
    .then(res => {
      setStateList(res.data)
    })
    .catch(err => {
      console.error(err);
    });
  }, []);

  const callConsult = () => {
    if(!selectedDoB) {
      return alert('Escolha sua data de nascimento para continuar!');
    }

    if(!selectedState) {
      return alert('Escolha seu Estado para continuar!');
    }

    setSuccessResult(null);
    setErrorResult(null);

    axios.post('/api/schedule', {
      dob: selectedDoB.format('YYYY-MM-DD'),
      state: selectedState
    })
    .then(res => {
      setSuccessResult(res.data);
    })
    .catch(err => {
      setErrorResult(err.response.data);
    });
  }

  const consultAgain = () => {
    setSuccessResult(null);
    setErrorResult(null);
    setSelectedDoB(getMaxDate());
    setSelectedState('');
  }

  if(successResult) {
    return (
      <Grid 
        container 
        direction="column"
        alignItems="center"
        justify="center"
        spacing={3}
        style={{ width: '100%' }}
      >
        <Grid item xs={12}>
          <Alert variant="outlined" severity="success">
            <AlertTitle>
              {
                successResult.schedule.is_current ? (
                  <span>O seu grupo começou a vacinação <strong>{moment(successResult.schedule.starts_at).fromNow()}</strong>!</span>
                ) : (
                  <span>Você irá vacinar <strong>{moment(successResult.schedule.starts_at).fromNow()}</strong>! 🎉 (<i>aproximadamente</i>)</span>
                )
              }
            </AlertTitle>
            <div style={{ color: '#cccccc' }}>
              <ul>
                <li>O seu grupo é o público geral das pessoas de <strong>{successResult.schedule.from_age}</strong> até <strong>{successResult.schedule.to_age}</strong> anos.</li>
                <li>A vacinação do seu grupo vai de <strong>{moment(successResult.schedule.starts_at).format('DD/MM/YYYY')}</strong> até <strong>{moment(successResult.schedule.ends_at).format('DD/MM/YYYY')}</strong>.</li>
              </ul>

              {
                successResult.schedule.is_current && (
                  <span><strong>Importante:</strong> Procure informações em sua prefeitura local para saber como e onde se vacinar! Pode ser que em seu município, a vacinação para sua idade não tenha começado ainda, porém deverá seguir o prazo estipulado pelo Governo do Estado do {successResult.state.name}.</span>
                )
              }

              <p>
                <small>
                  Atenção! Esta informação é <strong>oficial</strong>, retirada diretamente do calendário de vacinação divulgado pelo Governo do Estado de {successResult.state.name}. <Link href={successResult.schedule.source_url} target="_blank">Clique aqui</Link> para ver a fonte desta informação.
                </small>
              </p>

              <small>
                <i>Última atualização em {moment(successResult.schedule.updated_at).format('DD/MM/YYYY HH:mm')}</i>
              </small>
            </div>
          </Alert>
        </Grid>
        <Grid item xs={12}>
          <Button 
            variant="contained" 
            color="primary" 
            style={{ width: '100%' }}
            onClick={consultAgain}
          >
            Voltar
          </Button>
        </Grid>
      </Grid>
    )
  }

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justify="center"
      spacing={3}
    >
      {
        errorResult && (
          <Grid item xs={12} style={{ width: '100%' }}>
            <Alert variant="outlined" severity={errorResult.type}>
              {parseErrorCodeToMessage(errorResult.code)}
            </Alert>
          </Grid>
        )
      }

      <Grid item xs={12}>
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <DatePicker 
                  label="Data de nascimento"
                  value={selectedDoB}
                  onChange={date => { setSelectedDoB(date) }}
                  format="DD/MM/YYYY"
                  invalidDateMessage="Data inválida"
                  minDateMessage={`Você precisa ter nascido após ${getMinDate().get('year')}`}
                  maxDateMessage={`Você precisa ter nascido até ${getMaxDate().get('year')}`}
                  minDate={getMinDate()}
                  maxDate={getMaxDate()}
                  width="100"
                />
            </Grid>
            <Grid item xs={12}>
              <FormControl style={{ width: '100%' }}>
                <InputLabel id="state-label">Estado (UF)</InputLabel>
                <Select
                  labelId="state-label"
                  value={selectedState}
                  onChange={event => { setSelectedState(event.target.value) }}
                >
                  {
                    stateList.map((state, index) => (
                      <MenuItem key={index} value={state.code}>{state.name}</MenuItem>
                    ))
                  }
                </Select>
                <FormHelperText>Não encontrou seu estado na lista? Apenas inserimos estados que divulgaram um calendário completo de vacinação.</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Button 
                variant="contained" 
                color="primary" 
                style={{ width: '100%' }}
                onClick={callConsult}
              >
                Consultar
              </Button>
            </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Home;
