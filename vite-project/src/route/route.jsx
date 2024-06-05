import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Default from '../App'
import Login from '../pages/loginClient'
import Signup from '../pages/signupClient'
import Dashboard from '../pages/dashboard'
import LoginAdmin from '../pages/loginAdmin'
import SignupAdmin from '../pages/signupAdmin'
import AdminDashboard from '../pages/admin'
import DataBarang from "../pages/dataBarang";
import User from "../pages/user";
import DataBarangUser from "../pages/dataBarangUser";
import TambahBarang from "../pages/tambahbarang";
import Edit from "../pages/edit";
import TambahUser from '../pages/tambahuser'
import EditUser from "../pages/edituser";
import Account from "../pages/akun"
import Peminjaman from "../pages/pemijaman";
import PinjamBarang from '../pages/pinjambarang'

const RouterApp = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Default />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/signup/admin" element={<SignupAdmin />} />
                <Route path="/login/admin" element={<LoginAdmin />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/data-barang" element={<DataBarang/>} />
                <Route path="/user" element={<User/>} />
                <Route path="/databarang" element={<DataBarangUser/>} />
                <Route path="/tambahbarang" element={<TambahBarang/>} />
                <Route path="/edit/:id" element={<Edit/>} />
                <Route path="/tambahuser" element={<TambahUser/>} />
                <Route path="/edituser/:id" element={<EditUser/>} />
                <Route path="/akun" element={<Account/>} />
                <Route path="/peminjaman" element={<Peminjaman/>} />
                <Route path="/pinjam" element={<PinjamBarang/>} />
            </Routes>
        </Router>
    )
}

export default RouterApp
