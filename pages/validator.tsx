import { useState } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';
import Navbar from '../components/Navbar';
import UserPill from '../components/UserPill';
import { AXIOS } from '../helpers/axios';

const Validator = () => {
  const [postID, setpostID] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [post, setPost] = useState<any>(null);

  const searchPost = async () => {
    try {
      if (postID.trim().length === 0) {
        setError('Please enter a valid post ID');
        setTimeout(() => {
          setError('');
        }, 2000);
        return;
      }
      setLoading(true);
      const data = await AXIOS.get(`/post/${postID}`);
      setLoading(false);
      setPost(data.data[0]);
    } catch (error: any) {
      setLoading(false);
      setError(error.response.data.message);
      setTimeout(() => {
        setError('');
      }, 2000);
    }
  };

  return (
    <div className='flex flex-col min-h-screen'>
      <Navbar wallet />
      <div className='flex-1 flex flex-col  justify-center px-4 w-full md:w-1/2 mx-auto'>
        <div>
          <input
            type='text'
            value={postID}
            onChange={(e) => setpostID(e.target.value)}
            placeholder='Enter Post ID to validate'
          />
          {error.length > 0 && (
            <span className='text-sm text-red'>{error}</span>
          )}
          <button
            className={`my-2 w-full flex items-center justify-center cursor-pointer ${
              loading ? 'bg-dark-gray bg-opacity-30' : ''
            }`}
            onClick={searchPost}
            disabled={loading}>
            {loading ? <LoadingSpinner /> : 'Search'}
          </button>
        </div>
        {post && (
          <div className='my-4 flex flex-col gap-2 transition-all'>
            <UserPill isOwner name={post.owner.name} address={post.owner.key} />
            {post.sharers.length > 0 && (
              <>
                <div className='flex items-center my-4'>
                  <span className='h-0.5 bg-black w-full opacity-30 rounded-full' />
                  <span className='mx-2 text-center'>Shared by</span>
                  <span className='h-0.5 bg-black w-full opacity-30 rounded-full' />
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
                  {post.sharers.map((sharer: any) => (
                    <UserPill
                      key={sharer._id}
                      name={sharer.name}
                      address={sharer.key}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
export default Validator;
