import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { useNavigate } from "react-router-dom";
import Cookies from 'universal-cookie';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const dropdownAdmin = () => {
    const cookies = new Cookies();
    const Navigate = useNavigate();
    const localStorageValue = localStorage.getItem('name')

    const handleLogout = async (e) => {
        e.preventDefault();
        cookies.remove('jwtadmin', { path: '/admin' });
        cookies.remove('jwtadmin', { path: '/login' }); 
        cookies.remove('jwtadmin', { path: '/data-barang' }); 
        cookies.remove('jwtadmin', { path: '/user' }); 
        cookies.remove('jwtadmin', { path: '/' }); 
        cookies.remove('jwt', { path: '/' }); 
        localStorage.clear()
        Navigate('/login/admin')
    }

    return (
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-full bg-white px-5 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                    {localStorageValue && localStorageValue}
                </Menu.Button>
            </div>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                        <Menu.Item>
                            {({ active }) => (
                                <button
                                    className={classNames(
                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                        'block w-full px-4 flex justify-start py-2 text-sm'
                                    )}
                                    onClick={handleLogout}
                                >
                                    Logout
                                </button>
                            )}
                        </Menu.Item>
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>

    )

}

export default dropdownAdmin
