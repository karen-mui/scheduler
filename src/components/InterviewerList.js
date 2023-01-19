import React from "react";
import PropTypes from 'prop-types';
import 'components/InterviewerList.scss';
import InterviewerListItem from "./InterviewerListItem";

/* receives 3 props:
interviewers: array
setInterviewer:function (to be passed to InterviewerListItem)
interviewer:number
*/

export default function InterviewerList(props) {

  const InterviewerListItemsArray = props.interviewers.map(interviewer => {

    return (
      <InterviewerListItem
        key={interviewer.id}
        {...interviewer}
        setInterviewer={() => props.onChange(interviewer.id)}
        selected={props.value === interviewer.id}
      />
    );
  });

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{InterviewerListItemsArray}</ul>
    </section>
  );
}

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};