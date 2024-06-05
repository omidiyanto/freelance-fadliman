import SidebarAdmin from "../component/sidebarAdmin"
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react"
import Axios from "axios"

const Edit = () => {
    const Navigate = useNavigate()
    const [data, setData] = useState({
        name: "",
        supplier: "",
        serial_number: "",
        expired: "",
        unit: "",
        Owner: "",
        status: "",
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

    useEffect(() => {
        Axios.get(`http://localhost:3001/api/v1/product/${location.pathname.split('/')[2]}`).then(response => {
            setData(response.data.data)
        })
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await Axios.patch(`http://localhost:3001/api/v1/product/${location.pathname.split('/')[2]}`, {
                name: data.name,
                supplier: data.supplier,
                serial_number: data.serial_number,
                expired: data.expired,
                unit: data.unit,
                owner: data.owner,
            }, {
                withCredentials: true
            })
            if (response.status !== 200) {
                throw Error(response.message)
            }
            console.log(response)

            setData((prev) => {
                return {
                    ...prev,
                    message: response.data.status
                }
            })
            setTimeout(()=>{
                Navigate('/data-barang')
            },2000)
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
                    <h1 className="text-white text-2xl">Edit Barang</h1>
                    
                    <label htmlFor="name">Nama</label>
                    <input id="name" name="name" placeholder="Nama" value={data.name} className="pl-[10px] p-1 text-black rounded-lg" onChange={handleChange} />
                    
                    <label htmlFor="supplier">Supplier</label>
                    <input id="supplier" name="supplier" placeholder="Supplier" value={data.supplier} className="pl-[10px] p-1 text-black rounded-lg" onChange={handleChange} />
                    
                    <label htmlFor="serial_number">Nomor Serial</label>
                    <input id="serial_number" name="serial_number" placeholder="Nomor Serial" value={data.serial_number} className="pl-[10px] p-1 text-black rounded-lg" onChange={handleChange} />
                    
                    <label htmlFor="expired">Expired</label>
                    <input id="expired" name="expired" type="date" value={data.expired && data.expired.split('T')[0]} className="pl-[10px] p-1 text-black rounded-lg" onChange={handleChange} />
                    
                    <label htmlFor="unit">Jumlah</label>
                    <input id="unit" name="unit" placeholder="Jumlah" value={data.unit} className="pl-[10px] p-1 text-black rounded-lg" onChange={handleChange} />
                    
                    <label htmlFor="owner">Owner</label>
                    <input id="owner" name="owner" placeholder="Owner" value={data.Owner} className="pl-[10px] p-1 text-black rounded-lg" onChange={handleChange} />
                    
                    <h1 className="text-green-700">{data && data.message}</h1>
                    <button className="font-semibold text-base text-white bg-green-700 p-2 rounded-xl" onClick={handleSubmit}>Update Product</button>
                </div>
            </div>
        </main>
    )
}

export default Edit

