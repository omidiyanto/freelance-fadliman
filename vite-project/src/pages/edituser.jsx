import SidebarAdmin from '../component/sidebarAdmin.jsx'
import { useState, useEffect } from "react"
import Axios from 'axios'
import { useNavigate } from "react-router-dom";

const EditUser = () => {
    const Navigate = useNavigate()
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
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

    console.log(data)
    useEffect(() => {
        Axios.get(`http://localhost:3001/api/v1/user/${location.pathname.split('/')[2]}`).then(response => {
            setData(response.data.data)
        })
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await Axios.patch(`http://localhost:3001/api/v1/user/${location.pathname.split('/')[2]}`, {
                name: data.name,
                email: data.email,
                password: data.password
            }, {
                withCredentials: true
            })
            if (response.status !== 200) {
                throw Error(response.message)
            }

            setData((prev) => {
                return {
                    ...prev,
                    message: response.data.status
                }
            })
            setTimeout(() => {
                Navigate('/user')
            }, 2000)
        } catch (err) {
            console.log(err)
            setData((prev) => {
                return {
                    ...prev,
                    error: err.message
                }
            })
        }
    }
    return (
        <main className="flex w-full h-screen bg-white">
            <SidebarAdmin />
            <div className="flex pt-4 flex-col p-3 w-[80%] h-screen  text-white">
                <div className="flex flex-col gap-[10px] w-[50%]">
                    <h1 className="text-white text-2xl">Edit User</h1>

                    <label htmlFor="name">Nama</label>
                    <input id="name" name="name" placeholder="Nama" value={data && data.name} className="pl-[10px] p-1 text-black rounded-lg" onChange={handleChange} />
                    <label htmlFor="email">Email</label>
                    <input id="email" name="email" placeholder="email" value={data.email} className="pl-[10px] p-1 text-black rounded-lg" onChange={handleChange} />
                    <label htmlFor="password">Password</label>
                    <input id="name" name="password" placeholder="password" value={data.password} className="pl-[10px] p-1 text-black rounded-lg" onChange={handleChange} />
                    <h1 className="text-green-700">{data && data.message}</h1>
                    <button className="font-semibold text-base text-white bg-green-700 p-2 rounded-xl" onClick={handleSubmit}>Update Product</button>
                </div>
            </div>
        </main>
    )

}

export default EditUser
