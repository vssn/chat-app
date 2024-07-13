import { useContext } from "react";
import { Alert, Button, Form, Row, Col, Stack } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const {
    updateLoginInfo,
    logoutUser,
    loginUser,
    loginError,
    loginInfo,
    isLoginLoading,
  } = useContext(AuthContext);

  return (
    <>
      <Form onSubmit={loginUser}>
        <Row
          style={{
            height: "100vh",
            justifyContent: "center",
            paddingTop: "10%",
          }}
        >
          <Col xs={6}>
            <Stack gap={3}>
              <h2>Login</h2>

              <Form.Control
                type="email"
                onChange={(e) =>
                  updateLoginInfo({ ...loginInfo, email: e.target.value })
                }
                placeholder="Email"
              />
              <Form.Control
                type="password"
                onChange={(e) =>
                  updateLoginInfo({ ...loginInfo, password: e.target.value })
                }
                placeholder="Password"
              />

              <Button variant="primary" type="submit">
                {isLoginLoading ? "Logging in...": "Login"}
              </Button>

              {loginError?.error && (
                <Alert variant="danger">
                  <p>{loginError?.message}</p>
                </Alert>
              )}
            </Stack>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default Login;
