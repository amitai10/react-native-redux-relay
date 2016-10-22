import React, {Component} from 'react';
import ReactDom from 'react-dom';

class Main extends Component {
  static propTypes = {
    title: React.PropTypes.number
  }

  static defaultProps = {
    title: 5
  }
  render() {
    return (
      <h1>Hello aggain + {this.props.title}</h1>
    )
  }
}

ReactDom.render(<Main />, document.getElementById('react'));