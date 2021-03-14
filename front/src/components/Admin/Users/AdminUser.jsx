// import React from 'react';
// import './AdminUser.css';
// import { Redirect } from 'react-router-dom';
// import {
//   Card,
//   CardHeader,
//   CardContent,
//   Button,
//   Divider,
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableRow,
//   Grid,
//   Paper,
//   Snackbar,
//   TextField,
//   Fab,
//   DialogTitle,
//   DialogContentText,
//   DialogContent,
//   DialogActions,
//   Dialog
// } from '@material-ui/core';
// import {
//   Add,
//   Edit,
//   Delete
// } from '@material-ui/icons';
// import PerfectScrollbar from 'react-perfect-scrollbar';
// import blue from '@material-ui/core/colors/blue';

// const SERVER_ADDRESS = process.env.REACT_APP_SERVER_ADDRESS;

// const blueDark = blue[500]

// class AdminUser extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//       user: [],
//       isLogged: true,
//       redirect: false,
//       newModalOpen: false,
//       deleteModalOpen: false,
//       deleteId: "",
//       modifedId: "",
//       snackbarMessage: "",
//       snackbarOpen: false,
//       email: "",
//       password: "",
//       sidebarOpen: false,
//       putModalOpen: false,
//       redirectLogOut: false,
//       limit: false
//     }
//   }

//   deleteUser = () => {
//     this.handleCloseDeleteModal();
//     const user_id = this.state.user[this.state.deleteId].id
//     fetch(SERVER_ADDRESS + '/api/users/' + user_id,
//       {
//         method: 'DELETE',
//         headers: new Headers({
//           'authorization': 'Bearer ' + localStorage.getItem('token')
//         })
//       }
//     )
//       .then(
//         () => {
//           fetch(SERVER_ADDRESS + '/api/users',
//             {
//               headers: new Headers({
//                 'Content-Type': 'application/json',
//                 'authorization': 'Bearer ' + localStorage.getItem('token')
//               }),

//             }
//           )
//             .then(res => res.json())
//             .then(res => this.setState({ user: res }, () => this.checkUsers()))
//             .then(
//               () => console.log(this.state.user)
//             )
//         }
//       )
//       .then(
//         (res) => {
//           this.setState({
//             snackbarOpen: true,
//             snackbarMessage: "Utilisateur supprimé"
//           })
//           setTimeout(() => {
//             this.setState({ snackbarOpen: false })
//           }, 3000);
//         }
//       )
//   }

//   handleChangeInput = (event) => {
//     switch (event.target.name) {
//       case 'email':
//         this.setState({ email: event.target.value })
//         break;
//       case 'password':
//         this.setState({ password: event.target.value })
//         break;
//       default:
//         break;
//     }
//   }

//   addUser = () => {
//     this.handleCloseNewModal();
//     let user = {
//       'name': this.state.email,
//       'password': this.state.password
//     }
//     fetch(SERVER_ADDRESS + '/api/users',
//       {
//         method: 'POST',
//         headers: new Headers({
//           'Content-Type': 'application/json',
//           'authorization': 'Bearer ' + localStorage.getItem('token')
//         }),
//         body: JSON.stringify(user),
//       })
//       .then(res => {
//         res.json()
//         console.log(res)
//       })
//       .then(
//         () => {
//           fetch(SERVER_ADDRESS + '/api/users',
//             {
//               headers: new Headers({
//                 'Content-Type': 'application/json',
//                 'authorization': 'Bearer ' + localStorage.getItem('token')
//               }),

//             }
//           )
//             .then(res => res.json())
//             .then(res => this.setState({ user: res }, () => this.checkUsers()))
//             .then(
//               () => console.log(this.state.user)
//             )
//         }
//       )
//       .then(res => this.setState({ snackbarMessage: "Utilisateur ajouté." }))
//       .then(
//         (res) => {
//           this.setState({ snackbarOpen: true })
//           setTimeout(() => {
//             this.setState({ snackbarOpen: false })
//           }, 3000);
//         }
//       )
//   }

//   putUser = () => {
//     this.handleClosePutModal();
//     let user = {
//       'name': this.state.email,
//       'password': this.state.password
//     }
//     let user_id = this.state.user[this.state.modifedId].id
//     console.log(user_id)
//     fetch(SERVER_ADDRESS + '/api/users/' + user_id,
//       {
//         method: 'PUT',
//         headers: new Headers({
//           'Content-Type': 'application/json',
//           'authorization': 'Bearer ' + localStorage.getItem('token')
//         }),
//         body: JSON.stringify(user),
//       })
//       .then(
//         () => {
//           fetch(SERVER_ADDRESS + '/api/users',
//             {
//               headers: new Headers({
//                 'Content-Type': 'application/json',
//                 'authorization': 'Bearer ' + localStorage.getItem('token')
//               }),

