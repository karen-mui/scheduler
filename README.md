# Interview Scheduler

## Project Description

Interview Scheduler is a SPA (Single Page Application) for tracking students interviews built with the latest tools and techniques for optimized user experience. The App utilizes React built-in and custom hooks and allows users to add, edit and delete appointments in real time. Data is persisted by the API server using a PostgreSQL database. The client application communicates with an API server over HTTP, using the JSON format. For quality assurance, the project follows best practices of TDD (Test Driven Development), where individual Components are tested in isolation as well as End-to-End testing is performed.

## Project Features

- Interviews can be booked between Monday and Friday.
- The user can switch between weekdays.
- The user can book an interview in an empty appointment slot.
- Interviews are booked by typing in a student name and clicking on an interviewer from a list of available interviewers.
- The user can cancel an existing interview.
- The user can edit the details of an existing interview.
- The list of days informs the user how many slots are available for each day.
- The expected day updates the number of spots available when an interview is booked or canceled.
- The user is presented with a confirmation when they attempt to cancel an interview.
- The user is shown an error if an interview cannot be saved or deleted.
- The user is shown a status indicator while asynchronous operations are in progress.
- When the user presses the close button of the error they are returned to the Form or Show view (skipping Status and Confirm).
- The application makes API requests to load and persist data. We do not lose data after a browser refresh.

### Daily View
!["Daily View"](https://github.com/karen-mui/scheduler/blob/master/docs/Daily%20View%20(Deleted%20Appointment).png?raw=true)
The user clicks on the left panel to slect a different day of the week. When clicked, the appointment slots for that weekday will show.

### Form for Creating or Editing
!["Form for Editing or Creating"](https://github.com/karen-mui/scheduler/blob/master/docs/Edit%20Form.png?raw=true)
The user can edit or add a new appointment. This is the form.

### Cancellation Confirmation
!["Cancellation Confirmation"](https://github.com/karen-mui/scheduler/blob/master/docs/Delete%20Confirmation.png?raw=true)
If the user chooses to delete an appointment, a confirmation sign will appear.

### Updated View after Appointment Change
!["Updated View after Appointment Change"](https://github.com/karen-mui/scheduler/blob/master/docs/Daily%20View%20(Deleted%20Appointment).png?raw=true)
Once saved or deleted, the appointment spot will appear blank and the "spots remaining" indicator on the left panel will be updated accordingly.

## Setup

Install dependencies with `npm install`.

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```
