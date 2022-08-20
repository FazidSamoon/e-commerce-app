import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import Widget from "../../components/widget/Widget";
import SmallWidget from "../../components/smallWidget/smallWidget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import OrderWidget from "../../components/table/OrderWidget";
import { useState } from "react";
import { useEffect } from "react";
import axios from 'axios'

const Home = ({token}) => {
  const [income , setIncome] = useState([])
  const [ percentage , setPercentage ] = useState(0)
  const [revenue , setRevenue] = useState(Number(0))
  // const token = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser.token
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
    return()=>{

    }
  }, [])
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <Widget type="user"  amount={income} percentage={percentage}/>
          {/* <Widget type="order" /> */}
          <Widget type="earning" amount={revenue} percentage={percentage}/>
          {/* <Widget type="balance" /> */}
        </div>
        <div className="charts">
          <Featured />
          <Chart title="Last 6 Months (Revenue)" aspect={2 / 1} />
        </div>
        <div className="listContainer">
          <div className="listTitle">Latest Transactions</div>
          <OrderWidget token={token} />
        </div>
        <div className="listContainer">
          <div className="listTitle">Latest Users</div>
          <SmallWidget token={token} />
        </div>
      </div>
    </div>
  );
};

export default Home;
