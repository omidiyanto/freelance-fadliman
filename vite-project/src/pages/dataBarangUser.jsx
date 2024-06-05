import Sidebar from '../component/dashboardHeader'
import SidebarUser from '../component/sidebarUser'
import DashboardHeader from '../component/dashboardHeader'
import TableBarang from '../component/tableBarangClient'
const DataBarangUser = () => {
    return (
        <main className="flex flex-col">
            <section className="flex flex-col w-screen h-screen bg-white ">
                <SidebarUser />
                <section className="flex flex-col p-3 w-full h-screen  text-white">
                    <section className='flex justify-end mt-0'>
                        <DashboardHeader />
                    </section>
                <TableBarang />
                </section>
            </section>

        </main>
    )

}

export default DataBarangUser
