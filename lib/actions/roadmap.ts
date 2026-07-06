"use server";

import prisma from "@/lib/prisma";
import { getServerSession } from "@/lib/auth/server";
import { generateRoadmapWithAI } from "@/lib/ai/roadmap";

export async function generateRoadmapAction(
  companyId: string,
  targetRole = "Software Engineer"
) {
  const session = await getServerSession();

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  // Fetch the selected company
  const company = await prisma.company.findUnique({
    where: {
      id: companyId,
    },
  });

  if (!company) {
    throw new Error("Company not found.");
  }

  // Fetch the user's resume
  const resume = await prisma.resume.findUnique({
    where: {
      userId: session.user.id,
    },
  });

  if (!resume) {
    throw new Error("Please upload your resume first.");
  }

  if (!resume.analysis) {
    throw new Error("Please analyze your resume before generating a roadmap.");
  }

  // Check if a roadmap already exists for this company
  const existingRoadmap = await prisma.roadmap.findFirst({
    where: {
      userId: session.user.id,
      companyId,
    },
  });

  if (existingRoadmap) {
    return {
      success: true,
      roadmap: existingRoadmap,
    };
  }

  // Generate roadmap with Gemini
  const roadmap = await generateRoadmapWithAI({
    resumeAnalysis: resume.analysis,
    companyName: company.name,
    targetRole,
  });

  // Save roadmap
  const savedRoadmap = await prisma.roadmap.create({
    data: {
      userId: session.user.id,
      companyId,

      title: roadmap.title,
      targetRole,

      content: roadmap,

      progress: 0,

      status: "ACTIVE",
    },
  });

  return {
    success: true,
    roadmap: savedRoadmap,
  };
}