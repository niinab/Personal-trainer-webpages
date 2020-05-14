import React, { useState, Component } from 'react';
import Paper from '@material-ui/core/Paper';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {Scheduler, MonthView, Toolbar, DateNavigator, Appointments,TodayButton,} from '@devexpress/dx-react-scheduler-material-ui';

export default function Calendar () {

    const [trainings, setTrainings] = useState([]);

  React.useEffect(() => {
      getCalendar();
  }, [])

    const getCalendar = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
        .then(response => response.json())
        .then(data => setTrainings(data.content))
        .catch(err => console.error(err))
    }

    const showCalendar = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings',
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(trainings)
        }
        )
        .then(response => getCalendar())
        .then(_ => {
        })
        .catch(err => console.error(err))
    }

    return (
        <div>
            <h3>Calendar</h3>
      <Paper>
        <Scheduler
          data={trainings}
        >
          <ViewState
            defaultCurrentDate="2020-05-13"
          />
          <MonthView />
          <Toolbar />
          <DateNavigator />
          <TodayButton />
          <Appointments />
        </Scheduler>
      </Paper>
      </div>
    );
  }
