import { createColumnHelper, Row } from "@tanstack/react-table";
import { Button } from "react-bootstrap";
import { BsPencilFill, BsTrashFill } from "react-icons/bs";
import { IStudentTask } from "../../utils/interfaces"; // Interface is defined  in  utils/interfaces file

/**
 * @author Henry McKinney on March, 2024
 */

type EditFn = (row: Row<IStudentTask>) => void;
type DeleteFn = (row: Row<IStudentTask>) => void;

const columnHelper = createColumnHelper<IStudentTask>();

export const studentTaskColumns = (handleEdit: EditFn, handleDelete: DeleteFn) => [
  columnHelper.accessor('id', {
    header: 'ID',
    cell: info => info.getValue(),
    enableColumnFilter: false,
    enableSorting: false,
  }),

  columnHelper.accessor('name', {
    header: 'Assignment Name',
    cell: info => info.getValue(),
    enableSorting: true,
  }),

  columnHelper.accessor('course_id', {
    header: 'Course ID',
    cell: info => info.getValue(),
    enableSorting: true,
  }),

  columnHelper.accessor('max_team_size', {
    header: 'Max Team Size',
    cell: info => info.getValue(),
    enableSorting: true,
  }),

  // columnHelper.accessor('staggered_deadline', {
  //   header: 'Deadline',
  //   cell: info => info.getValue() ? new Date(info.getValue()).toLocaleDateString() : '',
  //   enableSorting: true,
  // }),

  columnHelper.display({
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => (
      <>
        <Button variant="outline-primary" size="sm" onClick={() => handleEdit(row)}>
          <BsPencilFill />
        </Button>
        <Button
          variant="outline-danger"
          size="sm"
          className="ms-2"
          onClick={() => handleDelete(row)}
        >
          <BsTrashFill />
        </Button>
      </>
    ),
  }),
];
