import { Link } from "lucide-react";
import React from "react";

interface RoleCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  link: string;
}

const RoleCard = ({ icon, title, description, link }: RoleCardProps) => {
  return (
    <div className="rounded-lg border border-[#DCE3EB] bg-white p-6 text-center shadow-md transition-shadow hover:shadow-lg dark:border-[#2C3E50] dark:bg-[#1F2937]">
      <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-[#DCE3EB] text-[#4F6D7A] dark:bg-[#2C3E50] dark:text-[#8DA1B9]">
        {icon}
      </div>
      <h3 className="mb-3 text-xl font-semibold text-[#1E293B] dark:text-[#E0E5EC]">
        {title}
      </h3>
      <p className="mb-6 text-[#1E293B] dark:text-[#E0E5EC]">{description}</p>
      <Link
        href={link}
        className="font-medium text-[#4F6D7A] transition-colors hover:text-[#8DA1B9] dark:text-[#8DA1B9] dark:hover:text-[#DCE3EB]"
      >
        Learn More &rarr;
      </Link>
    </div>
  );
};

export default RoleCard;
