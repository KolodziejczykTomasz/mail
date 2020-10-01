import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.css';

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

class Form extends Component {
  state = {
    name: '',
    sendto: 'kolodziejczyk.tomasz44@gmail.com',
    message: '',
    email: '',
    phone: '',
    subject: '',
    emailStatus: '',
    isEmty: true,
    redirect: false,
    errors: [],
    fields: {},
  };

  handleChange = (input) => (e) => {
    const { name, message, email, subject, phone } = this.state;
    this.setState({
      [input]: e.target.value,
    });
    if (name && email && subject && phone && message !== '') {
      this.setState({
        isEmty: false,
      });
    }
  };

  submitForm = (e) => {
    const { name, sendto, message, email, subject, phone } = this.state;

    if (this.handleValidation()) {
      alert('Form submitted');
    } else {
      alert('Form has errors.');
    }

    var xhr = new XMLHttpRequest();

    xhr.addEventListener('load', () => {
      this.setState({
        emailStatus: xhr.responseText,
      });
    });

    xhr.open(
      'GET',
      'http://test.zielarskawiesblanki.pl/sendmail/index.php?sendto=' +
        sendto +
        '&name=' +
        name +
        '&message=' +
        message +
        '&email=' +
        email +
        '&subject=' +
        subject +
        '&phone=' +
        phone,
    );

    xhr.send();
    e.preventDefault();

    this.setState({
      name: '',
      email: '',
      message: '',
      subject: '',
      phone: '',
    });
    e.preventDefault();
  };

  handleValidation = () => {
    const { name, email } = this.state;
    let errors = {};
    let formIsValid = true;

    if (!name) {
      formIsValid = false;
      errors.name = 'Cannot be empty';
    }

    if (typeof name !== 'undefined') {
      if (!name.match(/^[a-zA-Z]+$/)) {
        formIsValid = false;
        errors.name = 'Only letters';
      }
    }

    if (!email) {
      formIsValid = false;
      errors.email = 'Cannot be empty';
    }

    if (typeof email !== 'undefined') {
      let lastAtPos = email.lastIndexOf('@');
      let lastDotPos = email.lastIndexOf('.');

      if (
        !(
          lastAtPos < lastDotPos &&
          lastAtPos > 0 &&
          email.indexOf('@@') === -1 &&
          lastDotPos > 2 &&
          email.length - lastDotPos > 2
        )
      ) {
        formIsValid = false;
        errors.email = 'Email is not valid';
      }
    }

    this.setState({ errors: errors });
    return formIsValid;
  };

  handleClickOnModal = () => this.setState({ redirect: true });

  render() {
    const { redirect, name, message, email, subject, phone, isEmty } = this.state;

    if (redirect) {
      return <Redirect to="http://test.zielarskawiesblanki.pl" />;
    }
    return (
      <Wrapper>
        <FormStyled onSubmit={this.submitForm}>
          <label for="name">Name</label>
          <Input
            type="text"
            value={name}
            placeholder="Pole obowiązkowe"
            onChange={this.handleChange('name')}     
            required
          />
          <span className="error">{this.state.errors.name}</span>
          <label for="email">
            Email
            <Input
              type="email"
              value={email}
              placeholder="Pole obowiązkowe"
              onChange={this.handleChange('email')}  
              refs="email"
              required
            />
          </label>
          <span className="error">{this.state.errors.email}</span>
          <br />
          <label for="phone">
            Phone
            <Input
              type="text"
              value={phone}
              placeholder="Pole obowiązkowe"
              onChange={this.handleChange('phone')}      
              required
            />
          </label>

          <label for="subject">
            Subject
            <Input
              type="text"
              value={subject}
              placeholder="Pole obowiązkowe"
              onChange={this.handleChange('subject')}    
              required
            />
          </label>

          <label for="message">
            Message
            <Textarea
              value={message}
              placeholder="Pole obowiązkowe"
              onChange={this.handleChange('message')}       
              required
            ></Textarea>
          </label>

          {!isEmty ? (
            <Button type="sumit" variant="primary" size="block">
              Wyślij
            </Button>
          ) : (
            <Button variant="secondary" size="block" disabled>
              Wyślij
            </Button>
          )}
        </FormStyled>
      </Wrapper>
    );
  }
}
export default Form;
