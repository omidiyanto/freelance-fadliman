import DashboardAdmin from "../component/dashboardAdmin"
import SidebarAdmin from "../component/sidebarAdmin"
import Table from '../component/tableUser'
import Cookies from 'universal-cookie';
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
const User = () => {
    const cookies = new Cookies();
    const Navigate = useNavigate()
    useEffect(() => {
        cookies.get('jwtadmin') === undefined && Navigate('/login/admin')
    }, [Navigate, cookies])
    return (
        <main className="flex flex-col w-screen  bg-white ">
            <SidebarAdmin />
            <section className="flex flex-col p-3 w-full h-screen  text-white">
                <section className='flex justify-end '>
                    <DashboardAdmin />
                </section>
                <h1 className="text-white text-3xl translate-x-2">Data User</h1>
                <Table/>
            </section>
        </main>
    )

}

export default User
