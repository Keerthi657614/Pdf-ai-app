// // import React from 'react';

// // export default function Analytics() {
// //   const chartStats = [
// //     { label: "Total Queries", value: "47", icon: "fa-chart-line" },
// //     { label: "Avg/Day", value: "6.7", icon: "fa-calendar-day" },
// //     { label: "Peak Hour", value: "17:00", icon: "fa-clock" },
// //     { label: "Documents", value: "3", icon: "fa-file-alt" },
// //   ];

// //   return (
// //     <div className="space-y-6 animate-in fade-in duration-700">
// //       {/* Top Mini Stats */}
// //       <div className="grid grid-cols-4 gap-4">
// //         {chartStats.map((stat) => (
// //           <div key={stat.label} className="bg-[#111827] border border-slate-800 p-4 rounded-xl flex items-center gap-4">
// //             <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center text-blue-400">
// //               <i className={`fas ${stat.icon}`} />
// //             </div>
// //             <div>
// //               <p className="text-[10px] text-slate-500 uppercase tracking-widest">{stat.label}</p>
// //               <p className="text-lg font-bold text-white">{stat.value}</p>
// //             </div>
// //           </div>
// //         ))}
// //       </div>

// //       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
// //         {/* Query Trends Card */}
// //         <div className="bg-[#111827] border border-slate-800 rounded-3xl p-6 shadow-xl">
// //           <div className="flex items-center gap-2 mb-6">
// //             <i className="fas fa-chart-area text-blue-500" />
// //             <h3 className="text-sm font-bold text-white uppercase tracking-wider">Query Trends (Last 7 Days)</h3>
// //           </div>
// //           <div className="h-48 flex items-end gap-2 px-2">
// //             {/* Visual representation of a bar chart */}
// //             {[40, 60, 35, 90, 70, 45, 80].map((h, i) => (
// //               <div key={i} className="flex-1 bg-gradient-to-t from-blue-600/20 to-blue-500 rounded-t-md hover:to-cyan-400 transition-all cursor-help relative group" style={{ height: `${h}%` }}>
// //                 <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-[10px] text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition shadow-xl border border-slate-700">
// //                   {Math.floor(h/2)}
// //                 </span>
// //               </div>
// //             ))}
// //           </div>
// //           <div className="flex justify-between mt-4 px-2 text-[10px] text-slate-500 font-bold uppercase tracking-widest">
// //             <span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span><span>Mon</span><span>Tue</span><span>Wed</span>
// //           </div>
// //         </div>

// //         {/* Most Queried Documents */}
// //         <div className="bg-[#111827] border border-slate-800 rounded-3xl p-6 shadow-xl">
// //           <div className="flex items-center gap-2 mb-6">
// //             <i className="fas fa-file-invoice text-blue-500" />
// //             <h3 className="text-sm font-bold text-white uppercase tracking-wider">Most Queried Documents</h3>
// //           </div>
// //           <div className="space-y-4">
// //             {[
// //               { name: "Compliance_Guide.pdf", count: 24, percent: "90%" },
// //               { name: "Technical_Specs_v2.pdf", count: 12, percent: "55%" },
// //               { name: "Q4_Financial_Report.pdf", count: 11, percent: "50%" },
// //             ].map((doc, i) => (
// //               <div key={i} className="space-y-2">
// //                 <div className="flex justify-between text-xs">
// //                   <span className="text-slate-300 font-medium">{doc.name}</span>
// //                   <span className="text-blue-400 font-bold">{doc.count} queries</span>
// //                 </div>
// //                 <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
// //                   <div className="h-full bg-blue-500 rounded-full" style={{ width: doc.percent }} />
// //                 </div>
// //               </div>
// //             ))}
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';

// export default function Analytics() {
//   const [data, setData] = useState(null);
//   const user = localStorage.getItem("user");

//   useEffect(() => {
//     axios.get(`http://localhost:8000/analytics-data?user=${user}`)
//       .then(res => setData(res.data))
//       .catch(err => console.error(err));
//   }, [user]);

//   if (!data) return <div className="h-full flex items-center justify-center"><i className="fas fa-spinner fa-spin text-blue-500 text-2xl" /></div>;

