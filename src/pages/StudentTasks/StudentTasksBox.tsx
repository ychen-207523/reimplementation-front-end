import React from 'react';
import "./StudentTasksBox.css"
import {Duty, Revision, StudentsTeamedWith} from './interfaces'

interface StudentTasksBoxParampeters {
  duties: Duty[];
  revisions: Revision[];
  studentsTeamedWith: StudentsTeamedWith;
}

/**
 * @author Yunfei Chen on March, 2023
 */
export const StudentTasksBox: React.FC<StudentTasksBoxParampeters> = ({ duties, revisions, studentsTeamedWith }) => {

  return (
    <div className="taskbox" style={{ width: '18%', display: 'inline', float: 'left', marginRight: '10px' }}>
      <strong>
        &nbsp;&nbsp;<span className="tasknum">&nbsp;{duties.length}&nbsp;</span> Tasks not yet started<br />
      </strong>
      <br />

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

    </div>
  )

}