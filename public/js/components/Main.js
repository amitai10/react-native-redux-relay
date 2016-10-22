import React, {Component} from 'react';
import Relay from 'react-relay';
import Link from './Link';

class Main extends Component {
  static propTypes = {
    limit: React.PropTypes.number
  }

  static defaultProps = {
    limit: 5
  }

  setLimit = (e) => {
    let newLimit = Number(e.target.value);
    this.props.relay.setVariables({
      limit: newLimit
    })
  }
  render() {
    let content = this.props.store.linkConnection.edges.map( edge => {
      return <Link key={edge.node.id} link={edge.node} />
    })
    return (
      <div>
        <h3>links</h3>
        <select onChange={this.setLimit}>
          <option value="4">4</option>
          <option value="10" selected>10</option>
        </select>
        <ul>
        {content}
        </ul>
      </div>
    )
  }
}

Main = Relay.createContainer(Main, {
  initialVariables: {
    limit: 10
  },
  fragments: {
    store: () => Relay.QL`
      fragment on Store {
        linkConnection(first: $limit) {
          edges {
            node {
              id
              ${Link.getFragment('link')}
            }
          }
        }
      }
    `
  }
});


export default Main;

