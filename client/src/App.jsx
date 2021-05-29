import React from 'react';
import app from './feathers/app';
import { useMount } from 'react-use';

function App(props) {
  const [
    {
      limit,
      useBatch,
      maxBatchSize,
      method,
      joinLocation,
      provider,
      docsOpen,
      loading,
      error,
      serverProfile,
      clientProfile,
      posts,
      duration
    },
    setState
  ] = app.useAppState();

  const setAndLoad = (newState) => {
    setState(newState);
    loadPosts();
  };

  const loadPosts = async () => {
    setState({ loading: true, error: null });

    const { limit, method, joinLocation, maxBatchSize } = app.getState();

    try {
      await app.service('server/profile').create({});
      await app.service('client/profile').create({});

      const start = new Date().getTime();
      const posts = await app.service('api/posts').find({
        query: {
          $sort: { _id: 1 },
          $limit: limit || 1
        },
        method,
        joinLocation,
        maxBatchSize
      });
      const end = new Date().getTime();

      const newServerProfile = await app.service('server/profile').find();
      const newClientProfile = await app.service('client/profile').find();

      setState({
        posts,
        duration: end - start,
        serverProfile: newServerProfile,
        clientProfile: newClientProfile,
        loading: false
      });
    } catch (error) {
      console.error(error);

      setState({
        error,
        loading: false
      });
    }
  };

  useMount(() => {
    const creds = {
      strategy: 'local',
      email: 'na@example.com',
      password: 'password'
    };

    Promise.all([app.authenticate(creds), app.socketApp.authenticate(creds)])
      .then(() => {
        loadPosts();
      })
      .catch((error) => {
        setState({ error, loading: false });
      });
  });

  return (
    <div className="container-fluid mt-4">
      <p className="lead">
        This is a basic example app that compares doing joins/population on the
        client vs on the server. It is also a test bed and exmaple of a new v2
        for{' '}
        <a
          href="https://github.com/feathersjs-ecosystem/batch-loader/tree/v2"
          target="_blank"
          rel="noopener noreferrer"
        >
          feathers-dataloader
        </a>
        . See also the{' '}
        <a
          href="https://github.com/feathersjs-ecosystem/batch-loader/issues/18"
          target="_blank"
          rel="noopener noreferrer"
        >
          v2 RFC
        </a>{' '}
        and leave some feedback! You can also checkout the{' '}
        <a
          href="https://github.com/DaddyWarbucks/test-feathers-client-joins"
          target="_blank"
          rel="noopener noreferrer"
        >
          source code
        </a>{' '}
        for this project. Specifically, see the <code>shared</code> direcotry.
      </p>
      <div className="card mb-4 card-light">
        <div className="card-header d-flex justify-content-between">
          <h3 className="mb-0">Docs</h3>
          <button
            className="btn btn-primary"
            onClick={() => {
              setState({ docsOpen: !docsOpen });
            }}
          >
            {docsOpen ? 'Hide' : 'Show'}
          </button>
        </div>
        <div className={`card-body ${docsOpen ? '' : 'd-none'}`}>
          <p>
            The app makes one request to{' '}
            <code>app.service('api/posts').find()</code>. The posts then join a{' '}
            <code>user</code> and <code>comments</code>. Each user then joins on
            a <code>bio</code>, and each comment subsequently joins on its{' '}
            <code>user</code> (and subsequently its bio).
          </p>
          <ul>
            <li className="mb-2">
              10,000 posts, each with random <code>user_id</code>
            </li>
            <li className="mb-2">
              50,000 comments, each with random <code>user_id</code> and{' '}
              <code>post_id</code>
            </li>
            <li className="mb-2">
              5,000 users, each with corresponding <code>bio_id</code>
            </li>
            <li className="mb-2">5,000 bios</li>
          </ul>
          <p>
            These relationships represent a good example of nested joins where
            some of those joins are "repeating" resources, such as the post
            joining its author and comments joinging their user. This is an
            excellent usecase for <code>feathers-datalader</code>.
          </p>

          <ul>
            <li className="mb-2">
              The app also uses{' '}
              <a
                href="https://github.com/feathersjs-ecosystem/feathers-batch"
                target="_blank"
                rel="noopener noreferrer"
              >
                feathers-batch
              </a>
              , which is a clever way of allowing the client to specify which
              joins to do, but actually executes that code on the server. Note
              that when using feathers-batch, you will see lots of client side
              calls, but its imporant to understand that these calls are not
              actual HTTP requests. The service was called, but it did not make
              a socket/rest request. It simply created "intructions" for
              feathers-batch.
            </li>
            <li className="mb-2">
              The app uses authentication. This means that there are additional
              requests to{' '}
              <code>app.service('api/users').get(authedUserId)</code> in the
              authentication hooks. Note the difference this makes when using
              the different join types.
            </li>
            <li className="mb-2">
              For simplicty in this example, the app uses NeDB as its database.
              NeDB is a filesystem database where the records are just flat JSON
              files. But, its important to note that it is not making an HTTP
              request to some database server that lives on another machine. As
              impressive as the different loading techniques are, it should be
              noted that on a production database there would be a corresponding
              number of HTTP requests (think about all thos .get() requests...).
              The potential resources and performance benefits are quite large.
            </li>
            <li>
              When using REST, the browser enforces a character limit on URL
              length. Because dataloader creates long URL's containing a list of
              ID's, the app will crash unexpectedly when using the "DataLoader"
              method option and REST around 80-90 results. Unfortunately, there
              is a bug in feathers-client v4 that makes this difficult to catch,
              but this has been fixed in the upcoming v5. If the app
              freezes...reload the page. Set the "BatchSize" to set dataloader
              "maxBatchSize" option which limits the number of keys in the URL
              by maxing out and then starting a new batch. But, you probaly want
              to unset it when using server side joins.
            </li>
          </ul>
        </div>
      </div>

      {error && <div className="alert alert-danger">{error.message}</div>}

      <div className="row mb-4">
        <div className="col-sm-auto">
          <h4>Provider</h4>
          <div className="btn-group mb-2">
            <button
              disabled={loading}
              className={`btn btn-secondary ${
                provider === 'socket' ? 'active' : ''
              }`}
              onClick={() => {
                setAndLoad({ provider: 'socket' });
              }}
            >
              Socket
            </button>
            <button
              disabled={loading}
              className={`btn btn-secondary ${
                provider === 'rest' ? 'active' : ''
              }`}
              onClick={() => {
                setAndLoad({ provider: 'rest' });
              }}
            >
              REST
            </button>
          </div>
          <p>
            Configure the client to make <br /> calls via Socket or REST
          </p>
        </div>
        <div className="col-sm-auto">
          <h4>Join Location</h4>
          <div className="mb-2">
            <div className="btn-group mr-2">
              <button
                disabled={loading}
                className={`btn btn-info ${
                  joinLocation === 'client' ? 'active' : ''
                }`}
                onClick={() => {
                  setAndLoad({ joinLocation: 'client' });
                }}
              >
                Client
              </button>
              <button
                disabled={loading}
                className={`btn btn-info ${
                  joinLocation === 'server' ? 'active' : ''
                }`}
                onClick={() => {
                  setAndLoad({ joinLocation: 'server' });
                }}
              >
                Server
              </button>
            </div>
            <button
              disabled={loading}
              className={`btn btn-info ${useBatch ? 'active' : ''}`}
              onClick={() => {
                setAndLoad({ useBatch: !useBatch });
              }}
            >
              feathers-batch
            </button>
          </div>
          <p>
            Choose between doing joins on the <br /> client or the server. See
            also{' '}
            <a
              href="https://github.com/feathersjs-ecosystem/feathers-batch"
              target="_blank"
              rel="noopener noreferrer"
            >
              feathers-batch
            </a>
            .
          </p>
        </div>
        <div className="col-sm-auto">
          <h4>Methods</h4>
          <div className="btn-group mb-2">
            <button
              disabled={loading}
              className={`btn btn-success ${
                method === 'primary' ? 'active' : ''
              }`}
              onClick={() => {
                setAndLoad({ method: 'primary' });
              }}
            >
              Service
            </button>
            <button
              disabled={loading}
              className={`btn btn-success ${
                method === 'cached' ? 'active' : ''
              }`}
              onClick={() => {
                setAndLoad({ method: 'cached' });
              }}
            >
              Cached Service
            </button>
            <button
              disabled={loading}
              className={`btn btn-success ${method === 'load' ? 'active' : ''}`}
              onClick={() => {
                setAndLoad({ method: 'load' });
              }}
            >
              DataLoader
            </button>
          </div>
          <p>
            User feathers get/find methods. Or use the <br /> dataloader's
            cached get/find or load/loadMany methods.
          </p>
        </div>
        <div className="col-sm-auto">
          <h4>Limit & BatchSize</h4>
          <div className="row">
            <div className="col-6 pr-1" style={{ maxWidth: 150 }}>
              <input
                disabled={loading}
                type="number"
                placeholder="limit"
                max={10000}
                className="form-control mb-2"
                value={limit}
                onChange={(event) => {
                  const limit = event.target.value;
                  setAndLoad({ limit });
                }}
              />
            </div>
            <div className="col-6 pl-1" style={{ maxWidth: 150 }}>
              <input
                disabled={loading || method !== 'load'}
                placeholder="Batch Size"
                type="number"
                // max={25}
                className="form-control mb-2"
                value={method === 'load' ? maxBatchSize : undefined}
                onChange={(event) => {
                  const maxBatchSize = event.target.value;
                  setAndLoad({ maxBatchSize });
                }}
              />
            </div>
          </div>
          <p>
            Set a limit all the way up to 10,000. <br /> See docs for info about
            batch size.
          </p>
        </div>
      </div>

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

export default App;
