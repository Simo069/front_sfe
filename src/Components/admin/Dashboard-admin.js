// import React, { useState, useEffect } from "react";

// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
//   PieChart,
//   Pie,
//   Cell,
//   LineChart,
//   Line,
// } from "recharts";
// import {
//   Calendar,
//   Filter,
//   Users,
//   Database,
//   FileText,
//   CheckSquare,
//   Clock,
// } from "lucide-react";

// // Données simulées pour la démonstration
// const mockData = [
//   {
//     id: "REF-001",
//     date: "15/01/2025",
//     direction: "DSI",
//     demandeur: "Jean Dupont",
//     statut: "Clôturée",
//     duree: "3 mois",
//     environnement: "Production",
//     extraction: "Oui",
//     avisData: "Favorable",
//     avisDT: "Favorable",
//     avisBO: "Favorable",
//   },
//   {
//     id: "REF-002",
//     date: "20/01/2025",
//     direction: "Marketing",
//     demandeur: "Marie Laurent",
//     statut: "En cours",
//     duree: "6 mois",
//     environnement: "Test",
//     extraction: "Non",
//     avisData: "Favorable",
//     avisDT: "En attente",
//     avisBO: "En attente",
//   },
//   {
//     id: "REF-003",
//     date: "25/01/2025",
//     direction: "Finance",
//     demandeur: "Paul Renard",
//     statut: "À valider",
//     duree: "12 mois",
//     environnement: "Production",
//     extraction: "Oui",
//     avisData: "Favorable",
//     avisDT: "Favorable",
//     avisBO: "En attente",
//   },
//   {
//     id: "REF-004",
//     date: "02/02/2025",
//     direction: "RH",
//     demandeur: "Sophie Martin",
//     statut: "Initiée",
//     duree: "1 mois",
//     environnement: "Dev",
//     extraction: "Non",
//     avisData: "En attente",
//     avisDT: "En attente",
//     avisBO: "En attente",
//   },
//   {
//     id: "REF-005",
//     date: "10/02/2025",
//     direction: "DSI",
//     demandeur: "Pierre Blanc",
//     statut: "Clôturée",
//     duree: "3 mois",
//     environnement: "Production",
//     extraction: "Oui",
//     avisData: "Favorable",
//     avisDT: "Favorable",
//     avisBO: "Favorable",
//   },
//   {
//     id: "REF-006",
//     date: "15/02/2025",
//     direction: "Marketing",
//     demandeur: "Claire Dubois",
//     statut: "En cours",
//     duree: "6 mois",
//     environnement: "Test",
//     extraction: "Non",
//     avisData: "Favorable",
//     avisDT: "En attente",
//     avisBO: "En attente",
//   },
//   {
//     id: "REF-007",
//     date: "20/02/2025",
//     direction: "Finance",
//     demandeur: "Nicolas Leroy",
//     statut: "À valider",
//     duree: "12 mois",
//     environnement: "Production",
//     extraction: "Oui",
//     avisData: "Favorable",
//     avisDT: "Favorable",
//     avisBO: "En attente",
//   },
//   {
//     id: "REF-008",
//     date: "01/03/2025",
//     direction: "RH",
//     demandeur: "Julie Moreau",
//     statut: "Initiée",
//     duree: "1 mois",
//     environnement: "Dev",
//     extraction: "Non",
//     avisData: "En attente",
//     avisDT: "En attente",
//     avisBO: "En attente",
//   },
//   {
//     id: "REF-009",
//     date: "10/03/2025",
//     direction: "DSI",
//     demandeur: "Thomas Dubois",
//     statut: "Clôturée",
//     duree: "3 mois",
//     environnement: "Production",
//     extraction: "Oui",
//     avisData: "Favorable",
//     avisDT: "Favorable",
//     avisBO: "Favorable",
//   },
//   {
//     id: "REF-010",
//     date: "15/03/2025",
//     direction: "Marketing",
//     demandeur: "Émilie Bernard",
//     statut: "En cours",
//     duree: "6 mois",
//     environnement: "Test",
//     extraction: "Non",
//     avisData: "Favorable",
//     avisDT: "En attente",
//     avisBO: "En attente",
//   },
//   {
//     id: "REF-011",
//     date: "15/01/2025",
//     direction: "DSI",
//     demandeur: "Jean Dupont",
//     statut: "Clôturée",
//     duree: "3 mois",
//     environnement: "Production",
//     extraction: "Oui",
//     avisData: "Favorable",
//     avisDT: "Favorable",
//     avisBO: "Favorable",
//   },
//   {
//     id: "REF-012",
//     date: "20/01/2025",
//     direction: "Marketing",
//     demandeur: "Marie Laurent",
//     statut: "En cours",
//     duree: "6 mois",
//     environnement: "Test",
//     extraction: "Non",
//     avisData: "Favorable",
//     avisDT: "En attente",
//     avisBO: "En attente",
//   },
//   {
//     id: "REF-013",
//     date: "25/01/2025",
//     direction: "Finance",
//     demandeur: "Paul Renard",
//     statut: "À valider",
//     duree: "12 mois",
//     environnement: "Production",
//     extraction: "Oui",
//     avisData: "Favorable",
//     avisDT: "Favorable",
//     avisBO: "En attente",
//   },
//   {
//     id: "REF-014",
//     date: "02/02/2025",
//     direction: "RH",
//     demandeur: "Sophie Martin",
//     statut: "Initiée",
//     duree: "1 mois",
//     environnement: "Dev",
//     extraction: "Non",
//     avisData: "En attente",
//     avisDT: "En attente",
//     avisBO: "En attente",
//   },
//   {
//     id: "REF-015",
//     date: "10/02/2025",
//     direction: "DSI",
//     demandeur: "Pierre Blanc",
//     statut: "Clôturée",
//     duree: "3 mois",
//     environnement: "Production",
//     extraction: "Oui",
//     avisData: "Favorable",
//     avisDT: "Favorable",
//     avisBO: "Favorable",
//   },
//   {
//     id: "REF-016",
//     date: "15/02/2025",
//     direction: "Marketing",
//     demandeur: "Claire Dubois",
//     statut: "En cours",
//     duree: "6 mois",
//     environnement: "Test",
//     extraction: "Non",
//     avisData: "Favorable",
//     avisDT: "En attente",
//     avisBO: "En attente",
//   },
//   {
//     id: "REF-017",
//     date: "20/02/2025",
//     direction: "Finance",
//     demandeur: "Nicolas Leroy",
//     statut: "À valider",
//     duree: "12 mois",
//     environnement: "Production",
//     extraction: "Oui",
//     avisData: "Favorable",
//     avisDT: "Favorable",
//     avisBO: "En attente",
//   },
//   {
//     id: "REF-018",
//     date: "01/03/2025",
//     direction: "RH",
//     demandeur: "Julie Moreau",
//     statut: "Initiée",
//     duree: "1 mois",
//     environnement: "Dev",
//     extraction: "Non",
//     avisData: "En attente",
//     avisDT: "En attente",
//     avisBO: "En attente",
//   },
//   {
//     id: "REF-019",
//     date: "10/03/2025",
//     direction: "DSI",
//     demandeur: "Thomas Dubois",
//     statut: "Clôturée",
//     duree: "3 mois",
//     environnement: "Production",
//     extraction: "Oui",
//     avisData: "Favorable",
//     avisDT: "Favorable",
//     avisBO: "Favorable",
//   },
//   {
//     id: "REF-020",
//     date: "15/03/2025",
//     direction: "Marketing",
//     demandeur: "Émilie Bernard",
//     statut: "En cours",
//     duree: "6 mois",
//     environnement: "Test",
//     extraction: "Non",
//     avisData: "Favorable",
//     avisDT: "En attente",
//     avisBO: "En attente",
//   },
// ];

