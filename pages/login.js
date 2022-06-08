import { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { useForm } from "react-hook-form";
import useAuth from "../hooks/useAuth";
import Loader from "../components/Loader";

const Login = () => {
  const [login, setLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const { signIn, signUp } = useAuth();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password");

  const onSubmit = async (data) => {
    setLoading(true);
    if (login) {
      await signIn(data.email, data.password);
    } else {
      await signUp(data.email, data.password);
    }
  };

  return (
    <div className='relative flex h-screen w-screen flex-col bg-black md:items-center md:justify-center md:bg-transparent'>
      <Head>
        <title>Netflix</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Image
        src='/assets/netflixbg.jpg'
        layout='fill'
        className='-z-10 !hidden opacity-60 sm:!inline'
        objectFit='cover'
      />
      <img
        src='/assets/logo.svg'
        className='absolute left-4 top-4 cursor-pointer object-contain md:left-10 md:top-6'
        width={150}
        height={150}
      />

      <form className='relative mt-24 space-y-8 rounded bg-black/75 py-10 px-6 md:mt-0 md:max-w-md md:px-14'>
        <h1 className='text-4xl font-semibold'>{`${
          login ? "Sign In" : "Sign Up"
        }`}</h1>
        <div className='space-y-4'>
          <label className='inline-block w-full'>
            <input
              type='email'
              placeholder='Email'
              className={`input ${
                errors.email && "border-b-2 border-orange-500"
              }`}
              {...register("email", { required: true })}
            />
            {errors.email && (
              <p className='p-1 text-[13px] font-light text-orange-500'>
                Please enter a valid email.
              </p>
            )}
          </label>
          <label className='inline-block w-full'>
            <input
              type='password'
              placeholder='Password'
              className={`input ${
                errors.password && "border-b-2 border-orange-500"
              }`}
              {...register("password", { required: true })}
            />
            {errors.password && (
              <p className='p-1 text-[13px] font-light text-orange-500'>
                Your password must contain between 4 and 60 characters.
              </p>
            )}
          </label>

          {!login && (
            <label className='inline-block w-full'>
              <input
                type='password'
                placeholder='Confirm Password'
                className={`input ${
                  errors.password && "border-b-2 border-orange-500"
                }`}
                {...register("confirmPassword", {
                  required: true,
                  validate: (value) =>
                    value === password || "The passwords do not match",
                })}
              />
              {errors.confirmPassword && (
                <p className='p-1 text-[13px] font-light text-orange-500'>
                  The passwords do not match.
                </p>
              )}
            </label>
          )}
        </div>

        <button
          disabled={loading}
          onClick={handleSubmit(onSubmit)}
          className='w-full rounded bg-[#E50914] py-3 font-semibold'
          type='submit'
        >
          {loading ? (
            <Loader color='dark:fill-gray-300' />
          ) : (
            <>{`${login ? "Sign In" : "Sign up now"}`}</>
          )}
        </button>

        <div className='text-[gray]'>
          {`${login ? "New to Netflix?" : "Already have an account?"}`}{" "}
          <button
            onClick={() => {
              if (login) {
                setLogin(false);
              } else {
                setLogin(true);
              }
            }}
            className='cursor-pointer text-white hover:underline'
            type='button'
          >
            {`${login ? "Sign up now" : "Log in now"}`}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
