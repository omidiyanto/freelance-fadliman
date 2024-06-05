import { useState } from "react";
import  Axios  from "axios";
import { useNavigate } from "react-router-dom";
import SidebarAdmin from "../component/sidebarAdmin";
import DropdownStatus from "../utils/dropdownStatus";
const TambahBarang = () => {
    const [value, setValue] = useState()
    const Navigate = useNavigate()
    const [data, setData] = useState({
        name: "",
        supplier: "",
        serial_number: "",
        expired: "",
        unit: "",
        owner: "",
        status: "",
        error : "",
        message : "",
        tanggal_pembelian : ""
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
            const response = await Axios.post('http://localhost:3001/api/v1/product', {
                name: data.name,
                supplier: data.supplier,
                serial_number : data.serial_number,
                expired :data.expired,
                unit : data.unit,
                owner : data.owner,
                status : value.value && value.value,
                tanggal_pembelian : data.tanggal_pembelian
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
            Navigate('/data-barang');
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

    const getValueStatus = (value) => {
        return setValue((prev) => {
            return {
                ...prev, value
            }
        })
    }

    return (
        <main className="flex flex-col w-full h-screen bg-white ">
            <SidebarAdmin />
            <div className="flex pt-4 flex-col  p-3 w-[80%] h-screen  text-white">
                <div className="flex flex-col gap-[3px] w-[50%]">
                    <h1 className="text-white text-2xl">Tambah Barang</h1>
                    <label htmlFor="">Nama</label>
                    <input name="name" placeholder="Nama" className="pl-[10px] p-1  text-black rounded-lg" onChange={handleChange} />
                    <label htmlFor="">Supplier</label>

                    <input name="supplier" placeholder="Supplier" className="pl-[10px] p-1  text-black rounded-lg" onChange={handleChange} />
                    <label htmlFor="">Serial Number</label>

                    <input name="serial_number" placeholder="Nomor Serial" className="pl-[10px] p-1  text-black rounded-lg" onChange={handleChange} />
        <label>Expired</label>
                    <input name="expired" placeholder="Expired" type="date" className="pl-[10px] p-1 text-black rounded-lg" onChange={handleChange} />
        <label>Tanggal Beli</label>
                    <input name="tanggal_pembelian" placeholder="Expired" type="date" className="pl-[10px] p-1 text-black rounded-lg" onChange={handleChange} />
                    <label htmlFor="">Jumlah</label>

                    <input name="unit" placeholder="Jumlah" className="pl-[10px] p-1  text-black rounded-lg" onChange={handleChange} />
                    <label htmlFor="">Owner</label>

                    <input name="owner" placeholder="Owner" className="pl-[10px] p-1  text-black rounded-lg" onChange={handleChange} />
                    <DropdownStatus value={getValueStatus} />
                    <h1 className="text-green-700">{data.message && data.message}</h1>
                    <h1 className="text-rose-600">{data.error && data.error}</h1>
                    <button className="font-semibold text-base text-white bg-green-700 p-2 rounded-xl" onClick={handleSubmit}>Tambahkan Product</button>
                </div>


            </div>
        </main>


    )

}

export default TambahBarang
