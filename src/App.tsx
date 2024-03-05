import React from "react";
import {createBrowserRouter,Navigate,RouterProvider} from "react-router-dom";
import AdministratorLayout from "./layout/Administrator";
import ManageUserTypes, { loader as loadUsers } from "./pages/Administrator/ManageUserTypes";
import Login from "./pages/Authentication/Login";
import Logout from "./pages/Authentication/Logout";
import InstitutionEditor, { loadInstitution } from "./pages/Institutions/InstitutionEditor";
import Institutions, { loadInstitutions } from "./pages/Institutions/Institutions";
import RoleEditor, { loadAvailableRole } from "./pages/Roles/RoleEditor";
import Roles, { loadRoles } from "./pages/Roles/Roles";
import Assignment from './pages/Assignments/Assignment'
import AssignmentEditor from "./pages/Assignments/AssignmentEditor";
import { loadAssignment } from "pages/Assignments/AssignmentUtil";
import ErrorPage from "./router/ErrorPage";
import ProtectedRoute from "./router/ProtectedRoute";
import { ROLE } from "./utils/interfaces";
import NotFound from "./router/NotFound";
import Participants from "pages/Participants/Participant";
import ParticipantEditor from "pages/Participants/ParticipantEditor";
import { loadParticipantDataRolesAndInstitutions } from "pages/Participants/participantUtil";
import RootLayout from "layout/Root";
import UserEditor from "./pages/Users/UserEditor";
import Users from "./pages/Users/User";
import { loadUserDataRolesAndInstitutions } from "./pages/Users/userUtil";
import Home from "pages/Home";
import Questionnaire from "pages/EditQuestionnaire/Questionnaire";
import Courses from "pages/Courses/Course";
import CourseEditor from "pages/Courses/CourseEditor";
import { loadCourseInstructorDataAndInstitutions } from "pages/Courses/CourseUtil";
import StudentTasks from "./pages/StudentTasks/StudentTasks";
import TA from "pages/TA/TA";
import TAEditor from "pages/TA/TAEditor";
import { loadTAs } from "pages/TA/TAUtil";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      errorElement: <ErrorPage />,
      children: [
        { index: true, element: <ProtectedRoute element={<Home />} /> },
        { path: "login", element: <Login /> },
        { path: "logout", element: <ProtectedRoute element={<Logout />} /> },
        { path: "edit-questionnaire", element: <ProtectedRoute element={<Questionnaire />} /> },
        {
          path: "student_tasks",
          element: <ProtectedRoute element={<StudentTasks />} leastPrivilegeRole={ROLE.STUDENT} />,
        },
        {
          path: "assignments",
          element: <ProtectedRoute element={<Assignment />} leastPrivilegeRole={ROLE.TA} />,
          children: [
            {
              path: "new",
              element: <AssignmentEditor mode="create" />,
              loader: loadAssignment,
            },
            {
              path: "edit/:id",
              element: <AssignmentEditor mode="update" />,
              loader: loadAssignment,
            },
          ],
        },
        {
          path: "users",
          element: <ProtectedRoute element={<Users />} leastPrivilegeRole={ROLE.TA} />,
          children: [
            {
              path: "new",
              element: <UserEditor mode="create" />,
              loader: loadUserDataRolesAndInstitutions,
            },
            {
              path: "edit/:id",
              element: <UserEditor mode="update" />,
              loader: loadUserDataRolesAndInstitutions,
            },
          ],
        },
        {
          path: "student_tasks/participants",
          element: <Participants type="student_tasks" id={1} />,
          children: [
            {
              path: "new",
              element: <ParticipantEditor mode="create" type="student_tasks" />,
              loader: loadParticipantDataRolesAndInstitutions,
            },
            {
              path: "edit/:id",
              element: <ParticipantEditor mode="update" type="student_tasks" />,
              loader: loadParticipantDataRolesAndInstitutions,
            },
          ]
        },
        {
          path: "courses/participants",
          element: <Participants type="courses" id={1} />,
          children: [
            {
              path: "new",
              element: <ParticipantEditor mode="create" type="courses" />,
              loader: loadParticipantDataRolesAndInstitutions,
            },
            {
              path: "edit/:id",
              element: <ParticipantEditor mode="update" type="courses" />,
              loader: loadParticipantDataRolesAndInstitutions,
            },
          ],
        },
        // Fixed the missing comma and added an opening curly brace
        {
          path: "courses",
          element: <ProtectedRoute element={<Courses />} leastPrivilegeRole={ROLE.TA} />,
          children: [
            {
              path: "new",
              element: <CourseEditor mode="create" />,
              loader: loadCourseInstructorDataAndInstitutions,
            },
            {
              path: "edit/:id",
              element: <CourseEditor mode="update" />,
              loader: loadCourseInstructorDataAndInstitutions,
            },
            {
              path: ":courseId/tas",
              element: <ProtectedRoute element={<TA />} leastPrivilegeRole={ROLE.TA} />,
              children: [
                {
                  path: "new",
                  element: <TAEditor mode="create" />,
                  loader: loadTAs,
                },
              ]
            },
          ], // Added the missing closing curly brace
        },
        {
          path: "administrator",
          element: (
            <ProtectedRoute element={<AdministratorLayout />} leastPrivilegeRole={ROLE.ADMIN} />
          ),
          children: [
            {
              id: "roles",
              path: "roles",
              element: <Roles />,
              loader: loadRoles,
              children: [
                {
                  path: "new",
                  element: <RoleEditor mode="create" />,
                },
                {
                  id: "edit-role",
                  path: "edit/:id",
                  element: <RoleEditor mode="update" />,
                  loader: loadAvailableRole,
                },
              ],
            },
            {
              path: "institutions",
              element: <Institutions />,
              loader: loadInstitutions,
              children: [
                {
                  path: "new",
                  element: <InstitutionEditor mode="create" />,
                },
                {
                  path: "edit/:id",
                  element: <InstitutionEditor mode="update" />,
                  loader: loadInstitution,
                },
              ],
            },
            {
              path: ":user_type",
              element: <ManageUserTypes />,
              loader: loadUsers,
              children: [
                {
                  path: "new",
                  element: <Navigate to="/users/new" />,
                },
                {
                  path: "edit/:id",
                  element: <Navigate to="/users/edit/:id" />,
                },
              ],
            },
            // Add the "Questionnaire" route here
            {
              path: "questionnaire",
              element: <Questionnaire />,
            },
          ],
        },
        { path: "*", element: <NotFound /> },
        // Add the "Questionnaire" route here if it's not under the administrator section
        { path: "questionnaire", element: <Questionnaire /> },
      ],
    },
  ]);
  
  return <RouterProvider router={router} />;
}

export default App;
