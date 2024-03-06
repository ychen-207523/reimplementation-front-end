import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Table from "components/Table/Table";
import useAPI from "hooks/useAPI";
import { Button, Container, Row, Col } from 'react-bootstrap';
import { studentTaskColumns as STUDENT_TASK_COLUMNS } from "./studentTaskColumns"; // Defined in studentTaskColumns.tsx

// Import interfaces and types as needed
import { IStudentTask, IUserResponse } from "../../utils/interfaces";
import { Row as TRow } from "@tanstack/table-core/build/lib/types";
import { userColumns as USER_COLUMNS } from "../Users/userColumns"; // Defined  in the utils/interfaces file

const StudentTasks = () => {
  const { error, isLoading, data: studentTasks, sendRequest: fetchStudentTasks } = useAPI();
  const navigate = useNavigate();

  // Function to fetch student tasks
  useEffect(() => {
    fetchStudentTasks({ url: '/student_tasks' }); // Verify this is the correct endpoint
  }, [fetchStudentTasks]);

  // // Define callback functions for any row actions
  // const onEditTask = useCallback((row: Row<IStudentTask>) => {
  //   navigate(`/tasks/edit/${row.original.id}`);
  // }, [navigate]);
  //
  // const onDeleteTask = useCallback((row: Row<IStudentTask>) => {
  //   console.log(`Delete task with ID: ${row.original.id}`);
  // }, []);
  //
  // // Define the table columns with callbacks
  // const tableColumns = useMemo(() => STUDENT_TASK_COLUMNS(onEditTask, onDeleteTask), [onEditTask, onDeleteTask]);

  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState<{
    visible: boolean;
    data?: IUserResponse;
  }>({ visible: false });


  const onEditHandle = useCallback(
    (row: TRow<IUserResponse>) => navigate(`edit/${row.original.id}`),
    [navigate]
  );

  const onDeleteHandle = useCallback(
    (row: TRow<IUserResponse>) => setShowDeleteConfirmation({ visible: true, data: row.original }),
    []
  );

  const tableColumns = useMemo(
    () => USER_COLUMNS(onEditHandle, onDeleteHandle),
    [onDeleteHandle, onEditHandle]
  );

  // Memoize the table data
  const tableData = useMemo(() => {
    if (isLoading || !studentTasks) return [];
    if ('data' in studentTasks) return studentTasks.data; // Assuming 'data' is the array of tasks
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
        <Col className="text-right">
          <Button variant="primary" onClick={() => navigate('/tasks/new')}>Add New Task</Button>
        </Col>
      </Row>
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
