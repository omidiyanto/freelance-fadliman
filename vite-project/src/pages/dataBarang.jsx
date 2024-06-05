import SidebarAdmin from "../component/sidebarAdmin";
import DashboardAdmin from "../component/dashboardAdmin";
import Table from '../utils/table'
import Cookies from 'universal-cookie';
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const DataBarang = () => {
    const cookies = new Cookies();
    const Navigate = useNavigate()

    useEffect(() => {
        console.log(cookies.getAll())
        cookies.get('jwtadmin') === undefined && Navigate('/login/admin')
    }, [Navigate, cookies])

    return (
        <main className="flex flex-col w-screen h-screen bg-white ">
            <SidebarAdmin />
            <section className="flex flex-col p-3 w-full h-screen  text-white">
                <section className='flex justify-end '>
                    <DashboardAdmin />
                </section>
                <Table />
            </section>
        </main>

    )

}

export default DataBarang;