//   return (
//     <div className="space-y-8 animate-in fade-in duration-700">
//       <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
//         {data.stats.map((s) => (
//           <div key={s.label} className="p-4 rounded-2xl border bg-white border-slate-200 dark:bg-[#111827] dark:border-slate-800 flex items-center gap-4 transition-all">
//             <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-slate-50 dark:bg-slate-900 ${s.color}`}><i className={`fas ${s.icon}`} /></div>
//             <div><p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{s.label}</p><p className="text-lg font-bold text-slate-900 dark:text-white">{s.value}</p></div>
//           </div>
//         ))}
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//         <div className="p-8 rounded-3xl border bg-white border-slate-200 dark:bg-[#111827] dark:border-slate-800 shadow-xl">
//           <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-8">Query Trends (7 Days)</h3>
//           <div className="h-64 w-full">
//             <ResponsiveContainer width="100%" height="100%">
//               <AreaChart data={data.trend}>
//                 <defs><linearGradient id="colorQ" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/><stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/></linearGradient></defs>
//                 <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 10}} />
//                 <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '12px' }} />
//                 <Area type="monotone" dataKey="queries" stroke="#3b82f6" strokeWidth={3} fill="url(#colorQ)" />
//               </AreaChart>
//             </ResponsiveContainer>
//           </div>
//         </div>

//         <div className="p-8 rounded-3xl border bg-white border-slate-200 dark:bg-[#111827] dark:border-slate-800 shadow-xl">
//           <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-8">Most Queried Documents</h3>
//           <div className="h-64 w-full">
//             <ResponsiveContainer width="100%" height="100%">
//               <BarChart data={data.top_docs} layout="vertical">
//                 <XAxis type="number" hide />
//                 <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 10}} width={80} />
//                 <Bar dataKey="queries" radius={[0, 4, 4, 0]} barSize={20}>
//                   {data.top_docs.map((e, i) => <Cell key={i} fill={i === 0 ? '#3b82f6' : '#1e293b'} />)}
//                 </Bar>
//               </BarChart>
//             </ResponsiveContainer>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// import { useEffect, useState } from "react";
// import axios from "axios";
// import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from "recharts";

// export default function Analytics() {
//   const [data, setData] = useState(null);
//   const user = localStorage.getItem("user");

//   useEffect(() => {
//     axios.get(`http://localhost:8000/analytics-data?user=${user}`)
//       .then(res => setData(res.data));
//   }, [user]);

//   if (!data) return <div>Loading...</div>;

//   return (
//     <>
//       <div className="grid grid-cols-4 gap-4">
//         {data.stats.map(s => (
//           <div key={s.label}>
//             <div>{s.value}</div>
//             <div>{s.label}</div>
//           </div>
//         ))}
//       </div>

//       <ResponsiveContainer width="100%" height={250}>
//         <AreaChart data={data.trend}>
//           <XAxis dataKey="day" />
//           <Tooltip />
//           <Area dataKey="queries" stroke="#3b82f6" fill="#93c5fd" />
//         </AreaChart>
//       </ResponsiveContainer>
//     </>
//   );
// }
import { useEffect, useState } from "react";
import axios from "axios";
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

export default function Analytics() {
  const [data, setData] = useState(null);
  const user = localStorage.getItem("user");

  useEffect(() => {
    axios.get(`http://localhost:8000/analytics-data?user=${user}`)
      .then(res => setData(res.data));
  }, [user]);

  if (!data) return <div className="p-10 text-slate-500 animate-pulse font-bold">LOADING METRICS...</div>;

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      <header>
        <h1 className="text-3xl font-black text-white uppercase tracking-tighter">System Insights</h1>
        <p className="text-slate-400 text-sm mt-1">Real-time performance metrics for {user}</p>
      </header>

      {/* 3 Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {data.stats.map((s, idx) => (
          <div key={idx} className="bg-[#0f172a] border border-slate-800 p-8 rounded-[2.5rem] hover:border-blue-500/40 transition-all group shadow-xl">
            {/* The Icon Container */}
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 bg-slate-900 border border-slate-800 group-hover:bg-blue-500/10 transition-colors`}>
              {/* Force 'fas' prefix for Font Awesome 6 support */}
              <i className={`fas ${s.icon} ${s.color} text-2xl`} />
            </div>
            
            <div className="text-4xl font-black text-white tracking-tight">{s.value}</div>
            <div className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.2em] mt-2">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Chart Section */}
      <div className="bg-[#0f172a] border border-slate-800 p-10 rounded-[3rem]">
        <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-10">Activity Trend (Last 7 Days)</h3>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data.trend}>
              <defs>
                <linearGradient id="colorQueries" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
              <XAxis 
                dataKey="day" 
                axisLine={false} 
                tickLine={false} 
                tick={{fill: '#64748b', fontSize: 12, fontWeight: 'bold'}} 
              />
              <Tooltip 
                contentStyle={{backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '16px', fontWeight: 'bold'}}
                itemStyle={{color: '#3b82f6'}}
              />
              <Area 
                type="monotone" 
                dataKey="queries" 
                stroke="#3b82f6" 
                strokeWidth={4} 
                fillOpacity={1} 
                fill="url(#colorQueries)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}