import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Grid,
  IconButton,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  TextField,
  Tooltip,
  Select,
  InputLabel,
} from '@material-ui/core';
import { Delete, Face, Send } from '@material-ui/icons';
import { addContact, deleteContact, updateContact } from './action';

const Contact = ({ user }) => {
  const {
    firstName,
    lastName,
    city,
    phone,
    id,
  } = user;

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item sm={6} md={6}>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <Face />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={`${firstName} ${lastName}`} secondary={`${phone} - ${city}`} />
            <IconButton color="secondary" onClick={() => deleteContact(id)}>
              <Delete />
            </IconButton>
          </ListItem>
        </Grid>
      </Grid>
    </div>
  );
};

class Contacts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        firstName: '',
        lastName: '',
        city: '',
        phone: '',
        id: '',
      },
      dataSearch: '',
      idSelectedUser: 0,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.search = this.search.bind(this);
  }

  handleSubmit(event) {
    console.log(this);
    event.preventDefault();
    addContact({
      form: { },
      firstName: event.target.firstName.value,
      lastName: event.target.lastName.value,
      city: event.target.city.value,
      phone: event.target.phone.value,
      id: event.target.id.value,
    });
  }

  handleChange(event) {
    this.setState({ idSelectedUser: event.target.value });
  }

  handleUpdate(event) {
    console.log(this);
    event.preventDefault();
    const idContact = Number(event.target.idSelectedUser.value);
    // console.log(idContact);
    updateContact(idContact, {
      form: { },
      firstName: event.target.firstNameEdit.value,
      lastName: event.target.lastNameEdit.value,
      city: event.target.cityEdit.value,
      phone: event.target.phoneEdit.value,
      id: idContact,
    });
  }

  search(event) {
    const { value } = event.target;
    this.setState({ dataSearch: value.toLowerCase() });
  }

  render() {
    const { items } = this.props;
    const { form, dataSearch, idSelectedUser } = this.state;
    items.sort((a, b) => (a.firstName.toLowerCase() < b.firstName.toLowerCase() ? -1 : 1));
    return (
      <div>
        <h1 style={{ textAlign: 'center' }}>
          Ma liste de contacts
        </h1>
        <h3>Ajouter un contact :</h3>
        <form onSubmit={this.handleSubmit}>
          <TextField id="id" label="id" type="number" InputLabelProps={{ shrink: true }} variant="outlined" />
          <TextField id="firstName" label="firstName" variant="outlined" />
          <TextField id="lastName" label="fastName" variant="outlined" />
          <TextField id="city" label="city" variant="outlined" />
          <TextField id="phone" label="phone" type="number" InputLabelProps={{ shrink: true }} variant="outlined" />
          <Tooltip title="Ajouter le contact">
            <IconButton type="submit" value="Enregistrer">
              <Send />
            </IconButton>
          </Tooltip>
        </form>
        <hr style={{ marginTop: '25px', marginBottom: '25px' }} />
        <h3>Modifier un contact :</h3>
        <form onSubmit={this.handleUpdate}>
          <div>
            <InputLabel htmlFor="idSelectedUser">Sélectionner un utilisateur</InputLabel>
            <Select
              native
              value={idSelectedUser}
              onChange={this.handleChange}
              inputProps={{
                name: 'idSelectedUser',
                id: 'idSelectedUser',
              }}
              style={{ marginBottom: '20px', width: '30%' }}
            >
              <option aria-label="None" value="" />
              <option value="1">Jacques Last</option>
              <option value="2">Pierre Last</option>
              <option value="3">Ana Amop</option>
              <option value="4">Cyril Vimard</option>
              <option value="5">Jonathan Reza</option>
              <option value="6">Pierre Feuille</option>
              <option value="7">Octave Jean</option>
              <option value="8">Cyril Second</option>
            </Select>
          </div>
          <TextField id="firstNameEdit" label="firstName" variant="outlined" />
          <TextField id="lastNameEdit" label="fastName" variant="outlined" />
          <TextField id="cityEdit" label="city" variant="outlined" />
          <TextField id="phoneEdit" label="phone" type="number" InputLabelProps={{ shrink: true }} variant="outlined" />
          <Tooltip title="Editer le contact">
            <IconButton type="submit" value="Enregistrer">
              <Send />
            </IconButton>
          </Tooltip>
        </form>
        <hr style={{ marginTop: '25px' }} />
        <input style={{ height: '40px', marginTop: '30px', width: '30%' }} onChange={this.search} className="search" placeholder="Rechercher parmis les contacts" />
        <h4>{dataSearch}</h4>
        <ul>
          { dataSearch === '' ? items.map((user) => (<Contact key={user.id} user={user} />))
            : items.filter((user) => user.firstName.toLowerCase().indexOf(dataSearch) !== -1
            || user.lastName.toLowerCase().indexOf(dataSearch) !== -1
            || user.phone.toLowerCase().indexOf(dataSearch) !== -1
            || user.city.toLowerCase().indexOf(dataSearch) !== -1)
              .map((user) => (<Contact key={user.id} user={user} />))}
        </ul>
      </div>
    );
  }
}
const mapToProps = (state) => {
  const { items } = state.contacts;
  return ({ items });
};

export default connect(mapToProps)(Contacts);
