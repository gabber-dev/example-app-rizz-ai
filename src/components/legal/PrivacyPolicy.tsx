"use client";

import React, { useState } from "react";
import Button from "@/components/ui/Button";

export default function PrivacyPolicy({ isModal = false }) {
  const [activeSection, setActiveSection] = useState("updates");

  const sections = [
    {
      id: "introduction",
      title: "Introduction",
      content: (
        <>
          <p className="mb-4">
            At <strong>Rizz.AI</strong> (&quot;Rizz,&quot; &quot;we,&quot;
            &quot;us,&quot; or &quot;our&quot;), we take your privacy seriously.
            This Privacy Policy explains how we collect, use, disclose, and
            protect your personal data when you access or use our website,
            website, website, website, products, services, and applications
            (collectively, the &quot;Services&quot;).
          </p>
          <p className="mb-4">
            By using or accessing the Services, you acknowledge that you have
            read, understood, and agreed to this Privacy Policy. If you do not
            agree, you must immediately discontinue use of the Services.
          </p>
        </>
      ),
    },
    {
      id: "updates",
      title: "Updates to this Privacy Policy",
      content: (
        <>
          <p className="mb-4">
            We may update this Privacy Policy from time to time as we improve
            our Services and comply with new regulations. If changes occur, we
            will notify you through appropriate means, such as an update on our
            website or an email notification. Your continued use of the Services
            after such changes constitutes acceptance of the updated Privacy
            Policy.
          </p>
        </>
      ),
    },
    {
      id: "age",
      title: "Age Restrictions and Protections",
      content: (
        <>
          <p className="mb-4">
            <strong>
              Rizz is strictly for users 18 years of age or older.
            </strong>
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>
              We do <strong>not</strong> knowingly collect or store personal
              data from individuals under 18.
            </li>
            <li>
              If we become aware that we have collected information from a
              minor, we will delete it immediately.
            </li>
            <li>
              If you believe someone under 18 has accessed the Services, please
              contact us at{" "}
              <a href="mailto:support@rizz.ai" className="text-primary">
                support@rizz.ai
              </a>{" "}
              to report it.
            </li>
          </ul>
        </>
      ),
    },
    {
      id: "information",
      title: "Information We Collect",
      content: (
        <>
          <p className="mb-4">
            We collect the following types of data when you use the Services:
          </p>

          <h3 className="font-semibold mb-2">A. Personal Data You Provide</h3>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>
              <strong>Account Data:</strong> Name, phone number or email
              address, payment details (if applicable).
            </li>
            <li>
              <strong>User-Generated Content:</strong> Messages, images,
              interactions with AI characters, profile preferences.
            </li>
            <li>
              <strong>Support Requests:</strong> Communications with customer
              service, feedback, and reports.
            </li>
          </ul>

          <h3 className="font-semibold mb-2">
            B. Automatically Collected Data
          </h3>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>
              <strong>Device & IP Information:</strong> Browser type, operating
              system, IP address, location (approximate).
            </li>
            <li>
              <strong>Usage Data:</strong> Pages viewed, time spent in
              conversations, feature engagement metrics.
            </li>
            <li>
              <strong>Cookies & Tracking:</strong> See Section 7 for details.
            </li>
          </ul>

          <h3 className="font-semibold mb-2">C. Sensitive Data Policy</h3>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>
              We <strong>do not</strong> request or store sensitive personal
              data such as financial account numbers, social security numbers,
              or medical records.
            </li>
            <li>
              Users are <strong>strictly prohibited</strong> from inputting{" "}
              <strong>personally identifiable</strong> or{" "}
              <strong>sensitive data</strong> into AI interactions.
            </li>
          </ul>
        </>
      ),
    },
    {
      id: "use",
      title: "How We Use Your Information",
      content: (
        <>
          <p className="mb-4">We use your data to:</p>
          <ol className="list-decimal pl-6 mb-4 space-y-2">
            <li>
              <strong>Provide and Improve Services</strong> – Operate AI
              interactions, process payments, and enhance user experience.
            </li>
            <li>
              <strong>Ensure Security and Compliance</strong> – Prevent fraud,
              verify user eligibility, and enforce content policies.
            </li>
            <li>
              <strong>Analyze and Develop Features</strong> – Optimize AI
              performance, personalize content, and refine user engagement.
            </li>
            <li>
              <strong>Marketing & Communications</strong> – Send service
              updates, promotional offers, and engagement reminders.
            </li>
          </ol>
        </>
      ),
    },
    {
      id: "sharing",
      title: "How We Share Your Data",
      content: (
        <>
          <p className="mb-4">
            We <strong>do not sell</strong> your personal data. However, we may{" "}
            <strong>share</strong> your data under the following circumstances:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>
              <strong>With Service Providers</strong> – Payment processors,
              cloud storage, and analytics partners who assist in operating
              Rizz.
            </li>
            <li>
              <strong>For Legal Compliance</strong> – When required by law, such
              as responding to subpoenas or government requests.
            </li>
            <li>
              <strong>With Consent</strong> – If you explicitly authorize data
              sharing (e.g., linking accounts with third-party services).
            </li>
          </ul>
        </>
      ),
    },
    {
      id: "retention",
      title: "Data Retention and Deletion",
      content: (
        <>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>
              We retain your account data for as long as your account is{" "}
              <strong>active</strong>.
            </li>
            <li>
              <strong>Chat history and user interactions</strong> may be stored
              to enhance AI capabilities unless you request deletion.
            </li>
            <li>
              You may{" "}
              <strong>
                request deletion of your account and associated data
              </strong>{" "}
              at any time by emailing{" "}
              <a href="mailto:support@rizz.ai" className="text-primary">
                support@rizz.ai
              </a>
              .
            </li>
            <li>
              If you violate our <strong>Terms of Service</strong>, we may
              retain data to comply with legal obligations or prevent fraud.
            </li>
          </ul>
        </>
      ),
    },
    {
      id: "cookies",
      title: "Cookies, Tracking, and Opt-Out Options",
      content: (
        <>
          <p className="mb-4">
            Rizz uses <strong>cookies and tracking technologies</strong> to
            enhance user experience. These include:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>
              <strong>Essential Cookies</strong> – Required for authentication
              and security.
            </li>
            <li>
              <strong>Performance Cookies</strong> – Help analyze how users
              interact with the platform.
            </li>
            <li>
              <strong>Marketing Cookies</strong> – Used for promotional efforts
              (you can opt-out).
            </li>
          </ul>

          <h3 className="font-semibold mb-2">Opt-Out Options</h3>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>
              You can disable cookies through <strong>browser settings</strong>.
            </li>
            <li>
              Marketing emails can be unsubscribed by selecting{" "}
              <strong>&quot;Opt-Out&quot;</strong> in any communication.
            </li>
            <li>
              Rizz does not honor <strong>Do Not Track (DNT)</strong> signals at
              this time.
            </li>
          </ul>
        </>
      ),
    },
    {
      id: "security",
      title: "Data Security Measures",
      content: (
        <>
          <p className="mb-4">
            We implement strict{" "}
            <strong>
              technical, organizational, and administrative security
            </strong>{" "}
            measures to protect user data, including:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>
              <strong>Encryption</strong> – Sensitive data is encrypted in
              transit and at rest.
            </li>
            <li>
              <strong>Access Controls</strong> – User authentication and
              verification protocols.
            </li>
            <li>
              <strong>Anonymization</strong> – Aggregated and de-identified data
              for AI model improvements.
            </li>
          </ul>
          <p className="mb-4">
            While we take <strong>reasonable precautions</strong>, no system is
            100% secure. Users are responsible for{" "}
            <strong>keeping login credentials private</strong> and reporting any
            suspected security breaches.
          </p>
        </>
      ),
    },
    {
      id: "rights",
      title: "Your Rights and Choices",
      content: (
        <>
          <p className="mb-4">
            Depending on your location, you may have the right to:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>
              <strong>Access your personal data</strong> and request a copy.
            </li>
            <li>
              <strong>Correct inaccurate data</strong> stored by us.
            </li>
            <li>
              <strong>Delete your account</strong> and associated data.
            </li>
            <li>
              <strong>Opt-out of targeted marketing communications</strong>.
            </li>
          </ul>
          <p className="mb-4">
            To exercise these rights, contact us at{" "}
            <a href="mailto:support@rizz.ai" className="text-primary">
              support@rizz.ai
            </a>
            .
          </p>
        </>
      ),
    },
    {
      id: "compliance",
      title: "Compliance with Privacy Laws",
      content: (
        <>
          <h3 className="font-semibold mb-2">
            A. California Consumer Privacy Act (CCPA) & California Privacy
            Rights Act (CPRA)
          </h3>
          <p className="mb-4">California residents have the right to:</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>
              Request access to the{" "}
              <strong>categories of personal data collected</strong> in the past
              12 months.
            </li>
            <li>
              Request <strong>deletion of personal data</strong> (subject to
              exemptions).
            </li>
            <li>
              Opt-out of data <strong>sharing with third parties</strong> for
              marketing.
            </li>
          </ul>
          <p className="mb-4">
            <strong>To submit a CCPA request, email:</strong>{" "}
            <a href="mailto:support@rizz.ai" className="text-primary">
              support@rizz.ai
            </a>
          </p>

          <h3 className="font-semibold mb-2">
            B. General Data Protection Regulation (GDPR) (EU/EEA Users)
          </h3>
          <p className="mb-4">
            If you are located in the <strong>European Union (EU)</strong> or{" "}
            <strong>European Economic Area (EEA)</strong>, you have:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>
              The <strong>right to data portability</strong> and restriction of
              processing.
            </li>
            <li>
              The <strong>right to withdraw consent</strong> at any time.
            </li>
            <li>
              The <strong>right to lodge a complaint</strong> with a supervisory
              authority.
            </li>
          </ul>

          <h3 className="font-semibold mb-2">
            C. Children&apos;s Online Privacy Protection Act (COPPA)
          </h3>
          <p className="mb-4">
            Rizz <strong>does not</strong> knowingly collect personal data from
            children <strong>under 18 years of age</strong>.
          </p>
          <p className="mb-4">
            If you believe a minor has used the Services, please email{" "}
            <a href="mailto:support@rizz.ai" className="text-primary">
              support@rizz.ai
            </a>{" "}
            for immediate removal.
          </p>
        </>
      ),
    },
    {
      id: "enforcement",
      title: "Law Enforcement Requests",
      content: (
        <>
          <p className="mb-4">
            We may disclose data in response to{" "}
            <strong>
              court orders, legal requests, or government investigations
            </strong>{" "}
            if required by law.
          </p>
          <p className="mb-4">
            <strong>
              We do not voluntarily share data with law enforcement
            </strong>{" "}
            unless legally compelled.
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
            For questions regarding this Privacy Policy, contact:
          </p>
          <ul className="list-none mb-4 space-y-2">
            <li>
              <strong>Email:</strong>{" "}
              <a href="mailto:support@rizz.ai" className="text-primary">
                support@rizz.ai
              </a>
            </li>
            <li>
              <strong>Website:</strong>{" "}
              <a href="https://rizz.ai" className="text-primary">
                https://rizz.ai
              </a>
            </li>
          </ul>
          <p className="mb-4">
            By using Rizz, you acknowledge that you have read, understood, and
            agreed to this <strong>Privacy Policy</strong>.
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
            Rizz Privacy Policy
          </h1>
          <p className="text-base-content/70 max-w-2xl mx-auto">
            This Privacy Policy describes how we collect, use, and handle your
            personal information when you use our services.
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
