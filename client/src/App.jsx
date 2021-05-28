import React from "react";
import app from "./feathers/app";

class App extends React.Component {
  constructor(props) {
    super(props);
    const urlParams = new URLSearchParams(window.location.search);
    const provider = urlParams.get("provider") || "socket";

    this.state = {
      docsOpen: false,
      loading: true,
      error: null,
      serverProfile: null,
      clientProfile: null,
      posts: null,
      duration: null,
      useBatch: false,
      limit: 100,
      method: "primary",
      joinLocation: "client",
      provider,
    };
  }

  componentDidMount = async () => {
    await app.authenticate({
      strategy: "local",
      email: "na@example.com",
      password: "password",
    });

    this.loadPosts();
  };

  loadPosts = async () => {
    this.setState({ loading: true });
    try {
      await app.service("server/profile").create({});
      await app.service("client/profile").create({});

      const start = new Date().getTime();
      const posts = await app.service("api/posts").find({
        query: {
          $sort: { _id: 1 },
          $limit: this.state.limit,
        },
        method: this.state.method,
        joinLocation: this.state.joinLocation,
      });
      const end = new Date().getTime();

      const serverProfile = await app.service("server/profile").find();
      const clientProfile = await app.service("client/profile").find();

      this.setState({
        posts,
        duration: end - start,
        serverProfile,
        clientProfile,
        loading: false,
        error: null,
      });
    } catch (error) {
      this.setState({
        error,
        loading: false,
      });
    }
  };