// // Données pour les graphiques
// const getStatusData = (data) => {
//   const counts = { Initiée: 0, "En cours": 0, "À valider": 0, Clôturée: 0 };
//   data.forEach((item) => {
//     counts[item.statut] = (counts[item.statut] || 0) + 1;
//   });
//   return Object.keys(counts).map((key) => ({ name: key, value: counts[key] }));
// };

// const getDepartmentData = (data) => {
//   const counts = {};
//   data.forEach((item) => {
//     counts[item.direction] = (counts[item.direction] || 0) + 1;
//   });
//   return Object.keys(counts).map((key) => ({ name: key, value: counts[key] }));
// };

// const getEnvironmentData = (data) => {
//   const counts = {};
//   data.forEach((item) => {
//     counts[item.environnement] = (counts[item.environnement] || 0) + 1;
//   });
//   return Object.keys(counts).map((key) => ({ name: key, value: counts[key] }));
// };

// const getMonthlyData = (data) => {
//   const months = [
//     "01",
//     "02",
//     "03",
//     "04",
//     "05",
//     "06",
//     "07",
//     "08",
//     "09",
//     "10",
//     "11",
//     "12",
//   ];
//   const counts = months.reduce((acc, month) => {
//     acc[month] = 0;
//     return acc;
//   }, {});

