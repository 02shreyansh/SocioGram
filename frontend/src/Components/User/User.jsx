import { Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
const User = ({userId,name,avatar}) => {
    return (
        <Link 
          to={`/user/${userId}`} 
          className="flex items-center text-gray-600/50 no-underline transition-all duration-500 hover:-translate-y-2.5"
        >
          <img 
            src={avatar} 
            alt={name} 
            className="h-8 w-8 md:h-12 md:w-12 m-2 md:m-4 rounded-full border-3 border-pink-200"
          />
          <Typography>{name}</Typography>
        </Link>
    );
}

export default User