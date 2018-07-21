import { SearchAction } from 'Reducers/Search';
import LinkParse from 'parse-link-header';

//Heroku will wake up for a while(20+) seconds
const host = 'https://pricesearcher-frontend-test.herokuapp.com'; 
const endpoint = host + '/products?';

export default {
  find: (options, flush) => {
    SearchAction.updateLoading(true);
    const defaultParams = {
      _page: 1,
      _limit: 10
    }
    const paramsObject = Object.assign({}, defaultParams, options);
    const params = Object.keys(paramsObject).map(key => `${key}=${encodeURIComponent(paramsObject[key])}`).join('&')
    let url = endpoint + params;
    return new Promise((resolve, reject) => {
      return fetch(url, {
        method: "GET",
        headers: {
          "X-API-KEY": "46c0a1e171c76bb37784d60aad4df750",
        },
      }).then((response) => {
        const header_link = response.headers.get('Link');
        const pagination = LinkParse(header_link);
        SearchAction.updatePagination(pagination);
        return response.json();
      }).then(results => {
        if (flush) {
          SearchAction.updateResults(results);
        } else {
          SearchAction.appendResults(results);
        }
        SearchAction.updateLoading(false);
        resolve(results);
      }).catch(error => {
        SearchAction.updateLoading(false);
        SearchAction.updateError(error);
        reject(error);
      });
    })
  }
}

