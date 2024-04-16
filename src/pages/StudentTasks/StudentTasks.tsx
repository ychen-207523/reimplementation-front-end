import React, { useState, useEffect, useCallback, useMemo, Suspense, lazy } from 'react';
// import { useNavigate } from 'react-router-dom'; // Uncomment if navigation is needed in the future
// Removed useAPI import as it's currently not needed for JSON data. Uncomment when fetching data from an API.
// import useAPI from "hooks/useAPI";
import { Button, Container, Row, Col } from 'react-bootstrap';
import { studentTaskColumns as STUDENT_TASK_COLUMNS } from "./StudentTaskColumns"; // Defined in StudentTaskColumns.tsx
import testData from './assignments.json';
import "./StudentTasks.css";
import useAPI from "hooks/useAPI";


/**
 * @author Henry McKinney on March, 2024
 * @author David White on March, 2024
 * @author Yunfei Chen on April, 2024
 */

// Use Lazy loading for components. Forward promise after two seconds.
const fakeDelay = (promise: Promise<any>) => {
  return new Promise(res => {
    setTimeout(res, 2000);
  }).then(() => promise)
}

// Load components lazily. 
const Table = lazy(() => fakeDelay(import('../../components/Table/Table')));
const StudentTasksBox = lazy(() => fakeDelay(import('./StudentTasksBox')));


const StudentTasks = () => {
  // These hooks can be uncommented and used when integrating API calls
  const { error, isLoading, data: studentTasks, sendRequest: fetchStudentTasks } = useAPI();
  const { data: coursesResponse, sendRequest: fetchCourses } = useAPI();

  const duties = testData.duties;
  const taskRevisions = testData.revisions;
  const studentsTeamedWith = testData.studentsTeamedWith;

  const fetchData = useCallback(async () => {
    try {
      const [assignments, courses] = await Promise.all([
        fetchStudentTasks({ url: `/student_tasks/list` }),
        fetchCourses({ url: '/courses' }),
      ]);
      // Handle the responses as needed
    } catch (err) {
      // Handle any errors that occur during the fetch
      console.error("Error fetching data:", err);
    }
  }, [fetchStudentTasks, fetchCourses]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);


  let mergedData: Array<any & { courseName?: string }> = [];

  if (studentTasks && coursesResponse) {
    mergedData = studentTasks.data.map((assignment: any) => {
      const course = coursesResponse.data.find((c: any) => c.id === assignment.course_id);
      return { ...assignment, courseName: course ? course.name : 'Unknown' };
    });
  }
  console.log(mergedData)




  // Define the table columns with callbacks
  const tableColumns = useMemo(
    () => STUDENT_TASK_COLUMNS(),
    []
  );

  // Memoize the table data to use assignments from testData
  const tableData = useMemo(() => testData.assignments, []);

  // Create dropdownOptions from tableData
  const dropdownOptions = useMemo(() => {
    // Extract unique values for each column
    const nameOptions = Array.from(new Set(mergedData.map(a => a.assignment)));
    const courseNameOptions = Array.from(new Set(mergedData.map(a => a.courseName)));
    const topicOptions = Array.from(new Set(mergedData.map(a => a.topic)));
    const currentStageOptions = Array.from(new Set(mergedData.map(a => a.current_stage)));
    const reviewCommentOptions = Array.from(
      new Set(
        mergedData
          .map(a =>
            typeof a.review_grade === 'object' ? a.review_grade?.comment : a.review_grade
          )
          .filter(c => c != null)
      )
    );
    const hasBadgeOptions = Array(mergedData.length).fill(false);
    const stageDeadlineOptions = Array.from(new Set(mergedData.map(a => a.stage_deadline)));
    const publishingRightsOptions = Array(mergedData.length).fill(false);

    return {
      assignment: nameOptions,
      courseName: courseNameOptions,
      topic: topicOptions,
      current_stage: currentStageOptions,
      review_comment: reviewCommentOptions,
      has_badge: hasBadgeOptions,
      stage_deadline: stageDeadlineOptions,
      publishing_rights: publishingRightsOptions,
    };
  }, [mergedData]); // Recalculate if tableData changes


  // Render the component with the Table component and necessary controls
  return (
    <div className="student-tasks">
      <Container fluid className="px-md-4">
        {/* Uncomment and adjust error handling when integrating with API calls
        {error && <div className="alert alert-danger" role="alert">{error}</div>}
        */}
        <Row className="mb-2">
          <Col>
            <h2>Assignments</h2>
          </Col>
        </Row>

        {/** Display fallback until task box is loaded. */}
        <Suspense fallback={<span>Loading Task box...</span>}>
          <StudentTasksBox
            duties={duties}
            revisions={taskRevisions}
            studentsTeamedWith={studentsTeamedWith} />
        </Suspense>

        {/** Display fallback until table is loaded. */}
        <Suspense fallback={<span>Loading table...</span>}>
          <Table
            data={mergedData}
            columns={tableColumns}
            columnSearchMode={'dropdown'} // Can be 'none', 'input', or 'dropdown'
            dropdownOptions={dropdownOptions}
            headerCellStyle={{ background: "#f2f2f2" }}
            // ... other props
          />
        </Suspense>
        {/* Any other UI components like modals for confirmation can be put here */}
      </Container>
    </div>
  );
};

export default StudentTasks;
