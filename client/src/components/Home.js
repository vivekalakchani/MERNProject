import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { NavLink } from "react-router-dom";
import axios from "axios";

export default function Home() {
  const [data, setData] = useState([]);

  const getUserData = async () => {
    const res = await axios.get("/getdata", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.data.status === 401 || !res.data) {
      console.log("error")
  } else {
      setData(res.data.getUser)
  }
  };

  useEffect(() => {
    getUserData()
  },[]);

  return (
    <div className="container mt-2">
      <h2 className="text-center mt-2">Client  list</h2>
      <div className="text-end">
        <Button variant="dark">
          <NavLink to="/register" className="text-decoration-none text-light ">
            Add Client
          </NavLink>
        </Button>
      </div>
      <div className="row d-flex  align-iteams-center mt-5">

      {data.length > 0
        ? data.map((el, i) => {
            return (
              <>
                <Card
                  style={{ width: "15rem", height: "15rem" }}
                  className="mb-3 me-3" 
                >
                  <Card.Img
                    variant="top"
                    style={{
                      width: "100px",
                      textAlign: "center",
                      margin: "auto",
                    }}
                    src={`/uploads/${el.imgpath}`}
                    className="mt-2"
                  />
                  <Card.Body className="text-center">
                    <Card.Title>{el.fname}</Card.Title>
                    <Card.Text>Amount: $ {el.amount}.00</Card.Text>
      
                  </Card.Body>
                </Card>
              </>
            );
          })
        : ""}
    </div>
    </div>
  );
}
