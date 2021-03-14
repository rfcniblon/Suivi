import React, { Component } from "react";

const SERVER_ADDRESS = process.env.REACT_APP_SERVER_ADDRESS;
class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      validationError: "",
      variete: "",
      varieteData: [],
      graphData: [],
      chambreData: [],
      countData: [],
      // configurationData:[],
      countData2: [],
      temperatureData: [],
      card_img: [],
      moyenneData: [],
      numero: "",
      id_plante: "",
      compteur: "",
      dateData: [],
    };
    // this.handleChangeSelectVar = this.handleChangeSelectVar.bind(this);
    // this.handleChangeSelectNum = this.handleChangeSelectNum.bind(this);
  }

  // componentDidMount = () => {
  //   fetch(SERVER_ADDRESS + "/api/configuration/1")
  //     .then((res) => res.json())
  //     .then((res) =>
  //       this.setState({ configurationData: res }, () =>
  //         this.setState({ load: true })
  //       )
  //     );
  //   // const user = sessionStorage.getItem("idcheck");
  //   const token = "Bearer " + localStorage.getItem("token");
  //   fetch(SERVER_ADDRESS + "/api/suivi/user/1/graph/1/numero/1", {
  //     method: "GET",
  //     headers: {
  //       Authorization: token,
  //     },
  //   })
  //     .then((res) => {
  //       if (res.ok) {
  //         return res.json();
  //       }
  //     })
  //     .then((data) => {
  //       this.setState({ graphData: data });
  //     });
  //   const check = {
  //     id: sessionStorage.getItem("idcheck"),
  //   };
  //   fetch(
  //     SERVER_ADDRESS + "/api/chambreculture/user/" + check.id + "/selection/100"
  //   )
  //     // fetch(SERVER_ADDRESS + "/api/chambre/user/" + users.users + "/selection/5")
  //     .then((res) => res.json())
  //     .then((res) => this.setState({ chambreData: res }));
  // };

  // // Si on connais le nombre de colonne
  // renderTableChambreCulture() {
  //   return this.state.chambreData.map((chambreculture, index) => {
  //     const {
  //       id_chambre,
  //       variete,
  //       fonction,
  //       longueur,
  //       largeur,
  //       hauteur,
  //       surface,
  //       volume,
  //     } = chambreculture; //destructuring
  //     return (
  //       <tr key={id_chambre}>
  //         <td>{id_chambre}</td>
  //         <td>{fonction}</td>
  //         <td>{variete}</td>
  //         <td>{longueur}</td>
  //         <td>{largeur}</td>
  //         <td>{hauteur}</td>
  //         <td>{volume}</td>
  //         <td>{surface}</td>
  //       </tr>
  //     );
  //   });
  // }

  render() {
    // const { graphData } = this.state;
    // const acces = {
    //   acces: sessionStorage.getItem("acces"),
    // };
    return (
     <div>
       <h1>page admin</h1>
     </div>
      
    );
  }
}

export default Admin;
