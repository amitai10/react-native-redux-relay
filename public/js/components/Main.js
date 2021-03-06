import React, {Component} from 'react';
import Relay from 'react-relay';
import Link from './Link';
import CreateLinkMutation from '../mutations/CreateLinkMutation';

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

  handleSubmit = (e) => {
    e.preventDefault();

    Relay.store.update(
      new CreateLinkMutation({
        title: this.refs.newTitle.value,
        url: this.refs.newUrl.value,
        store: this.props.store
      })
    )

    this.refs.newTitle.value = '';
    this.refs.newUrl = '';
  }

  render() {
    let content = this.props.store.linkConnection.edges.map( edge => {
      return <Link key={edge.node.id} link={edge.node} />
    })
    return (
      <div>
        <h3>links</h3>
        <form onSubmit={this.handleSubmit}>
          <input type="text" placeholder="Title" ref="newTitle" />
          <input type="text" placeholder="Url" ref="newUrl" />
          <button type="submit">Add</button>
        </form>
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
        id
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

