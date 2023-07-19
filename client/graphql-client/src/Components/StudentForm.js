import { useState } from "react";
import "./StudentForm.css";
import { Autocomplete, Button, TextField } from "@mui/material";
import * as React from "react";
import dayjs from "dayjs";
//import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import cities from "../static-data/cities";
import { styled } from "styled-components";

const StyledErrorMessage = styled.span`
  background-color: #ffc4c4;
  color: #333;
  font-size: 13px;
  padding: 2px;
  padding-left: 8px;
  display: block;
  width: 100%;
  margin-top: 5px;
`;

const StudentForm = ({ studentData, modifiedStudentData }) => {
  const [studentDetails, setStudentDetails] = useState(studentData);
  const [nameIsValid, setNameIsValid] = useState(false);
  const [rollIsValid, setRollIsValid] = useState(false);
  const [dobIsValid, setDobIsValid] = useState(false);
  const [addressIsValid, setAddressIsValid] = useState(false);
  const [nameIsTouched, setNameIsTouched] = useState(false);
  const [rollIsTouched, setRollIsTouched] = useState(false);
  const [dobIsTouched, setDobIsTouched] = useState(false);
  const [addressIsTouched, setAddressIsTouched] = useState(false);
  const [dateValue, setDateValue] = useState(dayjs(studentData?.dateOfBirth));

  const onFormSubmit = (event) => {
    event.preventDefault();
    setRollIsTouched(true);
    setNameIsTouched(true);
    setAddressIsTouched(true);
    setDobIsTouched(true);
    const formIsValid = formValidation();
    if (formIsValid) {
      modifiedStudentData(studentDetails);
    } else {
      console.log("Invalid form");
      return;
    }
  };

  const formValidation = () => {
    if (studentDetails.rollNo > 0) {
      setRollIsValid(true);
    }
    if (studentDetails.name.trim().length > 3) {
      setNameIsValid(true);
    }
    if (studentDetails.address.trim().length > 2) {
      setAddressIsValid(true);
    }
    if (studentDetails.dateOfBirth.trim() !== "") {
      setDobIsValid(true);
    }
    if (rollIsValid && nameIsValid && dobIsValid && addressIsValid) {
      return true;
    } else {
      return false;
    }
  };

  const onBlurHandlers = (field) => {
    if (field === "roll") {
      setRollIsTouched(true);
      if (studentDetails.rollNo <= 0) {
        setRollIsValid(false);
      }
    } else if (field === "name") {
      setNameIsTouched(true);
      if (studentDetails.name.trim().length < 3) {
        setNameIsValid(false);
      }
    } else if (field === "address") {
      if (studentDetails.address.trim().length < 2) {
        setAddressIsValid(false);
      }
      setAddressIsTouched(true);
    } else if (field === "dob") {
      setDobIsTouched(true);
    }
  };

  const onChangeHandler = (value, field) => {
    if (field === "roll") {
      if (value > 0) {
        setRollIsValid(true);
      }
      setStudentDetails((previousStudentDetails) => ({
        ...previousStudentDetails,
        rollNo: Number(value),
      }));
    } else if (field === "name") {
      if (value.trim().length >= 3) {
        setNameIsValid(true);
      }
      setStudentDetails((previousStudentDetails) => ({
        ...previousStudentDetails,
        name: value,
      }));
    } else if (field === "dob") {
      const dateObj = new Date(value);
      const formattedDate = dateObj.toISOString().split("T")[0];
      console.log("date", formattedDate);
      setDateValue(dayjs(formattedDate));
      if (formattedDate.trim() !== "") {
        setDobIsValid(true);
      }
      setStudentDetails((previousStudentDetails) => ({
        ...previousStudentDetails,
        dateOfBirth: formattedDate,
      }));
    } else if (field === "address") {
      if (value.trim().length >= 2) {
        setAddressIsValid(true);
      }
      setStudentDetails((previousStudentDetails) => ({
        ...previousStudentDetails,
        address: value,
      }));
    } else if (field === "grade") {
      setStudentDetails((previousStudentDetails) => ({
        ...previousStudentDetails,
        grade: value,
      }));
    } else if (field === "gender") {
      setStudentDetails((previousStudentDetails) => ({
        ...previousStudentDetails,
        gender: value,
      }));
    } else {
      setStudentDetails((previousStudentDetails) => ({
        ...previousStudentDetails,
        course: value,
      }));
    }
  };

  return (
    <div className="container">
      <form onSubmit={onFormSubmit} noValidate>
        <div className="form-group">
          <label htmlFor="rollno">Roll Number</label>
          <input
            required
            type="number"
            className="form-control"
            data-testid="rollno"
            min={1}
            step={1}
            placeholder="Enter Roll No"
            onChange={(event) => {
              onChangeHandler(event.target.value, "roll");
            }}
            onBlur={() => {
              onBlurHandlers("roll");
            }}
            value={studentDetails?.rollNo}
          />
          {!rollIsValid && rollIsTouched && (
            <StyledErrorMessage>
              Roll Number cannot be zero(0)
            </StyledErrorMessage>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            required
            type="text"
            className="form-control"
            data-testid="name"
            placeholder="Enter Full Name"
            onChange={(event) => {
              onChangeHandler(event.target.value, "name");
            }}
            onBlur={() => {
              onBlurHandlers("name");
            }}
            value={studentDetails?.name}
          />
          {!nameIsValid && nameIsTouched && (
            <StyledErrorMessage>
              This Field is required and should have atleast 3 characters
            </StyledErrorMessage>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="dob">Date of Birth</label>
          <br />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              data-testid="dob"
              value={dateValue}
              onChange={(newValue) =>
                onChangeHandler(newValue?.toString(), "dob")
              }
              onBlur={() => {
                onBlurHandlers("dob");
              }}
            />
          </LocalizationProvider>
          {!dobIsValid && dobIsTouched && (
            <StyledErrorMessage>Date of Birth is required</StyledErrorMessage>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="gender">Gender</label> <br />
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="inlineRadioOptions"
              data-testid="male"
              value="Male"
              checked={studentDetails?.gender === "Male"}
              onChange={(event) => {
                onChangeHandler(event.target.value, "gender");
              }}
            />
            <label className="form-check-label" htmlFor="male">
              Male
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="inlineRadioOptions"
              id="female"
              value="Female"
              checked={studentDetails?.gender === "Female"}
              onChange={(event) => {
                onChangeHandler(event.target.value, "gender");
              }}
            />
            <label className="form-check-label" htmlFor="female">
              Female
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="inlineRadioOptions"
              id="other"
              value="Other"
              checked={studentDetails?.gender === "Other"}
              onChange={(event) => {
                onChangeHandler(event.target.value, "gender");
              }}
            />
            <label className="form-check-label" htmlFor="other">
              Other
            </label>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="city">City</label>
          <Autocomplete
            freeSolo
            disableClearable
            id="combo-box-demo"
            data-testid="city"
            options={cities.map((city) => city.name)}
            value={studentDetails?.address}
            onInputChange={(event, newInputValue) => {
              onChangeHandler(newInputValue, "address");
            }}
            onBlur={() => {
              onBlurHandlers("address");
            }}
            renderInput={(params) => <TextField {...params} required />}
          />
          {!addressIsValid && addressIsTouched && (
            <StyledErrorMessage>
              Address is required and it should have atleast 3 characters
            </StyledErrorMessage>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="course">Course</label>
          <select
            className="form-control"
            data-testid="course"
            value={studentDetails?.course}
            onChange={(event) => {
              onChangeHandler(event.target.value, "course");
            }}
          >
            <option>B. Tech</option>
            <option>BCA</option>
            <option>B. SC</option>
            <option>BBA</option>
            <option>M. Tech</option>
            <option>MCA</option>
            <option>M. SC</option>
            <option>MBA</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="grade">Grade</label>
          <select
            className="form-control"
            data-testid="grade"
            value={studentDetails?.grade}
            onChange={(event) => {
              onChangeHandler(event.target.value, "grade");
            }}
          >
            <option>A+</option>
            <option>A</option>
            <option>B</option>
            <option>C</option>
            <option>Fail</option>
          </select>
        </div>
        <Button
          type="submit"
          variant="contained"
          className="my-btn"
          data-testId="submit"
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default StudentForm;
