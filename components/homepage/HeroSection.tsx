// "use client";

// import React from "react";
// import { FiCpu } from "react-icons/fi";
// import { Typewriter } from "react-simple-typewriter";

// const HeroSection: React.FC = () => {
//   return (
//     <section className="-mx-6 mt-4 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-12 dark:from-gray-900 dark:to-blue-900 sm:-mx-14 sm:px-14">
//       <div className="flex flex-col items-center md:flex-row">
//         <div className="md:w-1/2 md:pr-10">
//           <h1 className="mb-4 font-serif text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
//             <Typewriter
//               words={[`Transform ML Education with Interactive Exams`]}
//               typeSpeed={50}
//               deleteSpeed={50}
//               delaySpeed={1000}
//             />
//           </h1>
//           <p className="mb-8 text-lg text-gray-600 dark:text-gray-300">
//             Optimize your machine learning models for any hardware target with
//             our state-of-the-art compiler technology.
//           </p>
//           <div className="flex flex-wrap gap-4">
//             <button className="rounded-lg bg-blue-600 px-5 py-2 font-medium text-white transition-colors hover:bg-blue-700">
//               Get Started
//             </button>
//             <button className="rounded-lg border border-blue-600 bg-white px-5 py-2 font-medium text-blue-600 transition-colors hover:bg-gray-50 dark:border-blue-400 dark:bg-gray-800 dark:text-blue-400 dark:hover:bg-gray-700">
//               Learn More
//             </button>
//           </div>
//         </div>
//         <div className="mt-10 md:mt-0 md:w-1/2">
//           <div className="relative h-56 w-full md:h-72">
//             <div className="absolute inset-0 rounded-xl bg-blue-600 opacity-10 dark:bg-blue-500"></div>
//             <div className="absolute inset-0 flex items-center justify-center">
//               <FiCpu className="size-24 text-blue-500 dark:text-blue-400" />
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HeroSection;

"use client";

import React from "react";

const HeroSection: React.FC = () => {
  return (
    <section className="-mx-6 mt-4 rounded-lg  px-6 py-12 dark:bg-gray-900 sm:-mx-14 sm:px-14">
      <div className="flex flex-col items-center md:flex-row">
        <div className="md:w-1/2 md:pr-10">
          <h1 className="mb-4 font-serif text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
            Transform Your ML Models with Compiler Optimization
          </h1>
          <p className="mb-8 text-lg text-gray-600 dark:text-gray-300">
            Optimize your machine learning models for any hardware target with
            our state-of-the-art compiler technology.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="rounded-lg bg-blue-600 px-5 py-2 font-medium text-white transition-colors hover:bg-blue-700">
              Get Started
            </button>
            <button className="rounded-lg border border-gray-300 bg-white px-5 py-2 font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700">
              View Documentation
            </button>
          </div>
        </div>
        <div className="md:w-1/2">
          <div className="overflow-hidden rounded-lg bg-white shadow-xl">
            <div className="flex items-center space-x-2 bg-gray-800 px-4 py-2">
              <div className="size-3 rounded-full bg-red-500"></div>
              <div className="size-3 rounded-full bg-yellow-500"></div>
              <div className="size-3 rounded-full bg-green-500"></div>
              <span className="text-sm text-gray-400">monaco-editor.py</span>
            </div>
            <div className="bg-gray-900 p-4 font-mono text-sm text-gray-300">
              <pre>{`import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split

# Load dataset
data = pd.read_csv('dataset.csv')

# Prepare features and target
X = data.drop('target', axis=1)
y = data['target']

# Split the data
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# Model training will be implemented below
# ...`}</pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