  render() {
    const {
      docsOpen,
      loading,
      error,
      serverProfile,
      clientProfile,
      posts,
      duration,
      useBatch,
      limit,
      method,
      joinLocation,
      provider,
    } = this.state;

    return (
      <div className="container-fluid mt-4">
        <p className="lead">
            This is a basic example app that compares doing joins/population on
            the client vs on the server. It is also a test bed and exmaple of a
            new v2 for{" "}
            <a
              href="https://github.com/feathersjs-ecosystem/batch-loader/tree/v2"
              target="_blank"
              rel="noopener noreferrer"
            >
              feathers-dataloader
            </a>
            . See also the{" "}
            <a
              href="https://github.com/feathersjs-ecosystem/batch-loader/issues/18"
              target="_blank"
              rel="noopener noreferrer"
            >
              v2 RFC
            </a>{" "}
            and leave some feedback! You can also checkout the{" "}
            <a
              href="https://github.com/DaddyWarbucks/test-feathers-client-joins"
              target="_blank"
              rel="noopener noreferrer"
            >
              source code
            </a>{" "}
            for this project. Specifically, see the <code>shared</code>{" "}
            direcotry.
          </p>
        <div className="card mb-4 card-light">
          <div className="card-header d-flex justify-content-between">
            <h3 className="mb-0">Docs</h3>
            <button className="btn btn-primary" onClick={() => {
              this.setState({ docsOpen: !docsOpen });
            }}>{docsOpen ? 'Hide' : 'Show'}</button>
          </div>
          <div className={`card-body ${docsOpen ? '' : 'd-none'}`}>
          <p>
            This is a basic example app that compares doing joins/population on
            the client vs on the server. It is also a test bed and exmaple of a
            new v2 for{" "}
            <a
              href="https://github.com/feathersjs-ecosystem/batch-loader/tree/v2"
              target="_blank"
              rel="noopener noreferrer"
            >
              feathers-dataloader
            </a>
            . See also the{" "}
            <a
              href="https://github.com/feathersjs-ecosystem/batch-loader/issues/18"
              target="_blank"
              rel="noopener noreferrer"
            >
              v2 RFC
            </a>{" "}
            and leave some feedback! You can also checkout the{" "}
            <a
              href="https://github.com/DaddyWarbucks/test-feathers-client-joins"
              target="_blank"
              rel="noopener noreferrer"
            >
              source code
            </a>{" "}
            for this project. Specifically, see the <code>shared</code>{" "}
            direcotry.
          </p>
          <p>
            The app makes one request to{" "}
            <code>app.service('api/posts').find()</code>. The posts then join a{" "}
            <code>user</code> and <code>comments</code>. Each user then joins on
            a <code>bio</code>, and each comment subsequently joins on its{" "}
            <code>user</code> (and subsequently its bio).
          </p>
          <ul>
            <li className="mb-2">
              10,000 posts, each with random <code>user_id</code>
            </li>
            <li className="mb-2">
              50,000 comments, each with random <code>user_id</code> and{" "}
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
              The app also uses{" "}
            <a
              href="https://github.com/feathersjs-ecosystem/feathers-batch"
              target="_blank"
              rel="noopener noreferrer"
            >
              feathers-batch
            </a>
            , which is a clever way of allowing the client to specify which
            joins to do, but actually executes that code on the server.
              Note that when using feathers-batch, you will see lots of client
              side calls, but its imporant to understand that these calls are
              not actual HTTP requests. The service was called, but it did not
              make a socket/rest request. It simply created "intructions" for
              feathers-batch.
            </li>
            <li className="mb-2">
              The app uses authentication. This means that there are additional
              requests to{" "}
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
          </ul>
          </div>
        </div>

        {error && <div className="alert alert-danger">{error.message}</div>}

        <div className="row mb-4">
          <div className="col-sm-auto">
            <h4>Provider</h4>
            <div className="btn-group mb-2">
              <a
                className={`btn btn-secondary ${
                  provider === "socket" ? "active" : ""
                }`}
                href="/?provider=socket"
              >
                Socket
              </a>
              <a
                className={`btn btn-secondary ${
                  provider === "rest" ? "active" : ""
                }`}
                href="/?provider=rest"
              >
                REST
              </a>
            </div>
            <p>
              Configure the client to make <br/> calls via Socket or
              REST
            </p>
          </div>
          <div className="col-sm-auto">
            <h4>Join Location</h4>
            <div className="btn-group mb-2">
              <button
                disabled={loading}
                className={`btn btn-info ${
                  joinLocation === "client" && !useBatch ? "active" : ""
                }`}
                onClick={() => {
                  this.setState(
                    { joinLocation: "client", useBatch: false },
                    () => {
                      this.loadPosts();
                      app.set("useBatch", false);
                    }
                  );
                }}
              >
                Client
              </button>
              <button
                disabled={loading}
                className={`btn btn-info ${
                  joinLocation === "server" ? "active" : ""
                }`}
                onClick={() => {
                  this.setState(
                    { joinLocation: "server", useBatch: false },
                    () => {
                      this.loadPosts();
                      app.set("useBatch", false);
                    }
                  );
                }}
              >
                Server
              </button>
              <button
                disabled={loading}
                className={`btn btn-info ${useBatch ? "active" : ""}`}
                onClick={() => {
                  this.setState(
                    { joinLocation: "client", useBatch: true },
                    () => {
                      this.loadPosts();
                      app.set("useBatch", true);
                    }
                  );
                }}
              >
                feathers-batch
              </button>
            </div>
            <p>
              Choose between doing joins on the <br/> client or the server. See
              also{" "}
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
                  method === "primary" ? "active" : ""
                }`}
                onClick={() => {
                  this.setState({ method: "primary" }, this.loadPosts);
                }}
              >
                Service
              </button>
              <button
                disabled={loading}
                className={`btn btn-success ${
                  method === "cached" ? "active" : ""
                }`}
                onClick={() => {
                  this.setState({ method: "cached" }, this.loadPosts);
                }}
              >
                Cached Service
              </button>
              <button
                disabled={loading}
                className={`btn btn-success ${
                  method === "load" ? "active" : ""
                }`}
                onClick={() => {
                  this.setState({ method: "load" }, this.loadPosts);
                }}
              >
                DataLoader
              </button>
            </div>
            <p>
              User feathers get/find methods. Or use the <br/> dataloader's cached get/find or load/loadMany methods.
            </p>
          </div>
          <div className="col-sm-auto">
            <h4>Limit</h4>
            <input
              type="text"
              className="form-control mb-2"
              value={limit}
              onChange={(event) => {
                const limit = event.target.value;
                this.setState(
                  {
                    limit,
                  },
                  () => {
                    if (limit) {
                      this.loadPosts();
                    }
                  }
                );
              }}
            />
            <p>Set a limit all the way up to 10,000</p>
          </div>
        </div>

        <div className="mb-4 p-3 bg-light rounded">
          <h3>
            Duration:{" "}
            {loading ? (
              <div
                className="spinner-border"
                style={{
                  width: "2rem",
                  height: "2rem",
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
