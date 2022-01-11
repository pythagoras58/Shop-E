import React, { Component } from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
} from "semantic-ui-react";
import { Link, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { authLogin } from "../store/actions/auth";

class Login extends Component {
  state = {
    username: "",
    password: "",
  };

  handleSubmit = () => {
    const { error } = this.props;
    const { username, password } = this.state;
    this.props.login(username, password);
    if (!error) {
      this.props.history.push("/");
    } else {
      console.log(error);
    }
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    const { loading, error } = this.props;
    const { username, password } = this.state;
    return (
      <Grid
        textAlign="center"
        style={{ height: "100vh" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" textAlign="center">
            Log in to your account
          </Header>
          <Form size="large" onSubmit={this.handleSubmit}>
            <Segment stacked>
              <Form.Input
                fluid
                onChange={this.handleChange}
                name="username"
                value={username}
                icon="user"
                iconPosition="left"
                placeholder="Username"
              />
              <Form.Input
                fluid
                onChange={this.handleChange}
                name="password"
                value={password}
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                type="password"
              />
              {error && (
                <Message
                  warning
                  header="There was an error with your submission"
                  list={error.message}
                />
              )}

              <Button
                disabled={loading}
                loading={loading}
                color="teal"
                fluid
                size="large"
              >
                Login
              </Button>
            </Segment>
          </Form>
          <Message>
            New to us? <Link to="/signup">Sign Up</Link>
          </Message>
        </Grid.Column>
      </Grid>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    loading: state.loading,
    error: state.error,
    authenticated: state.token !== null,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    login: (username, password) => dispatch(authLogin(username, password)),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
