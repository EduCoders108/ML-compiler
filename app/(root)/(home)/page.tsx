"use client";

import React from "react";
import {
  FiCpu,
  FiZap,
  FiCode,
  FiBarChart2,
  FiServer,
  FiGlobe,
} from "react-icons/fi";
// import { useTheme } from "next-themes";

// Feature card component
interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
}) => {
  return (
    <div className="rounded-xl bg-white p-6 shadow-md transition-all hover:-translate-y-1 hover:shadow-lg dark:bg-gray-800">
      <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-blue-50 dark:bg-blue-900/50">
        {icon}
      </div>
      <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  );
};

// Code snippet component
interface CodeSnippetProps {
  language: string;
  code: string;
}

const CodeSnippet: React.FC<CodeSnippetProps> = ({ language, code }) => (
  <div className="my-4 overflow-x-auto rounded-lg bg-gray-800 p-4 dark:bg-gray-900">
    <pre className="font-mono text-sm text-gray-100">
      <code>{code}</code>
    </pre>
  </div>
);

// Main homepage component
export default function HomePage() {
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
    // Note: We don't need outer container divs as they're provided by your layout
    <>
      {/* Hero Section */}
      <section className="-mx-6 mt-4 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-12 dark:from-gray-900 dark:to-blue-900 sm:-mx-14 sm:px-14">
        <div className="flex flex-col items-center md:flex-row">
          <div className="md:w-1/2 md:pr-10">
            <h1 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
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
              <button className="rounded-lg border border-blue-600 bg-white px-5 py-2 font-medium text-blue-600 transition-colors hover:bg-gray-50 dark:border-blue-400 dark:bg-gray-800 dark:text-blue-400 dark:hover:bg-gray-700">
                View Documentation
              </button>
            </div>
          </div>
          <div className="mt-10 md:mt-0 md:w-1/2">
            <div className="relative h-56 w-full md:h-72">
              <div className="absolute inset-0 rounded-xl bg-blue-600 opacity-10 dark:bg-blue-500"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <FiCpu className="size-24 text-blue-500 dark:text-blue-400" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What is CompileML Section */}
      <section className="mt-8 py-12">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white md:text-3xl">
            What is CompileML?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            CompileML is a cutting-edge compiler framework designed specifically
            for machine learning models. It analyzes your model's computational
            graph and generates highly optimized code for your target hardware.
          </p>
        </div>

        <div className="mt-8 grid gap-8 md:grid-cols-2">
          <div className="rounded-xl bg-gray-50 p-6 dark:bg-gray-800 sm:p-8">
            <h3 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
              Traditional ML Deployment
            </h3>
            <p className="mb-4 text-gray-600 dark:text-gray-300">
              Without optimization, models run with generic operations that
              don't fully utilize hardware capabilities, resulting in slower
              inference and higher resource usage.
            </p>
            <div className="flex h-40 items-center justify-center rounded-lg bg-gray-200 dark:bg-gray-700">
              <div className="text-center">
                <FiServer className="mx-auto size-10 text-gray-400 dark:text-gray-500" />
                <p className="mt-2 text-gray-500 dark:text-gray-400">
                  Generic ML Execution
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-xl bg-blue-50 p-6 dark:bg-blue-900/30 sm:p-8">
            <h3 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
              CompileML Approach
            </h3>
            <p className="mb-4 text-blue-600 dark:text-blue-300">
              Our compiler optimizes operations specifically for your hardware,
              fuses operations, and eliminates redundancies, resulting in faster
              inference and reduced memory footprint.
            </p>
            <div className="flex h-40 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/50">
              <div className="text-center">
                <FiZap className="mx-auto size-10 text-blue-500 dark:text-blue-300" />
                <p className="mt-2 text-blue-500 dark:text-blue-300">
                  Optimized ML Execution
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="-mx-6 mt-4 rounded-lg bg-gray-50 px-6 py-12 dark:bg-gray-800 sm:-mx-14 sm:px-14">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white md:text-3xl">
            Key Features
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Our ML compiler offers a suite of optimization techniques to make
            your models faster and more efficient.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <FeatureCard
            icon={<FiZap className="size-6 text-blue-500 dark:text-blue-300" />}
            title="Hardware Acceleration"
            description="Optimize models for CPUs, GPUs, TPUs, and custom hardware accelerators."
          />
          <FeatureCard
            icon={<FiCpu className="size-6 text-blue-500 dark:text-blue-300" />}
            title="Operation Fusion"
            description="Combine operations into optimized kernels for reduced memory transfers."
          />
          <FeatureCard
            icon={
              <FiCode className="size-6 text-blue-500 dark:text-blue-300" />
            }
            title="Precision Optimization"
            description="Support for FP32, FP16, INT8, and mixed precision computation."
          />
          <FeatureCard
            icon={
              <FiBarChart2 className="size-6 text-blue-500 dark:text-blue-300" />
            }
            title="Memory Optimization"
            description="Minimize memory footprint with buffer reuse and scheduling."
          />
          <FeatureCard
            icon={
              <FiServer className="size-6 text-blue-500 dark:text-blue-300" />
            }
            title="Deployment Flexibility"
            description="Deploy on cloud, edge, or mobile with the same workflow."
          />
          <FeatureCard
            icon={
              <FiGlobe className="size-6 text-blue-500 dark:text-blue-300" />
            }
            title="Framework Support"
            description="Compatible with TensorFlow, PyTorch, ONNX, and other frameworks."
          />
        </div>
      </section>

      {/* How It Works Section */}
      <section className="mt-8 py-12">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white md:text-3xl">
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
            <div className="absolute inset-y-0 left-4 hidden w-1 bg-blue-200 dark:bg-blue-800 md:block"></div>

            {/* Steps */}
            <div className="space-y-10">
              <div className="flex flex-col md:flex-row">
                <div className="z-10 hidden shrink-0 rounded-full bg-blue-500 md:block md:size-8"></div>
                <div className="md:ml-10">
                  <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
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
                  <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
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
                  <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
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
                  <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                    4. Deployment Packaging
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Package the optimized model with minimal dependencies for
                    easy deployment in your target environment.
                  </p>

                  <CodeSnippet language="python" code={exampleCode} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Getting Started Section */}
      <section className="-mx-6 mb-8 mt-4 rounded-lg bg-blue-50 px-6 py-12 dark:bg-blue-900/30 sm:-mx-14 sm:px-14">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white md:text-3xl">
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
            <button className="rounded-lg border border-blue-600 bg-white px-5 py-2 font-medium text-blue-600 transition-colors hover:bg-gray-50 dark:border-blue-400 dark:bg-gray-800 dark:text-blue-400 dark:hover:bg-gray-700">
              Read the Docs
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
