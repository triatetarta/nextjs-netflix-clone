import Head from "next/head";
import Link from "next/link";
import { FaCaretDown } from "react-icons/fa";
import useSubscription from "../hooks/useSubscription";
import useAuth from "../hooks/useAuth";
import Membership from "../components/Membership";
import payments, { goToBillingPortal } from "../lib/stripe";
import { getProducts } from "@stripe/firestore-stripe-payments";
import { useState } from "react";
import { UserIcon } from "@heroicons/react/outline";
import { motion, AnimatePresence } from "framer-motion";
import moment from "moment";

const Account = ({ products }) => {
  const [accountMenu, setAccountMenu] = useState(false);
  const { user, logout, loading } = useAuth();
  const subscription = useSubscription(user);

  if (loading) return null;

  return (
    <div>
      <Head>
        <title>Netflix Clone - Account Settings</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <header className={`bg-[#141414]`}>
        <Link href='/'>
          <img
            src='/assets/logo.svg'
            width={120}
            height={120}
            className='cursor-pointer object-contain'
          />
        </Link>

        <div
          onClick={() => setAccountMenu(!accountMenu)}
          className='flex items-center cursor-pointer'
        >
          <img src='/assets/profile.png' alt='avatar' className='rounded' />
          <motion.div
            className='w-4 h-4 ml-2 hidden md:inline-flex '
            initial={{ rotate: 0 }}
            animate={{ rotate: accountMenu ? 180 : 0 }}
          >
            <FaCaretDown className='h-full w-full' />
          </motion.div>
        </div>

        <AnimatePresence>
          {accountMenu && (
            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className='accountMenu'
            >
              <div
                className='absolute -top-[16px] right-1 md:right-3 border-[7px] h-0 w-0'
                style={{ borderColor: "transparent transparent #e5e5e5" }}
              />
              <div className='absolute -top-[2px] left-0 right-0 h-[2px] bg-[#e5e5e5]' />
              <li className='acccountMenuItem'>
                <img
                  className='rounded-md mr-3'
                  src='/assets/kids.png'
                  alt='kids logo'
                />
                Children
              </li>
              <Link href='/account'>
                <li className='acccountMenuItem'>
                  <UserIcon className='h-6 w-6 text-gray-400 mr-3' />
                  Account
                </li>
              </Link>
              <li onClick={logout} className='acccountMenuItem'>
                Sign out of Netflix
              </li>
            </motion.ul>
          )}
        </AnimatePresence>
      </header>

      <main className='mx-auto max-w-6xl px-5 pt-24 pb-12 transition-all md:px-10'>
        <div className='flex flex-col gap-x-4 md:flex-row md:items-center'>
          <h1 className='text-3xl md:text-4xl'>Account</h1>
          <div className='-ml-0.5 flex items-center gap-x-1.5'>
            <img src='https://rb.gy/4vfk4r' alt='' className='h-7 w-7' />
            <p className='text-xs font-semibold text-[#555]'>
              Member since {moment(subscription.created).format("LL")}
            </p>
          </div>
        </div>

        <Membership />

        <div className='mt-6 grid grid-cols-1 gap-x-4 border px-4 py-4 md:grid-cols-4 md:border-x-0 md:border-t md:border-b-0 md:px-0 md:pb-0'>
          <h4 className='text-lg text-[gray]'>Plan Details</h4>
          <div className='col-span-2 font-medium'>
            {
              products.filter(
                (product) => product.id === subscription?.product
              )[0]?.name
            }
          </div>
          <p
            className='cursor-pointer text-blue-500 hover:underline md:text-right'
            onClick={goToBillingPortal}
          >
            Change plan
          </p>
        </div>

        <div className='mt-6 grid grid-cols-1 gap-x-4 border px-4 py-4 md:grid-cols-4 md:border-x-0 md:border-t md:border-b-0 md:px-0'>
          <h4 className='text-lg text-[gray]'>Settings</h4>
          <p
            className='col-span-3 cursor-pointer text-blue-500 hover:underline'
            onClick={logout}
          >
            Sign out of all devices
          </p>
        </div>
      </main>
    </div>
  );
};

export default Account;

export const getStaticProps = async () => {
  const products = await getProducts(payments, {
    includePrices: true,
    activeOnly: true,
  })
    .then((res) => res)
    .catch((error) => console.log(error.message));

  return {
    props: {
      products,
    },
  };
};
