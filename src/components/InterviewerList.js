import React from 'react';
import PropTypes from 'prop-types'
import InterviewerListItem from 'components/InterviewerListItem';
import 'components/InterviewerList.scss';


function InterviewerList(props) {
  const parseInterviewers = props.interviewers.map((interviewer) =>
    <InterviewerListItem 
      key={interviewer.id}
      avatar={interviewer.avatar}
      name={interviewer.name}
      selected={interviewer.id === props.interviewer}
      setInterviewer={(event) => props.setInterviewer(interviewer.id)} 
    />
  );

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{parseInterviewers}</ul>
    </section>
  );
}

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};

export default InterviewerList;