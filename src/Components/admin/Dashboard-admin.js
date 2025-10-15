

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

  const [statusFilter, setStatusFilter] = useState("Tous");
  const [departmentFilter, setDepartmentFilter] = useState("Tous");
  const [demandes, setDemandes] = useState([]);
  const [errorBack, setErrorBack] = useState("");
  const [loading, setLoading] = useState(false);
  

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

     
    </div>
  );
};

export default Dashboard;
