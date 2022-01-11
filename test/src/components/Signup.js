import React, { Component } from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
} from "semantic-ui-react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { authSignup } from "../store/actions/auth";

class Signup extends Component {
  state = {
    username: "",
    email: "",
    password1: "",
    password2: "",
  };

  handleSubmit = () => {
    const { error } = this.props;
    const { username, email, password1, password2 } = this.state;
    this.props.signup(username, email, password1, password2);
    if (!error) {
      this.props.history.push("/");
    } else {
      console.error();
    }
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    const { loading, error } = this.props;
    const { username, email, password1, password2 } = this.state;
    return (
      <Grid
        textAlign="center"
        style={{ height: "100vh" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" textAlign="center">
            Signup for a new account
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
                name="email"
                value={email}
                icon="mail"
                iconPosition="left"
                placeholder="Email . . ."
              />
              <Form.Input
                fluid
                onChange={this.handleChange}
                name="password1"
                value={password1}
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                type="password"
              />
              <Form.Input
                fluid
                onChange={this.handleChange}
                name="password2"
                value={password2}
                icon="lock"
                iconPosition="left"
                placeholder="Confirm your password"
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
                Sign Up
              </Button>
            </Segment>
          </Form>
          <Message>
            Already have an account? <Link to="/login">Login</Link>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signup: (username, email, password1, password2) =>
      dispatch(authSignup(username, email, password1, password2)),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Signup));
