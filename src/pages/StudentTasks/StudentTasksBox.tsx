import React from 'react';
import "./StudentTasksBox.css"

/**
 * @author Yunfei Chen on March, 2023
 */
const taskNotStarted = [];
const taskRevisions = [];
const studentsTeamedWith = {};
export const StudentTasksBox = () => {

  return (
    <div className="taskbox" style={{ width: '18%', display: 'inline', float: 'left', marginRight: '10px' }}>
      <strong>
        &nbsp;&nbsp;<span className="tasknum">&nbsp;{taskNotStarted.length}&nbsp;</span> Tasks Not Started<br />
      </strong>
      <br />

      <br />
      <strong>
        &nbsp;&nbsp;<span className="revnum">&nbsp;{taskRevisions.length}&nbsp;</span> Revisions<br />
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