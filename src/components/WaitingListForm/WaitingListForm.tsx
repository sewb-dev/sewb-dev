'use client';
import { useAddUserToWaitingList } from '@/modules/user/user.hooks';
import { errorToast, successToast } from '@/utils/toast';
import React from 'react';
import Loader from '../Loader';
import styles from './WaitingListForm.module.css';

const WaitingListForm = () => {
  const [fullName, setFullName] = React.useState<string>('');
  const [email, setEmail] = React.useState<string>('');

  const addUserToWaitingList = useAddUserToWaitingList();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    addUserToWaitingList
      .mutateAsync({
        fullName: event.currentTarget.fullName.value,
        email: event.currentTarget.email.value,
      })
      .then(() => {
        setEmail('');
        setFullName('');
        successToast(
          'Successfully added you to the waiting list. See you soon.'
        );
      })
      .catch((error) => {
        errorToast('Failed to add you to the waiting list. Please try again.');
        console.error(error);
      });
  }

  if (addUserToWaitingList.isPending) {
    return <Loader />;
  }

  return (
    <form className='mx-auto mb-4 w-full max-w-sm' onSubmit={handleSubmit}>
      <div className='mb-4 flex flex-col items-center gap-2 py-2 md:flex-row'>
        <input
          className={styles.wlTextInput}
          type='text'
          placeholder='Full name...'
          aria-label='Full name'
          required
          name='fullName'
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        <input
          className={styles.wlTextInput}
          type='email'
          placeholder='Email...'
          aria-label='Email'
          required={true}
          name='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <button
        className='mx-auto flex rounded border border-slate-900 bg-slate-900 px-6 py-3 text-center uppercase text-gray-100'
        type='submit'
      >
        Join the waiting list
      </button>
    </form>
  );
};

export default WaitingListForm;
