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

class Card_Defi extends React.Component {
  constructor() {
    super();
    this.state = {
      card_defi: [],
      titre: "",
      liens: "",
      alt: "",
      text: "",
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
    switch (event.target.name) {
      case 'titre':
        this.setState({ titre: event.target.value })
        break;
      case 'liens':
        this.setState({ liens: event.target.value })
        break;
      case 'alt':
        this.setState({ alt: event.target.value })
        break;
      case 'text':
        this.setState({ text: event.target.value })
        break;
      default:
        break;
    }
  }

  deleteBureau = () => {
    this.handleCloseDeleteModal();
    const card_defi_id = this.state.card_defi[this.state.deleteId].id
    fetch(SERVER_ADDRESS + '/card_defi/' + card_defi_id,
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
            snackbarMessage: "Partenaire supprimé"
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
    let card_defi = {
      titre: this.state.titre,
      liens: this.state.liens,
      alt: this.state.alt,
      text: this.state.text
    }
    fetch(SERVER_ADDRESS + '/card_defi',
      {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json',
          'authorization': 'Bearer ' + localStorage.getItem('token')
        }),
        body: JSON.stringify(card_defi),
      })
      .then(res => {
        res.json()
        console.log(res)
      })
      .then(() => { this.getData() })
      .then(res => this.setState({ snackbarMessage: "Partenaire ajouté." }))
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
    let card_defi = {
      titre: this.state.titre,
      liens: this.state.liens,
      alt: this.state.alt,
      text: this.state.text
    }
    let card_defi_id = this.state.card_defi[this.state.modifedId].id
    console.log(card_defi_id)
    fetch(SERVER_ADDRESS + '/card_defi/' + card_defi_id,
      {
        method: 'PUT',
        headers: new Headers({
          'Content-Type': 'application/json',
          'authorization': 'Bearer ' + localStorage.getItem('token')
        }),
        body: JSON.stringify(card_defi),
      })
      .then(
        () => {
          fetch(SERVER_ADDRESS + '/card_defi',
            {
              headers: new Headers({
                'Content-Type': 'application/json',
                'authorization': 'Bearer ' + localStorage.getItem('token')
              }),

            }
          )
            .then(res => res.json())
            .then(res => this.setState({ card_defi: res }))
            .then(
              () => console.log(this.state.card_defi)
            )
        }
      )
      .then(res => this.setState({ snackbarMessage: "Partenaire modifié." }))
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
          const newArrayBureau = this.state.card_defi
          newArrayBureau[this.state.modifedId] = {
            id: card_defi_id,
            email: this.state.email
          }
          this.setState({ card_defi: newArrayBureau })
        }
      )
  }

  handleClosePutModal = () => {
    this.setState({ putModalOpen: false })
  }

  handleOpenPutModal = (index) => {
    let user_id = this.state.card_defi[index].id
    fetch(SERVER_ADDRESS + '/card_defi/' + user_id)
      .then(res => res.json())
      .then(res => {
        this.setState({
          titre: res[0].titre,
          liens: res[0].liens,
          alt: res[0].alt,
          text: res[0].text
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
      titre: "",
      liens: "",
      alt: "",
      text: ""
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
    fetch(SERVER_ADDRESS + '/card_defi',
      {
        headers: new Headers({
          'Content-Type': 'application/json',
          'authorization': 'Bearer ' + localStorage.getItem('token')
        }),

      }
    )
      .then(res => res.json())
      .then((res) => {
        this.setState({ card_defi: res })
      })

  }

  componentDidMount() {
    const token = {
      token: localStorage.getItem('token')
    }

    fetch(SERVER_ADDRESS + '/token',
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
    fetch(SERVER_ADDRESS + '/uploadFile', {
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
    }, () => this.setState({ alt: this.state.selectFileImages.name }));
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
                    style={{ backgroundColor: "#1976d2", color: 'white' }}
                    onClick={this.handleOpenNewModal}
                    size="small"
                  >
                    <Add />
                  </Fab>
                }
                title="Nos card_defi"
              />
              <Divider />
              <CardContent className="content">
                <PerfectScrollbar>
                  <div className="inner">
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>#</TableCell>
                          <TableCell>Titre</TableCell>
                          <TableCell>Liens</TableCell>
                          <TableCell>Alt</TableCell>
                          <TableCell>Text</TableCell>
                          <TableCell>Editer / Supprimer</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {this.state.card_defi.map((card_defi, index) => (
                          <TableRow
                            hover
                            key={card_defi.id}
                          >
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{card_defi.titre}</TableCell>
                            <TableCell>{card_defi.liens}</TableCell>
                            <TableCell>{card_defi.alt}</TableCell>
                            <TableCell>{card_defi.text}</TableCell>
                            <TableCell>

                              <Button
                                style={{ backgroundColor: "#1976d2", color: 'white' }}
                                onClick={() => this.handleOpenPutModal(index)}
                                size="small"
                                startIcon={<Edit />}
                              >
                                Editer
                          </Button>
                              <Button
                                style={{ marginLeft: '10px' }}
                                disabled={this.state.limit}
                                variant="contained"
                                onClick={() => this.handleOpenDeleteModal(index)}
                                color="secondary"
                                size="small"
                                endIcon={<Delete />}
                              >
                                Supprimer
                          </Button>
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
        <Dialog open={this.state.newModalOpen} onClose={this.handleCloseNewModal} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Crée un card_defi</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Pour créer un card_defi veuillez remplir les champs obligatoires.
                  </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="titre"
              label="titre"
              type="text"
              fullWidth
              name="titre"
              onChange={this.handleChangeInput}
            />
            <TextField
              margin="dense"
              id="liens"
              label="Liens"
              type="text"
              fullWidth
              multiline
              name="liens"
              onChange={this.handleChangeInput}
            />
            <TextField
              margin="dense"
              id="text"
              label="Text"
              type="text"
              fullWidth
              name="text"
              onChange={this.handleChangeInput}
            />
            <input
              style={{
                display: "none"
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
          <DialogTitle id="alert-dialog-title">{"Suppression d'un card_defi"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Etes vous sur de vouloir supprimer le card_defi ?
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
        <Dialog open={this.state.putModalOpen} onClose={this.handleClosePutModal} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Modifier un card_defi</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Pour modifer ce card_defi veuillez saisir les champs obligatoires.
                </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="titre"
              label="titre"
              type="text"
              fullWidth
              name="titre"
              onChange={this.handleChangeInput}
              defaultValue={this.state.titre}
            />
            <TextField
              margin="dense"
              id="liens"
              label="Liens"
              type="text"
              fullWidth
              multiline
              name="liens"
              onChange={this.handleChangeInput}
              defaultValue={this.state.liens}
            />
            <TextField
              margin="dense"
              id="text"
              label="text"
              type="text"
              fullWidth
              name="text"
              onChange={this.handleChangeInput}
              defaultValue={this.state.text}
            />
            <input
              style={{
                display: "none"
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
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.state.snackbarOpen}
          message={this.state.snackbarMessage}
        />
      </>
    );
  }
}

export default Card_Defi;
