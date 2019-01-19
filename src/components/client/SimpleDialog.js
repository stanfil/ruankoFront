import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';

function SimpleDialog(props) {
    const { onClose, lists, ...other } = props;

    function handleListItemClick(value) {
        onClose(value);
    }

    function handleClose() {
        onClose("")
    }


    return (
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" {...other}>
            <DialogTitle id="simple-dialog-title">选择歌单</DialogTitle>
            <div>
                <List>
                    {lists.map(list => (
                        <ListItem button onClick={() => handleListItemClick(list._id)} key={list._id}>
                            <ListItemText primary={list.title} />
                        </ListItem>
                    ))}
                </List>
            </div>
        </Dialog>
    );
}

SimpleDialog.propTypes = {
    onClose: PropTypes.func,
};

export default SimpleDialog