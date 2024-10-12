import React, { useState  } from 'react';
import { Typography ,InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useDispatch, useSelector} from 'react-redux';
import { resetPassword} from '../../Actions/User';
import { Link, useNavigate, useParams} from 'react-router-dom';
import Loader from "../Loader/Loader"
const ResetPassword = () => {
    const [newPassword,setNewPassword]=useState("")
    const [showPassword, setShowPassword] = useState(false);
    const {message,loading}=useSelector((state)=>state.like)
    const dispatch = useDispatch();
    const navigate=useNavigate()
    const params=useParams()
    const SubmitHandler = async(e) => {
        e.preventDefault();
        await dispatch(resetPassword(params.token,newPassword));
    };
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };
  return (
    loading? <Loader/>:(
        <div className="min-h-screen bg-gradient-to-r from-[#fff5bc] to-[#cec1ff] flex items-center justify-center p-4 sm:p-6 md:p-8 box-border">
            <form className="bg-white h-full w-full max-w-md lg:max-w-lg xl:max-w-xl rounded-3xl p-6 sm:p-8 flex flex-col items-center shadow-lg" onSubmit={SubmitHandler}>
                <Typography variant="h3" component="h2" className="py-1 sm:py-6 md:py-8 text-2xl sm:text-3xl md:text-4xl">SocioGram</Typography>
                <Typography variant="h6" component="h6" className="py-1 text-green-700 sm:py-6 md:py-8 text-xl sm:text-xl md:text-xl">{message}</Typography>
                
                <div className="relative w-full mb-4 sm:mb-6">
                    <input 
                        type={showPassword ? "text" : "password"}
                        placeholder='Enter New Password' 
                        required 
                        value={newPassword}  
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full px-4 sm:px-6 py-2 sm:py-3 rounded-full border border-gray-300 font-roboto text-sm sm:text-base outline-none"
                    />
                    <InputAdornment position="end" className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <IconButton
                            onClick={handleClickShowPassword}
                            edge="end"
                            size="small"
                        >
                            {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                        </IconButton>
                    </InputAdornment>
                </div>
                <Link to={`/forgot/password`} className='self-end text-gray-500 no-underline mb-4 sm:mb-6 text-sm sm:text-base'><Typography >Request Another Email</Typography></Link>
                <button type='submit' disabled={loading} className="w-full py-2 sm:py-3 rounded-full bg-blue-500 text-white font-bold text-sm sm:text-base cursor-pointer hover:bg-blue-600 transition-colors">
                    Reset  Password
                </button>
                <Link to="/" className="mt-4 sm:mt-6 text-gray-500 no-underline text-sm sm:text-base">
                    <Typography>Login</Typography>
                </Link>
            </form>
        </div>
    )
  )
}

export default ResetPassword