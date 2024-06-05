import { useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import SidebarAdmin from "../component/sidebarAdmin";

const AddUser = () => {
    const Navigate = useNavigate()
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        error: "",
        message: ""
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setData(prev => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await Axios.post('http://localhost:3001/api/v1/user', {
                name: data.name,
                email: data.email,
                password: data.password,

            }, {
                withCredentials: true
            })
            if (response.status !== 201) {
                throw Error(response.message)
            }

            setData((prev) => {
                return {
                    ...prev,
                    message: response.statusText
                }
            })
            setTimeout(() => {
                Navigate('/user');
            }, 2000)
        } catch (err) {
            setData((prev) => {
                return {
                    ...prev,
                    error: err.message
                }
            })
        }
    }
    return (

        <main className="flex flex-col w-full h-screen bg-white ">
            <SidebarAdmin />
            <div className="flex pt-4 flex-col  p-3 w-full h-screen  text-white">
                <div className="flex flex-col items-center gap-[10px] w-full justify-center">
                    <h1 className="text-white text-2xl">Tambah User</h1>
                    <input name="name" placeholder="Nama" className="pl-[10px] p-1  text-black rounded-lg" onChange={handleChange} />
                    <input name="email" placeholder="email" className="pl-[10px] p-1  text-black rounded-lg" onChange={handleChange} />
                    <input name="password" placeholder="password" type="password" className="pl-[10px] p-1  text-black rounded-lg" onChange={handleChange} />
                    <h1 className="text-green-700">{data.message}</h1>
                    <button className="font-semibold text-base text-white bg-green-700 p-2 rounded-xl" onClick={handleSubmit}>Tambahkan User</button>
                </div>
            </div>
        </main>

    )
}

export default AddUser