//   data.forEach((item) => {
//     const month = item.date.split("/")[1];
//     counts[month] = (counts[month] || 0) + 1;
//   });

//   return months.map((month) => ({
//     name: month,
//     demandes: counts[month],
//   }));
// };

// // Couleurs pour les graphiques
// const COLORS = [
//   "#0088FE",
//   "#00C49F",
//   "#FFBB28",
//   "#FF8042",
//   "#8884d8",
//   "#82ca9d",
//   "#ffc658",
//   "#ff7300",
// ];

// const Dashboard = () => {
//   const [data, setData] = useState(mockData);
//   const [statusFilter, setStatusFilter] = useState("Tous");
//   const [departmentFilter, setDepartmentFilter] = useState("Tous");
//   const [Demandes, setDemandes] = useState([]);
//   const [errorBack, setErrorBack] = useState("");
//   const getDemandes = async () => {
//     try {
//       const response = await fetch(
//         `http://localhost:8000/api/get_demandes?status=All`,
//         {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${localStorage.getItem("access_token")}`,
//           },
//         }
//       );
//       const data = await response.json();
//       console.log("data", data);
//       if (!response.ok) {
//         setErrorBack("No data found or error lors de recuperation des donnees");
//         return;
//       }

//       setDemandes(data.demandes);
//     } catch (e) {
//       console.error("error ", e);
//     }
//   };

//   useEffect(() => {
//     getDemandes();
//   }, []);

//   // Filtrer les données
//   const filteredData = data.filter((item) => {
//     const matchStatus = statusFilter === "Tous" || item.statut === statusFilter;
//     const matchDepartment =
//       departmentFilter === "Tous" || item.direction === departmentFilter;
//     return matchStatus && matchDepartment;
//   });

//   // Données pour les graphiques
//   const statusData = getStatusData(filteredData);
//   const departmentData = getDepartmentData(filteredData);
//   const environmentData = getEnvironmentData(filteredData);
//   const monthlyData = getMonthlyData(filteredData);

//   // Statuts uniques pour le filtre
//   const uniqueStatuses = ["Tous", ...new Set(data.map((item) => item.statut))];

//   // Directions uniques pour le filtre
//   const uniqueDepartments = [
//     "Tous",
//     ...new Set(data.map((item) => item.direction)),
//   ];

//   return (
//     <div className="bg-gray-100 min-h-screen p-6 content">
//       <div className="mb-6">
//         <h1 className="text-3xl font-bold text-gray-800">
//           Tableau de Bord des Demandes d'Accès
//         </h1>
//         <p className="text-gray-600">
//           Visualisation et analyse des demandes d'accès aux données
//         </p>
//       </div>

//       {/* Cartes de statistiques */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
//         <div className="bg-white p-4 rounded-lg shadow flex items-center">
//           <div className="bg-blue-100 p-3 rounded-full mr-4">
//             <FileText size={24} className="text-blue-500" />
//           </div>
//           <div>
//             <p className="text-gray-500 text-sm">Total des demandes</p>
//             <p className="text-2xl font-bold">{filteredData.length}</p>
//           </div>
//         </div>

//         <div className="bg-white p-4 rounded-lg shadow flex items-center">
//           <div className="bg-green-100 p-3 rounded-full mr-4">
//             <CheckSquare size={24} className="text-green-500" />
//           </div>
//           <div>
//             <p className="text-gray-500 text-sm">Demandes clôturées</p>
//             <p className="text-2xl font-bold">
//               {filteredData.filter((item) => item.statut === "Clôturée").length}
//             </p>
//           </div>
//         </div>

//         <div className="bg-white p-4 rounded-lg shadow flex items-center">
//           <div className="bg-yellow-100 p-3 rounded-full mr-4">
//             <Clock size={24} className="text-yellow-500" />
//           </div>
//           <div>
//             <p className="text-gray-500 text-sm">Demandes en cours</p>
//             <p className="text-2xl font-bold">
//               {filteredData.filter((item) => item.statut === "En cours").length}
//             </p>
//           </div>
//         </div>

