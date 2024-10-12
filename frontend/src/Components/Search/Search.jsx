import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { getAllUsers } from '../../Actions/User'
import User from "../User/User"
import { Search as SearchIcon } from 'lucide-react'

const Search = () => {
    const { users, loading: usersLoading } = useSelector((state) => state.users)
    const dispatch = useDispatch()
    const [name, setName] = useState("")

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(getAllUsers(name))
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white border-b border-gray-300 fixed top-0 left-0 right-0 z-10">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <h1 className="text-xl font-bold">SocioGram</h1>
                        {/* You can add navigation items here if needed */}
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="pt-20 pb-8 px-4 sm:px-6 lg:px-8">
                <div className="max-w-5xl mx-auto">
                    {/* Search Bar */}
                    <div className="mb-8">
                        <form onSubmit={submitHandler} className="flex items-center">
                            <div className="relative flex-grow">
                                <input
                                    type="text"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Search"
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-l-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                            </div>
                            <button
                                type="submit"
                                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-r-md transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            >
                                Enter
                            </button>
                        </form>
                    </div>

                    {/* Search Results */}
                    {users && users.length > 0 && (
                        <div className="bg-white border border-gray-300 rounded-md overflow-hidden">
                            <h2 className="sr-only">Search Results</h2>
                            <ul className="divide-y divide-gray-200">
                                {users.map((user) => (
                                    <li key={user?._id} className="px-4 py-3 hover:bg-gray-50">
                                        <User
                                            userId={user?._id}
                                            name={user?.name}
                                            avatar={user.avatar?.url}
                                        />
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* No Results Message */}
                    {users && users.length === 0 && (
                        <p className="text-center text-gray-500 mt-8">No results found. Try a different search term.</p>
                    )}
                </div>
            </main>
        </div>
    )
}

export default Search