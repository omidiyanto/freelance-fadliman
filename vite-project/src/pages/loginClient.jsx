
import { useState } from "react";
import Axios from 'axios'
import { useNavigate } from "react-router-dom";

const Login = () => {
    const Navigate = useNavigate()
    const [data, setData] = useState({
        email: "",
        password: "",
        error: ""
    })

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await Axios.post('http://localhost:3001/api/v1/auth/login/client', {
                email: data.email,
                password: data.password
            }, {
                withCredentials: true
            })
            if (response.status !== 200) {
                throw Error(response.message)
            }
            console.log(response)
            localStorage.setItem('name', response.data.data.user.name)
            localStorage.setItem('id', response.data.data.user.id)
            Navigate('/dashboard');
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
                        <h1 className="text-[1rem]">Log in User</h1></strong>
                    <section className="flex flex-col gap-[0.5rem]" >
                        <input type="email" onChange={handleChange} name="email" className="w-full pl-[10px] p-1 text-black rounded-lg" placeholder="Email" required />
                        <input type="password" name="password" required onChange={handleChange} className="w-full pl-[10px] p-1 text-black  rounded-lg" placeholder="Password" />
                        {data.error && <h1 className="text-rose-600">{data.error}</h1>}
                        <button onClick={handleLoginSubmit} className="w-full flex justify-center bg-purple-800 p-2 rounded-lg">Submit</button>
                        <h1 className="flex justify-center text-white">Dont Have Account? Sign Up &nbsp;
                            <a href="/signup" className="text-purple-800">here</a></h1>

                        <div className=" w-full flex justify-center translate-y-8 "><a href="/login/admin" className="w-[8rem] flex justify-center p-1 bg-purple-800 text-white text-right rounded-lg">Sign admin</a></div>
                    </section>
                </section>
            </div>
        </main>
    )
}

export default Login;
