const SidebarAdmin = () => {
    return (

        <section className="flex flex-col text-white w-full  bg-black px-5 py-4 ">
            <strong className="text-2xl">
                <a href="/admin">Admin Dashboard</a>
            </strong>
            <section className="flex justify-center text-white gap-3">
                <a href="/data-barang" className=" bg-gray-900 p-3 rounded-xl">Data Barang</a>
                <a href="/user" className=" bg-gray-900 p-3 rounded-xl">Data User</a>
            </section>
        </section>

    )

}

export default SidebarAdmin
