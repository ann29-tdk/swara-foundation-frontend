import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Spinner, Container, Row, Col } from 'react-bootstrap';

export const RequireAuth = ({ children }) => {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();

  if (isLoading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <Row>
          <Col className="text-center">
            <Spinner animation="border" role="status" style={{ width: '3rem', height: '3rem' }}>
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </Col>
        </Row>
      </Container>
    );
  }

  if (!isAuthenticated) {
    loginWithRedirect();
    return null;
  }

  return children;
};
