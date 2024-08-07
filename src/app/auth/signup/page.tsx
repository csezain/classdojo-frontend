import React from "react";
import SignUpForm from "./signUpForm";

const page = () => {
  return (
    <section className="max-w-2xl mx-auto py-10 flex items-center justify-center">
      <div className="w-full max-w-xl mx-auto flex justify-center items-center">
        <SignUpForm />
      </div>
    </section>
  );
};

export default page;