//         <div className="bg-white p-4 rounded-lg shadow flex items-center">
//           <div className="bg-purple-100 p-3 rounded-full mr-4">
//             <Users size={24} className="text-purple-500" />
//           </div>
//           <div>
//             <p className="text-gray-500 text-sm">Directions</p>
//             <p className="text-2xl font-bold">
//               {new Set(filteredData.map((item) => item.direction)).size}
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Filtres */}
//       <div className="bg-white p-4 rounded-lg shadow mb-6">
//         <h2 className="text-lg font-semibold mb-4 flex items-center">
//           <Filter size={18} className="mr-2" /> Filtres
//         </h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-1">
//               Statut
//             </label>
//             <select
//               className="w-full border border-gray-300 rounded-md p-2"
//               value={statusFilter}
//               onChange={(e) => setStatusFilter(e.target.value)}
//             >
//               {uniqueStatuses.map((status) => (
//                 <option key={status} value={status}>
//                   {status}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-1">
//               Direction
//             </label>
//             <select
//               className="w-full border border-gray-300 rounded-md p-2"
//               value={departmentFilter}
//               onChange={(e) => setDepartmentFilter(e.target.value)}
//             >
//               {uniqueDepartments.map((dept) => (
//                 <option key={dept} value={dept}>
//                   {dept}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>
//       </div>

//       {/* Graphiques */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
//         {/* Graphique par statut */}
//         <div className="bg-white p-4 rounded-lg shadow">
//           <h2 className="text-lg font-semibold mb-4">Demandes par statut</h2>
//           <ResponsiveContainer width="100%" height={300}>
//             <PieChart>
//               <Pie
//                 data={statusData}
//                 cx="50%"
//                 cy="50%"
//                 labelLine={true}
//                 outerRadius={100}
//                 fill="#8884d8"
//                 dataKey="value"
//                 label={({ name, percent }) =>
//                   `${name} ${(percent * 100).toFixed(0)}%`
//                 }
//               >
//                 {statusData.map((entry, index) => (
//                   <Cell
//                     key={`cell-${index}`}
//                     fill={COLORS[index % COLORS.length]}
//                   />
//                 ))}
//               </Pie>
//               <Tooltip />
//               <Legend />
//             </PieChart>
//           </ResponsiveContainer>
//         </div>

//         {/* Graphique par direction */}
//         <div className="bg-white p-4 rounded-lg shadow">
//           <h2 className="text-lg font-semibold mb-4">Demandes par direction</h2>
//           <ResponsiveContainer width="100%" height={300}>
//             <BarChart
//               data={departmentData}
//               margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
//             >
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="name" />
//               <YAxis />
//               <Tooltip />
//               <Legend />
//               <Bar dataKey="value" name="Nombre de demandes" fill="#8884d8" />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>

//         {/* Graphique par environnement */}
//         <div className="bg-white p-4 rounded-lg shadow">
//           <h2 className="text-lg font-semibold mb-4">
//             Demandes par environnement
//           </h2>
//           <ResponsiveContainer width="100%" height={300}>
//             <PieChart>
//               <Pie
//                 data={environmentData}
//                 cx="50%"
//                 cy="50%"
//                 labelLine={true}
//                 outerRadius={100}
//                 fill="#8884d8"
//                 dataKey="value"
//                 label={({ name, percent }) =>
//                   `${name} ${(percent * 100).toFixed(0)}%`
//                 }
//               >
//                 {environmentData.map((entry, index) => (
//                   <Cell
//                     key={`cell-${index}`}
//                     fill={COLORS[index % COLORS.length]}
//                   />
//                 ))}
//               </Pie>
//               <Tooltip />
//               <Legend />
//             </PieChart>
//           </ResponsiveContainer>
//         </div>

//         {/* Graphique des demandes par mois */}
//         <div className="bg-white p-4 rounded-lg shadow">
//           <h2 className="text-lg font-semibold mb-4">
//             Tendance mensuelle des demandes
//           </h2>
//           <ResponsiveContainer width="100%" height={300}>
//             <LineChart
//               data={monthlyData}
//               margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
//             >
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="name" />
//               <YAxis />
//               <Tooltip />
//               <Legend />
//               <Line
//                 type="monotone"
//                 dataKey="demandes"
//                 stroke="#8884d8"
//                 activeDot={{ r: 8 }}
//               />
//             </LineChart>
//           </ResponsiveContainer>
//         </div>
//       </div>

