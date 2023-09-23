"use client";
import React from "react";
import styles from "./WaitingListForm.module.css";
import { getBaseUrl } from "@/app/lib/dispatcher";
import { successToast, errorToast } from "@/utils/toast";

const WaitingListForm = () => {
  const [fullName, setFullName] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const body = {
      fullName: event.currentTarget.fullName.value,
      email: event.currentTarget.email.value,
    };

    try {
      const response = await fetch(`${getBaseUrl()}api/users/waiting-list`, {
        method: "post",
        body: JSON.stringify(body),
        cache: "no-cache",
      });

    // Reset Inputs
      setEmail('')
      setFullName('')



      if (response.status !== 200) {
         errorToast( "Failed to add you to the waiting list. Please try again.")
         return
      }

      successToast('Successfully added you to the waiting list. See you soon.')

    } catch (e) {
      console.error(e);
    }
  }

  return (
    <form className="w-full max-w-sm mx-auto mb-4" onSubmit={handleSubmit}>
      <div className="flex flex-col md:flex-row items-center py-2 mb-4 gap-2">
        <input
          className={styles.wlTextInput}
          type="text"
          placeholder="Full name..."
          aria-label="Full name"
          required
          name="fullName"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        <input
          className={styles.wlTextInput}
          type="email"
          placeholder="Email..."
          aria-label="Email"
          required={true}
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <button
        className="flex rounded border text-center px-6 py-3 uppercase mx-auto text-gray-100 bg-slate-900 border-slate-900"
        type="submit"
      >
        Join the waiting list
      </button>
    </form>
  );
};

export default WaitingListForm;
