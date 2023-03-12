import React, { useRef, useState } from "react";

import { Button, Form, FormGroup, Label, Input, CardHeader } from "reactstrap";
import "../../css/RegForm.css";
import { useToken } from "../../apis";
import { useFormik } from "formik";

const validate = (values) => {
  const errors = {};

  if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Valid Email";
  } else if (!values.email) {
    errors.email = "Email Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  return errors;
};

function RegisterStudent() {
  const { tokenInstance } = useToken();

  const userName = useRef(null);
  const firstName = useRef(null);
  const lastName = useRef(null);
  const address = useRef(null);
  const contact = useRef(null);
  const password = useRef(null);
  const [role, setRole] = useState(4);
  const email = useRef(null);
  const faculty = useRef(null);
  const batch = useRef(null);
  const semester = useRef(null);
  const [image, setImage] = useState("");

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validate,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  const toggle = () => {
    var blur = document.getElementById("blur");
    blur.classList.toggle("active");
    var popup = document.getElementById("popup");
    popup.classList.toggle("active");
  };

  const convertToBase64 = async (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        // console.log("onload");
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        // console.log("onerror");
        reject(error);
      };
    });
  };

  const onFileSelected = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setImage(base64);
    console.log("File");
  };

  console.log({ image });

  const [postResult, setPostResult] = useState(null);

  function postData() {
    console.log("postData");
    const postData = {
      firstName: firstName.current.value,
      lastName: lastName.current.value,
      userName: userName.current.value,
      password: password.current.value,
      address: address.current.value,
      contact_no: contact.current.value,
      role: role,
      email: email.current.value,
      // faculty: faculty.current.id,
      faculty: 1,
      batch: batch.current.value,
      semester: semester.current.value,
      image: image,
    };

    tokenInstance
      .post("/user/create", postData)
      .then((res) => {
        // console.log(res);
        // console.log("data:", postData);
        setPostResult(res.data.message);
      })
      .catch((e) => {
        console.log(e);
        setPostResult(e.response.data.message);
        // console.log("data:", postData);
      });
  }





  const imageRef = useRef(null);

  function handleImageChange(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function (event) {
      const img = imageRef.current;
      img.src = event.target.result;
      img.style.display = 'block';
    };

    reader.readAsDataURL(file);
  }





  // const [formValues, setFormValues] = useState({
  //   firstName: "",
  //   lastName: "",
  //   email: ""
  // });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      firstName !== "" &&
      lastName !== "" &&
      password !== ""
    ) {
      setPostResult("Loading");
      postData();
      toggle();
      console.log("Form is ready to submit");
      // Add code here to submit the form
    } else {
      console.log("Please fill out all fields before submitting");
    }
  };






  return (
    <>
      <div className="contain" id="blur">
        <div className="content">
          <div className="RegHeader">
            <h1>Registration</h1>
          </div>
          <div className="RegBody">
            <Form className="RegFormInfo" onSubmit={handleSubmit} >
              <div className="inputSection">
                <FormGroup className="namenn">
                  <Label for="FullName">Full Name</Label>
                  <div className="naming">
                    <Input
                      type="text"
                      name="firstName"
                      // value={firstName}
                      // onChange={handleChange}
                      required
                      id="firstName"
                      innerRef={firstName}
                      placeholder="First Name"
                    />
                    <Input
                      type="text"
                      name="lastName"
                      id="lastName"
                      // value={lastName}
                      // onChange={handleChange}
                      required
                      innerRef={lastName}
                      placeholder="Last Name"
                    />
                  </div>
                </FormGroup>

                <FormGroup className="email">
                  <Label for="exampleEmail">Email</Label>
                  <Input
                    type="email"
                    name="email"
                    id="exampleEmail"
                    autoComplete="none"
                    innerRef={email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                    placeholder="Enter Email"
                    required
                  />
                  <br />
                  {formik.touched.email && formik.errors.email && (
                    <span>{formik.errors.email}</span>
                  )}
                </FormGroup>

                <FormGroup className="setIdentity">
                  <Label for="userName">UserName</Label>
                  <Input
                    type="text"
                    name="setuserName"
                    autoComplete="none"
                    id="setuserName"
                    required
                    innerRef={userName}
                    placeholder="Set userName"
                  />
                  {/* </FormGroup> */}
                  {/* <FormGroup> */}
                  <Label for="Password">Password</Label>
                  <Input
                    type="text"
                    name="setPassword"
                    id="setPassword"
                    // value={password}
                    // onChange={handleChange}
                    required
                    innerRef={password}
                    autoComplete="none"
                    placeholder="Set Password"
                  />
                </FormGroup>
                <FormGroup className="address">
                  <Label for="setAddress">Address</Label>
                  <Input
                    type="text"
                    name="Address"
                    id="Address"
                    innerRef={address}
                    placeholder="Enter Address"
                    required
                  />
                </FormGroup>

                <FormGroup className="contact">
                  <Label for="Contact">Contact no.</Label>
                  <Input
                    pattern="[9][0-9]{9}"
                    maxlength="10"
                    required
                    type="tel"
                    autoComplete="none"
                    name="Contact"
                    id="ContactInfo"
                    innerRef={contact}
                    placeholder="Enter Mobile Number"
                  />
                </FormGroup>

                <FormGroup className="streamSem">
                  <div>
                    <Label for="exampleSelect">Select Stream</Label>
                    <Input
                      type="select"
                      name="selectStream"
                    // id="selectStream"
                    // innerRef={faculty}
                    >
                      <option disabled selected value="">Choose Stream</option>
                      <option id="1" ref={faculty}>
                        BCT - Bachelors in Computer Engineering
                      </option>
                      {/* <option id="2" ref={faculty}>
                        BCE - Bachelors in Civil Engineering
                      </option> */}
                    </Input>
                  </div>
                  <div>
                    <Label for="Semester">Semester</Label>
                    <Input
                      type="select"
                      name="setSemester"
                      id="setSemester"
                      innerRef={semester}
                    ><option disabled selected value="">Select Semester</option>
                      <option id="1">1</option>
                      <option id="2">2</option>
                      <option id="3">3</option>
                      <option id="4">4</option>
                      <option id="5">5</option>
                      <option id="6">6</option>
                      <option id="7">7</option>
                      <option id="8">8</option>
                      <option id="9">9</option>
                    </Input>
                  </div>
                </FormGroup>

                <FormGroup>
                  {/* <Input type="text" name="setSemester" id="setSemester" innerRef={semester} placeholder="Set Semester" /> */}
                </FormGroup>

                <FormGroup>
                  <Label for="Batch">Batch</Label>
                  <Input
                    type="text"
                    name="setBatch"
                    id="setBatch"
                    innerRef={batch}
                    placeholder="Set Batch"
                    required

                  />
                </FormGroup>

                <FormGroup >
                  <Label for="exampleFile">Photo</Label>
                  <div className="imageSectionForForm">
                    <div>
                      <Input
                        type="file"
                        name="file"
                        id="contractFile"
                        label="Image"
                        accept=".jpeg, .png, .jpg"
                        onChange={(e) => onFileSelected(e)}
                        onInput={handleImageChange}
                      />
                    </div>
                    <div>
                      <img ref={imageRef} alt="Identity" />
                    </div>
                  </div>
                </FormGroup>
              </div>
              <div className="sub-btn">
                <Button
                  variant="primary"
                  // onClick={postData}
                  type="submit"
                  disabled={!firstName || !lastName || !email}
                  onClick={() => {
                    // setPostResult("Loading");
                    // postData();
                    // toggle();
                    handleSubmit();
                  }}
                >
                  Register Student
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div >
      <div id="popup">
        <div id="test1" onClick={toggle} className="close">
          +
        </div>
        {postResult && (
          <div role="alert">
            <pre>{postResult}</pre>
          </div>
        )}

        <button id="test1" onClick={toggle}>
          Close
        </button>
      </div>
    </>
  );
}
export default RegisterStudent;