//       {/* Tableau des demandes */}
//       {/* <div className="bg-white p-4 rounded-lg shadow mb-6">
//         <h2 className="text-lg font-semibold mb-4">Liste des demandes</h2>
//         <div className="overflow-x-auto">
//           <table className="min-w-full bg-white">
//             <thead className="bg-gray-100">
//               <tr>
//                 <th className="py-2 px-4 text-left">Référence</th>
//                 <th className="py-2 px-4 text-left">Date</th>
//                 <th className="py-2 px-4 text-left">Direction</th>
//                 <th className="py-2 px-4 text-left">Demandeur</th>
//                 <th className="py-2 px-4 text-left">Environnement</th>
//                 <th className="py-2 px-4 text-left">Durée</th>
//                 <th className="py-2 px-4 text-left">Statut</th>
//                 <th className="py-2 px-4 text-left">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredData.map((item, index) => (
//                 <tr
//                   key={index}
//                   className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
//                 >
//                   <td className="py-2 px-4">{item.id}</td>
//                   <td className="py-2 px-4">{item.date}</td>
//                   <td className="py-2 px-4">{item.direction}</td>
//                   <td className="py-2 px-4">{item.demandeur}</td>
//                   <td className="py-2 px-4">{item.environnement}</td>
//                   <td className="py-2 px-4">{item.duree}</td>
//                   <td className="py-2 px-4">
//                     <span
//                       className={`px-2 py-1 rounded-full text-xs font-semibold ${
//                         item.statut === "Clôturée"
//                           ? "bg-green-100 text-green-800"
//                           : item.statut === "En cours"
//                           ? "bg-yellow-100 text-yellow-800"
//                           : item.statut === "À valider"
//                           ? "bg-blue-100 text-blue-800"
//                           : "bg-gray-100 text-gray-800"
//                       }`}
//                     >
//                       {item.statut}
//                     </span>
//                   </td>
//                   <td className="py-2 px-4">
//                     <button className="text-blue-500 hover:text-blue-700 mr-2">
//                       Voir
//                     </button>
//                     <button className="text-gray-500 hover:text-gray-700">
//                       Modifier
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div> */}
//     </div>
//   );
// };

// export default Dashboard;

import React, { useState, useEffect } from "react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";
import {
  Calendar,
  Filter,
  Users,
  Database,
  FileText,
  CheckSquare,
  Clock,
} from "lucide-react";

import axios from "axios";

