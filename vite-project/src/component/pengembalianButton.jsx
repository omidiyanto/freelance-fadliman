const Pengembalian = (props) => {
    return (
        <div className={`fixed flex justify-center top-[0px] left-[0px] w-full h-full bg-[#00000099] ${props.open ? "block" : "hidden"}`}>
            <div>
                <input />
                <button>Submit</button>
            </div>
            <input />a
        </div>
    )
}

export default Pengembalian
