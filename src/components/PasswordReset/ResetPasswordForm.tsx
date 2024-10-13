/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { useState } from 'react';
import { toast } from 'sonner';
import InputFormLogin from '../inputs/InputFormLogin/InputFormLogin';
import { resetPassword } from '@/Services/resetPassService';
import { useRouter } from 'next/navigation';

const ResetPasswordForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    otp: '',
    newPassword: '',
    confirmPassword: ''
  });

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await resetPassword(formData);
      toast.success("Password reset successfully.", {
        position: "top-center",
      });
      setTimeout(() => {
        router.push('/login');
      }, 3000);
    } catch (error: any) {
      toast.error("Error resetting password, please try again.", {
        position: "top-center",
      });
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-[url('/images/bg.jpg')] bg-fixed bg-cover">
      <div className="bg-[#00000085] backdrop-blur-md w-full mx-10 md:w-3/5 sm:w-full lg:w-2/5 xl:w-4/12 2xl:w-3/12 rounded-[15px] shadow-lg p-10">
        <h2 className="text-center text-white text-2xl mb-5">Reset your password</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm text-white mb-1">Email</label>
            <InputFormLogin
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-primary"
              placeholder="Your email address"
            />
          </div>
          <div>
            <label htmlFor="otp" className="block text-sm text-white mb-1">One Time Password</label>
            <InputFormLogin
              type="text"
              id="otp"
              name="otp"
              value={formData.otp}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-primary"
              placeholder="Enter OTP"
            />
          </div>
          <div>
            <label htmlFor="newPassword" className="block text-sm text-white mb-1">New Password</label>
            <InputFormLogin
              type="password"
              id="newPassword"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-primary"
              placeholder="Enter new password"
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-sm text-white mb-1">Confirm Password</label>
            <InputFormLogin
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-primary"
              placeholder="Confirm new password"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-primary text-white rounded-md hover:bg-primaryLight transition duration-300"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordForm;
