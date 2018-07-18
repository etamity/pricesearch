import { store } from 'App';
import Products from './Products';
describe('Product service Test', () => {
    it('load products data from api', (done) => {
        Products.find({
            _limit: 10
        }).then(results => {
            expect(store.getState().search.results).toEqual(results);
            done();
        });
    });
})