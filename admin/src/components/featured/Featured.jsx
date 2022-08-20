import "./featured.scss";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import axios from 'axios'
import { useState } from "react";
import { useEffect } from "react";
const Featured = () => {
  const [income , setIncome] = useState([])
  const [ percentage , setPercentage ] = useState(0)
  const [revenue , setRevenue] = useState(Number(0))
  const token = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser.token
  useEffect(() => {
    const getIncome = async() => {
      try {
        const response = await axios.get("http://localhost:5000/api/v1/order/stats" , {
          headers : {authorization : `Bearer ${token}`}
        })
        setIncome(response.data)
        setPercentage((response.data[1].total * 100) / response.data[0].total - 100)
        setRevenue(response.data.map((i) => i.total).reduce((x,y) => x + y , 0)) 
      } catch (error) {
        console.log(error); 
      }
    } 
    getIncome() 
  }, [])

  return (
    <div className="featured">
      <div className="top">
        <h1 className="title">Total Revenue</h1>
        <MoreVertIcon fontSize="small" />
      </div>
      <div className="bottom">
        <div className="featuredChart">
          <CircularProgressbar value={70} text={"70%"} strokeWidth={5} />
        </div>
        <p className="title">Total sales made today</p>
        <p className="amount">$ {revenue}</p>
        <p className="desc">
          Previous transactions processing. Last payments may not be included.
        </p>
        <div className="summary">
          <div className="item">
            <div className="itemTitle">Target</div>
            <div className="itemResult negative">
              <KeyboardArrowDownIcon fontSize="small"/>
              <div className="resultAmount">$12.4k</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Last Week</div>
            <div className="itemResult positive">
              <KeyboardArrowUpOutlinedIcon fontSize="small"/>
              <div className="resultAmount">$12.4k</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Last Month</div>
            <div className="itemResult positive">
              <KeyboardArrowUpOutlinedIcon fontSize="small"/>
              <div className="resultAmount">$12.4k</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
