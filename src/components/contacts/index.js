import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import SettingsIcon from '@material-ui/icons/Settings';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import WorkIcon from '@material-ui/icons/Work';
import { connect } from 'react-redux';
import { addContact } from './action';

const Contact = ({ id, firstName, phone }) => (
  <div>
    <ListItem>
      <ListItemAvatar>
        <Avatar>
          <WorkIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={`${firstName} ${id}`} secondary={`${phone}`} />
      <IconButton color="secondary">
        <DeleteIcon />
      </IconButton>
    </ListItem>
  </div>
);

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
    <List>
      {items.map((item) => (
        <div key={item.id}>
          <Contact id={item.id} firstName={item.firstName} phone={item.phone} />
        </div>
      ))}
    </List>
  </div>
);
const mapToProps = (state) => {
  const { items } = state.contacts;

  return ({ items });
};

export default connect(mapToProps)(Contacts);
