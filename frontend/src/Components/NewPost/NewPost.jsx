import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createNewPost } from '../../Actions/Post';
import { clearErrors, clearMessage } from '../../Reducers/Post/likeReducer';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Camera, X } from 'lucide-react';
import { loadUser } from '../../Actions/User';

const NewPost = () => {
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState("");
  const { loading, error, message } = useSelector((state) => state.like);
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const Reader = new FileReader();
      Reader.onload = () => {
        if (Reader.readyState === 2) {
          setImage(Reader.result);
        }
      };
      Reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImage("");
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const submitHandler = async(e) => {
    e.preventDefault();
    await dispatch(createNewPost(caption, image));
    dispatch(loadUser())
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(clearMessage());
    }
  }, [dispatch, message, error]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md sm:max-w-lg md:max-w-xl lg:max-w-2xl">
        <form className="space-y-6" onSubmit={submitHandler}>
          <h2 className="text-2xl font-bold text-center text-gray-800">New Post</h2>
          
          <div className="relative w-full h-64 bg-gray-200 rounded-lg overflow-hidden">
            {image ? (
              <>
                <img src={image} alt="Post preview" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
                >
                  <X className="w-6 h-6 text-gray-600" />
                </button>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-full">
                <Camera className="w-16 h-16 text-gray-400 mb-2" />
                <p className="text-sm text-gray-500">Click to add a photo</p>
              </div>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>
          
          <div>
            <label htmlFor="caption" className="sr-only">Caption</label>
            <textarea
              id="caption"
              rows="3"
              placeholder="Write a caption..."
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
          
          <button
            type="submit"
            disabled={loading || !image}
            className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
              (loading || !image) && 'opacity-50 cursor-not-allowed'
            }`}
          >
            {loading ? 'Posting...' : 'Post'}
          </button>
        </form>
      </div>
      <ToastContainer position="bottom-center" />
    </div>
  );
};

export default NewPost;