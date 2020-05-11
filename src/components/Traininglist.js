import React from 'react';
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css';
import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';
import Addtraining from './Addtraining';
import Edittraining from './Edittraining';


export default function Traininglist() {
    const [trainings, setTrainings] = React.useState([]);
    const [msg, setMsg] = React.useState('');
    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
        getTrainings();
    }, [])

    const getTrainings = () => {
        fetch('https://customerrest.herokuapp.com/api/trainings')
        .then(response => response.json())
        .then(data => setTrainings(data.content))
        .catch(err => console.error(err))
    }

    const deleteTraining = (link) => {
        if(window.confirm('Are you sure?')) {
            fetch(link, {method: 'DELETE'})
            .then(repsonse => getTrainings())
            .then(_ => {
                setMsg('Training deleted');
                setOpen(true);
            })
            .catch(err => console.error(err))
        }
    }

        const addTraining = (training) => {
            fetch('https://customerrest.herokuapp.com/trainings',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(training)
            }
            )
            .then(response => getTrainings())
            .then(_ => {
                setMsg('New training added');
                setOpen(true);
            })
            .catch(err => console.error(err))
        }

        const updateTraining = (link, training) => {
            fetch(link, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(training)
            })
            .then(response => getTrainings())
            .then(_ => {
                setMsg('Training updated');
                setOpen(true);
            })
            .catch(err => console.error(err))
        }

        const handleClose = () => {
            setOpen(false);
        }

    const columns = [
        {
            Header: 'Date',
            accessor: 'date'
        },
        {
            Header: 'Duration in minutes',
            accessor: 'duration'
        },
        {
            Header: 'Activity',
            accessor: 'activity'
        },
        {
            Header: 'Customer Id',
            accessor: 'customerid'
        },
        {
            Cell: row => (<Edittraining training={row.original} updateTraining={updateTraining}/>)
        },
        {
            accessor: 'links.self.href',
            filterable: false,
            sortable: false,
            minWidth: 60,
            Cell: row => (<Button size="small" color="secondary" onClick={() => deleteTraining(row.value)}>Delete</Button>)
        },
        
    ]

    return(
        <div>
            <h3>Trainings</h3>
            <Addtraining addTraining={addTraining}/>
            <ReactTable defaultPageSize={10} filterable={true} data={trainings} columns={columns}/>
            <Snackbar
            open={open} autoHideDuration={3000} onClose={handleClose}
            message={msg}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left'
            }}
            />
            {/* <Moment format="YYYY/MM/DD">{this.props.dateToFormat}</Moment> */}
        </div>
    );
}