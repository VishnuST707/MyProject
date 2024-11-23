import React from 'react';
import "../styles/Addmanager.css"; 
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Addmanager() {

  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const [formData, setFormData] = useState({
    name:"",
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    detailsAdder(event);
    if (event.target.name === 'email') {
      handleEmailChange(event);
    } else if (event.target.name === 'password') {
      handlePasswordChange(event);
    }
  };

  const detailsAdder = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  const onCheck = () => {
    setIsChecking(true);
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    if (newEmail !== '' && !validateEmail(newEmail)) {
      setEmailError('Invalid email format.');
    } else {
      setEmailError('');
    }
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    if (newPassword !== '' && !validatePassword(newPassword)) {
      setPasswordError('Password must be at least 6 characters long.');
    } else {
      setPasswordError('');
    }
  };

  const handleSubmit = (e) => {

    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.password) {
      alert('Please fill in all fields.');
      return;
    }
    console.log(JSON.stringify(formData));
    if (!isChecking) return;
    if (validateEmail(email) && validatePassword(password)) {
      alert('Form submitted successfully!');
    } else {
      setEmailError(validateEmail(email) ? '' : 'Invalid email format.');
      setPasswordError(validatePassword(password) ? '' : 'Password must be at least 6 characters long.');
    }
    navigate("/Studentslogin");
  };

  return (
    <Container fluid className="hero" >
    <Row className="w-100">
      <Col xs={12} md={6} lg={4} className="mx-auto">
        <Form className="form-container glass" onSubmit={handleSubmit}>
          <h1 className="text-center mb-4 head2" >
            Manager Details</h1>
          <Form.Group className="mb-5" controlId="formBasicName">
            <Form.Label className='input-label'>Name</Form.Label>
            <Form.Control 
              type="text"
              placeholder="Enter your name"
              className="inputbox"
              style={{ color: 'white' }}
              name="name"
              onChange={handleChange}
              value={formData.name} 
            />
          </Form.Group>

          <Form.Group className="mb-5" controlId="formBasicEmail">
            <Form.Label className='input-label'>Email address</Form.Label>
            <Form.Control 
              type="email"
              placeholder="Enter email"
              style={{ color: 'white' }}
              className="inputbox"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <Form.Text className="text-muted">
              {emailError && <p style={{ color: 'red' }}>{emailError}</p>} 
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-5" controlId="formBasicPassword">
            <Form.Label className='input-label'>Password</Form.Label>
            <Form.Control 
              type="password"
              placeholder="Password"
              className="inputbox"
              name="password"
              style={{ color: 'white' }}
              value={formData.password}
              onChange={handleChange}
            />
            <Form.Text className="text-muted">
              {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check 
              type="checkbox" 
              label="Check me out" 
              className="check" 
              onClick={onCheck} 
            />
          </Form.Group>

          <Button variant="white" type="submit" className='buttonsubmit'>
            Submit
          </Button>
        </Form>
      </Col>
    </Row>
  </Container>
  );
}

export default Addmanager;
