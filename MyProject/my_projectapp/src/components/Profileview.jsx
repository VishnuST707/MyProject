import React from 'react';
import { useLocation } from 'react-router-dom';
import Stack from 'react-bootstrap/Stack';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';


function Profileview() {
 
  const location = useLocation();
  const { formData } = location.state || {};

  if (!formData) {
    return <div>No data available</div>;
  }

  
  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <Form className="w-50 p-4" style={{ backgroundColor: "lightgray", borderRadius:"50px" }}  >
        <Form.Text className="d-flex justify-content-center mb-4" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>

          YOUR PROFILE

        </Form.Text>
        <Stack gap={3}>
          <div className="p-2">Name: {formData.name}</div>
          <div className="p-2">Phone Number: {formData.phonenumber}</div>
          <div className="p-2">Email: {formData.email}</div>
          <div className="p-2">Location: {formData.location}</div>
          <div className="p-2">Degree: {formData.degree}</div>
          <div className="p-2">Stream: {formData.degreestream}</div>
          <div className="p-2">Arrears: {formData.arrears}</div>
          <div className="p-2">Joining Year: {formData.joinyear}</div>
          <div className="p-2">Passout Year: {formData.passout}</div>
        </Stack>
      </Form>
    </Container>
  );
}

export default Profileview;
