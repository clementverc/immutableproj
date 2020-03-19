import React from 'react';
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

import { addContact, deleteContact } from './action';

// handleSubmit = () => {
//   alert(this.state.value);
// };

const Contact = ({ dispatch, user }) => {
  const { firstName, phone, id } = user;
  return (
    <div>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <FaceIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={`${firstName} ${id}`} secondary={`${phone}`} />
        <IconButton color="secondary" onClick={() => dispatch(deleteContact(id))}>
          <DeleteIcon />
        </IconButton>
      </ListItem>
    </div>
  );
};

const Contacts = ({ dispatch, items }) => (
  <div>
    <h1>
      Contacts
      <IconButton>
        <ArrowDropDownIcon />
      </IconButton>
      <IconButton onClick={() => dispatch(addContact({ id: 89, firstName: 'toto', phone: '0123456789' }))}>
        <PersonAddIcon />
      </IconButton>
      <IconButton>
        <SettingsIcon />
      </IconButton>
    </h1>
    <form>
      <TextField
        id="outlined-number"
        label="Id"
        type="number"
        InputLabelProps={{
          shrink: true,
        }}
        variant="outlined"
      />
      <TextField id="outlined-basic" label="FirstName" variant="outlined" />
      <TextField id="outlined-basic" label="LastName" variant="outlined" />
      <TextField id="outlined-basic" label="City" variant="outlined" />
      <TextField
        id="outlined-number"
        label="Phone"
        type="number"
        InputLabelProps={{
          shrink: true,
        }}
        variant="outlined"
      />
      <IconButton type="submit" value="Enregistrer">
        <SendIcon />
      </IconButton>
    </form>
    <ul>
      {items.map((user) => (
        <Contact key={user.id} dispatch={dispatch} user={user} />
      ))}
    </ul>
  </div>
);

const mapToProps = (state) => {
  const { items } = state.contacts;
  return ({ items });
};

export default connect(mapToProps)(Contacts);
