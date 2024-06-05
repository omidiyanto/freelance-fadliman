import { useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import SidebarUser from "../component/sidebarUser";
import DashboardHeader from '../component/dashboardHeader'

const Pinjam = () => {
    const Navigate = useNavigate()
    const [statusValue, setValue] = useState()
    const [data, setData] = useState({
        name: "",
        unit: "",
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
            const response = await Axios.post('http://localhost:3001/api/v1/pinjaman', {
                name: data.name,
                unit: data.unit

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
                Navigate('/peminjaman');
            }, 2000)
        } catch (err) {
            console.log(err)
            setData((prev) => {
                return {
                    ...prev,
                    error: err.response.data.message
                }
            })
        }
    }
    return (
        <main className="flex flex-col w-screen h-screen bg-white ">
            <SidebarUser />
            <div className="flex pt-4 flex-col p-3 w-full  h-screen  to-[#000] text-white">
                <section className='flex justify-end '>
                    <DashboardHeader />
                </section>
                <div className="flex flex-col gap-[10px]  items-center">
                    <h1 className="text-white text-2xl">Pinjam Barang</h1>
                    <input name="name" placeholder="Nama" className="pl-[10px] p-1  text-black rounded-lg" onChange={handleChange} />
                    <input name="unit" placeholder="jumlah" className="pl-[10px] p-1  text-black rounded-lg" onChange={handleChange} />
                    <h1 className="text-green-700">{data.message}</h1>
                    <h1 className="text-rose-700">{data.error}</h1>
                    <button className="font-semibold text-base text-white bg-green-700 p-2 rounded-xl" onClick={handleSubmit}>Pinjam Barang</button>
                </div>
            </div>

        </main>
    )

}

export default Pinjam
