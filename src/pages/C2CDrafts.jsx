import React, { useState } from 'react';

export default function C2CDrafts() {
  // Sample Data matching the application state across both screenshots
  const [selectedItemId, setSelectedItemId] = useState(1);
  const [listingPrice, setListingPrice] = useState('2,100');

  const draftItems = [
    {
      id: 1,
      title: 'iPhone 14 Pro – 256GB · Deep Purple',
      shortName: 'iPhone 14 Pro 256GB',
      brand: 'Apple · Electronics',
      icon: '📱',
      inspector: 'Khalid M.',
      timeAgo: '14 min ago',
      grade: 'B',
      gradeColor: 'text-amber-600 bg-amber-50 border-amber-200',
      gradeBadge: 'bg-amber-500 text-white',
      submittedBy: 'Customer',
      date: '6 Jun 2026',
      catalogMatch: {
        name: 'iPhone 14 Pro',
        specs: 'Apple · 2022 · A16 Bionic · 6.1" Super Retina XDR',
      },
      report: {
        conditionGrade: 'B Good',
        serial: '353098XXXXXXXXX',
        batteryHealth: '89%',
        screenCondition: 'No cracks',
        camera: 'All lenses clear',
        buttons: 'All functional',
        defects: 'Minor scratch on back panel',
        included: 'Original box, cable',
        recommendation: 'AED 2,200'
      },
      description: 'iPhone 14 Pro 256GB in Deep Purple. Battery health 89%, screen in perfect condition with no cracks. Minor scratch on the back panel not visible during use. Comes with original box and charging cable. Fully functional — all cameras, buttons and Face ID working perfectly. Zook Verified by our quality inspector.'
    },
    {
      id: 2,
      title: 'Dell XPS 15 Laptop – 1TB SSD · Intel i7',
      shortName: 'Dell XPS 15 Laptop',
      brand: 'Dell · Computers',
      icon: '💻',
      inspector: 'Sara A.',
      timeAgo: '2 hrs ago',
      grade: 'A',
      gradeColor: 'text-emerald-600 bg-emerald-50 border-emerald-200',
      gradeBadge: 'bg-emerald-500 text-white',
      submittedBy: 'Customer',
      date: '5 Jun 2026',
      catalogMatch: {
        name: 'Dell XPS 15 (9520)',
        specs: 'Dell · 2022 · Intel i7 · 15.6" UHD+ Touch · 16GB RAM'
      },
      report: {
        conditionGrade: 'A Excellent',
        serial: '829102XXXXXXXXX',
        batteryHealth: '94%',
        screenCondition: 'Flawless',
        camera: 'HD Webcam functional',
        buttons: 'Keyboard & Trackpad perfect',
        defects: 'None',
        included: 'Charger only',
        recommendation: 'AED 4,500'
      },
      description: 'Flawless Dell XPS 15 Laptop. Device is in like-new state. Display is absolutely immaculate with no dead pixels. Keyboard deck and chassis show zero wear. Includes genuine fast-charger.'
    },
    {
      id: 3,
      title: 'Sony WH-1000XM5 – Black',
      shortName: 'Sony WH-1000XM5',
      brand: 'Sony · Audio',
      icon: '🎧',
      inspector: 'Khalid M.',
      timeAgo: '3 hrs ago',
      grade: 'A',
      gradeColor: 'text-emerald-600 bg-emerald-50 border-emerald-200',
      gradeBadge: 'bg-emerald-500 text-white',
      submittedBy: 'Customer',
      date: '6 Jun 2026',
      catalogMatch: {
        name: 'Sony WH-1000XM5',
        specs: 'Sony · 2022 · Active Noise Cancelling · Wireless Over-Ear'
      },
      report: {
        conditionGrade: 'A Excellent',
        serial: '551029XXXXXXXXX',
        batteryHealth: '100%',
        screenCondition: 'N/A',
        camera: 'N/A',
        buttons: 'Touch controls responsive',
        defects: 'Light scuff on carrying case',
        included: 'Case, Audio cable, Type-C cable',
        recommendation: 'AED 850'
      },
      description: 'Excellent condition Sony XM5 headphones. Sound profile is pristine, ANC functions perfectly. Ear cups sanitized and checked for wear. Case included with minor exterior cosmetic scuffing.'
    }
  ];

  const activeItem = draftItems.find(item => item.id === selectedItemId) || draftItems[0];

  return (
    <div className="bg-slate-50 min-h-screen p-6 text-sm font-sans text-slate-800">
      
      {/* Header Container */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold text-slate-900 font-sans">C2C Drafts</h1>
            <span className="text-slate-400 text-base">3 items ready to publish</span>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="px-5 py-2.5 border border-slate-200 rounded-full bg-white font-medium hover:bg-slate-50 transition shadow-sm flex items-center gap-2 text-slate-700">
            <span>✕</span> Reject draft
          </button>
          <button className="px-5 py-2.5 bg-orange-500 text-white font-semibold rounded-full hover:bg-orange-600 transition shadow-sm flex items-center gap-2">
            <span>🚀</span> Publish listing
          </button>
        </div>
      </div>

      {/* Main Grid Matrix */}
      <div className="grid grid-cols-12 gap-6 items-start">
        
        {/* LEFT PANEL: Inspector-Approved Items List */}
        <div className="col-span-3 bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="p-4 border-b border-slate-100">
            <h3 className="font-bold text-slate-900 text-sm">Inspector-Approved Items</h3>
            <p className="text-xs text-slate-400 mt-0.5">Set final price & publish to make live</p>
          </div>
          
          <div className="divide-y divide-slate-100">
            {draftItems.map((item) => {
              const isSelected = item.id === selectedItemId;
              return (
                <div 
                  key={item.id}
                  onClick={() => setSelectedItemId(item.id)}
                  className={`p-4 cursor-pointer transition relative ${isSelected ? 'bg-orange-50/60' : 'hover:bg-slate-50'}`}
                >
                  {isSelected && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-orange-500" />
                  )}
                  <div className="flex gap-3 items-start">
                    {/* Updated to display item.icon dynamically */}
                    <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center flex-shrink-0 text-lg">
                      {item.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-slate-900 text-xs truncate">{item.shortName}</h4>
                      <p className="text-xs text-slate-400 truncate">{item.brand}</p>
                      <div className="flex justify-between items-center mt-3">
                        <span className="text-[11px] text-slate-400 truncate">Inspector: {item.inspector} · {item.timeAgo}</span>
                        <span className={`w-5 h-5 flex items-center justify-center text-[10px] font-black rounded ${item.gradeBadge}`}>
                          {item.grade}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* MIDDLE PANEL: Main Inspection Details & Specs */}
        <div className="col-span-6 space-y-6">
          
          {/* Item Identity Context */}
          <div>
            <h2 className="text-xl font-bold text-slate-900">{activeItem.title}</h2>
            <p className="text-xs text-slate-400 mt-1">
              Submitted by {activeItem.submittedBy} · Inspected by {activeItem.inspector} · {activeItem.date}
            </p>
          </div>

          {/* Catalog Match Section */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-900">Catalog Match</h3>
            
            <div className="border border-emerald-100 bg-emerald-50/30 rounded-xl p-4 flex items-center justify-between">
              <div className="flex gap-4 items-center">
                {/* Updated to display activeItem.icon dynamically */}
                <div className="w-12 h-12 bg-white rounded-xl border border-slate-200 flex items-center justify-center text-xl shadow-sm">
                  {activeItem.icon}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">{activeItem.catalogMatch.name}</h4>
                  <p className="text-xs text-slate-400 mt-0.5">{activeItem.catalogMatch.specs}</p>
                </div>
              </div>
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
                ✓ Matched
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-normal">
              Official Apple stock photo will be used as the hero image. Inspector photos appear in the condition section.
            </p>
          </div>

          {/* Inspector Report Parameters Table */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex justify-between items-center">
              <h3 className="font-bold text-slate-900">Inspector Report</h3>
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
                ✓ Passed
              </span>
            </div>
            
            <div className="divide-y divide-slate-100 px-5 text-xs">
              <div className="py-3 flex justify-between items-center">
                <span className="text-slate-500">Condition grade</span>
                <div className="flex items-center gap-1.5 font-bold text-slate-900">
                  <span className={`w-4 h-4 flex items-center justify-center text-[9px] font-black rounded ${activeItem.gradeBadge}`}>
                    {activeItem.grade}
                  </span> 
                  <span>{activeItem.report.conditionGrade}</span>
                </div>
              </div>
              <div className="py-3 flex justify-between items-center">
                <span className="text-slate-500">Serial / IMEI</span>
                <span className="font-mono text-slate-700">{activeItem.report.serial}</span>
              </div>
              <div className="py-3 flex justify-between items-center">
                <span className="text-slate-500">Battery health</span>
                <span className="font-bold text-slate-900">{activeItem.report.batteryHealth} ✓</span>
              </div>
              <div className="py-3 flex justify-between items-center">
                <span className="text-slate-500">Screen condition</span>
                <span className="font-semibold text-emerald-600">✓ {activeItem.report.screenCondition}</span>
              </div>
              <div className="py-3 flex justify-between items-center">
                <span className="text-slate-500">Camera</span>
                <span className="font-semibold text-emerald-600">✓ {activeItem.report.camera}</span>
              </div>
              <div className="py-3 flex justify-between items-center">
                <span className="text-slate-500">Buttons</span>
                <span className="font-semibold text-emerald-600">✓ {activeItem.report.buttons}</span>
              </div>
              <div className="py-3 flex justify-between items-center">
                <span className="text-slate-500">Defects noted</span>
                <span className="font-semibold text-amber-600">{activeItem.report.defects}</span>
              </div>
              <div className="py-3 flex justify-between items-center">
                <span className="text-slate-500">What's included</span>
                <span className="font-medium text-slate-800">{activeItem.report.included}</span>
              </div>
              <div className="py-3 flex justify-between items-center">
                <span className="text-slate-500">Inspector recommendation</span>
                <span className="font-bold text-orange-500">{activeItem.report.recommendation}</span>
              </div>
            </div>
          </div>

          {/* Inspection Photos (From Continuation Screenshot) */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-slate-900">Inspection Photos</h3>
              <span className="text-xs text-slate-400">4 photos · Taken on-site by inspector</span>
            </div>
            
            <div className="grid grid-cols-4 gap-3">
              {[
                { label: 'Front', bg: 'bg-orange-50' },
                { label: 'Back', bg: 'bg-blue-50' },
                { label: 'Defect', bg: 'bg-emerald-50' },
                { label: 'Box', bg: 'bg-amber-50' }
              ].map((photo, index) => (
                <div key={index} className={`${photo.bg} border border-slate-100 rounded-xl p-4 flex flex-col items-center justify-center aspect-square shadow-sm cursor-pointer hover:opacity-90 transition`}>
                  <div className="text-xl mb-1">{activeItem.icon}</div>
                  <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">{photo.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Listing Description (From Continuation Screenshot) */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-slate-900">Listing Description</h3>
              <button className="text-xs text-slate-400 hover:text-slate-600 underline">Edit before publishing</button>
            </div>
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/60 max-h-32 overflow-y-auto text-xs text-slate-600 leading-relaxed font-normal">
              {activeItem.description}
            </div>
          </div>

        </div>

        {/* RIGHT PANEL: Price Configuration & Financial Summary Panels */}
        <div className="col-span-3 space-y-6">
          
          {/* Set Listing Price Widget */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-900">Set Listing Price</h3>
            
            <div>
              <p className="text-xs text-slate-400">Inspector recommended: <span className="font-semibold text-slate-700">{activeItem.report.recommendation}</span></p>
              <div className="mt-2 flex items-center border-2 border-orange-500 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-orange-200 transition">
                <span className="bg-slate-50 px-4 py-3 border-r border-slate-200 font-bold text-slate-600 text-xs">AED</span>
                <input 
                  type="text" 
                  value={listingPrice}
                  onChange={(e) => setListingPrice(e.target.value)}
                  className="w-full px-3 py-2 text-lg font-bold text-slate-900 focus:outline-none"
                />
              </div>
            </div>

            <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-3 text-xs text-slate-600 leading-relaxed flex items-start gap-2">
              <span className="mt-0.5">💡</span>
              <p>Similar {activeItem.shortName.split(' ')[0]} device selling for <span className="font-semibold text-slate-800">AED 2,000–2,400</span></p>
            </div>
          </div>

          {/* Seller Payout Preview Breakout Container */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-900">Seller Payout Preview</h3>
            
            <div className="bg-zinc-950 text-slate-300 rounded-xl p-4 font-sans shadow-inner">
              <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 block mb-3">C2C Payout Breakdown</span>
              
              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-zinc-400">Listing price</span>
                  <span className="font-bold text-white">AED {listingPrice}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-zinc-400">Verification fee (paid)</span>
                  <span className="font-medium text-red-400">- AED 99</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-zinc-400">Commission (15%)</span>
                  <span className="font-medium text-red-400">- AED 315</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-zinc-400">Mamo fee</span>
                  <span className="font-medium text-red-400">- AED 61.30</span>
                </div>
                
                <div className="h-px bg-zinc-800 my-1" />
                
                <div className="flex justify-between items-center pt-1">
                  <span className="text-zinc-400 font-medium">Seller VCC payout</span>
                  <span className="text-sm font-black text-orange-500">AED 1,624.70</span>
                </div>
              </div>
            </div>
          </div>

          {/* Checklist & Sticky Publish Form (From Continuation Screenshot) */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-900">Ready to publish?</h3>
            
            <div className="space-y-2.5">
              {[
                { text: 'Inspection passed', checked: true },
                { text: '4 photos uploaded', checked: true },
                { text: 'Catalog matched', checked: true },
                { text: 'Description written', checked: true },
                { text: `Price set – AED ${listingPrice}`, checked: true }
              ].map((step, idx) => (
                <div key={idx} className="flex items-center gap-3 bg-slate-50 border border-slate-100 p-2.5 rounded-xl">
                  <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${step.checked ? 'bg-emerald-500 text-white' : 'bg-slate-200'}`}>
                    ✓
                  </span>
                  <span className="text-xs font-medium text-slate-700">{step.text}</span>
                </div>
              ))}
            </div>

            <button className="w-full mt-2 py-3 bg-orange-500 text-white font-bold rounded-xl hover:bg-orange-600 transition shadow-md flex items-center justify-center gap-2">
              <span>🚀</span> Publish as Zook Verified
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}