import React, { useState } from 'react';
import { Search, MessageCircle, Zap, Bell, ChevronRight } from 'lucide-react';
import { FAQS } from '../../data/mockData';

export const HelpView: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number>(-1);

  return (
    <div className="flex-1 flex h-full bg-[#F3F4F6] rounded-tl-3xl overflow-hidden p-3 gap-3">
      <section className="w-80 bg-white rounded-2xl shadow-sm flex flex-col p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Help & Support</h2>
        <div className="relative mb-6">
          <input 
            type="text" 
            placeholder="Search for help..." 
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all" 
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        </div>
        <div className="space-y-2">
          <button className="w-full text-left px-4 py-3 rounded-xl bg-[#18181b] text-white font-medium flex items-center gap-3 shadow-md">
            <MessageCircle size={18}/> Frequently Asked Questions
          </button>
          <button className="w-full text-left px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-50 font-medium flex items-center gap-3 transition-colors">
            <Zap size={18}/> Feature Requests
          </button>
          <button className="w-full text-left px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-50 font-medium flex items-center gap-3 transition-colors">
            <Bell size={18}/> Updates & Changelog
          </button>
        </div>
        <div className="mt-auto bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl p-6 text-white relative overflow-hidden shadow-lg shadow-orange-200">
          <div className="relative z-10">
            <h3 className="font-bold text-lg mb-2">Need more help?</h3>
            <p className="text-xs text-orange-100 mb-4">Contact our support team for specific issues.</p>
            <button className="bg-white text-red-600 px-4 py-2 rounded-lg text-xs font-bold shadow-sm hover:bg-gray-50 transition-colors">
              Contact Support
            </button>
          </div>
          <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/20 rounded-full blur-xl"></div>
          <div className="absolute -left-4 -top-4 w-16 h-16 bg-yellow-400/20 rounded-full blur-xl"></div>
        </div>
      </section>
      <section className="flex-1 bg-white rounded-2xl shadow-sm p-8 overflow-y-auto">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h3>
        <div className="space-y-4">
          {FAQS.map((faq, i) => (
            <div 
              key={i} 
              className={`border rounded-xl overflow-hidden transition-all ${
                openFaq === i ? 'border-gray-300 shadow-sm' : 'border-gray-100'
              }`}
            >
              <button 
                onClick={() => setOpenFaq(openFaq === i ? -1 : i)} 
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
              >
                <span className={`font-bold ${openFaq === i ? 'text-gray-900' : 'text-gray-700'}`}>
                  {faq.q}
                </span>
                <ChevronRight 
                  size={16} 
                  className={`text-gray-400 transform transition-transform ${
                    openFaq === i ? 'rotate-90 text-gray-900' : ''
                  }`} 
                />
              </button>
              {openFaq === i && (
                <div className="px-6 pb-6 text-sm text-gray-500 leading-relaxed bg-gray-50/30">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
