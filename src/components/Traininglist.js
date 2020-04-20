import React from 'react';
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css';
//import Moment from 'moment';


export default function Traininglist() {
    const [trainings, setTrainings] = React.useState([]);

    React.useEffect(() => {
        getTrainings();
    }, [])

    const getTrainings = () => {
        fetch('https://customerrest.herokuapp.com/api/trainings')
        .then(response => response.json())
        .then(data => setTrainings(data.content))
        .catch(err => console.error(err))
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
            Header: 'Customer id',
            accessor: 'customerid'
        },
    ]

    return(
        <div>
            <h3>Trainings</h3>
            <ReactTable defaultPageSize={10} filterable={true} data={trainings} columns={columns}/>
            {/* <Moment format="YYYY/MM/DD">{this.props.dateToFormat}</Moment> */}
        </div>
    )
}