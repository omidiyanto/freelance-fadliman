import { Fragment, useState, useEffect } from 'react'
import { Menu, Transition } from '@headlessui/react'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const dropdownStatus = (props) => {
    const [data, setData] = useState()

    function handleInput(e, value) {
        e.target.value = value
        setData(e.target.value)
    }

    useEffect(() => {
        props.value && props.value(data && data)
    }, [data])

    return (
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <Menu.Button className="flex text-left w-full justify-between gap-x-1.5 rounded-lg bg-white px-[10px]  py-2 text-sm  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                    {data ? data : "Status"}
                    <svg className="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                    </svg>
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
                <Menu.Items className="w-full absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                        <Menu.Item>
                            {({ active }) => (
                                <button
                                    className={classNames(
                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                        'block w-full px-4 flex justify-start py-2 text-sm'
                                    )}
                                    onClick={(e) => handleInput(e, 'Tersedia')}>
                                    Tersedia
                                </button>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <button
                                    className={classNames(
                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                        'block w-full px-4 flex justify-start py-2 text-sm'
                                    )}
                                    onClick={(e) => handleInput(e, 'Tidak Tersedia')}
                                >
                                    Tidak Tersedia
                                </button>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <button
                                    className={classNames(
                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                        'block w-full px-4 flex justify-start py-2 text-sm'
                                    )}
                                    onClick={(e) => handleInput(e, 'Maintainance')}
                                >
                                    Maintainance
                                </button>
                            )}
                        </Menu.Item>
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>

    )

}

export default dropdownStatus
