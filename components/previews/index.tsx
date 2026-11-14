"use client";

import React from "react";
import { CertificPreview } from "./certific-preview";
import { MvpStudioPreview } from "./mvpstudio-preview";
import { CcidcopPreview } from "./ccidcop-preview";
import { NextcodezPreview } from "./nextcodez-preview";
import { LaynitePreview } from "./laynite-preview";
import { LayouticPreview } from "./layoutic-preview";
import { TalentflowPreview } from "./talentflow-preview";
import { CortextPreview } from "./cortext-preview";

export {
  CertificPreview,
  MvpStudioPreview,
  CcidcopPreview,
  NextcodezPreview,
  LaynitePreview,
  LayouticPreview,
  TalentflowPreview,
  CortextPreview
};

interface PortfolioPreviewProps {
  slug: string;
}

export function PortfolioPreview({ slug }: PortfolioPreviewProps) {
  switch (slug) {
    case "certific":
      return <CertificPreview />;
    case "mvpstudio":
      return <MvpStudioPreview />;
    case "ccidcop":
      return <CcidcopPreview />;
    case "nextcodez":
      return <NextcodezPreview />;
    case "laynite":
      return <LaynitePreview />;
    case "layoutic":
      return <LayouticPreview />;
    case "talentflow":
      return <TalentflowPreview />;
    case "cortext-labs":
    case "cortext":
      return <CortextPreview />;
    default:
      return <CertificPreview />;
  }
}
