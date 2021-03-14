import React from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  Button,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Grid,
  Paper,
  Snackbar,
  TextField,
  Fab,
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
  Dialog
} from '@material-ui/core';
import {
  Add,
  Edit,
  Delete,
  Image
} from '@material-ui/icons';
import PerfectScrollbar from 'react-perfect-scrollbar';

const SERVER_ADDRESS = process.env.REACT_APP_SERVER_ADDRESS;

class AdminStrains extends React.Component {
  constructor() {
    super();
    this.state = {
      canna: [],
     liens: "", 
     nom: "",
     alt:"",
      id:"",
      genetique:"",
      parents:"",
      thc:"",
      cbd:"",
      odeur:"",
      effet:"",
      gagnant:"",
      isLogged: true,
      redirect: false,
      newModalOpen: false,
      deleteModalOpen: false,
      deleteId: "",
      modifedId: "",
      snackbarMessage: "",
      snackbarOpen: false,
      sidebarOpen: false,
      putModalOpen: false,
      redirectLogOut: false,
      limit: false,
      selectFileImages: null,
      loaded1: false
    }
  }

  handleChangeInput = (event) => {
    switch (event.target.nom) {
      case 'nom':
        this.setState({ nom: event.target.value })
        break;
      case 'id':
        this.setState({ id: event.target.value })
        break;
      case 'genetique':
        this.setState({ genetique: event.target.value })
        break;
        case 'parents':
          this.setState({ parents: event.target.value })
          break;
        case 'thc':
          this.setState({ thc: event.target.value })
          break;
        case 'cbd':
          this.setState({ cbd: event.target.value })
          break;
          case 'odeur':
          this.setState({ odeur: event.target.value })
          break;
        case 'effet':
          this.setState({ effet: event.target.value })
          break;
          case 'gagnant':
          this.setState({ gagnant: event.target.value })
          break;
      default:
        break;
    }
  }

  deleteBureau = () => {
    this.handleCloseDeleteModal();
    const canna_id = this.state.canna[this.state.deleteId].id
    fetch(SERVER_ADDRESS + '/api/canna/' + canna_id,
      {
        method: 'DELETE',
        headers: new Headers({
          'authorization': 'Bearer ' + localStorage.getItem('token')
        })
      }
    )
      .then(() => { this.getData() })
      .then(
        (res) => {
          this.setState({
            snackbarOpen: true,
            snackbarMessage: "Canna supprimée"
          })
          setTimeout(() => {
            this.setState({ snackbarOpen: false })
          }, 3000);
        }
      )
  }

