"use client"
import Link from "next/link"

const guides = [
  {
    category: "Leases & Contracts",
    icon: "📄",
    color: "from-[#6a0d83] to-[#ce4993]",
    articles: [
      { title: "How to Read a Lease Before You Sign", time: "5 min read" },
      { title: "Security Deposits: What's Legal in California", time: "4 min read" },
      { title: "What to Do If Your Landlord Won't Return Your Deposit", time: "6 min read" },
      { title: "Breaking a Lease Early: Your Options", time: "5 min read" },
    ]
  },
  {
    category: "Tenant Rights",
    icon: "⚖️",
    color: "from-[#ee5d6c] to-[#fb9062]",
    articles: [
      { title: "California Tenant Protections You Should Know", time: "7 min read" },
      { title: "Your Right to Habitable Housing", time: "4 min read" },
      { title: "Illegal Landlord Practices (and How to Report Them)", time: "6 min read" },
      { title: "How to File a Complaint Against Your Landlord", time: "5 min read" },
    ]
  },
  {
    category: "Roommate Conflicts",
    icon: "🤝",
    color: "from-[#fb9062] to-[#eeaf61]",
    articles: [
      { title: "How to Set House Rules That Actually Stick", time: "4 min read" },
      { title: "Dealing With a Difficult Roommate", time: "5 min read" },
      { title: "Splitting Bills Fairly: A Simple Guide", time: "3 min read" },
      { title: "When to Involve Your Landlord in a Roommate Dispute", time: "4 min read" },
    ]
  },
  {
    category: "Safety & Maintenance",
    icon: "🔒",
    color: "from-[#6a0d83] to-[#ee5d6c]",
    articles: [
      { title: "Moving In Checklist: Document Everything", time: "4 min read" },
      { title: "How to Request Repairs (and What to Do If Ignored)", time: "5 min read" },
      { title: "Pest & Infestation: Tenant Rights in California", time: "6 min read" },
      { title: "Fire Safety Basics Every Renter Should Know", time: "3 min read" },
    ]
  },
  {
    category: "Scam Prevention",
    icon: "🚨",
    color: "from-[#ce4993] to-[#fb9062]",
    articles: [
      { title: "Red Flags: How to Spot a Fake Listing", time: "5 min read" },
      { title: "Never Send Money Before Seeing a Place — Here's Why", time: "3 min read" },
      { title: "How Rental Scams Work (and How to Avoid Them)", time: "6 min read" },
      { title: "What to Do If You've Been Scammed", time: "4 min read" },
    ]
  },
  {
    category: "Moving & Finances",
    icon: "💰",
    color: "from-[#eeaf61] to-[#fb9062]",
    articles: [
      { title: "Budgeting for Your First Apartment", time: "5 min read" },
      { title: "Hidden Costs of Renting Nobody Tells You About", time: "4 min read" },
      { title: "Renter's Insurance: Do You Actually Need It?", time: "3 min read" },
      { title: "How to Negotiate Rent as a Student", time: "4 min read" },
    ]
  },
]

export default function GuidesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="relative z-10 max-w-6xl mx-auto w-full px-4 py-10">
        <h1 className="text-4xl font-quickSand font-semibold text-white mb-2">
          Student Housing Guides
        </h1>
        <p className="text-white/70 font-quickSand mb-10 text-lg">
          Everything you need to rent smart, stay safe, and know your rights.
        </p>

        {/* Featured banner */}
        <div className="bg-white/90 rounded-2xl p-8 mb-10 font-quickSand flex flex-col md:flex-row items-center gap-6">
          <div className="text-6xl">🏠</div>
          <div className="flex-1">
            <span className="text-md font-semibold text-[#ce4993] uppercase tracking-wide">Start Here</span>
            <h2 className="text-2xl font-quickSand font-semibold text-[#6a0d83] mt-1 mb-2">
              First Time Renting? Read This First.
            </h2>
            <p className="text-gray-500 text-md leading-relaxed">
              A complete beginner's guide to student housing — from finding a place to signing a lease to moving in safely. Written specifically for UCSB students.
            </p>
          </div>
          <button className="shrink-0 py-3 px-6 rounded-xl bg-gradient-to-r from-[#6a0d83] to-[#ce4993] text-white font-quickSand font-medium hover:opacity-90 transition">
            Read Guide →
          </button>
        </div>

        {/* Guide categories */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {guides.map((section) => (
            <div key={section.category} className="bg-white/90 rounded-2xl overflow-hidden hover:shadow-xl transition">
              {/* Header */}
              <div className={`bg-gradient-to-r ${section.color} p-5 flex items-center gap-3`}>
                <span className="text-3xl">{section.icon}</span>
                <h3 className="text-white font-quickSand font-semibold text-2xl">{section.category}</h3>
              </div>

              {/* Articles */}
              <ul className="divide-y divide-gray-100">
                {section.articles.map((article) => (
                  <li key={article.title}>
                    <Link
                      href="#"
                      className="flex items-center justify-between px-5 py-3 hover:bg-[#f9f0ff] transition group"
                    >
                      <span className="text-md text-gray-700 group-hover:text-[#6a0d83] transition leading-snug pr-4">
                        {article.title}
                      </span>
                      <span className="text-sm text-gray-400 shrink-0">{article.time}</span>
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="px-5 py-3 border-t">
                <Link href="#" className="text-sm text-[#ce4993] hover:underline font-quickSand">
                  View all →
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-10 bg-white/90 rounded-2xl p-8 font-quickSand text-center">
          <h2 className="text-2xl font-quickSand font-semibold text-[#6a0d83] mb-2">
            Can't find what you're looking for?
          </h2>
          <p className="text-[#01184e] text-lg mb-6">
            Ask our community or reach out to a tenant advocate directly.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button className="py-3 px-6 text-lg rounded-xl bg-gradient-to-r from-[#6a0d83] to-[#ce4993] text-white font-quickSand font-medium hover:opacity-90 transition">
              Ask the Community
            </button>
            <button className="py-3 px-6 text-lg rounded-xl border-2 border-[#ce4993] text-[#ce4993] font-quickSand font-medium hover:bg-pink-50 transition">
              Talk to an Advocate
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}