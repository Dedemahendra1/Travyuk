import { Button } from './ui/button'
import { Link } from 'react-router-dom'
import { useMutation, useQueryClient } from 'react-query'
import * as apiClient from '../api-client'
import {toast} from 'react-hot-toast'

const SignOut = () => {
    const queryClient = useQueryClient()

    const mutation = useMutation(apiClient.signOut, {
      onSuccess: async () => {
        await queryClient.invalidateQueries("validateToken");
        toast.success("Signed Out!");
      },
      onError: (error: Error) => {
        toast.error(error.message);
      },
    });
  
    const handleClick = () => {
      mutation.mutate();
    };
  return (
    <div>
      <Link to="/">
            <Button
            onClick={handleClick}
            variant="default"
            size="lg"
            className="flex items-center w-full text-white px-3  font-bold hover:bg-gray-100 hover:text-blue-600"
            >
            Sign Out
            </Button>
        </Link>
    </div>
  )
}

export default SignOut
