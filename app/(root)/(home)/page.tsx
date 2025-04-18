"use client";

import React from "react";
import HeroSection from "@/components/homepage/HeroSection";
import WhatIsSection from "@/components/homepage/WhatIsSection";
import FeaturesSection from "@/components/homepage/FeaturesSection";
import HowItWorksSection from "@/components/homepage/HowItWorksSection";
import GetStartedSection from "@/components/homepage/GetStartedSection";
import UserRolesSection from "@/components/homepage/UserRoles";

// Main homepage component
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <WhatIsSection />
      <FeaturesSection />
      <UserRolesSection />
      <HowItWorksSection />
      <GetStartedSection />
    </>
  );
}
