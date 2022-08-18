import { categories } from "../data"
import CatogeryItem from "./CatogeryItem"

const Catogeries = () => {
  return (
    <div className='flex p-5 justify-between'>
        {categories.map((item) => (
            <CatogeryItem item={item} id={item.id} />
        ))}
    </div>
  )
}

export default Catogeries