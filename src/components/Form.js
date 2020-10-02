import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.css';
import './Form.css';

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
      <div id="wrapper">
        <div id="formStyled">
          <form onSubmit={this.submitForm}>
            <label id="labelForm" for="name">
              Name
            </label>
            <input
              id="input"
              type="text"
              value={name}
              placeholder="Pole obowiązkowe"
              onChange={this.handleChange('name')}
              refs="name"
              required
            />

            <span className="error">{this.state.errors.name}</span>
            <label id="labelForm" for="email">
              Email
            </label>
            <input
              id="input"
              type="email"
              value={email}
              placeholder="Pole obowiązkowe"
              onChange={this.handleChange('email')}
              refs="email"
              required
            />

            <span className="error">{this.state.errors.email}</span>
            <br />
            <label id="labelForm" for="phone">
              Phone
            </label>
            <input
              id="input"
              type="text"
              value={phone}
              placeholder="Pole obowiązkowe"
              onChange={this.handleChange('phone')}
              refs="phone"
              required
            />

            <label id="labelForm" for="subject">
              Subject
            </label>
            <input
              id="input"
              type="text"
              value={subject}
              placeholder="Pole obowiązkowe"
              onChange={this.handleChange('subject')}
              refs="subject"
              required
            />

            <label id="labelForm" for="message">
              Message
            </label>
            <textarea
              id="textarea"
              value={message}
              placeholder="Pole obowiązkowe"
              onChange={this.handleChange('message')}
              refs="message"
              required
            ></textarea>

            {!isEmty ? (
              <Button type="sumit" variant="primary" size="block" id="button">
                Send
              </Button>
            ) : (
              <Button variant="secondary" size="block" disabled id="button">
                Send
              </Button>
            )}
          </form>
        </div>
      </div>
    );
  }
}
export default Form;
