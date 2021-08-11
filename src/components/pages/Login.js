import React, { useEffect, useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { createBrowserHistory } from "history";

const history = createBrowserHistory({
  forceRefresh: true,
});

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login, guestLogin } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    return () => {
      setError(null);
      setLoading(null);
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      history.push("/");
    } catch (error) {
      setError("Invalid username or password");
    }
    setLoading(false);
  };

  const guestLoginClick = async () => {
    await guestLogin();
    history.push("/");
  };

  return (
    <div className='signup container'>
      <Card className='signup__card'>
        <Card.Body className='signup__card-body'>
          <h2>Log In</h2>
          {error && <Alert variant='danger'>{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className='signup__card-body--form' id='email'>
              <Form.Label>Email</Form.Label>
              <Form.Control
                autoComplete='email'
                type='email'
                ref={emailRef}
                required></Form.Control>
            </Form.Group>

            <Form.Group className='signup__card-body--form' id='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                autoComplete='new-password'
                ref={passwordRef}
                required></Form.Control>
            </Form.Group>

            <Button disabled={loading} type='submit'>
              Sign Up
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className='signup__guestLogin'>
        Login as guest?
        <span className='linkAppreance' onClick={guestLoginClick} href='#'>
          Guest Login
        </span>
      </div>
      <div className='signup__haveAccount'>
        Don't have an account? <Link to='/signup'>Sign Up</Link>
      </div>
    </div>
  );
};

export default Login;
