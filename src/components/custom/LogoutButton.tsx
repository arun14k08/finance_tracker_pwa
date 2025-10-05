import { useContext } from 'react'
import { Button } from '../ui/button'
import AuthContext from '@/context/AuthContext'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';
import ConfigContext from '@/context/ConfigContext';

const LogoutButton = () => {
    const auth = useContext(AuthContext);
    const config = useContext(ConfigContext);
    const navigate = useNavigate();
    const handleLogout = () => {
        // Implement logout logic here
        axios.post(`${config?.apiUrl}/logout`, {}, {
            headers: {
                Authorization: `Bearer ${auth?.user?.token}`
            }
        }).then(() => {
            toast.info("Logout successful!");
            auth?.logout();
            setTimeout(() => navigate("/login"), 500);
        }).catch((error) => {
            toast.error(error.response?.data?.message || "Logout failed");
        });
        
        }
  return (
    <>
    <Button className="cursor-pointer" onClick={()=> {handleLogout()}}>Logout</Button>
    </>
  )
}

export default LogoutButton