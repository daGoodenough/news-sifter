import React from 'react';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const DropdownListItem = ({ article }) => (
  <>
    <NavDropdown.Item href="#action/3.3">
      <Container>
        <Row className="justify-content-md-center">
          <Col xs lg="2">
            <img src={article.image} alt="" width="200" height="200" />
          </Col>
          <Col md="auto">
            <p>{article.title}</p>
            <p>{article.author}</p>
            <p>{article.description}</p>
          </Col>
          <Col xs lg="2">
            <span>{article.begginerWords}</span>
            <span>{article.intermediateWords}</span>
            <span>{article.advancedWords}</span>
          </Col>
        </Row>
      </Container>
    </NavDropdown.Item>
    <NavDropdown.Divider />
  </>
);

export default DropdownListItem;