// Données simulées pour la démonstration
const mockData = [
  {
    id: "REF-001",
    date: "15/01/2025",
    direction: "DSI",
    demandeur: "Jean Dupont",
    statut: "Clôturée",
    duree: "3 mois",
    environnement: "Production",
    extraction: "Oui",
    avisData: "Favorable",
    avisDT: "Favorable",
    avisBO: "Favorable",
  },
  {
    id: "REF-002",
    date: "20/01/2025",
    direction: "Marketing",
    demandeur: "Marie Laurent",
    statut: "En cours",
    duree: "6 mois",
    environnement: "Test",
    extraction: "Non",
    avisData: "Favorable",
    avisDT: "En attente",
    avisBO: "En attente",
  },
  {
    id: "REF-003",
    date: "25/01/2025",
    direction: "Finance",
    demandeur: "Paul Renard",
    statut: "À valider",
    duree: "12 mois",
    environnement: "Production",
    extraction: "Oui",
    avisData: "Favorable",
    avisDT: "Favorable",
    avisBO: "En attente",
  },
  {
    id: "REF-004",
    date: "02/02/2025",
    direction: "RH",
    demandeur: "Sophie Martin",
    statut: "Initiée",
    duree: "1 mois",
    environnement: "Dev",
    extraction: "Non",
    avisData: "En attente",
    avisDT: "En attente",
    avisBO: "En attente",
  },
  {
    id: "REF-005",
    date: "10/02/2025",
    direction: "DSI",
    demandeur: "Pierre Blanc",
    statut: "Clôturée",
    duree: "3 mois",
    environnement: "Production",
    extraction: "Oui",
    avisData: "Favorable",
    avisDT: "Favorable",
    avisBO: "Favorable",
  },
  {
    id: "REF-006",
    date: "15/02/2025",
    direction: "Marketing",
    demandeur: "Claire Dubois",
    statut: "En cours",
    duree: "6 mois",
    environnement: "Test",
    extraction: "Non",
    avisData: "Favorable",
    avisDT: "En attente",
    avisBO: "En attente",
  },
  {
    id: "REF-007",
    date: "20/02/2025",
    direction: "Finance",
    demandeur: "Nicolas Leroy",
    statut: "À valider",
    duree: "12 mois",
    environnement: "Production",
    extraction: "Oui",
    avisData: "Favorable",
    avisDT: "Favorable",
    avisBO: "En attente",
  },
  {
    id: "REF-008",
    date: "01/03/2025",
    direction: "RH",
    demandeur: "Julie Moreau",
    statut: "Initiée",
    duree: "1 mois",
    environnement: "Dev",
    extraction: "Non",
    avisData: "En attente",
    avisDT: "En attente",
    avisBO: "En attente",
  },
  {
    id: "REF-009",
    date: "10/03/2025",
    direction: "DSI",
    demandeur: "Thomas Dubois",
    statut: "Clôturée",
    duree: "3 mois",
    environnement: "Production",
    extraction: "Oui",
    avisData: "Favorable",
    avisDT: "Favorable",
    avisBO: "Favorable",
  },
  {
    id: "REF-010",
    date: "15/03/2025",
    direction: "Marketing",
    demandeur: "Émilie Bernard",
    statut: "En cours",
    duree: "6 mois",
    environnement: "Test",
    extraction: "Non",
    avisData: "Favorable",
    avisDT: "En attente",
    avisBO: "En attente",
  },
  {
    id: "REF-011",
    date: "15/01/2025",
    direction: "DSI",
    demandeur: "Jean Dupont",
    statut: "Clôturée",
    duree: "3 mois",
    environnement: "Production",
    extraction: "Oui",
    avisData: "Favorable",
    avisDT: "Favorable",
    avisBO: "Favorable",
  },
  {
    id: "REF-012",
    date: "20/01/2025",
    direction: "Marketing",
    demandeur: "Marie Laurent",
    statut: "En cours",
    duree: "6 mois",
    environnement: "Test",
    extraction: "Non",
    avisData: "Favorable",
    avisDT: "En attente",
    avisBO: "En attente",
  },
  {
    id: "REF-013",
    date: "25/01/2025",
    direction: "Finance",
    demandeur: "Paul Renard",
    statut: "À valider",
    duree: "12 mois",
    environnement: "Production",
    extraction: "Oui",
    avisData: "Favorable",
    avisDT: "Favorable",
    avisBO: "En attente",
  },
  {
    id: "REF-014",
    date: "02/02/2025",
    direction: "RH",
    demandeur: "Sophie Martin",
    statut: "Initiée",
    duree: "1 mois",
    environnement: "Dev",
    extraction: "Non",
    avisData: "En attente",
    avisDT: "En attente",
    avisBO: "En attente",
  },
  {
    id: "REF-015",
    date: "10/02/2025",
    direction: "DSI",
    demandeur: "Pierre Blanc",
    statut: "Clôturée",
    duree: "3 mois",
    environnement: "Production",
    extraction: "Oui",
    avisData: "Favorable",
    avisDT: "Favorable",
    avisBO: "Favorable",
  },
  {
    id: "REF-016",
    date: "15/02/2025",
    direction: "Marketing",
    demandeur: "Claire Dubois",
    statut: "En cours",
    duree: "6 mois",
    environnement: "Test",
    extraction: "Non",
    avisData: "Favorable",
    avisDT: "En attente",
    avisBO: "En attente",
  },
  {
    id: "REF-017",
    date: "20/02/2025",
    direction: "Finance",
    demandeur: "Nicolas Leroy",
    statut: "À valider",
    duree: "12 mois",
    environnement: "Production",
    extraction: "Oui",
    avisData: "Favorable",
    avisDT: "Favorable",
    avisBO: "En attente",
  },
  {
    id: "REF-018",
    date: "01/03/2025",
    direction: "RH",
    demandeur: "Julie Moreau",
    statut: "Initiée",
    duree: "1 mois",
    environnement: "Dev",
    extraction: "Non",
    avisData: "En attente",
    avisDT: "En attente",
    avisBO: "En attente",
  },
  {
    id: "REF-019",
    date: "10/03/2025",
    direction: "DSI",
    demandeur: "Thomas Dubois",
    statut: "Clôturée",
    duree: "3 mois",
    environnement: "Production",
    extraction: "Oui",
    avisData: "Favorable",
    avisDT: "Favorable",
    avisBO: "Favorable",
  },
  {
    id: "REF-020",
    date: "15/03/2025",
    direction: "Marketing",
    demandeur: "Émilie Bernard",
    statut: "En cours",
    duree: "6 mois",
    environnement: "Test",
    extraction: "Non",
    avisData: "Favorable",
    avisDT: "En attente",
    avisBO: "En attente",
  },
];

