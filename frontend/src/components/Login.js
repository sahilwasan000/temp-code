import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
// import { loginUser } from " link ";

// insert link to function action

import { withStyles } from "@material-ui/styles";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

const styles = () => ({
    errorText: {
      color: "#f50057",
      marginBottom: 5,
      textAlign: "center"
    }
  });

  class Login extends Component {
    state = { email: "", password: "" };
  
    handleEmailChange = ({ target }) => {
      this.setState({ email: target.value });
    };
  
    handlePasswordChange = ({ target }) => {
      this.setState({ password: target.value });
    };
  
    // handleSubmit = () => {
    //   const { dispatch } = this.props;
    //   const { email, password } = this.state;
  
    //   dispatch(loginUser(email, password));
    // };
  
    render() {
      const { classes, loginError, isAuthenticated } = this.props;
      if (isAuthenticated) {
        return <Redirect to="/" />;
      } else {
        return (
          <React.Fragment>
            <div className="LoginDiv1" >
            <div className="LoginDiv2">
              <div className="HalfDiv1"></div>
              <div className="HalfDiv2">
              <Typography component="h1" variant="h3">
                Sign in
              </Typography>
              <TextField
                variant="outlined"
                margin="normal"
                id="email"
                label="Email Address"
                name="email"
                onChange={this.handleEmailChange}
              />
              <br />
              <TextField
                variant="outlined"
                margin="normal"
                name="password"
                label="Password"
                type="password"
                id="password"
                onChange={this.handlePasswordChange}
              />
              {loginError && (
                <Typography component="p" className={classes.errorText}>
                  Incorrect email or password.
                </Typography>
              )}
              <br />
              {/* <Button
                type="button"
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={this.handleSubmit}
              >
                Sign In
              </Button> */}
            </div>
            </div>
            </div>
          </React.Fragment>
        );
      }
    }
  }
  
  function mapStateToProps(state) {
    return {
      isLoggingIn: state.auth.isLoggingIn,
      loginError: state.auth.loginError,
      isAuthenticated: state.auth.isAuthenticated
    };
  }
  
//   export default withStyles(styles)(connect(mapStateToProps)(Login));
export default Login;