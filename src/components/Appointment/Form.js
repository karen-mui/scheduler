import React, { useState } from "react";
import Button from "components/Button";
import InterviewerList from "components/InterviewerList";

/* 
Form component tracks the following state:
- student: string
- interviewer: num

Form component has the following actions:
- setStudent: func
- setInterviewer: func

Form component has the following props:
- student: string
- interviewers: array
- interviewer: num (id)
- onSave: func
- onCancel: func
*/

export default function Form(props) {

  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");

  const reset = () => {
    setStudent("");
    setInterviewer(null);
  };

  const cancel = () => {
    reset();
    props.onCancel();
  };

  function validate() {
    if (student === "") {
      setError("Student name cannot be blank");
      return;
    }
    if (interviewer === null) {
      setError("Please select an interviewer")
      return;
    }
    setError("");
    props.onSave(student, interviewer);
  }
  

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form 
        autoComplete="off"
        onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={student}
            onChange={event => setStudent(event.target.value)}
            data-testid= "student-name-input"
          />
        </form>
        <section className="appointment__validation">{error}</section>
        <InterviewerList
          onChange={setInterviewer}
          value={interviewer}
          interviewers={props.interviewers}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={validate}>Save</Button>
        </section>
      </section>
    </main>
  );
}