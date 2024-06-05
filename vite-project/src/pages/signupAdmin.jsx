import { useState } from "react";
import Axios from 'axios'
import { useNavigate } from "react-router-dom";

const SignupAdmin = () => {
    const Navigate = useNavigate()
    const [data, setData] = useState({
        name: "",
        NIK: "",
        password: "",
        passwordConfirm: "",
        division: "",
        error: ""
    })

    const handleSignupSubmit = async (e) => {
        e.preventDefault();

        try {
            if (data.password == data.passwordConfirm) {
                const response = await Axios.post('http://localhost:3001/api/v1/auth/signup/admin', {
                    name: data.name,
                    NIK: data.NIK,
                    password: data.password,
                    division: data.division
                }, {
                    withCredentials: true
                })
                if (response.status !== 201) {
                    throw Error(response.message)
                }
                localStorage.setItem('name', response.data.data.user.name)
                alert('Create Account Success');
                setTimeout(() => {
                    Navigate('/admin');
                }, 2000);
            }
            throw Error("password aren't same")
        } catch (err) {
            console.log(err)
            setData((prev) => {
                return {
                    ...prev,
                    error: err && err.response.data.message
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

            <section className="w-[50%] h-screen "></section>
            <section className="w-[50%] h-screen flex flex-col justify-center px-10 items-center text-white bg-black ">
                <section className="flex flex-col  w-[75%] gap-[0.5rem] ">
                    <strong><h1 className="text-[1rem]">Sign Up Admin <br /> Create Your Account</h1></strong>
                    <section className="flex flex-col gap-[10px] text-black ">
                        <input type="text" name="NIK" onChange={handleChange} required className="w-full pl-[10px] p-1  rounded-lg" placeholder="NIK" />
                        <input type="name" name="name" onChange={handleChange} required className="w-full pl-[10px] p-1  rounded-lg" placeholder="name" />
                        <input type="text" name="division" onChange={handleChange} required className="w-full pl-[10px] p-1  rounded-lg" placeholder="division" />
                        <input type="password" name="password" onChange={handleChange} required className="w-full pl-[10px] p-1  rounded-lg" placeholder="Password" />
                        <input type="password" name="passwordConfirm" onChange={handleChange} required className="w-full pl-[10px] p-1  rounded-lg" placeholder="Password Confirm" />
                        {data.error && <h1 className="text-rose-600">{data.error}</h1>}
                        <button onClick={handleSignupSubmit} className="w-full flex justify-center text-white bg-purple-800 p-2 rounded-lg">Submit</button>
                        <h1 className="flex justify-center text-white">Have Account? Log in &nbsp;
                            <a href="/login/admin" className="text-purple-800">here</a></h1>
                        <div className=" w-full flex justify-center translate-y-8 "><a href="/login" className="w-[8rem] flex justify-center p-1 bg-purple-800 text-white text-right rounded-lg">Sign user</a></div>
                    </section>

                </section>
            </section>
        </main>
    )
}

export default SignupAdmin
