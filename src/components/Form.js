import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import SweetAlert from 'react-bootstrap-sweetalert';
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

  handleClickOnModal = () => this.setState({ redirect: true });

  render() {
    const { name, message, email, subject, phone, emailStatus, isEmty } = this.state;
     const { redirect } = this.state;

     if (redirect) {
       return <Redirect to="http://test.zielarskawiesblanki.pl" />;
     }
    return (
      <Wrapper>
        <FormStyled onSubmit={this.submitForm}>
          {emailStatus ? (
            <SweetAlert title={emailStatus} onClick={this.handleClickOnModal}></SweetAlert>
          ) : null}
          <label for="name">Name</label>
          <Input
            type="text"
            value={name}
            placeholder="Pole obowiązkowe"
            onChange={this.handleChange('name')}
            minlength="3"
            maxlength="20"
            id="name"
          />

          <label for="email">Email</label>
          <Input
            type="email"
            value={email}
            placeholder="Pole obowiązkowe"
            onChange={this.handleChange('email')}
            maxLength="64"
            id="email"
          />

          <label for="phone">Phone</label>
          <Input
            type="text"
            value={phone}
            placeholder="Pole obowiązkowe"
            onChange={this.handleChange('phone')}
            maxlength="9"
            id="phone"
          />

          <label for="subject">Subject</label>
          <Input
            type="text"
            value={subject}
            placeholder="Pole obowiązkowe"
            onChange={this.handleChange('subject')}
            minlength="3"
            maxlength="20"
            id="subject"
          />

          <label for="message">Message</label>
          <Textarea
            value={message}
            placeholder="Pole obowiązkowe"
            onChange={this.handleChange('message')}
            minlength="3"
            maxlength="120"
            id="message"
          ></Textarea>

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
