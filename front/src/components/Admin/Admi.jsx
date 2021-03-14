import React from 'react';
import { Redirect } from 'react-router-dom';


//import AdminUser from '../Admin/Users/AdminUser';

const SERVER_ADDRESS = process.env.REACT_APP_SERVER_ADDRESS;

class Admi extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogged: true,
      redirect: false,
      accesData:[],
      showNewsletter:false,
      showTableau:false,
      showConfiguration:false,
      showAdministration:false,
      showAdministrationFull:false,
      showAdministrationPut:false,
      showChambre:false,
      showChambreFull:false,
      showChambrePost:false,    
      showChambrePut:false,
      showChambreDel:false,
      showPlante:false,
      showPlanteFull:false,
      showPlantePost:false,
      showPlanteAdd:false,
      showPlanteDel:false,
      showSuivi:false,
      showSuiviFull:false,
      showSuiviPost:false,
      showSuiviDel:false,
      showSuiviPut:false,
      showSuiviGraph:false,
      showAutomatisationFull:false,
      showAutomatisation:false,
      showAutomatisationAdd:false,
      redirectLogOut: false,
      limit: false
    }
    this.suivigraphClick = this.suivigraphClick.bind(this);
    this.tableauClick = this.tableauClick.bind(this);
    this.configurationClick = this.configurationClick.bind(this);
    this.administrationClick = this.administrationClick.bind(this);
    this.administrationfullClick = this.administrationfullClick.bind(this);
    this.administrationputClick = this.administrationputClick.bind(this);
    this.chambreClick = this.chambreClick.bind(this);
    this.chambrefullClick = this.chambrefullClick.bind(this);
    this.chambrepostClick = this.chambrepostClick.bind(this);
    this.chambreputClick = this.chambreputClick.bind(this);
    this.chambredelClick = this.chambredelClick.bind(this);
    this.planteClick = this.planteClick.bind(this);
    this.plantefullClick = this.plantefullClick.bind(this);
    this.planteputClick = this.planteputClick.bind(this);
    this.planteaddClick = this.planteaddClick.bind(this);
    this.plantedelClick = this.plantedelClick.bind(this);
    this.suiviClick = this.suiviClick.bind(this);
    this.suivifullClick = this.suivifullClick.bind(this);
    this.suivipostClick = this.suivipostClick.bind(this);
    this.suividelClick = this.suividelClick.bind(this);
    this.suiviputClick = this.suiviputClick.bind(this);
    this.newsletterClick = this.newsletterClick.bind(this);
    this.automatisationClick = this.automatisationClick.bind(this);
    // this.automatisationfullClick = this.automatisationfullClick.bind(this);
    // this.automatisationaddClick = this.automatisationaddClick.bind(this);
  }

  componentDidMount() {
    const  users = localStorage.getItem('user')
   // console.log(users)
    fetch(SERVER_ADDRESS + '/api/users/acces?name='+users)
    .then((res) => res.json())
    .then((res) => this.setState({ accesData: res })); 
  }

  logOut = () => {
    this.setState({ redirectLogOut: true })
  }

