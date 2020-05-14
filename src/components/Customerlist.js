import React, { useState } from 'react';
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css';
import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';
import Addcustomer from './Addcustomer';
import Editcustomer from'./Editcustomer';
import Addtrainingtocustomer from './Addtrainingtocustomer';

export default function Customerlist() {

    const [customers, setCustomers] = useState([]);
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState('');
    const [training, setTraining] = useState({date: '', duration: '', activity: '', customerId: ''});


    React.useEffect(()=> {
        getCustomers();
    }, [])

    const getCustomers = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then(response => response.json())
        .then(data => setCustomers(data.content))
        .catch(err => console.error(err))
    }

    const addCustomer = (customer) => {
        fetch('https://customerrest.herokuapp.com/api/customers',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(customer)
        }
        )
        .then(response => getCustomers())
        .then(_ => {
            setMsg('New customer added');
            setOpen(true);
        })
        .catch(err => console.error(err))
    }

    const deleteCustomer = (link) => {
        if(window.confirm('Do you want to delete customer?')) {
            fetch(link, {method: 'DELETE'})
            .then(reponse => getCustomers())
            .then(_ => {
                setMsg('Customer deleted');
                setOpen(true);
            })
            .catch(err => console.error(err))
        }
    }

    const updateCustomer = (link, customer) => {
        fetch(link, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(customer)
        })
        .then(reponse => getCustomers())
        .then(_ => {
            setMsg('Customer updated');
            setOpen(true);
        })
        .catch(err => console.error(err))
    }

    const getTrainings = () => {
        fetch('https://customerrest.herokuapp.com/api/trainings')
        .then(response => response.json())
        .then(data => setTraining(data.content))
        .catch(err => console.error(err))
    }

    const addTrainingToCustom = (link, training) => {
        fetch('https://customerrest.herokuapp.com/api/trainings',
        {
            method: 'POST',
            header: {
                'Content-Type': 'application/json'
        },
            body:
            {
                "date": "2018-1-1" ,    
                "activity": "Aerobic",    
                "duration": "45",
                "customer" : "https://localhost:8080/customers/{id}"
            }
        })
        .then(response => getTrainings())
        .then(_=> {
        setMsg('Training added');
        setOpen(true);
        })
        .catch(err => console.error(err))
    }

    const handleClose = () => {
        setOpen(false);
    }

    const columns = [
        {
            Header: 'Firstname',
            accessor: 'firstname'
        },
        {
            Header: 'Lastname',
            accessor: 'lastname'
        },
        {
            Header: 'Streetaddress',
            accessor: 'streetaddress'
        },
        {
            Header: 'Postcode',
            accessor: 'postcode'
        },
        {
            Header: 'City',
            accessor: 'city'
        },
        {
            Header: 'Email',
            accessor: 'email'
        },
        {
            Header: 'Phone',
            accessor: 'phone'
        },
        {
            Cell: row => (<Editcustomer customer={row.original} updateCustomer={updateCustomer}/>)
        },
        {
            Cell: row => (<Addtrainingtocustomer customer={row.original} addTrainingToCustom={addTrainingToCustom}/>)
        },
        {
            accessor: 'content.rel.customer.href',
            filterable: false,
            sortable: false,
            minWidth: 60,
            Cell: row => (<Button size="small" color="secondary" onClick={() => deleteCustomer(row.value)}>Delete</Button>)
        }

    ]

    return(
        <div>
            <h3>Customers</h3>
            <Addcustomer addCustomer={addCustomer}/>
            <ReactTable defaultPageSize={10} filterable={true} data={customers}columns={columns} />
            <Snackbar
            open={open} autoHideDuration={3000} onClose={handleClose}
            message={msg}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left'
            }}
            />
        </div>
    );
}