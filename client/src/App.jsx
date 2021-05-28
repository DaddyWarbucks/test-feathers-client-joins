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
        <div className="row">
          <div className="col col-sm-6">
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
              <p>
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
              <p>
                Choose between doing the joins on the client or the server. See also{' '}
                <a
                  href="https://github.com/feathersjs-ecosystem/feathers-batch"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  feathers-batch
                </a>. Note that when using feathers-batch, you will see lots of client side calls, but its imporant to understand that these calls are not actual HTTP calls. The service was called, but it did not make a socket/rest request. It simply created "intructions" for feathers-batch.
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
                <li className="mb-2">
                  Get/Find - Use standard Feathers .get() and .find() methods
                </li>
                <li className="mb-2">
                  Cached Get/Find - Use feathers-dataloader cached .get() and
                  .find() methods. These are similar to basic Feathers get/find methods, but the request is cached and reused if another request with same id/params is made.
                </li>
                <li>
                  Load/LoadMany - Use feathers-dataloader .load() and .loadMany()
                  methods
                </li>
              </ul>
            </div>
          </div>
          <div className="col col-sm-6">
            <div className="bg-light rounded p-3">
              <p>
                This is a basic example app that compares doing joins/population on the client vs on the server. It is also a test bed and exmaple of a new v2 for <a href="https://github.com/feathersjs-ecosystem/batch-loader/tree/v2" target="_blank" rel="noopener noreferrer">feathers-dataloader</a>. See also the <a href="https://github.com/feathersjs-ecosystem/batch-loader/issues/18" target="_blank" rel="noopener noreferrer">v2 RFC</a> and leave some feedback!
              </p>
              <p>
                The app consists of 5,000 <code>posts</code>. The posts then join an <code>author</code> and <code>comments</code>. Each author then joins on a <code>bio</code>, and each comment subsequently joins on its <code>user</code>.
              </p>
              <p>
                These relationships represent a good example of nested joins where some of those joins are "repeating" resources, such as the post joining its author and comments joinging their user. This is an excellent usecase for <code>feathers-datalader</code>.
              </p>
              <p>
                The app also uses <a
                  href="https://github.com/feathersjs-ecosystem/feathers-batch"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  feathers-batch
                </a>, which is a clever way of allowing the client to specify which joins to do, but actually executes that code on the server.
              </p>
            </div>
          </div>
        </div>

        {error && <div className="alert alert-danger">{error.message}</div>}

        <div className="mb-4 p-3 bg-light rounded">
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
              <pre className="p-3 bg-light rounded">
                {JSON.stringify(serverProfile, null, 2)}
              </pre>
            )}
          </div>
          <div className="col">
            <h4>Client Profile</h4>
            {clientProfile && (
              <pre className="p-3 bg-light rounded">
                {JSON.stringify(clientProfile, null, 2)}
              </pre>
            )}
          </div>
        </div>
        <div>
          <div className="mb-4">
            <h4>Results</h4>
            {posts && (
              <pre className="p-3 bg-light rounded">
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
