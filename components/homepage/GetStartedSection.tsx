"use client";

import React from "react";

const GetStartedSection: React.FC = () => {
  return (
    <section className="-mx-6 mb-8 mt-4 rounded-lg bg-white px-6 py-12 dark:bg-gray-900 sm:-mx-14 sm:px-14">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="mb-4 font-serif text-2xl font-bold text-gray-900 dark:text-white md:text-3xl">
          Ready to Get Started?
        </h2>
        <p className="mb-8 text-lg text-gray-600 dark:text-gray-300">
          Start optimizing your ML models in minutes with our easy-to-use
          compiler.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <button className="rounded-lg bg-blue-600 px-5 py-2 font-medium text-white transition-colors hover:bg-blue-700">
            Install CompileML
          </button>
          <button className="rounded-lg border border-gray-300 bg-white px-5 py-2 font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700">
            Read the Docs
          </button>
        </div>
      </div>
    </section>
  );
};

export default GetStartedSection;
