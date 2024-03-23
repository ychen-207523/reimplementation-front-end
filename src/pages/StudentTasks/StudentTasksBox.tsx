import React from 'react';
import {Duty, Revision, StudentsTeamedWith} from './interfaces'

interface StudentTasksBoxParameter {
  duties: Duty[];
  revisions: Revision[];
  studentsTeamedWith: StudentsTeamedWith;
}

/**
 * @author Yunfei Chen on March, 2023
 */
export const StudentTasksBox: React.FC<StudentTasksBoxParameter> = ({ duties, revisions, studentsTeamedWith }) => {

  const calculateDaysLeft = (dueDate: string) => {
    const today = new Date();
    const date = new Date(dueDate);
    const differenceInTime = date.getTime() - today.getTime();
    const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));
    return differenceInDays > 0 ? differenceInDays : 0;
  };

  const tasksNotStarted = duties.filter(duty => (calculateDaysLeft(duty.dueDate) > 0))

  return (
    <div className="taskbox" style={{ width: '18%', display: 'inline', float: 'left', marginRight: '10px' }}>
      <strong>
        &nbsp;&nbsp;<span className="tasknum">&nbsp;{tasksNotStarted.length}&nbsp;</span> Tasks not yet started<br />
      </strong>
      <br />
      {tasksNotStarted.map(task => {
        const daysLeft = calculateDaysLeft(task.dueDate);
        const dayText = daysLeft > 1 ? 'days' : 'day';
        return (
          <div>
            <span> &nbsp; &raquo; {task.name} ({daysLeft} {dayText} left)</span>
          </div>
        )
      })}

      <br />
      <strong>
        &nbsp;&nbsp;<span className="revnum">&nbsp;{revisions.length}&nbsp;</span> Revisions<br />
      </strong>
      <br />

      <br />
      <strong>
        Students who have teamed with you<br />
      </strong>
      <br />

      {
        Object.entries(studentsTeamedWith).map(([semester, students]) => (
          <div>
            <strong>&nbsp;&nbsp;<span className="tasknum">&nbsp;
              {students.length}&nbsp;</span>
              &nbsp;&nbsp;{semester}
              </strong><br />
            {students.map((student => (
              <div>
                <span className="notification">&nbsp; &raquo; {student} </span>
              </div>
            )))}
            <br/>
          </div>
        ))
      }
    </div>
  )

}

export default StudentTasksBox;