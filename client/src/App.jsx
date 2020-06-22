import React from 'react';
import app from './feathers/app';

class App extends React.Component {
  constructor(props) {
    super(props);
    const urlParams = new URLSearchParams(window.location.search);
    const provider = urlParams.get('provider') || 'socket';

    this.state = {
      loading: true,
      serverProfile: null,
      posts: null,
      duration: null,
      hookName: 'withResults',
      repeatAuth: false,
      provider
    }
  }

  componentDidMount = async () => {
    await app.authenticate({
      strategy: 'local',
      email: 'na@example.com',
      password: 'password'
    });

    this.loadPosts('withResults');
  }

  loadPosts = async hookName => {
    this.setState({ loading: true });
    const { repeatAuth } = this.state;

    await app.service('server/profile').create({ hookName, repeatAuth });
    await app.service('client/profile').create({ hookName, repeatAuth });

    const start = new Date().getTime();
    const posts = await app.service('api/posts').find({
      query: { $sort: { _id: 1 }, $limit: 100 }
    });
    const end = new Date().getTime();

    const serverProfile = await app.service('server/profile').find();
    const clientProfile = await app.service('client/profile').find();

    this.setState({
      posts,
      duration: end - start,
      hookName,
      serverProfile,
      clientProfile,
      loading: false
    });
  }

  toggleRepeatAuth = repeatAuth => {
    this.setState({ repeatAuth }, () => {
      this.loadPosts(this.state.hookName);
    });
  }

  render() {
    const {
      posts,
      duration,
      hookName,
      repeatAuth,
      provider,
      serverProfile,
      clientProfile,
      loading
    } = this.state;

    return (
      <div className="container mt-4">

        <div className="mb-4">
          <h4>Provider</h4>
          <div className="btn-group mb-2">
            <a
              className={`btn btn-secondary ${provider === 'socket' ? 'active' : ''}`}
              href="/?provider=socket"
            >
              Socket
            </a>
            <a
              className={`btn btn-secondary ${provider === 'rest' ? 'active' : ''}`}
              href="/?provider=rest"
            >
              REST
            </a>
          </div>
          <p className="lead">Configure the feathers-client to make calls either via Socket or REST</p>
        </div>

        <div className="mb-4">
          <h4>Client Hooks</h4>
          <div className="btn-group mb-2">
            <button
              disabled={loading}
              className={`btn btn-primary ${hookName === 'withResults' ? 'active' : ''}`}
              onClick={() => this.loadPosts('withResults')}
            >
              withResults
            </button>
            <button
              disabled={loading}
              className={`btn btn-primary ${hookName === 'withResultsBatchLoader' ? 'active' : ''}`}
              onClick={() => this.loadPosts('withResultsBatchLoader')}
            >
              withResultsBatchLoader
            </button>
            <button
              disabled={loading}
              className={`btn btn-primary ${hookName === 'withResultsGroupLoader' ? 'active' : ''}`}
              onClick={() => this.loadPosts('withResultsGroupLoader')}
            >
              withResultsGroupLoader
            </button>
          </div>
          <p className="lead">"withResults" and "withResultsBatchLoader" do all joins via hooks on the client. "withResultsGroupLoader" also does all joins via hooks on the client, but attempts to save HTTP requests by "grouping" services together and running them
          on the server.</p>
        </div>

        <div className="mb-4">
          <h4>Server Hooks</h4>
          <div className="btn-group mb-2">
            <button
              disabled={loading}
              className={`btn btn-info ${hookName === 'withResultsServer' ? 'active' : ''}`}
              onClick={() => this.loadPosts('withResultsServer')}
            >
              withResults
            </button>
            <button
              disabled={loading}
              className={`btn btn-info ${hookName === 'withResultsBatchLoaderServer' ? 'active' : ''}`}
              onClick={() => this.loadPosts('withResultsBatchLoaderServer')}
            >
              withResultsBatchLoader
            </button>
          </div>
          <p className="lead">Do all joins on the server.</p>
        </div>

        <div className="mb-4">
          <h4>Repeat Server Auth</h4>
          <p className="text-secondary">* Note this only affects the "Server Hooks" and "withResultsGroupLoader".</p>
          <div className="btn-group mb-2">
            <button
              disabled={loading}
              className={`btn btn-warning ${repeatAuth  ? 'active' : ''}`}
              onClick={() => this.toggleRepeatAuth(true)}
            >
              Enabled
            </button>
            <button
              disabled={loading}
              className={`btn btn-warning ${repeatAuth ? '' : 'active'}`}
              onClick={() => this.toggleRepeatAuth(false)}
            >
              Disabled
            </button>
          </div>
          <p className="lead">
            When enabled, all nested calls to services to join records will have to go through the "authenticate('jwt')" hook. When disabled, the authentication from the initial call to "api/posts" will be passed to each nested join service.
          </p>
        </div>

        <div className="mb-4 p-3 bg-light">
          <h3>Duration: {loading ? (
            <div className="spinner-border" style={{
              width: '2rem',
              height: '2rem'
            }}></div>
          ) : (<span className="text-success">{duration}ms</span>)}</h3>
        </div>

        <div className="row mb-4">
          <div className="col">
            <h4>Server Profile</h4>
            {serverProfile && <pre className="p-3 bg-light">{JSON.stringify(serverProfile, null, 2)}</pre>}
          </div>
          <div className="col">
            <h4>Client Profile</h4>
            {clientProfile && <pre className="p-3 bg-light">{JSON.stringify(clientProfile, null, 2)}</pre>}
          </div>
        </div>
        <div>
          <div className="mb-4">
          <h4>Results</h4>
          {posts && (
            <pre className="p-3 bg-light">{JSON.stringify(posts, null, 2)}</pre>
          )}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
