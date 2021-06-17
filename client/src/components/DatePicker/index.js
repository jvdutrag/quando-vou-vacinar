import moment from 'moment';

import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';

import 'moment/locale/pt-br';

moment.locale('pt-br');

function DatePicker({ width, ...props }) {
    return (
        <MuiPickersUtilsProvider locale="DatePicker/" utils={MomentUtils}>
            <KeyboardDatePicker
                {...props}
                style={{
                    width: `${width}%`
                }}
            />
        </MuiPickersUtilsProvider>
    )
}

export default DatePicker;