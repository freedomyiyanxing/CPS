import React from 'react';
import { Button } from 'antd';

import classes from './home.css';


class Home extends React.Component {
  state = {
    current: 'mail',
  };

  handleClick = (n) => {
    this.setState({
      current: n,
    });
  };

  render() {
    const { current } = this.state;
    return (
      <div className={classes.container}>
        <div>{current}</div>
        <div>
          <Button type="primary" onClick={() => { this.handleClick('1'); }}>Add</Button>
        </div>
      </div>
    );
  }
}

export default Home;
