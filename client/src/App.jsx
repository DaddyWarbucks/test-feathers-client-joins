import React from 'react';
import app from './feathers/app';

class App extends React.Component {
  constructor(props) {
    super(props);
    const urlParams = new URLSearchParams(window.location.search);
    const provider = urlParams.get('provider') || 'socket';

    this.state = {
      loading: true,
      error: null,
      serverProfile: null,
      clientProfile: null,
      posts: null,
      duration: null,
      useBatch: false,
      method: 'primary',
      joinLocation: 'client',
      provider
    };
  }

  componentDidMount = async () => {
    await app.authenticate({
      strategy: 'local',
      email: 'na@example.com',
      password: 'password'
    });

    this.loadPosts();
  };

  loadPosts = async () => {
    this.setState({ loading: true });
    try {
      await app.service('server/profile').create({});
      await app.service('client/profile').create({});

      const start = new Date().getTime();
      const posts = await app.service('api/posts').find({
        query: {
          $sort: { _id: 1 },
          $limit: 100
        },
        method: this.state.method,
        joinLocation: this.state.joinLocation
      });
      const end = new Date().getTime();

      const serverProfile = await app.service('server/profile').find();
      const clientProfile = await app.service('client/profile').find();

      this.setState({
        posts,
        duration: end - start,
        serverProfile,
        clientProfile,
        loading: false,
        error: null
      });
    } catch (error) {
      this.setState({
        error,
        loading: false
      });
    }
  };

  render() {
    const {
      loading,
      error,
      serverProfile,
      clientProfile,
      posts,
      duration,
      useBatch,
      method,
      joinLocation,
      provider
    } = this.state;

    return (
      <div className="container mt-4">
        <div className="mb-4">
          <h4>Provider</h4>
          <div className="btn-group mb-2">
            <a
              className={`btn btn-secondary ${
                provider === 'socket' ? 'active' : ''
              }`}
              href="/?provider=socket"
            >
              Socket
            </a>
            <a
              className={`btn btn-secondary ${
                provider === 'rest' ? 'active' : ''
              }`}
              href="/?provider=rest"
            >
              REST
            </a>
          </div>
          <p className="lead">
            Configure the feathers-client to make calls either via Socket or
            REST
          </p>
        </div>

        <div className="mb-4">
          <h4>Join Location</h4>
          <div className="btn-group mb-2">
            <button
              disabled={loading}
              className={`btn btn-primary ${
                joinLocation === 'client' && !useBatch ? 'active' : ''
              }`}
              onClick={() => {
                this.setState(
                  { joinLocation: 'client', useBatch: false },
                  () => {
                    this.loadPosts();
                    app.set('useBatch', false);
                  }
                );
              }}
            >
              Client
            </button>
            <button
              disabled={loading}
              className={`btn btn-primary ${
                joinLocation === 'server' ? 'active' : ''
              }`}
              onClick={() => {
                this.setState(
                  { joinLocation: 'server', useBatch: false },
                  () => {
                    this.loadPosts();
                    app.set('useBatch', false);
                  }
                );
              }}
            >
              Server
            </button>
            <button
              disabled={loading}
              className={`btn btn-primary ${useBatch ? 'active' : ''}`}
              onClick={() => {
                this.setState(
                  { joinLocation: 'client', useBatch: true },
                  () => {
                    this.loadPosts();
                    app.set('useBatch', true);
                  }
                );
              }}
            >
              feathers-batch
            </button>
          </div>
          <p className="lead">
            Choose between doing the joins on the client or the server. See also{' '}
            <a
              href="https://github.com/feathersjs-ecosystem/feathers-batch"
              target="_blank"
              rel="noopener noreferrer"
            >
              feathers-batch
            </a>
          </p>
        </div>

        <div className="mb-4">
          <h4>Methods</h4>
          <div className="btn-group mb-2">
            <button
              disabled={loading}
              className={`btn btn-primary ${
                method === 'primary' ? 'active' : ''
              }`}
              onClick={() => {
                this.setState({ method: 'primary' }, this.loadPosts);
              }}
            >
              Get/Find
            </button>
            <button
              disabled={loading}
              className={`btn btn-primary ${
                method === 'cached' ? 'active' : ''
              }`}
              onClick={() => {
                this.setState({ method: 'cached' }, this.loadPosts);
              }}
            >
              Cached Get/Find
            </button>
            <button
              disabled={loading}
              className={`btn btn-primary ${method === 'load' ? 'active' : ''}`}
              onClick={() => {
                this.setState({ method: 'load' }, this.loadPosts);
              }}
            >
              Load/LoadMany
            </button>
          </div>
          <ul>
            <li className="lead">
              Get/Find - Use standard Feathers .get() and .find() methods
            </li>
            <li className="lead">
              Cached Get/Find - Use feathers-dataloader cached .get() and
              .find() methods
            </li>
            <li className="lead">
              Load/LoadMany - Use feathers-dataloader .load() and .loadMany()
              methods
            </li>
          </ul>
        </div>

        {error && <div className="alert alert-danger">{error.message}</div>}

        <div className="mb-4 p-3 bg-light">
          <h3>
            Duration:{' '}
            {loading ? (
              <div
                className="spinner-border"
                style={{
                  width: '2rem',
                  height: '2rem'
                }}
              ></div>
            ) : (
              <span className="text-success">{duration}ms</span>
            )}
          </h3>
        </div>

        <div className="row mb-4">
          <div className="col">
            <h4>Server Profile</h4>
            {serverProfile && (
              <pre className="p-3 bg-light">
                {JSON.stringify(serverProfile, null, 2)}
              </pre>
            )}
          </div>
          <div className="col">
            <h4>Client Profile</h4>
            {clientProfile && (
              <pre className="p-3 bg-light">
                {JSON.stringify(clientProfile, null, 2)}
              </pre>
            )}
          </div>
        </div>
        <div>
          <div className="mb-4">
            <h4>Results</h4>
            {posts && (
              <pre className="p-3 bg-light">
                {JSON.stringify(posts, null, 2)}
              </pre>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
