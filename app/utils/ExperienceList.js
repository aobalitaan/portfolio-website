// Split into a single lead line plus short scannable highlights, rather than
// three long bullets. Long bullets read as a wall of text at a glance; a lead
// carries the narrative and the highlights get skimmed.
const experienceList = [
  {
    company: "BriarBear",
    link: null,
    role: "Software Engineer",
    location: "US (Remote)",
    period: "Jul 2025 — Aug 2026",
    lead: "Shipped production features across a suite of AI products, working with designers, product owners and engineers across time zones.",
    highlights: [
      "Node-based AI workflow builder (Wyren)",
      "LLM support chatbot — vector search, streaming",
      "AI gift recommendation engine",
      "Business process automation pipelines",
    ],
    metrics: [
      // Not "~10": Syne draws the tilde high and small, so it reads as a middot.
      { value: "10", label: "avg. Jira tickets / sprint" },
      { value: "Clean Arch.", label: "held at that pace" },
    ],
    stack: ["Next.js", "Node.js", "Supabase"],
  },
  {
    company: "Limitless Lab",
    link: "https://www.limitlesslab.org/",
    role: "Software Engineer Intern",
    location: "Mandaluyong, PH",
    period: "Jun 2025 — Aug 2025",
    lead: "Built \"Limitless Funds,\" an AI grant-discovery platform, from Figma prototype through backend integration.",
    highlights: [
      "Gemini + Mistral via OpenRouter",
      "Automated grant matching",
      "Automated proposal drafting",
      "Cut paperwork load on grassroots orgs",
    ],
    metrics: [
      { value: "Full SDLC", label: "prototype to production" },
    ],
    stack: ["Figma", "OpenRouter"],
  },
];

export default experienceList;
