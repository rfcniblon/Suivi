import React from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
const SERVER_ADDRESS = process.env.REACT_APP_SERVER_ADDRESS;

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
  }

  handleChange = (event) => {
    switch (event.target.name) {
      case "username":
        this.setState({ username: event.target.value });
        break;
      case "password":
        this.setState({ password: event.target.value });
        break;
      default:
        break;
    }
  };

  handleFormSubmit = () => {
    const { username, password } = this.state;

    fetch(SERVER_ADDRESS + "/api/login", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
      body: JSON.stringify({ name: username, password: password }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.text().then((text) => {
            throw new Error(text);
          });
        }
      })
      .then((data) => {
        const client = "client";
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", username);
        this.props.updateFunction();
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  render() {
    const { username, password } = this.state;
    return (
      <div className="">
        <Navbar />
        <section className="container-fluid">
          <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
            <form>
              <h1 className="pt-5 txtcenter decoration">Accés privatif</h1>

              <div className="pt-2 offset-4 column col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                <div className="">
                  <label className="">Username: </label>
                  <input
                    className="form-control col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12"
                    name="username"
                    value={username}
                    onChange={this.handleChange}
                  />
                </div>
                <div className="">
                  <label className="">Password: </label>
                  <input
                    className="form-control col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12"
                    type="password"
                    name="password"
                    value={password}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 txtcenter">
                <button
                  className="bt"
                  type="button"
                  onClick={this.handleFormSubmit}
                >
                  Se connecter
                </button>
              </div>
            </form>
          </div>
        </section>

        <div className="footerbottom">
          <Footer />
        </div>
      </div>
    );
  }
}

export default Login;
