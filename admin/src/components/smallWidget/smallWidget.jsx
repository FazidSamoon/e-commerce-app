import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import axios from "axios";

const SmallWidget = ({ token }) => {
  const [users, setUsers] = useState([]);
  const accessToken = token.toString();

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/v1/user", {
          headers: { authorization: `Bearer ${accessToken}` },
        });
        setUsers(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUsers();
  }, []);

  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">User ID</TableCell>
            <TableCell className="tableCell">Profile pic</TableCell>
            <TableCell className="tableCell">User name</TableCell>
            <TableCell className="tableCell">Email</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user._id}>
              <TableCell className="tableCell">{user._id}</TableCell>
              <TableCell className="tableCell">
                <div className="cellWrapper">
                  <img
                    src={
                      user.img ||
                      "https://img.favpng.com/25/13/19/samsung-galaxy-a8-a8-user-login-telephone-avatar-png-favpng-dqKEPfX7hPbc6SMVUCteANKwj.jpg"
                    }
                    alt=""
                    className="image"
                  />
                </div>
              </TableCell>
              <TableCell className="tableCell">{user.username}</TableCell>
              <TableCell className="tableCell">{user.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SmallWidget;
