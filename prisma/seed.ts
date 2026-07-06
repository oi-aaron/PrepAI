import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const companies = [
    {
      name: "Google",
      slug: "google",
      industry: "Technology",
      description:
        "Global technology company specializing in search, cloud computing, AI, and software products.",
      logoUrl: "https://logo.clearbit.com/google.com",
      websiteUrl: "https://www.google.com",
    },
    {
      name: "Microsoft",
      slug: "microsoft",
      industry: "Technology",
      description:
        "Developer of Windows, Azure, Microsoft 365, and enterprise software solutions.",
      logoUrl: "https://logo.clearbit.com/microsoft.com",
      websiteUrl: "https://www.microsoft.com",
    },
    {
      name: "Amazon",
      slug: "amazon",
      industry: "Technology",
      description:
        "Global e-commerce, cloud computing, AI, and digital services company.",
      logoUrl: "https://logo.clearbit.com/amazon.com",
      websiteUrl: "https://www.amazon.com",
    },
    {
      name: "Meta",
      slug: "meta",
      industry: "Technology",
      description:
        "Parent company of Facebook, Instagram, WhatsApp, and Reality Labs.",
      logoUrl: "https://logo.clearbit.com/meta.com",
      websiteUrl: "https://about.meta.com",
    },
    {
      name: "Apple",
      slug: "apple",
      industry: "Technology",
      description:
        "Consumer electronics and software company known for iPhone, Mac, and iOS.",
      logoUrl: "https://logo.clearbit.com/apple.com",
      websiteUrl: "https://www.apple.com",
    },
    {
      name: "Netflix",
      slug: "netflix",
      industry: "Entertainment",
      description:
        "Streaming entertainment platform with a strong engineering culture.",
      logoUrl: "https://logo.clearbit.com/netflix.com",
      websiteUrl: "https://www.netflix.com",
    },
    {
      name: "Adobe",
      slug: "adobe",
      industry: "Software",
      description:
        "Creative software company behind Photoshop, Acrobat, and Experience Cloud.",
      logoUrl: "https://logo.clearbit.com/adobe.com",
      websiteUrl: "https://www.adobe.com",
    },
    {
      name: "Atlassian",
      slug: "atlassian",
      industry: "Software",
      description:
        "Developer of Jira, Confluence, Trello, and collaboration software.",
      logoUrl: "https://logo.clearbit.com/atlassian.com",
      websiteUrl: "https://www.atlassian.com",
    },
    {
      name: "Uber",
      slug: "uber",
      industry: "Technology",
      description:
        "Mobility and delivery platform serving millions of users worldwide.",
      logoUrl: "https://logo.clearbit.com/uber.com",
      websiteUrl: "https://www.uber.com",
    },
    {
      name: "Goldman Sachs",
      slug: "goldman-sachs",
      industry: "Finance",
      description:
        "Global investment banking, securities, and asset management firm.",
      logoUrl: "https://logo.clearbit.com/goldmansachs.com",
      websiteUrl: "https://www.goldmansachs.com",
    },
    {
      name: "JPMorgan Chase",
      slug: "jpmorgan-chase",
      industry: "Finance",
      description:
        "Multinational financial services and investment banking company.",
      logoUrl: "https://logo.clearbit.com/jpmorganchase.com",
      websiteUrl: "https://www.jpmorganchase.com",
    },
    {
      name: "Flipkart",
      slug: "flipkart",
      industry: "E-commerce",
      description:
        "Leading Indian e-commerce platform offering a wide range of products and services.",
      logoUrl: "https://logo.clearbit.com/flipkart.com",
      websiteUrl: "https://www.flipkart.com",
    },
    {
      name: "Swiggy",
      slug: "swiggy",
      industry: "Food Delivery",
      description:
        "Indian on-demand food delivery and quick commerce platform.",
      logoUrl: "https://logo.clearbit.com/swiggy.com",
      websiteUrl: "https://www.swiggy.com",
    },
    {
      name: "Zomato",
      slug: "zomato",
      industry: "Food Delivery",
      description:
        "Restaurant discovery and food delivery platform based in India.",
      logoUrl: "https://logo.clearbit.com/zomato.com",
      websiteUrl: "https://www.zomato.com",
    },
    {
      name: "Razorpay",
      slug: "razorpay",
      industry: "FinTech",
      description:
        "Indian fintech company providing payment gateway and banking solutions.",
      logoUrl: "https://logo.clearbit.com/razorpay.com",
      websiteUrl: "https://razorpay.com",
    },
  ];

  for (const company of companies) {
    await prisma.company.upsert({
      where: {
        slug: company.slug,
      },
      update: company,
      create: company,
    });
  }

  console.log(`✅ Seeded ${companies.length} companies.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });