import React, { Component } from 'react';
import { connect } from 'react-redux';
import RouterWrapper from 'Libs/RouterWrapper';
import * as Pages from 'Pages';

class AppContainer extends Component {

  constructor(props) {
    super(props);
    this.getPageMenus = this.getPageMenus.bind(this);
  }

  getPageMenus() {
    return Object.keys(Pages).map(PageName => {
      console.log(PageName);
      return {
        name: PageName,
        path: '#/' + PageName.toLowerCase()
      }
    });
  }

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

const mapStateToProps = state => {
  return {

  }
}

const mapDispatchToProps = dispatch => {
  return {
  }
}

const ReduxContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AppContainer)

export default ReduxContainer;
