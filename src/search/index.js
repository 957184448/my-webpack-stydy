'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import './search.less';
import Logo from './img/logo.jpg'


class Search extends React.Component {

  render() {
    return <div className="search-text">
      Search Text 搜索11111111111
      {/* <img src={Logo} /> */}
    </div>;

  }

}
ReactDOM.render(
  <Search />,
  document.getElementById('root')
);
