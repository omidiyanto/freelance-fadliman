import Axios from "axios";
import { useNavigate } from "react-router-dom";

const DeleteButton = (props) => {
    const Navigate = useNavigate()

    const handleDeleteButton = async () => {
       const response = await Axios.delete(`http://localhost:3001/api/v1/product/${props.id}`)
        console.log(response)
        location.reload()
        Navigate('/data-barang')
    }
    return (
        <main>
            <button className="border p-2 rounded-xl bg-red-800 text-white p-2 rounded-xl" onClick={handleDeleteButton}>Delete</button>
        </main>
    )
}

export default DeleteButton
