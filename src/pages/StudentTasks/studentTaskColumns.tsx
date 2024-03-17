import { BsPencilFill, BsPersonXFill } from "react-icons/bs";
import { Row, createColumnHelper } from "@tanstack/react-table";
import ToolTip from "components/ToolTip";


/**
 * @author Henry McKinney on March, 2024
 * @author David White on March, 2024
 */

import { Button } from "react-bootstrap";
// Import to IStudentTask from local interface file
import { IStudentTask } from "./interfaces";

// Use IStudentTask for the Row type
type Fn = (row: Row<IStudentTask>) => void;
// Use IStudentTask for the ColumnHelper type
const columnHelper = createColumnHelper<IStudentTask>();

// Define headers and DB keys for studentTaskColumns

// Accessor represents DB key but for this we are using assignments.json.
// If in production table keys differ from columns accessors below they should be adjusted accordingly.
export const studentTaskColumns = () => [

  columnHelper.accessor("name", {
    header: "Name",
  }),
  columnHelper.accessor("course_name", {
    header: "Course Name",
  }),
  columnHelper.accessor("topic", {
    header: "Topic",
    
  }),
  columnHelper.accessor("current_stage", {
    header: "Current Stage",
  }),
  columnHelper.accessor((row) => row.review_grade?.comment, {
    header: "Review Comment",
    id: "review_comment", // Custom ID since this is a derived accessor
  }),
  columnHelper.accessor("has_badge", {
    header: "Has Badge",
  }),
  columnHelper.accessor("stage_deadline", {
    header: props => (
      <>
        <span>Stage Deadline</span>
          <ToolTip id={`stage-deadline-tooltip`} info={"You can change \"Preferred Time Zone\" in \"Profile\" in the banner."} />
      </>),  }),
  columnHelper.accessor("publishing_rights", {
    header: props => (
      <>
        <span>Publishing Rights</span>
          <ToolTip id={`publishing-rights-tooltip`} info={"Grant publishing rights?"} />
      </>),
  }),
];