//             }
//           )
//             .then(res => res.json())
//             .then(res => this.setState({ user: res }))
//             .then(
//               () => console.log(this.state.user)
//             )
//         }
//       )
//       .then(res => this.setState({ snackbarMessage: "Utilisateur modifié." }))
//       .then(
//         (res) => {
//           this.setState({ snackbarOpen: true })
//           setTimeout(() => {
//             this.setState({ snackbarOpen: false })
//           }, 3000);
//         }
//       )
//       .then(
//         () => {
//           const newArrayUser = this.state.user
//           newArrayUser[this.state.modifedId] = {
//             id: user_id,
//             email: this.state.email
//           }
//           this.setState({ user: newArrayUser })
//         }
//       )
//   }

//   handleClosePutModal = () => {
//     this.setState({ putModalOpen: false })
//   }

//   handleOpenPutModal = (index) => {
//     this.setState({ putModalOpen: true })
//     this.setState({ modifedId: index })
//   }

//   handleCloseDeleteModal = () => {
//     this.setState({ deleteModalOpen: false })
//   }

//   handleOpenDeleteModal = (index) => {
//     this.setState({ deleteModalOpen: true })
//     this.setState({ deleteId: index })
//   }

//   handleOpenNewModal = () => {
//     this.setState({ newModalOpen: true })
//   }

//   handleCloseNewModal = () => {
//     this.setState({ newModalOpen: false })
//   }

//   openMenu = () => {
//     this.setState({ sidebarOpen: !this.state.sidebarOpen })
//     const menu = document.querySelector('.side-nav')
//     if (this.state.sidebarOpen === false) {
//       menu.style.display = "block"
//     }
//     else {
//       menu.style.display = "none"
//     }
//   }

//   checkUsers = () => {
//     if (this.state.user.length <= 1) {
//       this.setState({ limit: true })
//     } else if (this.state.user.length > 1) {
//       this.setState({ limit: false })
//     }
//   }

//   getData = () => {
//     fetch(SERVER_ADDRESS + '/api/users',
//       {
//         headers: new Headers({
//           'Content-Type': 'application/json',
//           'authorization': 'Bearer ' + localStorage.getItem('token')
//         }),

//       }
//     )
//       .then(res => res.json())
//       .then((res) => {
//         this.setState({ user: res }, () => this.checkUsers())
//       })

//   }


//   componentDidMount() {
//     const token = {
//       token: localStorage.getItem('token')
//     }

//     fetch(SERVER_ADDRESS + '/api/token',
//       {
//         method: 'POST',
//         headers: new Headers({
//           'Content-Type': 'application/json'
//         }),
//         body: JSON.stringify(token),
//       })
//       .then(res => res.json())
//       .then(
//         (res) => {
//           this.setState(
//             {
//               isLogged: res.succes,
//               redirect: res.succes ? false : true
//             });
//         }
//       )
//     this.getData()
   
//   }

//   logOut = () => {
//     this.setState({ redirectLogOut: true })
//   }

//   render() {
//     return (
//       <div>
//         {this.state.redirect && <Redirect to="/login" />}
//         {!this.state.redi &&
//           <div>
          
//             <div className="side-nav">
//               <div className="logo">
//               </div>
//               <nav>
//                 <ul>
//                   <li>
//                     {this.state.redirectLogOut ? <Redirect to="/login" /> : ""}
//                     <button type="button" className="btn_deco" onClick={this.logOut}>Déconnexion</button>
//                   </li>
//                 </ul>
//               </nav>
//             </div>
//             <Grid container className="main-content">

//               <Grid className="item" item>
//                 <Paper elevation={1}>
//                   <Card>
//                     <CardHeader
//                       className="jtestd"
//                       action={
//                         <Fab
//                           style={{ backgroundColor: "#1976d2", color: 'white' }}
//                           onClick={this.handleOpenNewModal}
//                           size="small"
//                         >
//                           <Add />
//                         </Fab>
//                       }
//                       title="Compte administrateur"
//                     />
//                     <Divider />
//                     <CardContent className="content">
//                       <PerfectScrollbar>
//                         <div className="inner">
//                           <Table>
//                             <TableHead>
//                               <TableRow>
//                                 <TableCell>#</TableCell>
//                                 <TableCell>Identifiant</TableCell>
//                                 <TableCell>Editer / Supprimer</TableCell>
//                               </TableRow>
//                             </TableHead>
//                             <TableBody>
//                               {this.state.user.map((users, index) => (
//                                 <TableRow
//                                   hover
//                                   key={users.id}
//                                 >
//                                   <TableCell>{index + 1}</TableCell>
//                                   <TableCell>{users.name}</TableCell>
//                                   <TableCell>

