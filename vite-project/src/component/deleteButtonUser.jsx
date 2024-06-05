
import Axios from "axios";
import { useNavigate } from "react-router-dom";

const DeleteButton = (props) => {
    const Navigate = useNavigate()

    const handleDeleteButton = async () => {
        await Axios.delete(`http://localhost:3001/api/v1/user/${props.id}`)
        location.reload()
        Navigate('/user')
    }
    return (
        <main>
            <button className="border p-2 rounded-xl bg-red-800 text-white p-2 rounded-xl" onClick={handleDeleteButton}>Delete</button>
        </main>
    )
}

export default DeleteButton
