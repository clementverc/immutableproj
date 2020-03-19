import React, { Component } from 'react';
import { connect } from 'react-redux';

import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import ListItem from '@material-ui/core/ListItem';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import FaceIcon from '@material-ui/icons/Face';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import SettingsIcon from '@material-ui/icons/Settings';
import SendIcon from '@material-ui/icons/Send';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';

import { addContact, deleteContact } from './action';

const Contact = ({ dispatch, user }) => {
  const {
    firstName,
    lastName,
    city,
    phone,
    id,
  } = user;

  return (
    <div>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <FaceIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={`${firstName} ${lastName} ${id}`} secondary={`${phone} - ${city}`} />
        <IconButton color="secondary" onClick={() => dispatch(deleteContact(id))}>
          <DeleteIcon />
        </IconButton>
      </ListItem>
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
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    const { dispatch } = this.props;
    event.preventDefault();
    dispatch(addContact({
      form: { },
      firstName: event.target.firstName.value,
      lastName: event.target.lastName.value,
      city: event.target.city.value,
      phone: event.target.phone.value,
      id: event.target.id.value,
    }));
    // console.log(event.target.firstName.value);
  }

  render() {
    const { dispatch, items } = this.props;
    const { form } = this.state;

    return (
      <div>
        <h1>
          Contacts
          <IconButton>
            <ArrowDropDownIcon />
          </IconButton>
          <Tooltip title="Ajouter contact toto">
            <IconButton onClick={() => dispatch(addContact({ id: 89, firstName: 'toto', phone: '0123456789' }))}>
              <PersonAddIcon />
            </IconButton>
          </Tooltip>
          <IconButton>
            <SettingsIcon />
          </IconButton>
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
        <ul>
          {items.map((user) => (
            <Contact key={user.id} dispatch={dispatch} user={user} />
          ))}
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
