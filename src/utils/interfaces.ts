/**
 * @author Ankur Mundra on June, 2023
 */

export interface IEditor {
  mode: "create" | "update";
}

export interface IRole {
  id?: number;
  name: string;
  parent_id: number;
}

export interface IInstitution {
  id?: number;
  name: string;
}

export interface IInstructor {
  id?: number;
  name: string;
}

export interface ITA {
  id?: number;
  name: string;
}

export interface IUserResponse {
  id: number;
  name: string;
  email: string;
  full_name: string;
  email_on_review: boolean;
  email_on_submission: boolean;
  email_on_review_of_review: boolean;
  role: { id: number; name: string };
  parent: { id: number | null; name: string | null };
  institution: { id: number | null; name: string | null };
}


export interface IParticipantResponse {
  id: number;
  name: string;
  email: string;
  full_name: string;
  email_on_review: boolean;
  email_on_submission: boolean;
  email_on_review_of_review: boolean;
  role: { id: number; name: string };
  parent: { id: number | null; name: string | null };
  institution: { id: number | null; name: string | null };
}

export interface IUserRequest {
  name: string;
  email: string;
  full_name: string;
  role_id: number;
  parent_id?: number | null;
  institution_id: number;
  email_on_review?: boolean;
  email_on_submission?: boolean;
  email_on_review_of_review?: boolean;
}

export interface IParticipantRequest {
  name: string;
  email: string;
  full_name: string;
  role_id: number;
  parent_id?: number | null;
  institution_id: number;
  email_on_review?: boolean;
  email_on_submission?: boolean;
  email_on_review_of_review?: boolean;
}
export interface IAssignmentRequest {
  name: string,
  directory_path: string,
  spec_location:string,
  private:boolean,
  show_template_review: boolean,
  require_quiz:boolean,
  has_badge:boolean,
  staggered_deadline:boolean,
  is_calibrated:boolean,
}

export interface ITAResponse {
  id: number;
  name: string;
  email: string;
  full_name: string;
  email_on_review: boolean;
  email_on_submission: boolean;
  email_on_review_of_review: boolean;
  role: { id: number; name: string };
  parent: { id: number | null; name: string | null };
  institution: { id: number | null; name: string | null };
}

export interface ITARequest {
  name: string;
}

export interface ILoggedInUser {
  id: number;
  name: string;
  full_name: string;
  role: string;
  institution_id: number;
}

export interface ICourseResponse{
  id: number;
  name: string;
  directory_path: string;
  info: string;
  private: boolean;
  created_at: Date;
  updated_at: Date;
  institution_id: number;
  instructor_id: number;
  institution: { id: number | null; name: string | null };
  instructor: { id: number | null; name: string | null };
}

export interface ICourseRequest{
  name: string;
  directory_path: string;
  info: string;
  private: boolean;
  institution_id: number;
  instructor_id: number;
}

export interface IInstitutionResponse {
  id: number;
  name: string;
}

export enum ROLE {
  SUPER_ADMIN = "Super Administrator",
  ADMIN = "Administrator",
  INSTRUCTOR = "Instructor",
  TA = "Teaching Assistant",
  STUDENT = "Student",
}

export interface IAssignmentResponse {
  id: number;
  name: string;
  course_id: number;
  courseName: string;
  created_at: Date; 
  updated_at: Date; 
  directory_path: string;
  spec_location:string;
  private:boolean;
  show_template_review: boolean;
  require_quiz:boolean;
  has_badge:boolean;
  staggered_deadline:boolean;
  is_calibrated:boolean;
  
}





// Assuming that your transformation function for assignment responses might look like this
export const transformAssignmentResponse = (assignmentResponse: string): IAssignmentResponse => {
  const assignment: IAssignmentResponse = JSON.parse(assignmentResponse);
  // Transform response as needed
  return assignment;
};