// Données pour les graphiques
const getStatusData = (data) => {
  const counts = { EN_ATTENTE: 0, APPROUVEE: 0, REJETEE: 0 };
  data.forEach((item) => {
    counts[item.status] = (counts[item.status] || 0) + 1;
  });
  return Object.keys(counts).map((key) => ({ name: key, value: counts[key] }));
};

const getDepartmentData = (data) => {
  const counts = {};
  data.forEach((item) => {
    counts[item.direction] = (counts[item.direction] || 0) + 1;
  });
  return Object.keys(counts).map((key) => ({ name: key, value: counts[key] }));
};

const getEnvironmentData = (data) => {
  const counts = {};
  data.forEach((item) => {
    counts[item.environnement] = (counts[item.environnement] || 0) + 1;
  });
  return Object.keys(counts).map((key) => ({ name: key, value: counts[key] }));
};

const getMonthlyData = (data) => {
  const monthNames = [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ];

  const counts = Array(12).fill(0);

  data.forEach((item) => {
    const date = new Date(item.createdAt);
    const month = date.getMonth(); // 0-11
    counts[month]++;
  });

  return counts.map((count, index) => ({
    name: monthNames[index],
    demandes: count,
  }));
};

// Couleurs pour les graphiques
const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884d8",
  "#82ca9d",
  "#ffc658",
  "#ff7300",
];

const STATUS_COLORS = {
  APPROUVEE: "#4CAF50", // Vert
  REJETEE: "#F44336", // Rouge
  EN_ATTENTE: "#FFC107", // Jaune
};

