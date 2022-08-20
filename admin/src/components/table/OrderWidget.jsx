import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import axios from 'axios'
import {format} from 'timeago.js'

const OrderWidget = ({token}) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/v1/order" , {
          headers: { authorization: `Bearer ${token}` },
        })
        setOrders(response.data)
      } catch (error) {
        console.log(error);
      }
    };
    getOrders()
  }, []);
  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">Tracking ID</TableCell>
            <TableCell className="tableCell">Product</TableCell>
            <TableCell className="tableCell">Customer</TableCell>
            <TableCell className="tableCell">Amount</TableCell>
            <TableCell className="tableCell">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order._id}>
              <TableCell className="tableCell">{order._id}</TableCell>
              <TableCell className="tableCell">{order.userID}</TableCell>
              <TableCell className="tableCell">{format(order.createdAt)}</TableCell>
              <TableCell className="tableCell">{order.amount}</TableCell>
              <TableCell className="tableCell">
                <span className={`status ${order.status}`}>{order.status}</span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default OrderWidget;
