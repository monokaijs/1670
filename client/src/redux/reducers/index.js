import { combineReducers } from 'redux';
import Auth from './Auth';
import Theme from './Theme';
import Config from './Config';

const reducers = combineReducers({
    theme: Theme,
    auth: Auth,
    config: Config
});

export default reducers;