const Dashboard = () => {
  const [data, setData] = useState(mockData);
  const [statusFilter, setStatusFilter] = useState("Tous");
  const [departmentFilter, setDepartmentFilter] = useState("Tous");
  const [demandes, setDemandes] = useState([]);
  const [errorBack, setErrorBack] = useState("");
  const [loading, setLoading] = useState(false);
  // const getDemandes = async () => {
  //   try {
  //     const response = await fetch(
  //       `${process.env.REACT_APP_BACK_URL}/api/get_demandes`,
  //       {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${localStorage.getItem("access_token")}`,
  //         },
  //       }
  //     );
  //     const dataa = await response.json();
  //     console.log("data", dataa);
  //     if (!response.ok) {
  //       setErrorBack("No data found or error lors de recuperation des donnees");
  //       return;
  //     }

  //     setDemandes(dataa.demandes);
  //   } catch (e) {
  //     console.error("error ", e);
  //   }
  // };

  const getDemandes = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACK_URL}/api/demandes/allDemandes`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setDemandes(response.data.demandes);

      console.log("response.data.demandes", response);
    } catch (error) {
      console.error("error demades ", error);
      setErrorBack("failed to fetch demandes ");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getDemandes();
  }, []);

  // Filtrer les données
  const filteredData = demandes.filter((item) => {
    const matchStatus = statusFilter === "Tous" || item.status === statusFilter;
    const matchDepartment =
      departmentFilter === "Tous" || item.direction === departmentFilter;
    return matchStatus && matchDepartment;
  });

  // Données pour les graphiques

  let statusData = getStatusData(filteredData);
  let departmentData = getDepartmentData(filteredData);
  let environmentData = getEnvironmentData(filteredData);
  let monthlyData = getMonthlyData(filteredData);

  // Statuts uniques pour le filtre
  let uniqueStatuses = [
    "Tous",
    ...new Set(demandes.map((item) => item.status)),
  ];

  // Directions uniques pour le filtre
  const uniqueDepartments = [
    "Tous",
    ...new Set(demandes.map((item) => item.direction)),
  ];

  return (
    <div className="bg-gray-100 min-h-screen p-6 content">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Tableau de Bord des Demandes d'Accès
        </h1>
        <p className="text-gray-600">
          Visualisation et analyse des demandes d'accès aux données
        </p>
      </div>

      {/* Cartes de statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow flex items-center">
          <div className="bg-blue-100 p-3 rounded-full mr-4">
            <FileText size={24} className="text-blue-500" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Total des demandes</p>
            <p className="text-2xl font-bold">{filteredData.length}</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow flex items-center">
          <div className="bg-green-100 p-3 rounded-full mr-4">
            <CheckSquare size={24} className="text-green-500" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Demandes clôturées</p>
            <p className="text-2xl font-bold">
              {filteredData.filter((item) => item.status === "APPROUVEE").length}
            </p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow flex items-center">
          <div className="bg-yellow-100 p-3 rounded-full mr-4">
            <Clock size={24} className="text-yellow-500" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Demandes en cours</p>
            <p className="text-2xl font-bold">
              {filteredData.filter((item) => item.status === "EN_ATTENTE").length}
            </p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow flex items-center">
          <div className="bg-purple-100 p-3 rounded-full mr-4">
            <Users size={24} className="text-purple-500" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Directions</p>
            <p className="text-2xl font-bold">
              {new Set(filteredData.map((item) => item.direction)).size}
            </p>
          </div>
        </div>
      </div>

      {/* Filtres */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <h2 className="text-lg font-semibold mb-4 flex items-center">
          <Filter size={18} className="mr-2" /> Filtres
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Statut
            </label>
            <select
              className="w-full border border-gray-300 rounded-md p-2"
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
              }}
            >
              {uniqueStatuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Direction
            </label>
            <select
              className="w-full border border-gray-300 rounded-md p-2"
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
            >
              {uniqueDepartments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Graphiques */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Graphique par statut */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Demandes par statut</h2>
          {/* <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                labelLine={true}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
              >
                {statusData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer> */}
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                labelLine={true}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
              >
                {statusData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={STATUS_COLORS[entry.name] || "#8884d8"}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Graphique par direction */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Demandes par direction</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={departmentData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" name="Nombre de demandes" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Graphique par environnement */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">
            Demandes par environnement
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={environmentData}
                cx="50%"
                cy="50%"
                labelLine={true}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
              >
                {environmentData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Graphique des demandes par mois */}
        {/* <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">
            Tendance mensuelle des demandes
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={monthlyData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="demandes"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div> */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">
            Tendance mensuelle des demandes
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={monthlyData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="demandes"
                stroke="#6366f1" // Violet Tailwind
                strokeWidth={3}
                activeDot={{ r: 6 }}
                dot={{ r: 4, stroke: "#fff", strokeWidth: 1 }}
                animationDuration={800}
                label={{ position: "top", fill: "#6366f1", fontSize: 12 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Tableau des demandes */}
      {/* <div className="bg-white p-4 rounded-lg shadow mb-6">
        <h2 className="text-lg font-semibold mb-4">Liste des demandes</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 text-left">Référence</th>
                <th className="py-2 px-4 text-left">Date</th>
                <th className="py-2 px-4 text-left">Direction</th>
                <th className="py-2 px-4 text-left">Demandeur</th>
                <th className="py-2 px-4 text-left">Environnement</th>
                <th className="py-2 px-4 text-left">Durée</th>
                <th className="py-2 px-4 text-left">Statut</th>
                <th className="py-2 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                >
                  <td className="py-2 px-4">{item.id}</td>
                  <td className="py-2 px-4">{item.date}</td>
                  <td className="py-2 px-4">{item.direction}</td>
                  <td className="py-2 px-4">{item.demandeur}</td>
                  <td className="py-2 px-4">{item.environnement}</td>
                  <td className="py-2 px-4">{item.duree}</td>
                  <td className="py-2 px-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        item.statut === "Clôturée"
                          ? "bg-green-100 text-green-800"
                          : item.statut === "En cours"
                          ? "bg-yellow-100 text-yellow-800"
                          : item.statut === "À valider"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {item.statut}
                    </span>
                  </td>
                  <td className="py-2 px-4">
                    <button className="text-blue-500 hover:text-blue-700 mr-2">
                      Voir
                    </button>
                    <button className="text-gray-500 hover:text-gray-700">
                      Modifier
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div> */}
    </div>
  );
};

export default Dashboard;
