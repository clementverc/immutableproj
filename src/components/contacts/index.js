import React, { Component } from 'react';
import { connect } from 'react-redux';

import Grid from '@material-ui/core/Grid';

import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
import ListItem from '@material-ui/core/ListItem';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import FaceIcon from '@material-ui/icons/Face';
import SendIcon from '@material-ui/icons/Send';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';

import { addContact, deleteContact } from './action';

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
        <Grid item sm={6} md={3}>
          {/* <Container> */}
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <FaceIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={`${firstName} ${lastName} ${id}`} secondary={`${phone} - ${city}`} />
            <IconButton color="secondary" onClick={() => deleteContact(id)}>
              <CreateIcon />
            </IconButton>
            <IconButton color="secondary" onClick={() => deleteContact(id)}>
              <DeleteIcon />
            </IconButton>
          </ListItem>
          {/* </Container> */}
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
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.search = this.search.bind(this);
  }

  handleSubmit(event) {
    // const { dispatch } = this.props;
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
    // console.log(event.target.firstName.value);
  }

  search(event) {
    const { value } = event.target;
    this.setState({ dataSearch: value.toLowerCase() });
  }

  render() {
    const { items } = this.props;
    const { form, dataSearch } = this.state;
    items.sort((a, b) => (a.lastName.toLowerCase() < b.lastName.toLowerCase() ? -1 : 1));

    return (
      <div>
        <h1>
          Mes Contacts
          <Tooltip title="Ajouter un contact">
            <IconButton>
              <PersonAddIcon />
            </IconButton>
          </Tooltip>
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
              <SendIcon />
            </IconButton>
          </Tooltip>
        </form>
        <input onChange={this.search} className="search" placeholder="Rechercher un contact" />
        <h1>{dataSearch}</h1>
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
