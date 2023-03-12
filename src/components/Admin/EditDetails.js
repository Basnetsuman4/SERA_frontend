import { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useToken } from "../../apis";
import { Button, Form, FormGroup, Label, Input, CardHeader } from "reactstrap";
import { useFormik } from "formik";

function EditDetails() {
  const { tokenInstance } = useToken();
  const location = useLocation();
  const detail = location.state;
  const navigate = useNavigate();

  console.log("edit", detail);
  const toggle = () => {
    var blur = document.getElementById("blur");
    blur.classList.toggle("active");
    var popup = document.getElementById("popup");
    popup.classList.toggle("active");
  };

  const firstName = useRef(null);
  const lastName = useRef(null);
  const address = useRef(null);
  const contact = useRef(null);
  const [role, setRole] = useState();
  const email = useRef(null);
  const faculty = useRef(null);
  const batch = useRef(null);
  const semester = useRef(null);
  const [postResult, setPostResult] = useState(null);

  function handleSubmit() {
    const putData = {
      firstName: firstName.current.value,
      lastName: lastName.current.value,
      address: address.current.value,
      contact_no: contact.current.value,
      role: role,
      email: email.current.value,
      faculty: 1,
      batch: batch.current.value,
      semester: semester.current.value,
    };

    tokenInstance
      .put(`/user/update/${detail.userName}`, putData)
      .then((res) => {
        // console.log(res);
        setPostResult(res.data.message);
      })
      .catch((err) => {
        console.log(err);
        setPostResult(err.response.data.message);
      });
  }
  const validate = (values) => {
    const errors = {};

    if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = "Valid Email";
    } else if (!values.email) {
      errors.email = "Email Required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Invalid email address";
    }

    return errors;
  };
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validate,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <>
      <div className="contain" id="blur">
        <div className="content">
          <div className="RegHeader">
            <h1>Registration</h1>
          </div>
          <div className="RegBody">
            <Form className="RegFormInfo">
              <div className="inputSection">
                <FormGroup className="name">
                  <Label for="FullName">Full Name</Label>
                  <div className="naming">
                    <Input
                      type="text"
                      name="firstName"
                      id="firstName"
                      innerRef={firstName}
                      placeholder="First Name"
                      defaultValue={detail.firstName}
                    />
                    <Input
                      type="text"
                      name="lastName"
                      id="lastName"
                      innerRef={lastName}
                      placeholder="Last Name"
                      defaultValue={detail.lastName}
                    />
                  </div>
                </FormGroup>

                <FormGroup className="email">
                  <Label for="exampleEmail">Email</Label>
                  <Input
                    type="email"
                    name="email"
                    id="exampleEmail"
                    innerRef={email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    // value={formik.values.email}
                    placeholder="Enter Email"
                    defaultValue={detail.email}
                  />
                  <br />
                  {formik.touched.email && formik.errors.email && (
                    <span>{formik.errors.email}</span>
                  )}
                </FormGroup>

                <FormGroup className="address">
                  <Label for="setAddress">Address</Label>
                  <Input
                    type="text"
                    name="Address"
                    id="Address"
                    innerRef={address}
                    placeholder="Enter Address"
                    defaultValue={detail.address}
                  />
                </FormGroup>

                <FormGroup className="contact">
                  <Label for="Contact">Contact no.</Label>
                  <Input
                    type="tel"
                    name="Contact"
                    id="ContactInfo"
                    innerRef={contact}
                    placeholder="Enter Mobile Number"
                    defaultValue={detail.contact_no}
                  />
                </FormGroup>

                <FormGroup className="streamSem">
                  <div>
                    <Label for="exampleSelect">Select Stream</Label>
                    <Input
                      type="select"
                      name="selectStream"
                      defaultValue={detail.faculty}
                      // id="selectStream"
                      // innerRef={faculty}
                    >
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
                      defaultValue={detail.semester}
                    >
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
                  <Label for="Batch">Batch</Label>
                  <Input
                    type="text"
                    name="setBatch"
                    id="setBatch"
                    innerRef={batch}
                    placeholder="Set Batch"
                    defaultValue={detail.batch}
                  />
                </FormGroup>
              </div>
              <div className="sub-btn">
                <Button
                  variant="primary"
                  // onClick={postData}
                  onClick={() => {
                    handleSubmit();
                    toggle();
                  }}
                >
                  Save
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
      <div id="popup">
        <div id="test1" onClick={toggle} className="close">
          +
        </div>
        {postResult && (
          <div role="alert">
            <pre>{postResult}</pre>
          </div>
        )}

        <button
          id="test1"
          onClick={() => {
            toggle();
            navigate("/secure/search");
          }}
        >
          Close
        </button>
      </div>

      {/* -------------------------------- */}
      {/* <input type="text" ref={name} defaultValue={detail.firstName}></input>
          <button onClick={handleSubmit}>Save</button> */}
    </>
  );
}
export default EditDetails;
