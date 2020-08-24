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
`;

const Textarea = styled.textarea`
  display: block;
  margin: 0 auto;
  width: 300px;
  height: auto;
  min-height: 80px;
  margin-bottom: 10px;
  padding: 7px 7px;  
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
    name: '',
    phone: '',
    subject: '',
    email: '',
    message: '',
    emailStatus: ''
  };

  handleChange = input => e => {
    this.setState({
      [input]: e.target.value
    });
  };

  submitForm = e => {
    const { name, phone, subject, email, message } = this.state;
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
      `http://localhost:3000/sendemail/index.php?sendto=${email}&name=${name}&phone=${phone}&subject=${subject}&message=${message}`
    );

    xhr.send();

    this.setState({
      name: '',
      phone: '',
      subject: '',
      email: '',
      message: ''
    });
    e.preventDefault();
  };
  render() {
    const { name, phone, subject, email, message, emailStatus } = this.state;
    return (
      <Wrapper>
        {emailStatus ? emailStatus : null}
        <FormStyled onSubmit={this.submitForm}>
        <label for="name">Imię</label>
          <Input
          id='name'
            type="text"
            placeholder="Imię"
            value={name}
            onChange={this.handleChange("name")}
          />
          <label for="subject">Temat</label>
          <Input
          id='subject'
            type="subject"
            placeholder="Temat"
            value={subject}
            onChange={this.handleChange("subject")}
          />
          <label for="phone">Telefon</label>
          <Input
          id='phone'
            type="phone"
            placeholder="Telefon"
            value={phone}
            onChange={this.handleChange("phone")}
          />
          <label for="email">E-mail</label>
          <Input
          id='email'
            type="text"
            placeholder="E-mail"
            value={email}
            onChange={this.handleChange("email")}
          />
          <label for="message">Treść wiadomości</label>
          <Textarea
          id='message'
            placeholder="Treść wiadomości"
            value={message}
            onChange={this.handleChange("message")}
          ></Textarea>
          <Button type="sumit" className="submitBtn" value="Submit">
            Wyślij
          </Button>
        </FormStyled>
      </Wrapper>
    );
  }
}

export default Form;