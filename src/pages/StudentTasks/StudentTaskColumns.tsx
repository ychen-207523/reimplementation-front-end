import { BsPencilFill, BsPersonXFill } from "react-icons/bs";
import { Row, createColumnHelper } from "@tanstack/react-table";
import ToolTip from "components/ToolTip";
import Checkbox from "components/Checkbox"


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

  columnHelper.accessor("assignment", {
    header: "Name",
    filterFn: "equals"
  }),
  columnHelper.accessor("courseName", {
    header: "Course Name",
    filterFn: "equals"
  }),
  columnHelper.accessor("topic", {
    header: "Topic",
    filterFn: "equals"
    
  }),
  columnHelper.accessor("current_stage", {
    header: "Current Stage",
    filterFn: "equals"
  }),
  columnHelper.accessor((row) => row.review_grade?.comment, {
    header: "Review Comment",
    id: "review_comment", // Custom ID since this is a derived accessor
    filterFn: "equals"
  }),
  columnHelper.accessor("has_badge", {
    header: "Has Badge",
    filterFn: "equals"
  }),
  columnHelper.accessor("stage_deadline", {
    header: props => (
      <>
        <span>Stage Deadline</span>
          <ToolTip id={`stage-deadline-tooltip`} info={"You can change \"Preferred Time Zone\" in \"Profile\" in the banner."} />
      </>),
      filterFn: "equals"  }),
  columnHelper.accessor((row) => row.permission_granted.toString(), {
    header: props => (
      <>
        <span>Publishing Rights</span>
          <ToolTip id={`publishing-rights-tooltip`} info={"Grant publishing rights?"} />
      </>),
    id: "permission_granted",
    cell: props => (
      <Checkbox id="checkbox" defaultChecked = {props.getValue() === "true"}></Checkbox>
    ),
    filterFn: "equals",

  }),
];
