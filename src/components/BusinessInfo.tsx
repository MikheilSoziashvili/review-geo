import React from "react";

interface FAQ {
  question: string;
  answer: string;
}

interface ContactInfo {
  phone?: string;
  email?: string;
  website?: string;
}

interface BusinessInfoProps {
  about?: string;
  faqs?: FAQ[];
  hours?: string;
  contactInfo?: ContactInfo;
}

export default function BusinessInfo({
  about,
  faqs,
  hours,
  contactInfo,
}: BusinessInfoProps) {
  const sections: { title: string; content: React.ReactNode }[] = [];

  if (about) {
    sections.push({
      title: "About Us",
      content: <p>{about}</p>,
    });
  }
  if (hours) {
    sections.push({
      title: "Operating Hours",
      content: <p>{hours}</p>,
    });
  }
  if (contactInfo && (contactInfo.phone || contactInfo.email || contactInfo.website)) {
    sections.push({
      title: "Contact Information",
      content: (
        <div>
          {contactInfo.phone && <p>Phone: {contactInfo.phone}</p>}
          {contactInfo.email && <p>Email: {contactInfo.email}</p>}
          {contactInfo.website && <p>Website: {contactInfo.website}</p>}
        </div>
      ),
    });
  }
  if (faqs && faqs.length > 0) {
    sections.push({
      title: "FAQs",
      content: (
        <div>
          {faqs.map((faq, index) => (
            <div key={index} className="mb-2">
              <strong>{faq.question}</strong>
              <p>{faq.answer}</p>
            </div>
          ))}
        </div>
      ),
    });
  }

  if (sections.length === 0) {
    return null;
  }

  return (
    <div className="mt-8 space-y-6">
      {sections.map((section, idx) => (
        <div key={idx}>
          <h3 className="text-xl font-bold mb-2">{section.title}</h3>
          <div className="text-sm text-muted-foreground">{section.content}</div>
        </div>
      ))}
    </div>
  );
}
