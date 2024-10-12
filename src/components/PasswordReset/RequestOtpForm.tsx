'use client';
import React, { useState } from 'react';
import { toast } from 'sonner';
import InputFormLogin from '../inputs/InputFormLogin/InputFormLogin';
import { requestOtp } from '@/Services/resetPassService';
import Link from 'next/link';

const RequestOtpForm = () => {
  const [email, setEmail] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await requestOtp(email);
      toast.success("OTP sent to your email address.", {
        position: "top-center",
      });
      setOtpSent(true);
    } catch (error: any) {
      toast.error("There was an error, please try again.", {
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
            <label htmlFor="email" className="block text-sm text-white mb-1">
              Enter your email address
            </label>
            <InputFormLogin
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-primary"
              placeholder="Your email address"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-primary text-white rounded-md hover:bg-primaryLight transition duration-300"
          >
            Send One Time Password
          </button>
        </form>
        {otpSent && (
          <div className="text-center mt-4">
            <p className="text-white">OTP has been sent to your email.</p>
            <Link href="/reset-password-confirm" className="text-primary hover:underline">
              Go to reset password page
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default RequestOtpForm;
