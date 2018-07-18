import { store } from 'App';

describe('Redux store Test', () => {
    it('To match "search" initial state', () => {
        expect(store.getState().search).toEqual({
            loading: false,
            results: [],
            error: null,
            pagination: {}
        });
    });
})