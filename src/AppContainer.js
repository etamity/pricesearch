import React, { Component } from 'react';
import RouterWrapper from 'Libs/RouterWrapper';
import * as Pages from 'Pages';

class AppContainer extends Component {
  render() {
    const routeUrls = Object.keys(Pages).map(Page => Page.toLowerCase());
    const indexRoute = routeUrls.length >= 0 ? routeUrls[0] + '/' : '/';
    return <RouterWrapper indexRoute={indexRoute}>
              {
                Object.keys(Pages).map((name) => {
                  const Page = Pages[name];
                  return <Page key={name} className={name} />
                })
              }
          </RouterWrapper>;
  }
}
export default AppContainer;
