import React, {Component} from 'react';
import Relay from 'react-relay';

class Link extends Component {
  render() {
    let {link} = this.props;
    return (
      <li>
        {link.title + ',' + link.url}
      </li>
    )
  }
}

Link = Relay.createContainer(Link, {
  fragments: {
    link: () => Relay.QL`
      fragment on Link {
        url
        title
      }
    `
  }
});


export default Link;

