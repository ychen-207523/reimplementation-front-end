import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Table from "components/Table/Table";
import useAPI from "hooks/useAPI";
import { Button, Container, Row, Col } from 'react-bootstrap';
import { studentTaskColumns as STUDENT_TASK_COLUMNS } from "./studentTaskColumns"; // Defined in studentTaskColumns.tsx
import { StudentTasksBox as STUDENT_TASKS_BOX} from "./StudentTasksBox";
import testData from './assignments.json'

/**
 * @author Henry McKinney on March, 2024
 */

const StudentTasks = () => {
  const { error, isLoading, data: studentTasks, sendRequest: fetchStudentTasks } = useAPI();
  const { data: coursesResponse, sendRequest: fetchCourses } = useAPI();


  const duties = testData.duties
  const taskRevisions = testData.revisions
  const studentsTeamedWith = testData.studentsTeamedWith


  // Function to fetch student tasks
  useEffect(() => {
    fetchStudentTasks({ url: '/assignments' }); // Verify this is the correct endpoint
  }, [fetchStudentTasks]);

  // Define the table columns with callbacks
  const tableColumns = useMemo(
    () => STUDENT_TASK_COLUMNS(),
    []
  );

  // Memoize the table data
  const tableData = useMemo(() => {
    if (isLoading || !studentTasks) return [];
    // Data should be the array of tasks
    if ('data' in studentTasks) return studentTasks.data;
    return studentTasks; // Or just return studentTasks if it's already the correct format
  }, [studentTasks, isLoading]);

  // Render the component with the Table component and necessary controls
  return (
    <Container fluid className="px-md-4">
      {error && <div className="alert alert-danger" role="alert">{error}</div>}
      <Row className="mb-2">
        <Col>
          <h2>Student Tasks</h2>
        </Col>
      </Row>
      <STUDENT_TASKS_BOX
      duties={duties}
      revisions={taskRevisions}
      studentsTeamedWith={studentsTeamedWith}/>
      <Table
        data={tableData}
        columns={tableColumns}
        // isLoading={isLoading}

        // Add additional props for Table as needed, such as pagination
      />
      {/* Any other UI components like modals for confirmation can be put here */}
    </Container>
  );
};
export default StudentTasks;
