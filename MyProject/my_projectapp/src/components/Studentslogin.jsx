import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "../styles/Studentslogin.css";
import { useEffect } from 'react';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import Stack from 'react-bootstrap/Stack';

function Studentslogin() {

  const navigate = useNavigate();
  const [percentage,setPercentage]=useState(0);
  const [streams,setStreams]= useState([]);
  const [joiningYear, setJoiningYear] = useState("");
  const [myColor,setMyColor]=useState('black')
  const [passingYear, setPassingYear] = useState("");
  const [isGraduated, setIsGraduated] = useState(false);
  const [currentForm, setCurrentForm] = useState(0);
  const [emailError, setEmailError] = useState('');
  const [phonenumberError, setPhonenumberError] = useState('');
  const [resumeError, setResumeError] = useState(''); 
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phonenumber: "",
    location: "",
    degree: "",
    degreestream: "",
    arrears: "",
    joinyear: "",
    passout: "", 
    resume: null
  });

  
  const mbaStreams = [
    "Finance",
    "Marketing",
    "Human Resource Management",
    "Operations Management",
    "International Business",
    "Information Technology",
    "Entrepreneurship",
    "Healthcare Management",
    "Supply Chain Management",
    "Business Analytics",
    "Retail Management",
    "Agribusiness Management",
    "Project Management",
    "Rural Management",
    "Hospitality Management"
  ];
  

  const engineeringStreams = [
    "Mechanical Engineering",
    "Electrical Engineering",
    "Civil Engineering",
    "Computer Science Engineering",
    "Electronics and Communication Engineering",
    "Chemical Engineering",
    "Aerospace Engineering",
    "Biomedical Engineering",
    "Environmental Engineering",
    "Industrial Engineering",
    "Information Technology Engineering",
    "Mechatronics Engineering",
    "Petroleum Engineering",
    "Automotive Engineering",
    "Structural Engineering"
  ];
  const bscStreams = [
    "Physics",
    "Chemistry",
    "Mathematics",
    "Biology",
    "Computer Science",
    "Environmental Science",
    "Biotechnology",
    "Zoology",
    "Botany",
    "Microbiology",
    "Geology",
    "Statistics",
    "Biochemistry",
    "Electronics",
    "Agriculture"
  ];
  
  useEffect(() => {
    if (formData.degree === "M Tech" || formData.degree === "B Tech") {
      setStreams(engineeringStreams);
    } else if (formData.degree === "MSc" || formData.degree === "BSc") {
      setStreams(bscStreams);
    } else if (formData.degree === "MBA" || formData.degree === "BBA") {
      setStreams(mbaStreams);
    } else {
      setStreams([]);
    }
  }, [formData.degree]);

  const years = Array.from({ length: 20 }, (_, index) => 2005 + index);

  const GlobalStyle = createGlobalStyle`
  body {
    overflow: hidden;
  }
`;

  const onGraduation = () => {
    setIsGraduated(!isGraduated);
  };
  const handleInputNumeric = (event) => {
    const { value } = event.target;
   
    event.target.value = value.replace(/[^0-9]/g, '');
  };
  

  const handleChange = (event) => {
    const { id, name, value,files } = event.target;
  
    
    if (name === 'resume') {  
      const file = files[0];
      if (file) {
        if (file.type !== 'application/pdf') { 
          setResumeError('Resume must be a PDF file.');
        } else if (file.size > 2 * 1024 * 1024) {  
          setResumeError('Resume must not exceed 2MB.');
        } else {
          setResumeError('');  
          setFormData({ ...formData, resume: file });  
        }
      }
    } else if (name === 'phonenumber') {
      const numericValue = value.replace(/\D/g, ''); 
      setFormData({ ...formData, [name]: numericValue });
      validatePhoneNumber(numericValue);
    } else {
      setFormData({ ...formData, [name]: value });
    
      if (name === 'email') {
        validateEmail(value);
      }
  
      const yearValue = parseInt(value);
      if (id === "joiningYear") {
        setJoiningYear(yearValue);
        setPassingYear("");
      } else if (id === "passingYear") {
        setPassingYear(yearValue);
      }
    }
  };
  
  
  const getPassingYearOptions = () => {
    return years.filter((year) => year >= joiningYear);
  };

  const handleNext = () => {
    setCurrentForm((prevForm) => prevForm + 1);
    setMyColor("rgba(2, 187, 249, 0.978)");
    setPercentage(200);
   
  };

  const handlePrevious = () => {
    setCurrentForm((prevForm) => prevForm - 1);
    setMyColor("black");
    setPercentage(0);
  };

 

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (regex.test(email)) {
      setEmailError('');
    } else {
      setEmailError('Invalid email format.');
    }
  };

  const validatePhoneNumber = (phonenumber) => {
    if (phonenumber.length === 10) {
      setPhonenumberError('');
    } else {
      setPhonenumberError('Phone number must have only 10 characters long.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();


  
   
    let isFormValid = true;
    let emptyFields = [];
  
    Object.entries(formData).forEach(([key, value]) => {
      if (typeof value === 'string' && value.trim() === '') {
        isFormValid = false;
        emptyFields.push(key);
      }
    });

    if (!isFormValid) {
      alert(`Please fill in all the fields. Missing fields: ${emptyFields.join(', ')}`);
      return;
    }
  
   
    
    if (!emailError && !phonenumberError) {
      alert('Form submitted successfully!');  
    } else {
      alert('Please correct the errors before submitting.');
    }
    console.log(JSON.stringify(formData));
    navigate('/Profileview', { state: { formData } });
  };
  
  
  const getDisplayStyle = (formIndex) => {
    return {
      display: currentForm === formIndex ? 'block' : 'none',
    };
  };



  return (
    <>
    <GlobalStyle />
      <Navbar style={{ backgroundColor: 'black' }} sticky="top">
        <Container className='justify-content-center'>
          <Navbar.Brand>
            <h1 className='stylehead'>
              STUDENTS REGISTRATION
            </h1>
          </Navbar.Brand>
        </Container>
      </Navbar>
      <Container fluid className="vh-100 viewport">
      <Stack gap={0} style={{ height: '100%' }}>
          <div className="p-2 d-flex flex-column align-items-center justify-content-center topbar" style={{ backgroundImage: `url('/images/Space1.jpg')` }} xs={12} md={2}>
          <div className='stepper'>
            <div className='step'>
              <div className='step-number' style={{backgroundColor:"rgba(2, 187, 249, 0.978)"}}>1</div>
              <div className='step-name'>Registration</div> 
            </div>
            <div className="progress-bar">
              <div className="progress" style={{width:percentage }}></div>
            </div>
            <div className='step'>
              <div className='step-number' style={{backgroundColor:myColor,transition:"3s ease"}}>2</div>
              <div className='step-name'>Graduation</div>
            </div>
          </div>
          
          </div>
          <div className="p-2 flex-grow-1 d-flex align-items-center justify-content-center mainbar" style={{ backgroundColor: "black" }} xs={12} md={10}>
          <Container fluid className="hero1">
        {/* REGISTRATION */}
        <Row className="w-100">
          <Col xs={12} md={6} lg={6} className="mx-auto">
            <Form className="form-container1" style={getDisplayStyle(0)} onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label className="alterlabel">Name</Form.Label>
                <Form.Control
                  style={{color:"white"}}
                  type="text"
                  //placeholder="Enter your name"
                  className="inputbox1"
                  name="name"
                  onChange={handleChange}
                  value={formData.name}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className="alterlabel">Email address</Form.Label>
                <Form.Control
                 style={{color:"white"}}
                  type="email"
                  //placeholder="Enter email"
                  className="inputbox1"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                <Form.Text className="text-muted">
                  {emailError && <p style={{ color: 'red' }}>{emailError}</p>}
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPhone">
                <Form.Label className="alterlabel">Phone Number</Form.Label>
                <Form.Control
                 style={{color:"white"}}
                  type="text"
                  //placeholder="PhoneNumber"
                  className="inputbox1"
                  name="phonenumber"
                  value={formData.phonenumber}
                  onChange={handleChange}
                  onInput={handleInputNumeric} 
                />
                <Form.Text className="text-muted">
                  {phonenumberError && <p style={{ color: 'red' }}>{phonenumberError}</p>}
                </Form.Text>
              </Form.Group>
              <Form.Label className="alterlabel">Location</Form.Label>
              <Form.Select
                aria-label="Default select example"
                style={{color:"white"}}
                className='inputbox1'
                //placeholder="Enter email"
                name="location"
                onChange={handleChange}
                value={formData.location}>
                <option className='labeloption'></option>
                <option value="TVM" className='labeloption'>TVM</option>
                <option value="Kollam" className='labeloption'>Kollam</option>
                <option value="Pathanamthitta" className='labeloption'>Pathanamthitta</option>
                <option value="Alappuzha" className='labeloption'>Alappuzha</option>
                <option value="Kottayam" className='labeloption'>Kottayam</option>
                <option value="Idukki" className='labeloption'>Idukki</option>
                <option value="Eranakulam" className='labeloption'>Eranakulam</option>
                <option value="Thrissur" className='labeloption'>Thrissur</option>
                <option value="Palakkad" className='labeloption'>Palakkad</option>
                <option value="Malappuram" className='labeloption'>Malappuram</option>
                <option value="Kozhikode" className='labeloption'>Kozhikode</option>
                <option value="Wayanad" className='labeloption'>Wayanad</option>
                <option value="Kannur" className='labeloption'>Kannur</option>
                <option value="Kasaragod" className='labeloption'>Kasaragod</option>
              </Form.Select>
              <Container>
                <Row className="justify-content-between">
                  <Col xs="auto">
                    <Button onClick={handlePrevious} disabled={currentForm === 0} variant="white" className='btnbutton'>
                      Previous
                    </Button>
                  </Col>
                  <Col xs="auto">
                    <Button onClick={handleNext} variant="white" className='btnbutton'>
                      Next
                    </Button>
                  </Col>
                </Row>
              </Container>
            </Form>
          </Col>
        </Row>
       {/* GRADUATION INFO */}
        <Row className="w-100">
          <Col xs={12} md={6} lg={6} className="mx-auto">
            <Form className="form-container1" onSubmit={handleSubmit} style={getDisplayStyle(1)}>
              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label className="alterlabel">Graduated On</Form.Label>
                <Row className="justify-content-md-center align-items-center">
                  <Col xs="auto">
                   <Form.Label style={{color:"white"}}>UG</Form.Label>
                  </Col>
                  <Col xs="auto">
                    <Form.Check
                    type="switch"
                    className="custom-switch"
                    id="toggil"
                    style={{ backgroundColor: "transparent" }}
                    onClick={onGraduation} />
                   </Col>
                  <Col xs="auto">
                   <Form.Label style={{color:"white"}}>PG</Form.Label>
                  </Col>
              </Row>

                {isGraduated ? (
                  <Form.Select
                    aria-label="Default select example"
                    className='inputbox1'
                    name="degree"
                    style={{color:"white"}}
                    onChange={handleChange}
                    value={formData.degree}>
                    <option >PG</option>
                    <option value="M Tech" className='labeloption' >M Tech</option>
                    <option value="MSc" className='labeloption'>MSc</option>
                    <option value="MBA" className='labeloption'>MBA</option>
                  </Form.Select>
                ) : (
                  <Form.Select
                    aria-label="Default select example"
                    className='inputbox1'
                    style={{color:"white"}}
                    name="degree"
                    onChange={handleChange}
                    value={formData.degree}>
                    <option >UG</option>
                    <option  value="B Tech" className='labeloption'>B Tech</option>
                    <option  value="BSc" className='labeloption'>Bsc</option>
                    <option  value="BBA" className='labeloption'>BBA</option>
                  </Form.Select>
                )}
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className="alterlabel">Stream</Form.Label>
                <Form.Select
                        style={{color:"white"}}
                        className='inputbox1'
                        name="degreestream"
                        onChange={handleChange}
                        value={formData.degreestream}
                      >
                        <option ></option>
                        {streams.map((stream) => (
                          <option className='labeloption' key={stream} value={stream}>
                            {stream}
                          </option>
                        ))}
                      </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label className="alterlabel">Maximum Arrears</Form.Label>
                <Form.Control
                 style={{color:"white"}}
                  type="text"
                  //placeholder="enter the number of Arrears you have"
                  className="inputbox1"
                  name="arrears"
                  value={formData.arrears}
                  onChange={handleChange}
                  onInput={handleInputNumeric} 
                />
              </Form.Group>
             
              <Row className="mb-3">
              <Form.Group as={Col} className="mb-3" controlId="joiningYear">
              <Form.Label className="alterlabel">Year Of Joining</Form.Label>
                <Form.Select
                 style={{color:"white"}}
                  aria-label="Default select example"
                  className='inputbox2'
                  name="joinyear"
                  onChange={handleChange}
                  value={formData.joinyear}>
                  <option value=""></option>
                  {years.map((year) => (
                    <option key={year} value={year} className='labeloption'>
                      {year}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group as={Col} className="mb-3" controlId="passingYear">
              <Form.Label className="alterlabel">Year Of PassOut</Form.Label>
                <Form.Select
                 style={{color:"white"}}
                  aria-label="Default select example"
                  className='inputbox2'
                  name="passout"
                  onChange={handleChange}
                  value={formData.passout}>
                  <option value=""></option>
                  {getPassingYearOptions().map((year) => (
                    <option key={year} value={year} className='labeloption'>
                      {year}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
             </Row>
             <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label className="alterlabel">Upload Your Resume</Form.Label>
                <Form.Control
                  type="file"
                  className="inputbox1"
                  name="resume"  
                  onChange={handleChange}
                />
                
                {resumeError && <p style={{ color: 'red' }}>{resumeError}</p>}  
              </Form.Group>
              
              <Container>
                <Row className="justify-content-between">
                  <Col xs="auto">
                    <Button onClick={handlePrevious} variant="white" className='btnbutton'>
                      Previous
                    </Button>
                  </Col>
                  <Col xs="auto">
                    <Button type="submit" variant="white" className='btnbutton'>
                      Submit
                    </Button>
                  </Col>
                </Row>
              </Container>
            </Form>
          </Col>
        </Row>
      </Container>
     
          </div>
      </Stack>
      </Container>
    </>
  )
}


export default Studentslogin;

