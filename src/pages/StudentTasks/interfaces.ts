export interface Duty {
  name: string;
  dueDate: string;
}

export interface Revision {

}

export interface StudentsTeamedWith {
  [semester: string]: string[];
}


// Interface for matching columns to assignment table columns
export interface IStudentTask {
  name: string;
  course_name: string;
  topic: string;
  current_stage: string;
  review_grade: {
    comment: string;
  };
  has_badge: boolean;
  stage_deadline: Date
  publishing_rights: boolean

}