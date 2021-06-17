import moment from 'moment';

const getMaxDate = () => {
    return moment().subtract(12, 'years');
}

const getMinDate = () => {
    return moment().subtract(100, 'years');
}

const parseErrorCodeToMessage = code => {
    switch (code) {
        case 'MISSING_DATA':
            return 'Há dados incorretos! Verifique as informações inseridas.'
        case 'INVALID_STATE':
            return 'O Estado informado não existe.'
        case 'ALREADY_VACCINATED':
            return 'Já é para você estar vacinado pois faz parte do grupo prioritário! Informe-se com sua prefeitura local para mais informações.'
        case 'NOT_APPLICABLE_TO_VACCINATION':
            return (
                <span>
                    Segundo orientações do Ministério da Saúde e da ANVISA, maiores de 12 anos e menores de 18 anos apenas podem ser vacinados com a <strong>vacina da Pfizer</strong>. Porém, não há previsão disponível no calendário de vacinação de seu Estado.
                </span>
            )
        case 'SCHEDULE_NOT_FOUND':
            return 'Ainda não temos dados de seu Estado a cerca do calendário de vacinação geral.'
        default:
            break;
    }
}

export { getMaxDate, getMinDate, parseErrorCodeToMessage }