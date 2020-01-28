import React, { Component } from "react";
import { Form, FormGroup, Input, Label, Button } from "reactstrap";
import axios from "axios";

class FormContact extends Component {
  state = {
    name: "",
    email: "",
    subject: "",
    message: ""
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  async handleSubmit (e) {
    e.preventDefault()
    const { name, email, subject, message } = this.state;

    const form = await axios.post('/api/form', {
      name,
      email,
      subject,
      message
    })
  };


  render() {
    return (
      <Form onSubmit={this.handleSubmit} style={{ width: 600, margin: "0 auto", paddingTop: 150 }}>
        <FormGroup>
          <Label for="name">Imię:</Label>
          <Input type="text" name="name" onChange={this.handleChange} />
        </FormGroup>
        <FormGroup>
          <Label for="email">Email:</Label>
          <Input type="email" name="email" onChange={this.handleChange} />
        </FormGroup>
        <FormGroup>
          <Label for="subject">Temat:</Label>
          <Input type="text" name="subject" onChange={this.handleChange} />
        </FormGroup>
        <FormGroup>
          <Label for="message">Treść wiadomości:</Label>
          <Input type="textarea" name="message" onChange={this.handleChange} />
        </FormGroup>
        <Button>Wyślij</Button>
      </Form>
    );
  }
}

export default FormContact;
