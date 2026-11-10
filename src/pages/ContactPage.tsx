import React, { useState } from 'react';
import { 
  Phone, 
  MessageSquare, 
  Mail, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  ShieldCheck, 
  Send, 
  ArrowRight,
  Headphones,
  Building2,
  Users
} from 'lucide-react';
import { BANGALORE_AREAS, APPLIANCE_SERVICES } from '../data/servicesData';
import { SocialSection } from '../components/SocialSection';

export const ContactPage: React.FC = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [inquiryId, setInquiryId] = useState('');
  
  // Form fields
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [appliance, setAppliance] = useState('Washing Machine');
  const [locality, setLocality] = useState('Koramangala');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) {
      alert('Please enter your Name and Mobile Number');
      return;
    }

    const randomId = `QFP-INQ-${Math.floor(1000 + Math.random() * 9000)}`;
    setInquiryId(randomId);
    setFormSubmitted(true);
  };

  const whatsappInquiryUrl = `https://wa.me/918095996638?text=${encodeURIComponent(
    `Hi Quick Fix Pro, I submitted an inquiry (${inquiryId || 'Contact Form'}).\nName: ${name}\nPhone: ${phone}\nAppliance: ${appliance}\nLocality: ${locality}\nMessage: ${message || 'Need doorstep service'}`
  )}`;

  return (
    <div className="py-12 bg-slate-50 min-h-screen space-y-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider mb-4 border border-blue-200">
            <Headphones className="w-3.5 h-3.5 text-blue-600" />
            <span>Bangalore Customer Support & Dispatch</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 font-heading tracking-tight">
            Contact Quick Fix Pro Service Centre
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Need urgent doorstep repair or an annual maintenance plan checkup? Call our central Bangalore helpline or message us directly on WhatsApp for immediate dispatch.
          </p>
        </div>

        {/* 3 Core Contact Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          
          {/* Card 1: Direct Hotline */}
          <div className="p-6 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-xl flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-4 border border-amber-400/30">
                <Phone className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                Direct Phone Line
              </span>
              <h3 className="text-2xl font-extrabold text-white font-heading mt-1">
                8095996638
              </h3>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                Connect directly with our Bangalore technical dispatch controller for instant appointment scheduling.
              </p>
              <div className="text-[11px] text-slate-400 mt-2">
                Secondary Helpline: +91 80 4748 3920
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800">
              <a
                href="tel:+918095996638"
                className="w-full py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md"
              >
                <Phone className="w-4 h-4" />
                <span>Call Hotline Now</span>
              </a>
            </div>
          </div>

          {/* Card 2: WhatsApp Chat */}
          <div className="p-6 rounded-3xl bg-emerald-950 text-white border border-emerald-800/60 shadow-xl flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4 border border-emerald-400/30">
                <MessageSquare className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                Instant WhatsApp
              </span>
              <h3 className="text-2xl font-extrabold text-white font-heading mt-1">
                +91 80959 96638
              </h3>
              <p className="text-xs text-emerald-100/80 mt-2 leading-relaxed">
                Send appliance photos, voice notes, or error code screenshots for an instant repair estimate.
              </p>
              <div className="text-[11px] text-emerald-300/80 mt-2">
                Average reply time: Under 5 minutes
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-emerald-900 flex flex-col gap-2">
              <a
                href="https://wa.me/c/918095996638"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Open WhatsApp Catalog</span>
              </a>
              <a
                href="https://wa.me/918095996638?text=Hi%20Quick%20Fix%20Pro,%20I%20need%20doorstep%20appliance%20repair%20in%20Bangalore."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2 px-3 rounded-lg bg-emerald-900/60 hover:bg-emerald-900 text-emerald-200 text-xs font-semibold text-center border border-emerald-700/50 transition-colors"
              >
                Direct Chat: +91 80959 96638
              </a>
            </div>
          </div>

          {/* Card 3: Central Bangalore HQ */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xl flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center mb-4">
                <Building2 className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                Headquarters
              </span>
              <h3 className="text-xl font-bold text-slate-900 font-heading mt-1">
                Koramangala 4th Block
              </h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                #84, 80 Feet Road, 4th Block, Koramangala, Bengaluru, Karnataka 560034. Near Sony World Signal.
              </p>
              <div className="mt-3 flex items-center gap-2 text-xs text-slate-600">
                <Clock className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span>8:00 AM – 9:00 PM (7 Days a Week)</span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 space-y-1">
              <div className="text-xs text-slate-700 font-medium">
                Official Email: <a href="mailto:quickfixpro01@gmail.com" className="text-blue-600 hover:underline font-bold">quickfixpro01@gmail.com</a>
              </div>
              <div className="text-[11px] text-slate-500">
                Inquiries, quotes & official communications
              </div>
            </div>
          </div>

        </div>

        {/* Contact Form & Dispatch Information */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden p-6 sm:p-10">
          <div className="grid lg:grid-cols-12 gap-10">
            
            {/* Form Column */}
            <div className="lg:col-span-7">
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block mb-1">
                Online Inquiry
              </span>
              <h2 className="text-2xl font-bold text-slate-900 font-heading">
                Send Us a Service Request
              </h2>
              <p className="text-xs text-slate-500 mt-1 mb-6">
                Fill out the details below and a service consultant will call you within 15 minutes.
              </p>

              {formSubmitted ? (
                <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 font-heading">
                      Inquiry Received!
                    </h3>
                    <p className="text-xs text-slate-600 mt-1">
                      Reference ID: <strong className="text-blue-700">{inquiryId}</strong>
                    </p>
                  </div>
                  <p className="text-xs text-slate-600 max-w-md mx-auto">
                    Our Bangalore coordinator is reviewing your request and will call you at <strong>{phone}</strong> shortly.
                  </p>
                  <div className="pt-2">
                    <a
                      href={whatsappInquiryUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-colors"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Speed up via WhatsApp</span>
                    </a>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Ramesh Hegde"
                        className="w-full p-3 rounded-xl border border-slate-300 focus:border-blue-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                        10-Digit Mobile Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 80959 96638"
                        className="w-full p-3 rounded-xl border border-slate-300 focus:border-blue-500 outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Appliance to Repair:
                      </label>
                      <select
                        value={appliance}
                        onChange={(e) => setAppliance(e.target.value)}
                        className="w-full p-3 rounded-xl border border-slate-300 focus:border-blue-500 outline-none bg-white"
                      >
                        <option value="Washing Machine">Washing Machine (Front / Top / Semi)</option>
                        <option value="Refrigerator">Refrigerator (Single / Double / Side-by-Side)</option>
                        <option value="Air Conditioner">Air Conditioner (Split / Window / Inverter)</option>
                        <option value="Microwave Oven">Microwave Oven (Solo / Grill / Convection)</option>
                        <option value="Multi-Appliance Care Package">Multi-Appliance Care Package</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Bangalore Locality:
                      </label>
                      <select
                        value={locality}
                        onChange={(e) => setLocality(e.target.value)}
                        className="w-full p-3 rounded-xl border border-slate-300 focus:border-blue-500 outline-none bg-white"
                      >
                        {BANGALORE_AREAS.map((a, idx) => (
                          <option key={idx} value={a.name}>{a.name} ({a.pincode})</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Problem Description / Symptoms:
                    </label>
                    <textarea
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="e.g. Washing machine making loud spin noise, or fridge not cooling properly..."
                      className="w-full p-3 rounded-xl border border-slate-300 focus:border-blue-500 outline-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Service Inquiry</span>
                  </button>
                </form>
              )}
            </div>

            {/* Right Information Column */}
            <div className="lg:col-span-5 bg-slate-50 p-6 sm:p-8 rounded-2xl border border-slate-200/80 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Service Centre SLA
                </span>
                <h3 className="text-lg font-bold text-slate-900 font-heading mt-1">
                  Bangalore Same-Day Doorstep Guarantee
                </h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Every technical booking placed through our helpline or website is dispatched directly from our nearest neighbourhood hub.
                </p>

                <div className="mt-5 space-y-3 text-xs text-slate-700">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>60–90 Minute Response:</strong> Technicians arrive with mobile parts inventory.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>180-Day Guarantee:</strong> Written warranty certificate provided for every repair.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Transparent Billing:</strong> ₹199 inspection fee 100% credited against approved work.</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-200">
                <div className="text-xs text-slate-500">Emergency breakdown?</div>
                <div className="text-sm font-bold text-slate-900 mt-0.5">
                  Call directly: <a href="tel:+918095996638" className="text-blue-600 hover:underline">8095996638</a>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Official Social Media Channels Grid */}
        <SocialSection />

        {/* Bangalore Neighbourhood Hubs Directory Grid */}
        <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h3 className="text-2xl font-bold text-slate-900 font-heading">
              Our Bangalore Service Locations
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Active technical service teams stationed across all 5 zones of Bengaluru.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {BANGALORE_AREAS.map((hub, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">{hub.name}</span>
                  <span className="text-[10px] text-blue-700 font-semibold">{hub.pincode}</span>
                </div>
                <div className="text-[11px] text-slate-500 mt-1">{hub.landmark}</div>
                <div className="mt-2 flex items-center justify-between text-[11px] text-slate-600 pt-2 border-t border-slate-200">
                  <span className="flex items-center gap-1 text-emerald-700 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    {hub.techniciansAvailable} Techs Available
                  </span>
                  <span className="font-bold text-slate-800">~{hub.estArrivalMins}m</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
