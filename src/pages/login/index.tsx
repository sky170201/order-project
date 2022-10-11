import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
export default function Login()  {
  const navigate = useNavigate();
  function clickToUser() {
    navigate('/');
  };

  return <Button type='primary' onClick={clickToUser} >登陆</Button>
}