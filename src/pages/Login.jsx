import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Title from '../components/Title';
import { toast } from 'react-toastify';
import { ShopContext } from '../context/ShopContext';
const Login = () => {
  const [currentState, setCurrentState] = useState('Sign Up');
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    console.log({ name, email, password });
    if (currentState === 'Sign Up') {
      const response = await axios.post(backendUrl + '/api/users/register', {
        name,
        email,
        password,
      });
      console.log(response);

      if (response.status === 200) {
        setCurrentState('Login');
      }
    } else if (currentState === 'Login') {
      const response = await axios.post(backendUrl + '/api/users/Login', {
        email,
        password,
      });
      console.log(response);
      if (response.status === 200) {
        setToken(response.data.token);
        localStorage.setItem('token', response.data.token);
      } else {
        toast.error('invalid credentials ');
      }
    }
  };

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token]);
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
        {currentState === 'Sign Up' ? (
          <input
            onChange={(e) => {
              setName(e.target.value);
            }}
            value={name}
            type='text'
            className='w-Full px-3 py-2 border border-gray-880'
            placeholder='Name'
            required
          />
        ) : null}
        <input
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          type='email'
          value={email}
          className='w-Full px-3 py-2 border border-gray-880'
          placeholder='Email'
          required
        />
        <input
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          type='password'
          value={password}
          className='w-Full px-3 py-2 border border-gray-880'
          placeholder='Password'
          required
        />
        <div className='w-full flex justify-between text-sm mt-[-8px]'>
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
        <button className='w-1/2 m-auto bg-black text-white px-8 py-2 mt-4 '>
          {currentState === 'Login' ? 'Sign In' : 'Sign Up'}
        </button>
      </div>
    </form>
  );
};

export default Login;
