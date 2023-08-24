import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import InputGroup from "react-bootstrap/InputGroup";

export default function Register() {
  const [fname, setFName] = useState("");
  console.log(fname);

  const [amount, setAmount] = useState("");
  console.log(amount);

  const [file, setFile] = useState("");
  console.log(file);

  const history = useNavigate();

  const setdata = (e) => {
    const { value } = e.target;
    setFName(value);
  };

  const setnumber = (e) => {
    const { value } = e.target;
    setAmount(value);
  };

  const setimgfile = (e) => {
    setFile(e.target.files[0]);
  };

  // add user data

  const addUserData = async (e) => {
    e.preventDefault();

    var formData = new FormData();
    formData.append("photo", file);
    formData.append("fname", fname);
    formData.append("amount", amount);

    const config = {
      Headers: {
        "Content-type": "multipart/from-data",
      },
    };

    const res = await axios.post("/register", formData, config);

    if (res.data.status === 401 || !res.data) {
      console.log("error");
    } else {
      history("/");
    }
  };

  

  return (
    <div className="container mt-3">
      <h2>Enter Client Detils</h2>

      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
      
            type="text"
            name="fname"
            onChange={setdata}
            placeholder="saman perera"
            
          />

        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Amount </Form.Label>
          <InputGroup className="mb-3">
            <InputGroup.Text>$</InputGroup.Text>
            <Form.Control
             type="number"
              aria-label="Amount (to the nearest dollar)"
              onChange={setnumber}
              name="amount"
              placeholder="1000"
            />
            <InputGroup.Text>.00</InputGroup.Text>
            
          </InputGroup>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Select Your Image</Form.Label>
          <Form.Control
           
            type="File"
            onChange={setimgfile}
            name="photo"
            placeholder=""
          />
          
        </Form.Group>

        <Button variant="dark" type="submit" onClick={addUserData}>
          Submit
        </Button>
      </Form>
    </div>
  );
}
