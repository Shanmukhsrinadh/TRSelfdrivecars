import { X } from 'lucide-react';

export default function PrivacyPage({ onClose }) {
  return (
    <div className="fixed inset-0 z-[200] bg-white overflow-y-auto" role="dialog" aria-modal="true" aria-label="Privacy Policy">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
        <div>
          <p className="text-[10px] font-semibold text-[#94A3B8] uppercase tracking-widest">Legal</p>
          <h1 className="text-base font-bold text-[#0F172A]">Privacy Policy</h1>
        </div>
        <button onClick={onClose} className="w-9 h-9 rounded-full bg-[#F1F5F9] hover:bg-[#E2E8F0] flex items-center justify-center transition-colors" aria-label="Close">
          <X className="w-4 h-4 text-[#0F172A]" />
        </button>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-6 py-12 space-y-10 text-sm text-[#374151] leading-relaxed">

        <p className="text-xs text-[#94A3B8]">Last updated: July 2025</p>

        <section className="space-y-3">
          <h2 className="text-[#0F172A] font-bold text-base">1. Who We Are</h2>
          <p>
            TRSelfDriveCars is operated by <strong className="text-[#0F172A]">Padma Priya Enterprises</strong>, a self-drive car rental service based in Visakhapatnam, Andhra Pradesh, India. Our pickup hub is located at Care Hospital Arilova, Visakhapatnam.
          </p>
          <p>
            This Privacy Policy explains how we collect, use, and protect the personal information you provide when booking a vehicle or contacting us.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-[#0F172A] font-bold text-base">2. Information We Collect</h2>
          <p>We collect only the information necessary to process your booking:</p>
          <ul className="list-disc list-inside space-y-1.5 pl-2">
            <li><strong className="text-[#0F172A]">Name</strong> — to identify you at pickup</li>
            <li><strong className="text-[#0F172A]">Phone number</strong> — to confirm your booking and communicate trip details</li>
            <li><strong className="text-[#0F172A]">Pickup date and location</strong> — to schedule vehicle delivery</li>
            <li><strong className="text-[#0F172A]">Vehicle preference</strong> — to allocate the right car</li>
          </ul>
          <p>
            This information is submitted via WhatsApp. We do not operate a separate database or account system. All communication happens directly through WhatsApp.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-[#0F172A] font-bold text-base">3. How We Use Your Information</h2>
          <ul className="list-disc list-inside space-y-1.5 pl-2">
            <li>To confirm and process your self-drive car booking</li>
            <li>To contact you regarding pickup time, vehicle condition, and trip details</li>
            <li>To process refundable security deposits</li>
            <li>To respond to queries and provide customer support</li>
          </ul>
          <p>We do not use your information for marketing or promotional purposes without your explicit consent.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-[#0F172A] font-bold text-base">4. Sharing of Information</h2>
          <p>
            We do not sell, rent, or trade your personal information to any third party. Your data is used solely for the purpose of fulfilling your booking with Padma Priya Enterprises.
          </p>
          <p>
            In cases of disputes, accidents, or legal requirements, we may share relevant information with law enforcement or legal authorities as required under Indian law.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-[#0F172A] font-bold text-base">5. Data Retention</h2>
          <p>
            We retain booking records (name, phone, dates) for a period of up to <strong className="text-[#0F172A]">12 months</strong> after the completion of a trip, primarily for dispute resolution and legal compliance. After this period, records are deleted.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-[#0F172A] font-bold text-base">6. Cookies and Website Analytics</h2>
          <p>
            This website does not use tracking cookies, advertising pixels, or third-party analytics scripts that collect personally identifiable information. Any analytics used are for understanding general traffic patterns only.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-[#0F172A] font-bold text-base">7. Your Rights</h2>
          <p>You have the right to:</p>
          <ul className="list-disc list-inside space-y-1.5 pl-2">
            <li>Request what personal information we hold about you</li>
            <li>Request correction of inaccurate data</li>
            <li>Request deletion of your data, subject to any legal obligations</li>
          </ul>
          <p>To exercise any of these rights, contact us via WhatsApp at <strong className="text-[#0F172A]">+91 955-056-3283</strong>.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-[#0F172A] font-bold text-base">8. Security</h2>
          <p>
            All communications between you and us occur over WhatsApp, which uses end-to-end encryption. We take reasonable precautions to protect your information from unauthorised access.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-[#0F172A] font-bold text-base">9. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy periodically. Changes will be reflected on this page with an updated date at the top. Continued use of our service after changes constitutes acceptance of the updated policy.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-[#0F172A] font-bold text-base">10. Contact Us</h2>
          <p>For any privacy-related queries, reach us at:</p>
          <div className="bg-[#F8FAFC] border border-gray-100 rounded-xl p-4 space-y-1">
            <p><strong className="text-[#0F172A]">Padma Priya Enterprises</strong></p>
            <p>Care Hospital Arilova, Visakhapatnam, Andhra Pradesh, India</p>
            <p>WhatsApp: <a href="https://wa.me/919550563283" className="text-[#0F172A] font-semibold hover:underline">+91 955-056-3283</a></p>
            <p>Email: <a href="mailto:khalidbabusyed@gmail.com" className="text-[#0F172A] font-semibold hover:underline">khalidbabusyed@gmail.com</a></p>
          </div>
        </section>

      </div>
    </div>
  );
}
