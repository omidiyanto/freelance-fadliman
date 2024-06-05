import DashboardHeader from "../component/dashboardAdmin";
import SidebarAdmin from "../component/sidebarAdmin";
import Cookies from 'universal-cookie';
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const AdminDashboard = () => {
    const cookies = new Cookies();
    const Navigate = useNavigate()
    console.log(cookies.getAll())
    useEffect(() => {
        console.log(cookies.getAll())
        cookies.get('jwtadmin') === undefined && Navigate('/login/admin')
    }, [Navigate, cookies])
    return (
        <main className="">
            <section className="flex flex-col h-screen w-full   ">
                <SidebarAdmin />
                <section className="flex flex-col p-3 w-full h-full  text-white">
                    <section className='flex justify-end mt-0'>
                        <DashboardHeader />
                    </section>
                    <h1 className="text-white text-center ">Silahkan Pilih Menu Pada List Dashboard</h1>
                </section>
            </section>

        </main>
    )
}

export default AdminDashboard
