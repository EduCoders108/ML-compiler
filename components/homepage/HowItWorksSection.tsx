"use client";

import React from "react";
import CodeSnippet from "./CodeSnippet";

const HowItWorksSection: React.FC = () => {
  // Example ML model optimization code
  const exampleCode = `# Your ML model code
import compileml

# Load your existing model
model = load_model("my_model.h5")

# Optimize with CompileML
optimized_model = compileml.optimize(
    model,
    target="gpu",
    precision="mixed",
    optimization_level=3
)

# Export the optimized model
optimized_model.save("optimized_model")`;

  return (
    <section className="mt-8 py-12">
      <div className="mx-auto mb-10 max-w-3xl text-center">
        <h2 className="mb-4 font-serif text-2xl font-bold text-gray-900 dark:text-white md:text-3xl">
          How It Works
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Our compiler transforms your models in a multi-stage process to
          deliver optimal performance.
        </p>
      </div>

      <div className="mx-auto max-w-3xl">
        <div className="relative">
          {/* Timeline connector */}
          <div className="absolute inset-y-0 left-4 hidden w-1 bg-gray-200 dark:bg-gray-700 md:block"></div>

          {/* Steps */}
          <div className="space-y-10">
            <div className="flex flex-col md:flex-row">
              <div className="z-10 hidden shrink-0 rounded-full bg-blue-500 md:block md:size-8"></div>
              <div className="md:ml-10">
                <h3 className="mb-2 font-serif text-xl font-semibold text-gray-900 dark:text-white">
                  1. Model Ingestion
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Import your model from any major framework (TensorFlow,
                  PyTorch, ONNX) and convert it to our intermediate
                  representation.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row">
              <div className="z-10 hidden shrink-0 rounded-full bg-blue-500 md:block md:size-8"></div>
              <div className="md:ml-10">
                <h3 className="mb-2 font-serif text-xl font-semibold text-gray-900 dark:text-white">
                  2. Graph Analysis & Optimization
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Analyze the computational graph, identify optimization
                  opportunities, and apply transformations like operation
                  fusion.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row">
              <div className="z-10 hidden shrink-0 rounded-full bg-blue-500 md:block md:size-8"></div>
              <div className="md:ml-10">
                <h3 className="mb-2 font-serif text-xl font-semibold text-gray-900 dark:text-white">
                  3. Hardware-Specific Code Generation
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Generate optimized code for your target hardware, leveraging
                  specific instructions and memory hierarchies.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row">
              <div className="z-10 hidden shrink-0 rounded-full bg-blue-500 md:block md:size-8"></div>
              <div className="md:ml-10">
                <h3 className="mb-2 font-serif text-xl font-semibold text-gray-900 dark:text-white">
                  4. Deployment Packaging
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Package the optimized model with minimal dependencies for easy
                  deployment in your target environment.
                </p>

                <CodeSnippet language="python" code={exampleCode} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
