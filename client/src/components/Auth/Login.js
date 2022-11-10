import './Login.css';

const Login = (props) => {
  const state = {
    username: '',
    email: '',
    password: '',
  };

  const handleChange = (e) => {
    state[e.target.name] = e.target.value;
  };

  return (
    <div className="login-wrapper">
      <form className="form">
        <h1 className="form-header">Login</h1>
        <div className="form-group">
          <label className="form-label" htmlFor="username">
            Username:
          </label>
          <input
            className="form-input"
            type="text"
            id="username"
            name="username"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="email">
            Email:
          </label>
          <input
            className="form-input"
            type="email"
            id="email"
            name="email"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="password">
            Password:
          </label>
          <input
            className="form-input"
            type="password"
            id="password"
            name="password"
            onChange={handleChange}
          />
        </div>
        <div className="button-group">
          <button
            className="btn-submit"
            type="submit"
            id="submit"
            onClick={(e) => {
              e.preventDefault();
              props.submit(state.username, state.email, state.password);
            }}
          >
            Submit
          </button>
          <button className="btn-reset" type="reset" id="reset">
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
