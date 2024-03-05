import { Button, Col, Container, Row } from "react-bootstrap";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useAPI from "../../hooks/useAPI";
import { RootState } from "../../store/store";

const StudentTasks = () => {
  const { error, isLoading, data: studentTasksResponse, sendRequest: fetchStudentTasks } = useAPI();


  const auth = useSelector(
    (state: RootState) => state.authentication,
    (prev, next) => prev.isAuthenticated === next.isAuthenticated
  );
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const fetchData = useCallback(async () => {
    try {
      fetchStudentTasks({ url: `/assignments` })
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  }, [fetchStudentTasks]);

  useEffect(() => {
      fetchData();

  }, [fetchData,  auth.user.id]);

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md="auto">
          <h1>Hello World</h1>
          {/*{isLoading && <p>Loading...</p>}*/}
          {/*{error && <p>Error: {error}</p>}*/}
          {studentTasksResponse && (
            <div>
              <h2>Student Tasks Response</h2>
              <pre>{JSON.stringify(studentTasksResponse, null, 2)}</pre>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default StudentTasks;