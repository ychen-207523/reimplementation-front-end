// Interface for the side table
export interface Duty {
  name: string;
  dueDate: string;
}
// The Revision's purpose is unknown right now, please improve or delete it
export interface Revision {

}
// Interface for the people have worked with the user
// stored as an array of string for each semester
export interface StudentsTeamedWith {
  [semester: string]: string[];
}


// Interface for matching columns to assignment table columns
export interface IStudentTask {
  assignment: string;
  courseName: string;
  topic: string;
  current_stage: string;
  review_grade: {
    comment: string;
  };
  has_badge: boolean;
  stage_deadline: Date
  permission_granted: boolean

}