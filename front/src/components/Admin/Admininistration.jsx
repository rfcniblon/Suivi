import React from "react";

const SERVER_ADDRESS = process.env.REACT_APP_SERVER_ADDRESS;

class Administration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          userData:[],
          filterData:[],
            selectedsuiData: "",
        validationError: "",
          
        };
    
    }

    componentDidMount = () => {
      fetch(SERVER_ADDRESS + "/api/users/selection/1")
      .then((res) => res.json())
      .then((res) => this.setState({ userData: res }));   
    };
  



    handleChangeSelect = (e) => {
    this.setState({
      variete: e.target.value,
      validationError: e.target.value === "" ? "select variete" : "",
    });
    fetch(SERVER_ADDRESS + "/api/users/selection/" + e.target.value)
      .then((res) => res.json())
      .then((res) => this.setState({ userData: res }));
  };



  // Si on connais le nombre de colonne
  renderTableUsers() {
    return this.state.userData.map((users, index) => {
       const { id, name, acces } = users //destructuring
       return (
          <tr key={id}>
             <td>{id}</td>
             <td>{name}</td>
             <td>{acces}</td>
             <td><a href="/" title="put_client" className="a1"><i className="fas fa-user-edit fontad" title="logo_admin_put"></i>Modification</a><a href="/" title="delete_client"className="a1"><i className="fas fa-user-minus fontad" title="logo_admin_delete"></i>Suppression</a></td>
          </tr>
       )
    })
  }

    render() {
        return (
            <div className="container-fluid">
            {/* <Navbar/> */}
              <div className="column  col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                <h1 id='title' className="txtcenter espacement">Liste de tout les utilisateurs</h1>
                <div className="offset-2 col-8 col-sm-8 col-md-8 col-lg-8 col-xl-8">
              <div className="row col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
               <p className="ptext decal">Séléctionner une quantité à afficher</p>
              
             
                <select name="filter" id="filter"
                className="form-control col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3 selc" 
                value={this.state.filter ||''} 
                onChange={this.handleChangeSelect}
                >
                <option value="">Selectionner</option>
                  <option value="25">25</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                </select>

              </div>
                <div className="composant_table ici">
                <table id='students'>
            <tbody>
              <tr className="table1">
              <td>Id</td>
             <td>Nom</td>
             <td>Accés</td>   
             <td>Modification</td>
             {/* <td> <a href="/"><i class="fas fa-user-edit"></i></a><a href="/"><i class="fas fa-user-minus"></i></a> </td>  */}
             
                 </tr>
                 {this.renderTableUsers()}
              </tbody>
           </table>
                </div>
                
            </div>
            </div>
            </div>
        )
    }

    }
    export default Administration;