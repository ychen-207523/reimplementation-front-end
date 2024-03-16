import React, { useState, useEffect, useCallback, useMemo } from 'react';
// import { useNavigate } from 'react-router-dom'; // Uncomment if navigation is needed in the future
import Table from "components/Table/Table";
// Removed useAPI import as it's currently not needed for JSON data. Uncomment when fetching data from an API.
// import useAPI from "hooks/useAPI";
import { Button, Container, Row, Col } from 'react-bootstrap';
import { studentTaskColumns as STUDENT_TASK_COLUMNS } from "./StudentTaskColumns"; // Defined in studentTaskColumns.tsx
import { StudentTasksBox as STUDENT_TASKS_BOX } from "./StudentTasksBox";
import testData from './assignments.json';
import "./StudentTasks.css";


/**
 * @author Henry McKinney on March, 2024
 */

const StudentTasks = () => {
  // These hooks can be uncommented and used when integrating API calls
  // const { error, isLoading, data: studentTasks, sendRequest: fetchStudentTasks } = useAPI();
  // const { data: coursesResponse, sendRequest: fetchCourses } = useAPI();

  const duties = testData.duties;
  const taskRevisions = testData.revisions;
  const studentsTeamedWith = testData.studentsTeamedWith;

  // Commented out useEffect for fetching student tasks from an API. Uncomment when needed.
  /*
  useEffect(() => {
    fetchStudentTasks({ url: '/assignments' }); // Verify this is the correct endpoint
  }, [fetchStudentTasks]);
  */

  // Define the table columns with callbacks
  const tableColumns = useMemo(
    () => STUDENT_TASK_COLUMNS(),
    []
  );

  // Memoize the table data to use assignments from testData
  const tableData = useMemo(() => testData.assignments, []);
  
  // Render the component with the Table component and necessary controls
  return (
    <div className="student-tasks">
      <Container fluid className="px-md-4">
        {/* Uncomment and adjust error handling when integrating with API calls
        {error && <div className="alert alert-danger" role="alert">{error}</div>}
        */}
        <Row className="mb-2">
          <Col>
            <h2>Student Tasks</h2>
          </Col>
        </Row>
        <STUDENT_TASKS_BOX
          duties={duties}
          revisions={taskRevisions}
          studentsTeamedWith={studentsTeamedWith} />
        <Table
          data={tableData}
          columns={tableColumns}
          headerCellStyle={{background: "#f2f2f2"}}
          // isLoading prop and related conditions can be uncommented when fetching data asynchronously
          // isLoading={isLoading}
        />
        {/* Any other UI components like modals for confirmation can be put here */}
      </Container>
    </div>
  );
};

export default StudentTasks;
