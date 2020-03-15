import React, { Component } from "react";

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
      <>
        {emailStatus ? emailStatus : null}
        <form onSubmit={this.submitForm}>
          <label>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={this.handleChange("name")}
            />
          </label>
          <label>
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={this.handleChange("email")}
            />
          </label>
          <label>
            <textarea
              placeholder="Message"
              value={message}
              onChange={this.handleChange("message")}
            ></textarea>
          </label>
          <label>
            <button type="sumit" className="submitBtn" value="Submit">
              Wyślij
            </button>
          </label>
        </form>
      </>
    );
  }
}

export default Form;