//                                     <Button
//                                       style={{ backgroundColor: "#1976d2", color: 'white' }}
//                                       variant="contained"
//                                       onClick={() => this.handleOpenPutModal(index)}
//                                       size="small"
//                                       startIcon={<Edit />}
//                                     >
//                                       Editer
//                                     </Button>

//                                     <Button
//                                       style={{ marginLeft: '10px' }}
//                                       disabled={this.state.limit}
//                                       variant="contained"
//                                       onClick={() => this.handleOpenDeleteModal(index)}
//                                       color="secondary"
//                                       size="small"
//                                       endIcon={<Delete />}
//                                     >
//                                       Supprimer
//                                     </Button>

//                                   </TableCell>
//                                 </TableRow>
//                               ))}
//                             </TableBody>
//                           </Table>
//                         </div>
//                       </PerfectScrollbar>
//                     </CardContent>
//                   </Card>
//                 </Paper>
//               </Grid>
//             </Grid>

//             <Dialog open={this.state.newModalOpen} onClose={this.handleCloseNewModal} aria-labelledby="form-dialog-title">
//               <DialogTitle id="form-dialog-title">Crée un nouvelle administrateur</DialogTitle>
//               <DialogContent>
//                 <DialogContentText>
//                   Pour crée un administrateur veuillez saisir toute les informations.
//               </DialogContentText>
//                 <TextField
//                   autoFocus
//                   margin="dense"
//                   id="name"
//                   label="Identifiant"
//                   type="email"
//                   fullWidth
//                   name="email"
//                   color={blueDark}
//                   onChange={this.handleChangeInput}
//                 />
//                 <TextField
//                   id="standard-password-input"
//                   label="Mot de passe"
//                   type="password"
//                   autoComplete="current-password"
//                   fullWidth
//                   name="password"
//                   onChange={this.handleChangeInput}
//                 />
//               </DialogContent>
//               <DialogActions>
//                 <Button onClick={this.handleCloseNewModal} color="primary">
//                   Annuler
//               </Button>
//                 <Button onClick={this.addUser} color="primary">
//                   Créer
//               </Button>
//               </DialogActions>
//             </Dialog>

//             <Dialog
//               open={this.state.deleteModalOpen}
//               onClose={this.handleClose}
//               aria-labelledby="alert-dialog-title"
//               aria-describedby="alert-dialog-description"
//             >
//               <DialogTitle id="alert-dialog-title">{"Suppression d'un administrateur"}</DialogTitle>
//               <DialogContent>
//                 <DialogContentText id="alert-dialog-description">
//                   Etes vous sur de vouloir supprimer l'administrateur ?
//           </DialogContentText>
//               </DialogContent>
//               <DialogActions>
//                 <Button onClick={this.handleCloseDeleteModal} color="primary">
//                   Non
//           </Button>
//                 <Button onClick={this.deleteUser} color="primary" autoFocus>
//                   Oui
//           </Button>
//               </DialogActions>
//             </Dialog>



//             <Dialog open={this.state.putModalOpen} onClose={this.handleClosePutModal} aria-labelledby="form-dialog-title">
//               <DialogTitle id="form-dialog-title">Modifier un administrateur</DialogTitle>
//               <DialogContent>
//                 <DialogContentText>
//                   Pour modifer cette administrateur veuillez saisir toute les informations.
//             </DialogContentText>
//                 <TextField
//                   autoFocus
//                   margin="dense"
//                   id="name"
//                   label="Identifant"
//                   type="email"
//                   fullWidth
//                   name="email"
//                   onChange={this.handleChangeInput}
//                 />
//                 <TextField
//                   id="standard-password-input"
//                   label="Mot de passe"
//                   type="password"
//                   autoComplete="current-password"
//                   fullWidth
//                   name="password"
//                   onChange={this.handleChangeInput}
//                 />
//               </DialogContent>
//               <DialogActions>
//                 <Button onClick={this.handleClosePutModal} color="primary">
//                   Annuler
//               </Button>
//                 <Button onClick={this.putUser} color="primary">
//                   Modifier
//               </Button>
//               </DialogActions>
//             </Dialog>


//             <Snackbar
//               anchorOrigin={{
//                 vertical: 'bottom',
//                 horizontal: 'left',
//               }}
//               open={this.state.snackbarOpen}
//               message={this.state.snackbarMessage}
//             />
//           </div>
//         }
//       </div>
//     );
//   }
// }

// export default AdminUser;