  addBureau = () => {
    this.handleCloseNewModal();
    this.onClickHandler();
    let canna = {
      nom: this.state.nom,
      liens: this.state.liens,
      id: this.state.id,
      genetique: this.state.genetique,
      parents: this.state.parents,
      thc: this.state.thc,
      cbd: this.state.cbd,
      odeur: this.state.odeur,
      effet: this.state.effet,
      gagnant: this.state.gagnant,
      alt: this.state.alt
    }
    fetch(SERVER_ADDRESS + '/api/canna',
      {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json',
          'authorization': 'Bearer ' + localStorage.getItem('token')
        }),
        body: JSON.stringify(canna),
      })
      .then(res => {
        res.json()
        console.log(res)
      })
      .then(() => { this.getData() })
      .then(res => this.setState({ snackbarMessage: "Canna ajoutée." }))
      .then(
        (res) => {
          this.setState({ snackbarOpen: true })
          setTimeout(() => {
            this.setState({ snackbarOpen: false })
          }, 3000);
        }
      )
  }

  putBureau = () => {
    this.handleClosePutModal();
    this.onClickHandler();
    let canna = {

      name: this.state.name,
      alt: this.state.alt,
      genetique: this.state.genetique,
      parents: this.state.parents,
      thc: this.state.thc,
      cbd: this.state.cbd,
      odeur: this.state.odeur,
      effet: this.state.effet,
      gagnant: this.state.gagnant,
      liens: this.state.liens,
      type: this.state.type
    }
    let canna_id = this.state.canna[this.state.modifedId].id_canna
    console.log(canna_id)
    fetch(SERVER_ADDRESS + '/api/canna/' + canna_id,
      {
        method: 'PUT',
        headers: new Headers({
          'Content-Type': 'application/json',
          'authorization': 'Bearer ' + localStorage.getItem('token')
        }),
        body: JSON.stringify(canna),
      })
      .then(
        () => {
          fetch(SERVER_ADDRESS + '/api/canna/',
            {
              headers: new Headers({
                'Content-Type': 'application/json',
                'authorization': 'Bearer ' + localStorage.getItem('token')
              }),

            }
          )
            .then(res => res.json())
            .then(res => this.setState({ canna: res }))
            .then(
              () => console.log(this.state.canna)
            )
        }
      )
      .then(res => this.setState({ snackbarMessage: "Canna modifiée." }))
      .then(
        (res) => {
          this.setState({ snackbarOpen: true })
          setTimeout(() => {
            this.setState({ snackbarOpen: false })
          }, 3000);
        }
      )
      .then(
        () => {
          const newArrayBureau = this.state.canna
          newArrayBureau[this.state.modifedId] = {
            id_canna: canna_id,
            email: this.state.email
          }
          this.setState({ canna: newArrayBureau })
        }
      )
  }

  handleClosePutModal = () => {
    this.setState({ putModalOpen: false })
  }

  handleOpenPutModal = (index) => {
    let canna_id = this.state.canna[index].id_canna
    fetch(SERVER_ADDRESS + '/api/canna/' + canna_id)
      .then(res => res.json())
      .then(res => {
        this.setState({
          nom: res[0].nom,
          liens: res[0].liens,
          alt: res[0].alt,
          genetique: res[0].genetique,
          parents: res[0].parents,
          thc: res[0].thc,
          cbd: res[0].cbd,
          odeur: res[0].odeur,
          effet: res[0].effet,
          gagnant: res[0].gagnant,
          selectFileImages: ""
        }, () => {
          this.setState({ putModalOpen: true })
          this.setState({ modifedId: index })
        })
      })
  }

  handleCloseDeleteModal = () => {
    this.setState({ deleteModalOpen: false })
  }

  handleOpenDeleteModal = (index) => {
    this.setState({ deleteModalOpen: true })
    this.setState({ deleteId: index })
  }

  handleOpenNewModal = () => {
    this.setState({
      nom: "",
      liens: "",
      genetique:"",
      alt:"",
      type: "",
      selectFileImages: ""
    }, () => {
      this.setState({ newModalOpen: true })
    })
  }

  handleCloseNewModal = () => {
    this.setState({ newModalOpen: false })
  }

  openMenu = () => {
    this.setState({ sidebarOpen: !this.state.sidebarOpen })
    const menu = document.querySelector('.side-nav')
    if (this.state.sidebarOpen === false) {
      menu.style.display = "block"
    }
    else {
      menu.style.display = "none"
    }
  }

  getData = () => {
    fetch(SERVER_ADDRESS + '/api/canna',
      {
        headers: new Headers({
          'Content-Type': 'application/json',
          'authorization': 'Bearer ' + localStorage.getItem('token')
        }),

      }
    )
      .then(res => res.json())
      .then((res) => {
        this.setState({ canna: res }, () => console.log(this.state.canna))
      })

  }

  componentDidMount() {
    const token = {
      token: localStorage.getItem('token')
    }

    fetch(SERVER_ADDRESS + '/api/token',
      {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify(token),
      })
      .then(res => res.json())
      .then(
        (res) => {
          this.setState(
            {
              isLogged: res.succes,
              redirect: res.succes ? false : true
            });
        }
      )
    this.getData()
  }

  logOut = () => {
    this.setState({ redirectLogOut: true })
    localStorage.setItem('token', "")
  }

  onClickHandler = () => {
    const data = new FormData();
    data.append("file", this.state.selectFileImages);
    fetch(SERVER_ADDRESS + '/api/uploadFile', {
      method: 'POST',
      mode: "cors",
      credentials: "same-origin",
      redirect: "follow",
      referrer: "no-referrer",
      body: data
    }).then(res => {
      console.log(res.statusText);
    });
  };

  onChangeHandler = event => {
    this.setState({
      selectFileImages: event.target.files[0],
      loaded1: true,
    }, () => this.setState({ liens: this.state.selectFileImages.name }));
  }

  render() {
    return (
      <>
        <Grid className="item" item>
          <Paper elevation={1}>
            <Card>
              <CardHeader
                className="jtestd"
                action={
                  <Fab
                    style={{ backgroundColor: "#1976d2", color: "white" }}
                    onClick={this.handleOpenNewModal}
                    size="small"
                  >
                    <Add />
                  </Fab>
                }
                title="Strains"
              />
              <Divider />
              <CardContent className="content">
                <PerfectScrollbar>
                  <div className="inner">
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>#</TableCell>
                          <TableCell>Nom</TableCell>
                          <TableCell>Liens de l'image</TableCell>
                          <TableCell>Alt de l'image</TableCell>
                          <TableCell>Génétique</TableCell>
                          <TableCell>Parents</TableCell>
                          <TableCell>Thc</TableCell>
                          <TableCell>Cbd</TableCell>
                          <TableCell>Odeur</TableCell>
                          <TableCell>Effet</TableCell>
                          <TableCell>Gagnant</TableCell>
                          <TableCell>Editer / Supprimer</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {this.state.canna.map((cannas, index) => (
                          <TableRow hover key={cannas.id}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{cannas.nom}</TableCell>
                            <TableCell>{cannas.liens}</TableCell>
                            <TableCell>{cannas.alt}</TableCell>
                            <TableCell>{cannas.genetique}</TableCell>
                            <TableCell>{cannas.parents}</TableCell>
                            <TableCell>{cannas.thc}</TableCell>
                            <TableCell>{cannas.cbd}</TableCell>
                            <TableCell>{cannas.odeur}</TableCell>
                            <TableCell>{cannas.effet}</TableCell>
                            <TableCell>{cannas.gagnant}</TableCell>
                            <TableCell>
                              <Button
                                style={{
                                  backgroundColor: "#1976d2",
                                  color: "white",
                                  marginLeft: "3px",
                                }}
                                onClick={() => this.handleOpenPutModal(index)}
                                size="small"
                                startIcon={<Edit />}
                              ></Button>
                              <Button
                                style={{ marginLeft: "3px" }}
                                disabled={this.state.limit}
                                variant="contained"
                                onClick={() =>
                                  this.handleOpenDeleteModal(index)
                                }
                                color="secondary"
                                size="small"
                                endIcon={<Delete />}
                              ></Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </PerfectScrollbar>
              </CardContent>
            </Card>
          </Paper>
        </Grid>
        <Dialog
          open={this.state.newModalOpen}
          onClose={this.handleCloseNewModal}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">
            Créer une fiche canna
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Pour créer une fiche canna veuillez remplir les champs
              obligatoires.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="nom"
              label="Nom"
              type="text"
              fullWidth
              name="nom"
              onChange={this.handleChangeInput}
            />
            <TextField
              margin="dense"
              id="genetique"
              label="Génétique"
              type="text"
              fullWidth
              name="genetique"
              onChange={this.handleChangeInput}
            />
            <TextField
              multiline
              margin="dense"
              id="parents"
              label="Parents"
              type="text"
              fullWidth
              name="parents"
              onChange={this.handleChangeInput}
            />
            <TextField
              margin="dense"
              id="thc"
              label="Thc"
              type="text"
              fullWidth
              name="thc"
              onChange={this.handleChangeInput}
            />
            <TextField
              margin="dense"
              id="cbd"
              label="Cbd"
              type="text"
              fullWidth
              name="cbd"
              onChange={this.handleChangeInput}
            />
            <TextField
              multiline
              margin="dense"
              id="odeur"
              label="Odeur"
              type="text"
              fullWidth
              name="odeur"
              onChange={this.handleChangeInput}
            />
            <TextField
              multiline
              margin="dense"
              id="effet"
              label="Effet"
              type="text"
              fullWidth
              name="effet"
              onChange={this.handleChangeInput}
            />
            <TextField
              margin="dense"
              id="gagnant"
              label="Gagnant"
              type="text"
              fullWidth
              name="gagnant"
              onChange={this.handleChangeInput}
            />
            <input
              style={{
                display: "none",
              }}
              accept="image/*"
              id="contained-button-file"
              multiple
              type="file"
              onChange={this.onChangeHandler}
            />
            <label htmlFor="contained-button-file">
              <Button
                variant="contained"
                color="primary"
                component="span"
                endIcon={<Image />}
              >
                Choisir une image
              </Button>
              {this.state.loaded1 ? this.state.selectFileImages.name : ""}
            </label>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCloseNewModal} color="primary">
              Annuler
            </Button>
            <Button onClick={this.addBureau} color="primary">
              Créer
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={this.state.deleteModalOpen}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Suppression d'une fiche"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Etes vous sur de vouloir supprimer cette fiche de canna ?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCloseDeleteModal} color="primary">
              Non
            </Button>
            <Button onClick={this.deleteBureau} color="primary" autoFocus>
              Oui
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={this.state.putModalOpen}
          onClose={this.handleClosePutModal}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">
            Modifier cette fiche canna
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Pour modifer cette fiche canna veuillez saisir les champs
              obligatoires.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="nom"
              label="Nom"
              type="text"
              fullWidth
              name="nom"
              onChange={this.handleChangeInput}
              defaultValue={this.state.nom}
            />
            <TextField
              margin="dense"
              id="genetique"
              label="Génétique"
              type="text"
              fullWidth
              name="genetique"
              onChange={this.handleChangeInput}
              defaultValue={this.state.genetique}
            />
            <TextField
              multiline
              margin="dense"
              id="parents"
              label="Parents"
              type="text"
              fullWidth
              name="parents"
              onChange={this.handleChangeInput}
              defaultValue={this.state.parents}
            />
            <TextField
              margin="dense"
              id="thc"
              label="Thc"
              type="text"
              fullWidth
              name="thc"
              onChange={this.handleChangeInput}
                defaultValue={this.state.thc}
            />
            <TextField
              margin="dense"
              id="cbd"
              label="Cbd"
              type="text"
              fullWidth
              name="cbd"
              onChange={this.handleChangeInput}
                defaultValue={this.state.cbd}
            />
            <TextField
              multiline
              margin="dense"
              id="odeur"
              label="Odeur"
              type="text"
              fullWidth
              name="odeur"
              onChange={this.handleChangeInput}
              defaultValue={this.state.odeur}
            />
            <TextField
              multiline
              margin="dense"
              id="effet"
              label="Effet"
              type="text"
              fullWidth
              name="effet"
              onChange={this.handleChangeInput}
                defaultValue={this.state.effet}
            />
            <TextField
              margin="dense"
              id="gagnant"
              label="Gagnant"
              type="text"
              fullWidth
              name="gagnant"
              onChange={this.handleChangeInput}
              defaultValue={this.state.gagnant}
            />
            <input
              style={{
                display: "none",
              }}
              accept="image/*"
              id="contained-button-file"
              multiple
              type="file"
              onChange={this.onChangeHandler}
            />
            <label htmlFor="contained-button-file">
              <Button
                variant="contained"
                color="primary"
                component="span"
                endIcon={<Image />}
              >
                Choisir une image
              </Button>
              {this.state.loaded1 ? this.state.selectFileImages.name : ""}
            </label>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClosePutModal} color="primary">
              Annuler
            </Button>
            <Button onClick={this.putBureau} color="primary">
              Modifier
            </Button>
          </DialogActions>
        </Dialog>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          open={this.state.snackbarOpen}
          message={this.state.snackbarMessage}
        />
      </>
    );
  }
}
export default AdminStrains;