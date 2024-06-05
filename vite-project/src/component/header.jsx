import { useState } from 'react';
import Dropdown from '../utils/dropdown.jsx'

const Header = () => {
    const [value, setValue] = useState()

    const addFlag = (value)=> {
        setValue((prev) => {
            return { ...prev, value }
        })
    }

    return (
        <main className="flex p-7 justify-between w-full text-[#ffff] h-[5.3rem] items-center">
            <article className="flex">
                <a href='/'>IL - Ventory</a>
            </article>
            <section className="flex gap-[1rem] ">
                <a href="">Home</a>
                <a href="">How it Works</a>
                <a href="">Contact</a>
            </section>
            <section className="flex gap-[1rem]">
                <Dropdown setValue={addFlag}/>
            </section>
        </main>
    )

}

export default Header;
