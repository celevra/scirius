import { buildQFilter } from 'ui/buildQFilter';

const map = type => {
  switch (type) {
    case ':dates': {
      return {
        start_date: localStorage.getItem('startDate'),
        end_date: localStorage.getItem('endDate'),
      };
    }
    // should be used for all `/es/*` requests
    case ':datesEs': {
      return {
        from_date: localStorage.getItem('startDate') * 1000,
        to_date: localStorage.getItem('endDate') * 1000,
      };
    }
    case ':filters': {
      const idsFilters = JSON.parse(localStorage.getItem('ids_filters') || '[]');
      return idsFilters
        .filter(f => f.id !== 'probe')
        .reduce((acc, cur) => {
          acc[cur.id] = acc[cur.id] ? `${acc[cur.id]},${cur.value}` : cur.value;
          return acc;
        }, {});
    }
    case ':eventTypes': {
      return {
        alert: JSON.parse(localStorage.getItem('alert_tag'))?.value?.alerts,
        discovery: !!JSON.parse(localStorage.getItem('alert_tag'))?.value?.sightings,
        stamus: JSON.parse(localStorage.getItem('alert_tag'))?.value?.stamus,
      };
    }
    case ':qFilter': {
      const alertTag = JSON.parse(localStorage.getItem('alert_tag'));
      const idsFilters = JSON.parse(localStorage.getItem('ids_filters') || '[]');
      const systemSettings = JSON.parse(localStorage.getItem('str-system-settings'));
      return buildQFilter([alertTag, ...idsFilters], systemSettings, 'object');
    }
    default:
      return {};
  }
};

export default map;
