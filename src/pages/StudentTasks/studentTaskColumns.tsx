import { BsPencilFill, BsPersonXFill } from "react-icons/bs";
import { Row, createColumnHelper } from "@tanstack/react-table";

 /**
  * @author Henry McKinney on March, 2024
 */

import { Button } from "react-bootstrap";
import { IAssignmentResponse as IAssignment } from "../../utils/interfaces";

type Fn = (row: Row<IAssignment>) => void;
const columnHelper = createColumnHelper<IAssignment>();

//Define headers and DB keys for studentTaskColumns
export const studentTaskColumns = () => [
  columnHelper.accessor("name", {
    header: "Name",
  }),
  //TODO: Make this access course name. DB Needs to be updated
  columnHelper.accessor("course_id", {
    header: "Course Name",
  }),
  //TODO: Make this access due date. DB Needs to be updated
  columnHelper.accessor("created_at", {
    header: "Creation Date",
  }),

  columnHelper.accessor("updated_at", {
    header: "Updated Date",
  }),

];
