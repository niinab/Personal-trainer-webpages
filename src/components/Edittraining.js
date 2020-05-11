import React, { useState } from 'react';
import { DialogContent } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function EditTraining(props) {
    const [open, setOpen] = useState(false);
    const [training, setTraining] = useState({date: '', duration: '', activity: '', customerId: ''});


    const handleClickOpen = () => {
        console.log(props.training);
        setTraining({date: props.training.date, duration: props.training.duration, activity: props.training.duration, custromerId: props.training.customerId});
        setOpen(true);
    }

    const handleClose = () => {
        props.updateTraining(props.training.links.href, training);
        setOpen(false);
    }

    const handleCancel = () => {
        setOpen(false);
    }

    const inputChanged = (event) => {
        setTraining({...training, [event.target.name] : event.target.value});
    }

        return(
            <div>
             <Button size="small" color="primary" onClick={handleClickOpen}>
            Edit</Button>
                <Dialog open={open} diableBackdropClick={true} disableEscapeKeyDown={true} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Edit training</DialogTitle>
                <DialogContent>
                    <TextField
                    autoFocus
                    margin="dense"
                    id="date"
                    name="date"
                    value={training.date}
                    onChange={inputChanged}
                    label="Date"
                    fullWidth
                    />
                    <TextField
                    autoFocus
                    margin="dense"
                    id="duration"
                    name="duration"
                    value={training.duration}
                    onChange={inputChanged}
                    label="Duration"
                    fullWidth
                    /><TextField
                    autoFocus
                    margin="dense"
                    id="activity"
                    name="activity"
                    value={training.activity}
                    onChange={inputChanged}
                    label="Activity"
                    fullWidth
                    /><TextField
                    autoFocus
                    margin="dense"
                    id="customerId"
                    name="customerId"
                    value={training.customerId}
                    onChange={inputChanged}
                    label="Customer Id"
                    fullWidth
                    />
        </DialogContent>
        <DialogActions>
                    <Button onClick={handleCancel} color="primary">
                    Cancel
                    </Button>
                    <Button onClick={handleClose} color="primary">
                    Save
                    </Button>
                </DialogActions>
                </Dialog>

            </div>
        )
    }
