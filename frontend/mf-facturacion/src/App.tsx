import React, { useState, useEffect } from "react";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";
import { Calendar, Download, Search, ChevronLeft, ChevronRight } from "lucide-react";

async function getUserByNumberId(numberId: string) {
  const res = await fetch(`http://localhost:9080/api/users/${numberId}`);
  if (!res.ok) throw new Error("Usuario no encontrado");
  return res.json();
}
async function getBillsByUserId(userId: string, startDate?: string, endDate?: string) {
  let url = `http://localhost:9080/api/bills/users/${userId}`;
  const params = [];
  if (startDate) params.push(`startdate=${startDate}`);
  if (endDate) params.push(`enddate=${endDate}`);
  if (params.length > 0) url += `?${params.join("&")}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Facturas no encontradas");
  return res.json();
}

async function downloadBill(billId: string, format: string) {
  const url = `http://localhost:9080/api/bills/${billId}/download?format=${format}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("No se pudo descargar la factura");
  const blob = await res.blob();
  const a = document.createElement("a");
  a.href = window.URL.createObjectURL(blob);
  a.download = `factura_${billId}.${format}`;
  document.body.appendChild(a);
  a.click();
  a.remove();
}

const App = ({ numberId }: { numberId: string }) => {
  const [user, setUser] = useState<any>(null);
  const [bills, setBills] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [exportFormat, setExportFormat] = useState("json");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError("");
      try {
        const userData = await getUserByNumberId(numberId);
        setUser(userData);
        const billsData = await getBillsByUserId(userData.id);
        setBills(billsData);
      } catch (e: any) {
        setUser(null);
        setBills([]);
        setError(e.message);
      }
      setLoading(false);
    }
    fetchData();
  }, [numberId]);

  async function handleBuscar() {
    if (!user) return;
    setLoading(true);
    setError("");
    try {
      const billsData = await getBillsByUserId(user.id, startDate, endDate);
      setBills(billsData);
    } catch (e: any) {
      setBills([]);
      setError(e.message);
    }
    setLoading(false);
  }

  // Filtrado de facturas por búsqueda
  const filteredBills = bills.filter(bill => {
    const q = search.toLowerCase();
    return (
      bill.period?.toLowerCase().includes(q) ||
      bill.issueDate?.toLowerCase().includes(q) ||
      bill.dueDate?.toLowerCase().includes(q) ||
      String(bill.amount).toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6">
      {/* Microfrontend Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="border-b-2 border-[#8BC53F] p-1">
          <div className="flex items-center justify-between px-5 py-3">
            <h1 className="text-xl font-bold text-[#222222]">Consulta Factura</h1>            
          </div>
        </div>
        {/* User Info Section */}
        <div className="bg-[#E6F4FB] p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-[#009FE3] rounded-full"></span>
              <span className="font-medium text-[#222222]">Fecha:</span>
              <span className="text-[#222222]">{new Date().toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-[#009FE3] rounded-full"></span>
              <span className="font-medium text-[#222222]">Cuenta:</span>
              <span className="text-[#222222]">{user?.accountNumber || "-"}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-[#009FE3] rounded-full"></span>
              <span className="font-medium text-[#222222]">Email:</span>
              <span className="text-[#222222]">{user?.email || "-"}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-[#009FE3] rounded-full"></span>
              <span className="font-medium text-[#222222]">Cédula:</span>
              <span className="text-[#222222]">{user?.numberId || numberId}</span>
            </div>
          </div>
        </div>
        {/* Filters Section */}
        <div className="bg-[#E6F4FB] p-6 border-t border-[#B1D4E0]">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">           
            <div className="relative">
              <Label>Fecha inicio</Label>
              <Input type="date" className="bg-white border-gray-300 rounded-md pr-10" value={startDate} onChange={e => setStartDate(e.target.value)} />
              {/* <Calendar className="absolute right-3 top-8 transform -translate-y-1/2 w-4 h-4 text-[#009FE3]" /> */}
            </div>
            <div className="relative">
              <Label>Fecha fin</Label>
              <Input type="date" className="bg-white border-gray-300 rounded-md pr-10" value={endDate} onChange={e => setEndDate(e.target.value)} />
              {/* <Calendar className="absolute right-3 top-8 transform -translate-y-1/2 w-4 h-4 text-[#009FE3]" /> */}
            </div>
            <Button className="bg-[#009FE3] hover:bg-[#0088CC] text-white rounded-full px-8 mt-6" onClick={handleBuscar}>Buscar</Button>
          </div>
        </div>
      </div>
      {/* Search and Export Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-[#222222] mb-4">Historial de Facturación</h2>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div className="flex items-center flex-1 max-w-md gap-2">
            <Search className="w-5 h-5 text-gray-400" />
            <Input
              placeholder="Buscar"
              className="border-gray-300 rounded-md"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[#009FE3] font-medium border-b-2 border-[#009FE3] pb-1">Web empresarial</span>
            <div className="flex items-center gap-4">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="exportFormat"
                  value="json"
                  checked={exportFormat === "json"}
                  onChange={() => setExportFormat("json")}
                  className="border-[#009FE3] text-[#009FE3] accent-[#009FE3]"
                />
                <span className="text-[#222222]">JSON</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="exportFormat"
                  value="txt"
                  checked={exportFormat === "txt"}
                  onChange={() => setExportFormat("txt")}
                  className="border-[#009FE3] text-[#009FE3] accent-[#009FE3]"
                />
                <span className="text-[#222222]">TXT</span>
              </label>
            </div>
          </div>
        </div>
        {/* Table */}
        <div className="overflow-x-auto">
          {error && <div className="text-red-500 p-2">{error}</div>}
          {loading ? (
            <div className="p-4">Cargando...</div>
          ) : (
            <table className="w-full">
              <thead>
                <tr style={{ background: '#009FE3' }}>
                  <th className="text-left p-3 text-white">Mes facturado</th>
                  <th className="text-left p-3 text-white">Fecha de emisión</th>
                  <th className="text-left p-3 text-white">Fecha de vencimiento</th>
                  <th className="text-left p-3 text-white">Monto total</th>
                  <th className="text-left p-3 text-white">Descargar</th>
                </tr>
              </thead>
              <tbody>
                {filteredBills.length === 0 && !loading ? (
                  <tr><td colSpan={5} className="text-center p-4 text-gray-400">No hay facturas para este usuario.</td></tr>
                ) : (
                  filteredBills.map((bill, index) => (
                    <tr key={bill.id || index} className={index % 2 === 0 ? "bg-[#E6F4FB]" : "bg-white"}>
                      <td className="p-3 text-[#222222]">{bill.period}</td>
                      <td className="p-3 text-[#222222]">{bill.issueDate}</td>
                      <td className="p-3 text-[#222222]">{bill.dueDate}</td>
                      <td className="p-3 text-[#222222]">${bill.amount} USD</td>
                      <td className="p-3">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-[#009FE3] hover:bg-[#E6F4FB] p-1"
                          onClick={() => downloadBill(bill.id, exportFormat)}
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>     
    </div>
  );
};

export default App;