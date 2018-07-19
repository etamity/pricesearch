import { store } from 'App';
import reducerUpdate, { SearchAction, SearchActionTypes } from 'Reducers/search';
import LinkParse from 'parse-link-header';

describe('Search store value test', () => {
    it('loading value should be true', () => {
        SearchAction.updateLoading(true);
        expect(store.getState().search.loading).toEqual(true);
    });

    it('error value should be `this is an error message`', () => {
        SearchAction.updateError('this is an error message');
        expect(store.getState().search.error).toEqual('this is an error message');
    });

    it('pagination value should be match', () => {
        const pagination = LinkParse('<http://pricesearcher-frontend-test.herokuapp.com/products?_page=1&_limit=10>; rel="first", <http://pricesearcher-frontend-test.herokuapp.com/products?_page=2&_limit=10>; rel="next", <http://pricesearcher-frontend-test.herokuapp.com/products?_page=118&_limit=10>; rel="last"');
        SearchAction.updatePagination(pagination);
        expect(store.getState().search.pagination.next._page).toEqual('2');
    });

    it('appened results value should be match', () => {
        SearchAction.appendResults(['1']);
        SearchAction.appendResults(['2']);
        SearchAction.appendResults(['3']);
        expect(store.getState().search.results).toEqual(['1','2','3']);
    });

    it('update results array should be match', () => {
        SearchAction.appendResults(['1']);
        SearchAction.appendResults(['2']);
        SearchAction.appendResults(['3']);
        SearchAction.updateResults(['update']);
        expect(store.getState().search.results).toEqual(['update']);
    });
    
    it('update function return value should match', () => {
        const action = {
            type: SearchActionTypes.APPEND_RESULTS,
            payload: ['etamity']
          };
        const state = reducerUpdate({results: ['joey']}, action);
        expect(state.results).toEqual(['joey','etamity']);
    });
})