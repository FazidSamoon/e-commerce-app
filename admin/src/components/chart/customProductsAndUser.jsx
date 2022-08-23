import "./chart.scss";
import {
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useState } from "react";
import { useMemo } from "react";
import { useEffect } from "react";
import axios from 'axios'

const CustomProductsAndUser = ({ aspect, title , url }) => {
  const [stats , setStats] = useState([])
  const [orders, setOrders] = useState([]);
  const token = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser.token;
  const MONTHS = useMemo(() => [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ],[]);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const response = await axios.get(`${url}` , {
          headers: { authorization: `Bearer ${token}` },
        });
        response.data.map((item) => {
          setStats((prev) => [
            ...prev,
            {name: MONTHS[item._id - 1], "Total" : item.total}
          ])
        })
      } catch (error) {
        console.log(error);
      }
    };
    getOrders();
  }, []);

  return (
    <div className="chart">
      <div className="title">{title}</div>
      <ResponsiveContainer width="100%" aspect={aspect}>
        <AreaChart
          width={730}
          height={250}
          data={stats}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" stroke="gray" />
          <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="Total"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#total)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomProductsAndUser;
