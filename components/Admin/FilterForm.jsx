
import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import moment from 'moment';

const FilterForm = ({ monthFilter, yearFilter, handleMonthFilterChange, handleYearFilterChange, searchQuery, handleSearchChange }) => (
  <Form className="mb-3">
    <Row>
      <Col md={4}>
        <Form.Control 
          as="select" 
          value={monthFilter} 
          onChange={handleMonthFilterChange}
        >
          <option value="all">All Months</option>
          <option value="1">January</option>
          <option value="2">February</option>
          <option value="3">March</option>
          <option value="4">April</option>
          <option value="5">May</option>
          <option value="6">June</option>
          <option value="7">July</option>
          <option value="8">August</option>
          <option value="9">September</option>
          <option value="10">October</option>
          <option value="11">November</option>
          <option value="12">December</option>
        </Form.Control>
      </Col>
      <Col md={4}>
        <Form.Control 
          as="select" 
          value={yearFilter} 
          onChange={handleYearFilterChange}
        >
          <option value="all">All Years</option>
          {[...Array(11).keys()].map(i => {
            const year = moment().year() + i;
            return <option key={year} value={year}>{year}</option>;
          })}
        </Form.Control>
      </Col>
      <Col md={4}>
        <Form.Control 
          type="text" 
          placeholder="Search..." 
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </Col>
    </Row>
  </Form>
);

export default FilterForm;


