import { X } from 'lucide-react';

export default function TermsPage({ onClose }) {
  return (
    <div className="fixed inset-0 z-[200] bg-white overflow-y-auto" role="dialog" aria-modal="true" aria-label="Terms of Service">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
        <div>
          <p className="text-[10px] font-semibold text-[#94A3B8] uppercase tracking-widest">Legal</p>
          <h1 className="text-base font-bold text-[#0F172A]">Terms of Service</h1>
        </div>
        <button onClick={onClose} className="w-9 h-9 rounded-full bg-[#F1F5F9] hover:bg-[#E2E8F0] flex items-center justify-center transition-colors" aria-label="Close">
          <X className="w-4 h-4 text-[#0F172A]" />
        </button>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-6 py-12 space-y-10 text-sm text-[#374151] leading-relaxed">

        <p className="text-xs text-[#94A3B8]">Last updated: July 2025</p>

        <p>
          By booking a vehicle with <strong className="text-[#0F172A]">TRSelfDriveCars (Padma Priya Enterprises)</strong>, you agree to the following terms and conditions. Please read them carefully before confirming your booking.
        </p>

        <section className="space-y-3">
          <h2 className="text-[#0F172A] font-bold text-base">1. Eligibility</h2>
          <ul className="list-disc list-inside space-y-1.5 pl-2">
            <li>The renter must be at least <strong className="text-[#0F172A]">18 years of age</strong>.</li>
            <li>A <strong className="text-[#0F172A]">valid Indian driving licence</strong> (original) is mandatory and must be presented at the time of pickup. The licence must be appropriate for the category of vehicle rented.</li>
            <li>A valid <strong className="text-[#0F172A]">government-issued photo ID</strong> (Aadhaar, Passport, Voter ID, or PAN card) must be produced at pickup.</li>
            <li>The person who made the booking must be the one picking up the vehicle. Subletting or transferring the booking is not permitted.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-[#0F172A] font-bold text-base">2. Booking Process</h2>
          <p>
            All bookings are confirmed via WhatsApp at <strong className="text-[#0F172A]">+91 955-056-3283</strong>. A booking is considered confirmed only after you receive an explicit confirmation message from us. Submitting a request via the website form does not guarantee availability.
          </p>
          <p>
            We reserve the right to decline any booking at our discretion, including but not limited to cases where verification documents cannot be provided.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-[#0F172A] font-bold text-base">3. Pickup and Return</h2>
          <ul className="list-disc list-inside space-y-1.5 pl-2">
            <li>Pickups are available between <strong className="text-[#0F172A]">6:00 AM and 10:00 PM</strong>. Please coordinate your arrival at least 30 minutes in advance.</li>
            <li>Our primary hub is at <strong className="text-[#0F172A]">Care Hospital Arilova, Visakhapatnam</strong>. We offer delivery to select locations within the city at our discretion.</li>
            <li>The vehicle must be returned to the agreed location at the agreed time. Late returns will be charged at the standard hourly or daily rate.</li>
            <li>The vehicle must be returned with the same fuel level as at pickup. If returned with less fuel, the difference will be deducted from the security deposit.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-[#0F172A] font-bold text-base">4. Security Deposit</h2>
          <p>
            A refundable security deposit is required at the time of pickup. The deposit amount varies by vehicle and will be communicated at booking confirmation. The deposit is held as security against:
          </p>
          <ul className="list-disc list-inside space-y-1.5 pl-2">
            <li>Damage to the vehicle beyond normal wear and tear</li>
            <li>Traffic or parking fines incurred during the rental period</li>
            <li>Fuel shortfall on return</li>
            <li>Any other charges arising from the rental</li>
          </ul>
          <p>
            The deposit will be refunded in full upon return of the vehicle in satisfactory condition, subject to deductions as applicable. The refund is processed immediately at return.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-[#0F172A] font-bold text-base">5. Vehicle Use</h2>
          <ul className="list-disc list-inside space-y-1.5 pl-2">
            <li>The vehicle must only be driven by the registered renter. No other person is permitted to drive the vehicle.</li>
            <li>The vehicle must not be used for any illegal purpose, racing, or off-road driving.</li>
            <li>Smoking inside the vehicle is strictly prohibited. A cleaning charge will apply if this condition is violated.</li>
            <li>The renter is responsible for all traffic violations and fines incurred during the rental period.</li>
            <li>Outstation travel is permitted. Please inform us of your destination before the trip.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-[#0F172A] font-bold text-base">6. Accidents and Damage</h2>
          <p>
            In the event of an accident, the renter must:
          </p>
          <ul className="list-disc list-inside space-y-1.5 pl-2">
            <li>Inform us immediately via WhatsApp or phone</li>
            <li>File a First Information Report (FIR) with the local police if required</li>
            <li>Not admit liability or make any settlement with third parties without our consent</li>
          </ul>
          <p>
            Insurance cover (as applicable by law) is included with all vehicles. However, the renter remains liable for damages caused by negligence, rash driving, driving under the influence, or violation of these terms.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-[#0F172A] font-bold text-base">7. Cancellations and Extensions</h2>
          <ul className="list-disc list-inside space-y-1.5 pl-2">
            <li>Cancellations made more than <strong className="text-[#0F172A]">24 hours before pickup</strong> will not incur any charge.</li>
            <li>Cancellations within 24 hours of pickup may attract a cancellation fee at our discretion.</li>
            <li>Trip extensions are subject to vehicle availability. Please message us at least 2 hours before your scheduled return time to request an extension.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-[#0F172A] font-bold text-base">8. Limitation of Liability</h2>
          <p>
            Padma Priya Enterprises shall not be liable for any indirect, incidental, or consequential loss arising from the use or inability to use the rental vehicle, including but not limited to loss of time, missed flights or trains, or personal injury beyond what is covered by applicable insurance.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-[#0F172A] font-bold text-base">9. Governing Law</h2>
          <p>
            These terms are governed by and construed in accordance with the laws of <strong className="text-[#0F172A]">Andhra Pradesh, India</strong>. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts in Visakhapatnam.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-[#0F172A] font-bold text-base">10. Contact</h2>
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
