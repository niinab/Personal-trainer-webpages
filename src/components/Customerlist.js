import React from 'react';
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css';
// import { makeStyles } from '@material-ui/core/styles';

// const useStyles = makeStyles({
//     root: {
//       minWidth: 275,
//     },
//     bullet: {
//       display: 'inline-block',
//       margin: '0 2px',
//       transform: 'scale(0.8)',
//     },
//     title: {
//       fontSize: 14,
//     },
//     pos: {
//       marginBottom: 12,
//     },
//   });

export default function Customerlist() {

    const [customers, setCustomers] = React.useState([]);
    const [open, setOpen] = React.useState(false);

    React.useEffect(()=> {
        getCustomers();
    }, [])

    const getCustomers = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then(response => response.json())
        .then(data => setCustomers(data.content))
        .catch(err => console.error(err))
    }

    const getCustomById = () => {
        fetch('https://customerrest.herokuapp.com/api/customers/{id}')
        .then(response => response.json())
        .then(data => setCustomers(data.content))
        .catch(err => console.error(err))
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
        }
    ]

    return(
        <div>
            <h3>Customers</h3>
            <ReactTable defaultPageSize={10} filterable={true} data={customers}columns={columns} />

        </div>
    )
}