import React from "react";
import SignInForm from "./signInForm";

type Props = {};

const page = (props: Props) => {
  return (
    <section className="max-w-2xl mx-auto py-10 flex items-center justify-center">
      <div className="w-full max-w-xl mx-auto flex justify-center items-center">
        <SignInForm />
      </div>
    </section>
  );
};

export default page;
