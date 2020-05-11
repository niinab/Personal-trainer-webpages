import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function Addtrainingtocustomer(props) {

const [open, setOpen] = useState(false);
const [training, setTraining] = useState({date: '', duration: '', activity: '', customerId: ''});

const handleClickOpen = () => {
    setOpen(true);
}

const handleClose = () => {
        props.addTrainingToCustomer(props.training.links.href, training);
        setOpen(false);
    }

const handleCancel = () => {
        setOpen(false);
    }

    const inputChanged = (event) => {
        setTraining({...training, [event.target.name]: event.target.value});
    }

return(
    <div>
    <Button style={{margin: 10}} variant="outlined" color="primary" onClick={handleClickOpen}>
        Add training
        </Button>
        <Dialog open={open} disableBackdropClick={true} disableEscapeKeyDown={true} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">New training</DialogTitle>
        <DialogContent>
            <TextField
            autoFocus
            margin="dense"
            name="date"
            value={training.date}
            onChange={inputChanged}
            label="Date"
            fullWidth
            />
             <TextField
            autoFocus
            margin="dense"
            name="duration"
            value={training.duration}
            onChange={inputChanged}
            label="Duration in minutes"
            fullWidth
            />
             <TextField
            autoFocus
            margin="dense"
            name="activity"
            value={training.activity}
            onChange={inputChanged}
            label="Activity"
            fullWidth
            />
             <TextField
            autoFocus
            margin="dense"
            name="customer"
            value={training.customerId}
            onChange={inputChanged}
            label="Customer"
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