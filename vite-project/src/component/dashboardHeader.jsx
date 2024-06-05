import { useState } from 'react';
import Dropdown from '../utils/dropdown.jsx'

const DashboardHeader = () => {
    return (
        <main className="flex p-7 justify-end w-full text-[#ffff] h-[5.3rem] items-center">
            <section className="flex gap-[1rem]">
                <Dropdown />
            </section>
        </main>
    )
}

export default DashboardHeader;
