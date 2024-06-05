import SidebarUser from "../component/sidebarUser";
import DashboardHeader from '../component/dashboardHeader'
import TablePeminjaman from "../component/tablePeminjaman";

const Peminjaman = () => {
    return (
        <main className="flex flex-col w-screen h-screen bg-white ">
            <SidebarUser />
            <div className="flex pt-4 flex-col p-3 w-full h-screen  text-white">
                <section className='flex justify-end '>
                    <DashboardHeader />
                </section>
                <TablePeminjaman/>
            </div>
        </main>
    )
}

export default Peminjaman;
