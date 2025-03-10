"use client";

import React, { useState } from "react";
import Button from "@/components/ui/Button";

export default function TermsOfService({ isModal = false }) {
  const [activeSection, setActiveSection] = useState("acceptance");

  const sections = [
    {
      id: "acceptance",
      title: "Acceptance of Terms",
      content: (
        <>
          <p className="mb-4">
            Welcome to Rizz. Please read these Terms of Service
            (&quot;Terms&quot;) carefully. They govern your access and use of
            Rizz&apos;s website, products, services, and applications
            (collectively, the &quot;Services&quot;).
          </p>
          <p className="mb-4">
            These Terms form a legally binding agreement between you
            (&quot;User&quot;) and Rizz.AI (&quot;Rizz,&quot; &quot;we,&quot;
            &quot;us,&quot; &quot;our&quot;). Your use of the Services
            constitutes acceptance of these Terms, including our Privacy Policy.
          </p>
          <p className="mb-4">
            If you do not agree to these Terms, you must stop using the Services
            immediately.
          </p>
        </>
      ),
    },
    {
      id: "changes",
      title: "Changes to These Terms",
      content: (
        <>
          <p className="mb-4">
            We may update these Terms as necessary. If we make changes, we will
            notify you by:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Posting a notice on https://rizz.ai</li>
            <li>Sending you an email or other communication</li>
          </ul>
          <p className="mb-4">
            If you continue using the Services after changes become effective,
            you agree to the revised Terms. If you disagree, you must stop using
            the Services immediately.
          </p>
        </>
      ),
    },
    {
      id: "privacy",
      title: "Privacy Policy",
      content: (
        <>
          <p className="mb-4">
            Your privacy is important to us. Please refer to our Privacy Policy
            for details on how we collect, use, and share your data.
          </p>
        </>
      ),
    },
    {
      id: "age",
      title: "Age Requirement",
      content: (
        <>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>You must be at least 18 years old to use the Services.</li>
            <li>
              We do not knowingly collect personal data from users under 18.
            </li>
            <li>
              If you suspect an underage user is accessing the Services, report
              it to support@rizz.ai.
            </li>
          </ul>
        </>
      ),
    },
    {
      id: "account",
      title: "User Accounts",
      content: (
        <>
          <h3 className="font-semibold mb-2">A. Account Creation</h3>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>You may need an account to access certain features.</li>
            <li>
              You must provide accurate, complete, and up-to-date registration
              information.
            </li>
          </ul>

          <h3 className="font-semibold mb-2">B. Security & Responsibilities</h3>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>You are responsible for safeguarding your account.</li>
            <li>You must not share your account credentials.</li>
            <li>
              If you suspect unauthorized use, notify us immediately at
              support@rizz.ai.
            </li>
          </ul>
        </>
      ),
    },
    {
      id: "acceptable-use",
      title: "Acceptable Use of Services",
      content: (
        <>
          <p className="mb-4">By using Rizz, you agree NOT to:</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>
              Use the Services for illegal, fraudulent, or harmful activities.
            </li>
            <li>Harass, exploit, or harm other users.</li>
            <li>
              Distribute hateful, violent, misleading, or defamatory content.
            </li>
            <li>Attempt unauthorized access to our systems.</li>
            <li>Use automated bots or scripts to manipulate interactions.</li>
          </ul>
          <p className="mb-4">
            Violation of these rules may result in account termination and legal
            action.
          </p>
        </>
      ),
    },
    {
      id: "ai-interactions",
      title: "AI Interactions and Content",
      content: (
        <>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>
              Rizz provides AI-powered interactions that may include suggestive
              or adult-oriented content.
            </li>
            <li>
              AI-generated content is for entertainment purposes only and should
              not be considered factual or professional advice.
            </li>
            <li>
              Rizz reserves the right to moderate or remove content that
              violates our policies.
            </li>
          </ul>
        </>
      ),
    },
    {
      id: "prohibited",
      title: "Prohibited Content",
      content: (
        <>
          <p className="mb-4">You must not create, share, or engage with:</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>
              Child-related content, non-consensual explicit content, or
              animal-related content.
            </li>
            <li>Hate speech, violence, terrorism, or self-harm material.</li>
            <li>Fraudulent, defamatory, or misleading information.</li>
            <li>
              Intellectual property violations (e.g., copyrighted content
              without permission).
            </li>
          </ul>
          <p className="mb-4">
            Violating these policies may result in permanent account termination
            and may be reported to legal authorities.
          </p>
        </>
      ),
    },
    {
      id: "messaging",
      title: "Messaging & Communications",
      content: (
        <>
          <p className="mb-4">By signing up, you agree to receive:</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>
              AI-driven conversations, feature updates, and promotional messages
              via the app or text/email.
            </li>
            <li>
              Message frequency may vary. Standard carrier data rates may apply.
            </li>
            <li>
              You can opt out anytime by replying STOP or contacting
              support@rizz.ai.
            </li>
          </ul>
        </>
      ),
    },
    {
      id: "payments",
      title: "Payments & Subscriptions",
      content: (
        <>
          <p className="mb-4">
            Certain features require paid subscriptions or one-time payments. By
            subscribing, you agree to:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Pay all applicable fees.</li>
            <li>
              Authorize Rizz to charge your payment method for recurring
              payments.
            </li>
            <li>
              Cancel before the next billing cycle to avoid automatic renewal.
            </li>
            <li>No refunds unless explicitly stated otherwise.</li>
          </ul>
        </>
      ),
    },
    {
      id: "termination",
      title: "Termination of Service",
      content: (
        <>
          <p className="mb-4">We may suspend or terminate your access if:</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>You violate these Terms.</li>
            <li>Your actions pose a legal, security, or safety risk.</li>
            <li>You engage in prohibited conduct.</li>
          </ul>
          <p className="mb-4">
            You may terminate your account at any time by contacting
            support@rizz.ai.
          </p>
        </>
      ),
    },
    {
      id: "intellectual",
      title: "Intellectual Property",
      content: (
        <>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>
              All intellectual property related to Rizz, AI technology,
              branding, and content belongs exclusively to Rizz.AI.
            </li>
            <li>
              You may not copy, distribute, or commercially exploit any
              Rizz-generated content without written permission.
            </li>
          </ul>
        </>
      ),
    },
    {
      id: "no-advice",
      title: "No Professional Advice",
      content: (
        <>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>
              Rizz is NOT a substitute for medical, psychological, financial, or
              legal advice.
            </li>
            <li>AI-generated content is for entertainment purposes only.</li>
            <li>Do not rely on AI responses for critical decision-making.</li>
          </ul>
        </>
      ),
    },
    {
      id: "disclaimers",
      title: "Disclaimer of Warranties",
      content: (
        <>
          <p className="mb-4">
            Rizz is provided &quot;as-is&quot;, without warranties of any kind.
          </p>
          <p className="mb-4">We do not guarantee:</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Uninterrupted or error-free operation.</li>
            <li>The accuracy or reliability of AI-generated responses.</li>
            <li>That content will always meet your expectations.</li>
          </ul>
        </>
      ),
    },
    {
      id: "liability",
      title: "Limitation of Liability",
      content: (
        <>
          <p className="mb-4">
            To the maximum extent permitted by law, Rizz is not liable for:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Indirect, incidental, or consequential damages.</li>
            <li>Loss of profits, data, or reputation.</li>
            <li>
              Any claim exceeding the amount paid for the Services in the last
              12 months.
            </li>
          </ul>
        </>
      ),
    },
    {
      id: "indemnification",
      title: "Indemnification",
      content: (
        <>
          <p className="mb-4">
            You agree to indemnify and hold harmless Rizz, its affiliates, and
            employees from any claims, damages, or expenses arising from:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Your use or misuse of the Services.</li>
            <li>Your violation of these Terms.</li>
            <li>Any content you create or distribute using Rizz.</li>
          </ul>
        </>
      ),
    },
    {
      id: "dispute",
      title: "Arbitration & Dispute Resolution",
      content: (
        <>
          <h3 className="font-semibold mb-2">A. Binding Arbitration</h3>
          <p className="mb-4">
            All disputes must be resolved through final and binding arbitration
            instead of in court.
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>
              Arbitration will be administered by the American Arbitration
              Association (AAA) under its Commercial Arbitration Rules.
            </li>
            <li>
              One arbitrator will be selected by mutual agreement or appointed
              by the AAA.
            </li>
            <li>
              The arbitration shall be held in San Francisco or Los Angeles,
              California, USA, unless agreed otherwise.
            </li>
            <li>
              Judgment on the arbitration award may be enforced in any court
              with jurisdiction.
            </li>
          </ul>

          <h3 className="font-semibold mb-2">B. Confidentiality</h3>
          <p className="mb-4">
            Neither party may disclose the arbitration existence, content, or
            results without written consent.
          </p>

          <h3 className="font-semibold mb-2">C. Exceptions to Arbitration</h3>
          <p className="mb-4">Either party may seek court action for:</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Temporary restraining orders or preliminary injunctions.</li>
            <li>Intellectual property disputes.</li>
            <li>Small claims court actions (if applicable).</li>
          </ul>

          <h3 className="font-semibold mb-2">D. Waiver of Class Actions</h3>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Claims must be brought individually.</li>
            <li>
              You and Rizz waive the right to class-action lawsuits or class
              arbitrations.
            </li>
          </ul>
        </>
      ),
    },
    {
      id: "governing",
      title: "Governing Law",
      content: (
        <>
          <p className="mb-4">
            These Terms are governed by the laws of Delaware, USA.
          </p>
          <p className="mb-4">
            If arbitration is not applicable, all legal disputes must be
            litigated in Delaware state or federal courts.
          </p>
        </>
      ),
    },
    {
      id: "contact",
      title: "Contact Information",
      content: (
        <>
          <p className="mb-4">
            For any questions, concerns, or support, contact us at:
          </p>
          <ul className="list-none mb-4 space-y-2">
            <li>
              <strong>Email:</strong> support@rizz.ai
            </li>
            <li>
              <strong>Website:</strong> https://rizz.ai
            </li>
          </ul>
          <p className="mb-4">
            By using Rizz, you confirm that you have read, understood, and agree
            to these Terms.
          </p>
        </>
      ),
    },
  ];

  return (
    <div
      className={`bg-base-100 text-base-content ${isModal ? "h-[80vh] overflow-auto" : "min-h-screen"}`}
    >
      <div className={`max-w-4xl mx-auto p-6 ${!isModal && "py-12"}`}>
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-4">
            Rizz Terms of Service
          </h1>
          <p className="text-base-content/70 max-w-2xl mx-auto">
            Please read these Terms of Service carefully before using our
            services. By using Rizz, you agree to be bound by these terms.
          </p>
        </div>

        <div
          className={`grid ${!isModal && "grid-cols-1 md:grid-cols-4"} gap-6`}
        >
          {/* Navigation Sidebar - Only show if not modal */}
          {!isModal && (
            <div className="md:col-span-1">
              <div className="sticky top-4 bg-base-200 rounded-lg overflow-hidden shadow-lg">
                <div className="bg-neutral px-4 py-3">
                  <h3 className="font-semibold">Contents</h3>
                </div>
                <nav className="p-2">
                  <ul className="space-y-1">
                    {sections.map((section) => (
                      <li key={section.id}>
                        <button
                          onClick={() => setActiveSection(section.id)}
                          className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                            activeSection === section.id
                              ? "bg-primary/10 text-primary font-medium"
                              : "hover:bg-base-300"
                          }`}
                        >
                          {section.title}
                        </button>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </div>
          )}

          {/* Content Area - Adjust colspan based on modal state */}
          <div className={`${!isModal ? "md:col-span-3" : "w-full"}`}>
            {sections.map((section) => (
              <div
                key={section.id}
                id={section.id}
                className={`bg-base-200 rounded-lg p-6 shadow-lg mb-6 transition-opacity duration-300 ${
                  activeSection === section.id || isModal
                    ? "opacity-100"
                    : "opacity-70 hover:opacity-100"
                }`}
              >
                <h2 className="text-xl font-bold mb-4 flex items-center">
                  <span className="inline-block w-8 h-8 rounded-full bg-primary/20 text-primary mr-2 flex items-center justify-center">
                    {sections.findIndex((s) => s.id === section.id) + 1}
                  </span>
                  {section.title}
                </h2>
                <div className="prose prose-sm max-w-none text-base-content/90">
                  {section.content}
                </div>
              </div>
            ))}

            {isModal && (
              <div className="flex justify-end space-x-4 mt-6">
                <Button variant="secondary" className="px-6 py-2 rounded-full">
                  Decline
                </Button>
                <Button variant="primary" className="px-6 py-2 rounded-full">
                  Accept
                </Button>
              </div>
            )}
          </div>
        </div>

        {!isModal && (
          <div className="mt-10 border-t border-base-300 pt-6 text-center text-sm text-base-content/60">
            <p>Effective Date: March 1, 2025</p>
          </div>
        )}
      </div>
    </div>
  );
}