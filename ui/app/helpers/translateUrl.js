import selectors from 'ui/containers/App/selectors';
import { createStore } from 'redux';
import createReducer from '../reducers';
const store = createStore(createReducer());

const translateUrl = (path, parameters = {}) => {
  const state = store.getState();
  // Handle path parameters /foo/4/bar
  const pathParameters = Object.entries(parameters).filter(v => v[0].charAt(0) === '$');
  for (let i = 0; i < pathParameters.length; i += 1) {
    path = path.replace(pathParameters[i][0], pathParameters[i][1]);
    delete parameters[pathParameters[i][0]];
  }
  // Handle URL parameters ?foo=bar&foo2=baz
  const paramRegex = RegExp(":[a-zA-Z]+", 'g');
  const urlParams = path.match(paramRegex) || [];
  const url = path
    .replace(paramRegex, '') // Clean params placeholders
  const map = {
    ':filters': selectors.makeSelectFilters()(state),
    ':dates': selectors.makeSelectURLDates(state),
    ':datesEs': selectors.makeSelectURLDatesES(state),
    ':tenant': selectors.makeSelectURLTenant(state),
  }
  const params = { ...parameters };
  urlParams
    .filter(m => Boolean(map[m]))
    .forEach(match => Object.assign(params, map[match]));
  const urlSearchParams = Object.entries(params).map(pair => pair.join('=')).join('&');
  return `${url}${urlSearchParams ? `?${urlSearchParams}` : ''}`;
}

export default translateUrl;