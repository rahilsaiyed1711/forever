import React, { useState } from 'react';
import Title from '../components/Title';
const Login = () => {
  const [currentState, setCurrentState] = useState('Sign Up');
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (isForgotPassword) {
      // Handle forgot password logic here
    } else {
      // Handle login or sign up logic here
    }
  };
  return (
    <form
      className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'
      action=''
      method=''
      onSubmit={onSubmitHandler}
    >
      <div
        className='inline-flex items-center gap-2 mb-2 mt-10'
        style={{ fontSize: 36 }}
      >
        {currentState === 'Sign Up' ? (
          <Title
            text1={currentState.slice(0, 4)}
            text2={currentState.slice(4)}
          />
        ) : (
          <Title
            text1={currentState.slice(0, 3)}
            text2={currentState.slice(3)}
          />
        )}
      </div>
      <div className='w-full px-3 py-2 flex flex-col gap-4'>
        {isForgotPassword ? (
          <input
            type='email'
            className='w-Full px-3 py-2 border border-gray-880'
            placeholder='Enter your email to reset password'
            required
          />
        ) : (
          <>
            {currentState === 'Sign Up' ? (
              <input
                type='text'
                className='w-Full px-3 py-2 border border-gray-880'
                placeholder='Name'
                required
              />
            ) : null}
            <input
              type='email'
              className='w-Full px-3 py-2 border border-gray-880'
              placeholder='Email'
              required
            />
            <input
              type='password'
              className='w-Full px-3 py-2 border border-gray-880'
              placeholder='Password'
              required
            />
          </>
        )}
        <div className='w-full flex justify-between text-sm mt-[-8px]'>
          <p
            onClick={() => setIsForgotPassword(!isForgotPassword)}
            className='cursor-pointer'
          >
            {isForgotPassword ? 'Back to Login' : 'Forgot your password?'}
          </p>
          {currentState === 'Login' ? (
            <p
              onClick={() => setCurrentState('Sign Up')}
              className='cursor-pointer'
            >
              Create Account
            </p>
          ) : (
            <p
              onClick={() => setCurrentState('Login')}
              className='cursor-pointer'
            >
              Login Here
            </p>
          )}
        </div>
      </div>
    </form>
  );
};

export default Login;
