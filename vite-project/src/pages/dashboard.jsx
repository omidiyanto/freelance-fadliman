import DashboardHeader from "../component/dashboardHeader";
import SidebarUser from "../component/sidebarUser";
import Cookies from 'universal-cookie';
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
const Dashboard = () => {
    const cookies = new Cookies();
    const Navigate = useNavigate()
    useEffect(() => {
        cookies.get('jwt') === undefined && Navigate('/login')
    }, [Navigate, cookies])
    return (
        <main className=" ">
            <section className="flex flex-col h-screen w-screen   ">
                <SidebarUser/>
                <section className="flex flex-col p-3 w-full h-full   text-white">
                    <section className='flex justify-end  mt-0 '>
                        <DashboardHeader/>
                    </section>
                    <h1 className="text-white text-center translate-y-32 text-xl">Silahkan Pilih Menu Pada List Dashboard</h1>
                </section>
            </section>  

        </main>
    )
}

export default Dashboard;
