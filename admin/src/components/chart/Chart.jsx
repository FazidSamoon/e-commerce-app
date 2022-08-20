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

const Chart = ({ aspect, title }) => {
  const [userStats, setUserStats] = useState([]);
  const token = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser.token
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

  useEffect(()=> {
    const getStats = async() => {
      try {
        const response = await axios.get("http://localhost:5000/api/v1/order/stats" , {
          headers : {authorization : `Bearer ${token}`}
        })

        response.data.map((item) => {
          setUserStats((prev) => [
            ...prev,
            {name: MONTHS[item._id - 1], "Total" : item.total}
          ])
        })
      } catch (error) {
        console.log(error);
      }
    }
    getStats()
  },[])

  console.log(userStats);
  return (
    <div className="chart">
      <div className="title">{title}</div>
      <ResponsiveContainer width="100%" aspect={aspect}>
        <AreaChart
          width={730}
          height={250}
          data={userStats}
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

export default Chart;
