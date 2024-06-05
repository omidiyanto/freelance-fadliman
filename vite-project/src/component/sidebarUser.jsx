const SidebarUser = () => {
    return (
        <section className="flex flex-col  text-white   bg-black p-4 ">
            <strong className="text-2xl p-2 "><a href="/dashboard">Dashboard User</a></strong>
            <section className="flex justify-center text-white gap-3">
                <a href="/databarang" className="  bg-gray-900 p-3 rounded-xl">Data Barang</a>
                <a href="/peminjaman" className="  bg-gray-900 p-3 rounded-xl">Peminjaman Barang</a>
            </section>
        </section>
    )
}

export default SidebarUser
