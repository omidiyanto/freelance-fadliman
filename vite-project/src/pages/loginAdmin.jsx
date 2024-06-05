import { useState } from "react";
import Axios from 'axios'
import { useNavigate } from "react-router-dom";
import Cookies from 'universal-cookie'

const LoginAdmin = () => {
    const cookies = new Cookies();
    const Navigate = useNavigate()
    const [data, setData] = useState({
        NIK: "",
        password: "",
        error: ""
    })

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await Axios.post('http://localhost:3001/api/v1/auth/login/admin', {
                NIK: data.NIK,
                password: data.password
            }, {
                withCredentials: true
            })
            if (response.status !== 200) {
                throw Error(response.message)
            }
            console.log(response)
            cookies.set('jwtadmin',response.data.token)        
            localStorage.setItem('name', response.data.data.user.name)
            Navigate('/admin');
        } catch (err) {
            console.log(err)
            setData((prev) => {
                return {
                    ...prev,
                    error: err.response.data.message
                }
            })
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setData(prev => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    return (
        <main className="flex h-screen bg-black">
            <div className="w-[50%] h-screen bg-gradient-to-b from-purple-800 to-[#000]"></div>
            <div className="w-[50%] h-screen flex flex-col justify-center p-10 items-center text-white bg-black ">
                <section className="flex flex-col  w-[75%] gap-[0.5rem]">
                    <strong>
                        <h1 className="text-[1rem]">Log in Admin</h1></strong>
                    <section className="flex flex-col gap-[0.5rem]" >
                        <input type="text" onChange={handleChange} name="NIK" className="w-full pl-[10px] p-1  text-black rounded-lg" placeholder="NIK" required />
                        <input type="password" name="password" required onChange={handleChange} className="w-full pl-[10px] text-black  p-1  rounded-lg" placeholder="Password" />
                        {data.error && <h1 className="text-rose-600">{data.error}</h1>}
                        <button onClick={handleLoginSubmit} className="w-full flex justify-center bg-purple-800 p-2 rounded-lg">Submit</button>
                        <h1 className="flex justify-center text-white">Dont Have Account? Sign Up &nbsp;
                            <a href="/signup/admin" className="text-purple-800">here</a></h1>
                    </section>
                </section>
            </div>
        </main>
    )
}

export default LoginAdmin;
