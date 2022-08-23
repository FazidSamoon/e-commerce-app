import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { productColumn, userColumns, userRows } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useState } from "react";
import { deleteProducts } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";

const Datatable = ({ response, title }) => {
  const [data, setData] = useState(response);
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    console.log(id);
    if (title === "Products") {
      deleteProducts(dispatch, id);
    } else {
    }
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link
              to={
                title === "Products"
                  ? "/products/" + params.row._id
                  : "/users/" + params.row._id
              }
              style={{ textDecoration: "none" }}
            >
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row._id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        Add New {title}
        <Link Link
          to={
            title === "Products"
              ? "/products/new" 
              : "/users/new" 
          } className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        getRowId={(row) => row._id}
        columns={
          title === "Products"
            ? productColumn.concat(actionColumn)
            : userColumns.concat(actionColumn)
        }
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default Datatable;
