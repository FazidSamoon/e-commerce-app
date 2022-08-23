import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import Datatable from "../../components/datatable/Datatable"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { getAllCients } from "../../redux/apiCalls"

const List = () => {
  const dispatch = useDispatch()
  const clients = useSelector(state => state.client.clients)
  useEffect(() => {
    getAllCients(dispatch)
  },[])
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <Datatable response={clients}  title={"Clients"}/>
      </div>
    </div>
  )
}

export default List