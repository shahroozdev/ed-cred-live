"use client";
import Modal from "@/components/molecules/modal";
import React, { useEffect, useState } from "react";
import { LoginForm } from "@/components/pages/common/Login/Form";
import { getCookie, removeCookie } from "@/actions/serverActions";
import { usePRouter } from "@/hooks/useRouter";

const LoginModal = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [user, setUser] = useState<any>(null);
  const router = usePRouter();

  useEffect(()=>{
    const getUser= async()=>{
      if(user===null){
        const userData = await getCookie('sessionOut')
        setUser(userData)
        await removeCookie('user');
        await removeCookie('token');
      }
    }
    getUser()

  }, [])
  const handleClose = () => {
    router.back()
    setIsOpen(false);
  };
  return (
    <Modal
      title="Login Modal"
      open={isOpen}
      onClose={handleClose}
      trigger={<></>}
      setIsOpen={setIsOpen}
    >
      <LoginForm title={user==='yes'?"Your session is expired. Please login again":"You are not logged in"} handleClose={handleClose}/>


    </Modal>
  );
};

export default LoginModal;
