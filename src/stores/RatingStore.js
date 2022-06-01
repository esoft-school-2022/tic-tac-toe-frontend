import {flow, makeObservable, observable} from 'mobx';
import Api from '../utils/Api';

class RatingStore {
  ratings = [];

  constructor(AuthStore) {
    makeObservable(
      this,
      {
        ratings: observable,
        fetch: flow
      }
    );

    this.AuthStore = AuthStore;
  }

  *fetch() {
    const {statistics} = yield new Api(this.AuthStore.token)
      .get(
        '/api/statistics',
        {
          limit: 1000
        }
      );

    this.ratings = statistics;
  }
}

export default RatingStore;