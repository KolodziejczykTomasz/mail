import React, { Component } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: block;
  width: 400px;
  top: 0;
  left: 0;
  margin-left: calc(50vw - 200px);
  margin-top: calc(50vh - 200px);
`;

const FormStyled = styled.form`
  padding: 50px 50px;
`;

const Input = styled.input`
  display: block;
  margin: 0 auto;
  width: 300px;
  height: 25px;
  margin-bottom: 10px;
  padding: 7px 7px;
  text-transform: uppercase;
`;

const Textarea = styled.textarea`
  display: block;
  margin: 0 auto;
  width: 300px;
  height: auto;
  min-height: 80px;
  margin-bottom: 10px;
  padding: 7px 7px;
  text-transform: uppercase;
  font-family: Arial, Helvetica, sans-serif;
`;

const Button = styled.button`
  display: block;
  width: 170px;
  padding: 10px 10px;
  margin: 50px auto;
  text-transform: uppercase;
  font-weight: 700;
  letter-spacing: 2px;
  background-color: white;
  box-sizing: content-box;
  cursor: pointer;
  &:hover {
    border-bottom: 4px solid black;
  }
`;

class Form extends Component {
  state = {
    name: "",
    email: "",
    message: "",
    emailStatus: ""
  };

  handleChange = input => e => {
    this.setState({
      [input]: e.target.value
    });
  };

  submitForm = e => {
    const { name, email, message } = this.state;
    console.log(this.state);
    e.preventDefault();

    var xhr = new XMLHttpRequest();

    xhr.addEventListener("load", () => {
      this.setState({
        emailStatus: xhr.responseText
      });
    });
    xhr.open(
      "GET",
      `http://test.zielarskawiesblanki.pl/sendemail/index.php?sendto=${email}&name=${name}&message=${message}`
    );

    xhr.send();

    this.setState({
      name: "",
      email: "",
      message: ""
    });
    e.preventDefault();
  };
  render() {
    const { name, email, message, emailStatus } = this.state;
    return (
      <Wrapper>
        {emailStatus ? emailStatus : null}
        <FormStyled onSubmit={this.submitForm}>
          <Input
            type="text"
            placeholder="Name"
            value={name}
            onChange={this.handleChange("name")}
          />
          <Input
            type="text"
            placeholder="Email"
            value={email}
            onChange={this.handleChange("email")}
          />
          <Textarea
            placeholder="Message"
            value={message}
            onChange={this.handleChange("message")}
          ></Textarea>
          <Button type="sumit" className="submitBtn" value="Submit">
            Submit
          </Button>
        </FormStyled>
      </Wrapper>
    );
  }
}

export default Form;