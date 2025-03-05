// import PyodideRunner from "@/components/PyodideRunner";

import PyodideRunner from "@/components/PyodideProvider";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-200">
      <PyodideRunner />
    </div>
  );
}
