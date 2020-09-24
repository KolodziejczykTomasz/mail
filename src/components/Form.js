import React, { Component } from 'react';

class Form extends Component {
  state = {
    name: '',
    email: 'mailfrompage@gmail.com',
    message: '',
    emailStatus: '',
  };

  handleChange = (input) => (e) => {
    this.setState({
      [input]: e.target.value,
    });
  };

  submitForm = (e) => {
    const { name, email, message } = this.state;
    console.log(this.state);
    var xhr = new XMLHttpRequest();

    xhr.addEventListener('load', () => {
      console.log(xhr.responseText);
    });

    xhr.open(
      'GET',
      'http://test.zielarskawiesblanki.pl/sendemail/index.php?sendto=' +
        email +
        '&name=' +
        name +
        '&message=' +
        message,
    );

    xhr.send();
    e.preventDefault();
  };

  render() {
    const { name, email, message } = this.state;
    return (
      <div>
        <form onSubmit={this.submitForm}>
          <label>
            <input
              type="text"
              value={name}
              placeholder="Name"
              onChange={this.handleChange('name')}
            />
          </label>
          <label>
            <input
              type="text"
              value={email}
              placeholder="Email"
              onChange={this.handleChange('email')}
            />
          </label>
          <label>
            <textarea
              value={message}
              placeholder="Message"
              onChange={this.handleChange('message')}
            ></textarea>
          </label>
          <label>
            <input type="submit" value="Submit" />
          </label>
        </form>
      </div>
    );
  }
}
export default Form;