// graphiqueClick =(event)=>{
//     this.setState({ showGraphique: true, 
//                     showChambre: false,
//                     showPlante: false,
//                     showSuivi: false,
//                     showNewsletter: false, 
//                     showTableau: false,
//                     showAutomatisation: false,
//                     showAdministration: false,
//                     showConfiguration: false });
// }
tableauClick =(event)=>{
  this.setState({ showGraphique: false,
    showChambre: false,
    showPlante: false,
    showSuivi: false,
    showNewsletter: false, 
    showAutomatisation: false,
                  showConfiguration: false,
                  showAdministration: false,
                  showTableau: true });
}
configurationClick =(event)=>{
  this.setState({ showGraphique: false ,
    showChambre: false,
    showPlante: false,
    showSuivi: false,
    showNewsletter: false, 
    showAutomatisation: false,
                  showTableau: false ,
                  showAdministration: false,
                  showConfiguration: true });
}
administrationClick =(event)=>{
  this.setState({ showGraphique: false ,
    showChambre: false,
    showPlante: false,
    showSuivi: false,
    showAutomatisation: false,
    showNewsletter: false, 
                  showTableau: false ,
                  showConfiguration: false,
                showAdministration: true });
}
administrationfullClick =(event)=>{
  this.setState({ showAdministrationFull: true,
    showAdministrationPut: false ,
    });
}
administrationputClick =(event)=>{
  this.setState({ showAdministrationFull: false ,
    showAdministrationPut: true ,
    showAutomatisation: false,
    });
}
chambreClick =(event)=>{
  this.setState({ showGraphique: false, 
    showChambre: true,
    showPlante: false,
    showSuivi: false,
    showNewsletter: false, 
    showAutomatisation: false,
                  showTableau: false,
                  showAdministration: false,
                  showConfiguration: false });
}
chambrefullClick =(event)=>{
  this.setState({  
    showChambreFull: true,
    showAutomatisation: false,
    showChambrePost: false
     });
}
chambrepostClick =(event)=>{
  this.setState({  
    showChambreFull: false,
    showChambrePost: true,
    showChambreDel:false,
    showChambrePut:false,
    showAutomatisation: false
     });
}
chambreputClick =(event)=>{
      this.setState({  
        showChambreFull: false,
        showChambrePost: false,
        showChambreDel:false,
        showChambrePut: true
         });
}
chambredelClick =(event)=>{
       this.setState({  
       showChambreFull: false,
      showChambrePost: false,
      showChambrePut: false,
       showChambreDel:true
});
}     
planteClick =(event)=>{
  this.setState({ showGraphique: false, 
    showChambre: false,
    showPlante: true,
    showSuivi: false,
    showPlantePut: false ,
    showPlanteFull: false ,
    showPlanteDel: false,
    showNewsletter: false, 
    showAutomatisation: false,
                  showTableau: false,
                  showAdministration: false,
                  showConfiguration: false });
}
plantefullClick =(event)=>{
  this.setState({ showPlanteFull: true,
    showPlantePut: false ,
    showPlanteAdd: false,
    showPlanteDel: false,
    showNewsletter: false, 
    showAutomatisation: false,
    });
}
planteputClick =(event)=>{
  this.setState({ showPlanteFull: false ,
    showPlantePut: true ,
    showPlanteAdd: false ,
    showPlanteDel: false ,
    showNewsletter: false, 
    showAutomatisation: false,
    });
}
  planteaddClick =(event)=>{
    this.setState({ showPlanteFull: false ,
      showPlantePut: false ,
      showPlanteAdd: true ,
      showPlanteDel: false, 
      showNewsletter: false, 
      showAutomatisation: false,
      });
}
plantedelClick =(event)=>{
      this.setState({ showPlanteFull: false ,
        showPlantePut: false ,
        showPlanteAdd: false ,
        showPlanteDel: true, 
      //  showAutomatisation: false,
        });
}
suiviClick =(event)=>{
    this.setState({ showGraphique: false, 
      showChambre: false,
      showPlante: false,
      showSuivi: true,
      showPlantePut: false ,
      showPlanteFull: false ,
      showNewsletter: false, 
      showAutomatisation: false,
                    showTableau: false,
                    showAdministration: false,
                    showConfiguration: false });
  }
  suivifullClick =(event)=>{
    this.setState({ showSuiviFull: true,
      showSuiviDel: false,
      showSuiviGraphique:false,
      showSuiviPut: false,
      showSuiviPost: false 
      });
  }
  suivigraphClick =(event)=>{
    this.setState({ showSuiviFull: false,
      showSuiviDel: false,
      showSuiviPut: false,
      showSuiviGraphique:true,
      showSuiviPost: false 
      });
  }
  suividelClick =(event)=>{
    this.setState({ showSuiviFull: false ,
      showSuiviDel: true,
      showSuiviPut: false,
      showSuiviGraphique:false,
      showSuiviPost: false
      });
    }
    suivipostClick =(event)=>{
      this.setState({ showSuiviFull: false ,
        showSuiviPost: true,
        showSuiviPut: false,
        showSuiviGraphique:false,
        showSuiviDel: false
        });
      }
      suiviputClick =(event)=>{
        this.setState({ showSuiviFull: false ,
          showSuiviPost: false,
          showSuiviPut: true,
          showSuiviGraphique:false,
          showSuiviDel: false
          });
        }   
newsletterClick =(event)=>{
  this.setState({ showGraphique: false, 
    showNewsletter: true, 
    showChambre: false,
    showPlante: false,
    showSuivi: false,
                  showTableau: false,
                  showAdministration: false,
                  showAutomatisation: false,
                  showConfiguration: false });
}
automatisationClick =(event)=>{
  this.setState({ showGraphique: false, 
    showNewsletter: false, 
    showChambre: false,
    showPlante: false,
    showSuivi: false,
                  showTableau: false,
                  showAdministration: false,
                  showConfiguration: false,
                showAutomatisation: true });
}


  render() {

        return (
      <div className="rela">
        {this.state.redirect && <Redirect to="/login" />}
        {!this.state.redi &&
          <div className="rela">
          <h1>Page admin a faire</h1>
                </div>
         
        }
      
      </div>
    );
  }
}

export default Admi;