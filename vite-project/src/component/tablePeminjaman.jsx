import { useState, useEffect } from "react";
import Axios from "axios";

const TablePeminjaman = () => {
    const [data, setData] = useState();
    useEffect(() => {
        Axios.get(`http://localhost:3001/api/v1/pinjaman`).then((response) => {
            setData(response.data);
        });
    }, []);

    const handlePengembalian = async(e)=>{
         await Axios.delete(`http://localhost:3001/api/v1/pinjaman/${e.target.id}`)
    }
    return (
        <div className="w-full mb-12 xl:mb-0 mt-2">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                <div className="rounded-t mb-0 px-4 py-3 border-0">
                    <div className="flex justify-between items-center relative w-full px-2 max-w-full flex-grow flex-1">
                        <h3 className="font-semibold text-base text-black">Data Pinjaman</h3>
                        <a href="/pinjam" className="font-semibold text-base text-white bg-green-700 p-2 rounded-xl">+ Pinjam Barang</a>
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
                                    Unit
                                </th>

                                <th className="px-6 bg-blueGray-50 text-black text-center border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                    Status
                                </th>
                                <th className="px-6 bg-blueGray-50 text-black text-center border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                    Aksi
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {data && data.allData.map((value, index) => {
                                return (
                                    <tr key={index}>
                                        <td className="border-t-0 px-6 text-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-black">
                                            {index + 1}
                                        </td>
                                        <td className="border-t-0 px-6 text-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-black">
                                            {value.name}
                                        </td>
                                        <td className="border-t-0 px-6 text-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-black">
                                            {value.unit}
                                        </td>
                                        <td className="border-t-0 px-6 text-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-black">
                                            {value.status}
                                        </td>
                                        <td className="border-t-0 px-6 text-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-black">
                                            <button id={value.id} onClick={handlePengembalian} className="border p-2 rounded-xl bg-cyan-800 text-white p-2 rounded-xl">Pengembalian</button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default TablePeminjaman;

