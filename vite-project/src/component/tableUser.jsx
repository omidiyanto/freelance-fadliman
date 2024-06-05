import { useState, useEffect } from "react";
import Axios from "axios";
import DeleteButton from "../component/deleteButtonUser";

const TableUser = ()=>{
    const [data, setData] = useState()
    useEffect(() => {
        Axios.get(`http://localhost:3001/api/v1/user`).then((response) => {
            setData(response)
        })
    }, [])
    return (
        <div className="w-full  mb-12 xl:mb-0 mt-2">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
                <div className="rounded-t mb-0 px-4 py-3 border-0">
                    <div className="flex justify-between items-center relative w-full px-2 max-w-full flex-grow flex-1">
                        <h3 className="font-semibold text-base text-black">Data User</h3>
                        <a href="/tambahuser" className="font-semibold text-base text-white bg-green-700 p-2 rounded-xl">+ Tambah User</a>
                    </div>
                </div>

                <div className="block w-full overflow-x-auto h-full">
                    <table className="items-center bg-transparent w-full h-full border-collapse">
                        <thead>
                            <tr>
                                <th className="px-6 bg-blueGray-50 text-black text-center border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                    No
                                </th>
                                <th className="px-6 bg-blueGray-50 text-black text-center border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                    Nama
                                </th>
                                <th className="px-6 bg-blueGray-50 text-black text-center border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                    Email
                                </th>
                                <th className="px-6 bg-blueGray-50 text-black text-center border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                    Password
                                </th>
                                <th className="px-6 bg-blueGray-50 text-black text-center border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                    Aksi
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {data && data.data.allData.map((value, index) => {
                                console.log(value, index)
                                return (
                                    <tr key={index}>
                                        <td className="border-t-0 px-6 text-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-black">
                                            {index + 1}
                                        </td>
                                        <td className="border-t-0 px-6 text-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-black">
                                            {value.name}
                                        </td>
                                        <td className="border-t-0 px-6 text-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-black">
                                            {value.email}
                                        </td>
                                        <td className="border-t-0 px-6 text-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-black">
                                            {value.password}
                                        </td>
                                        <td className="flex justify-center gap-[10px] border-t-0 px-6 text-center text-xs whitespace-nowrap p-4 text-black">
                                            <a href={`/edituser/${value.id}`} className="border p-2 rounded-xl bg-cyan-800 text-white p-2 rounded-xl">Update</a>
                                            <DeleteButton id={value.id} />
                                        </td>
                                    </tr>

                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default TableUser
