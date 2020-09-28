import React, { Component } from 'react';
import styled from 'styled-components';

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
    sendto: 'kolodziejczyk.tomasz44@gmail.com',
    message: '',
    email: '',
    phone: '',
    subject: '',
    emailStatus: '',
  };

  handleChange = (input) => (e) => {
    this.setState({
      [input]: e.target.value,
    });
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

  render() {
    const { name, message, email, subject, phone, emailStatus } = this.state;
    return (
      <Wrapper>
        <FormStyled onSubmit={this.submitForm}>
          {emailStatus ? emailStatus : null}
          <label>
            <Input
              type="text"
              value={name}
              placeholder="Name*"
              onChange={this.handleChange('name')}
            />
          </label>
          <label>
            <Input
              type="text"
              value={email}
              placeholder="Email*"
              onChange={this.handleChange('email')}
            />
          </label>
          <label>
            <Input
              type="text"
              value={phone}
              placeholder="Phone*"
              onChange={this.handleChange('phone')}
            />
          </label>
          <label>
            <Input
              type="text"
              value={subject}
              placeholder="Subject*"
              onChange={this.handleChange('subject')}
            />
          </label>

          <label>
            <Textarea
              value={message}
              placeholder="Message*"
              onChange={this.handleChange('message')}
            ></Textarea>
          </label>
          <Button type="sumit" className="submitBtn" value="Submit">
            Wyślij
          </Button>
        </FormStyled>
      </Wrapper>
    );
  }
}
export default Form;
