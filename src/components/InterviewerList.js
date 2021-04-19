import React from "react";
import "components/InterviewerList.scss";
import InterviewerListItem from "components/InterviewerListItem"
import PropTypes from 'prop-types';


function InterviewerList(props) {
  let interviewerList = props.interviewers.map(interviewer => <InterviewerListItem key={interviewer.id} name={interviewer.name} 
  selected = {interviewer.id === props.interviewer} setInterviewer={(event)=>{props.setInterviewer(interviewer.id)}} avatar = {interviewer.avatar}/>)  

  return (
    <section className="interviewers">
        <h4 className="interviewers__header text--light">Interviewer</h4>
        <ul className="interviewers__list">
        {interviewerList}
        </ul>
    </section>
  );
}

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};

export default InterviewerList;