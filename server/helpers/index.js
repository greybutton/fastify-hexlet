import i18next from 'i18next';
import _ from 'lodash';
import { format as formatFns } from 'date-fns';

export default (app) => ({
  route(name, options = {}) {
    return app.reverse(name, options);
  },
  t(key) {
    return i18next.t(key);
  },
  formatDate(date, format = 'HH:mm dd.MM.yyyy') {
    return formatFns(new Date(date), format);
  },
  _,
  getAlertClass(type) {
    switch (type) {
      case 'error':
        return 'danger';
      case 'info':
        return 'info';
      default:
        throw new Error(`Unknown type: '${type}'`);
    }
  },
});
