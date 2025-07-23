import React, { useState, useEffect } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
// import { Progress } from "./components/ui/progress";

function NativeProgress({ value, className }: { value: number; className?: string }) {
  return (
    <div className={`w-full bg-gray-200 rounded-full ${className || ""}`.trim()}>
      <div
        className="bg-[#009FE3] h-full rounded-full transition-all"
        style={{ width: `${value}%`, height: "100%" }}
      />
    </div>
  );
}

async function getUserByNumberId(numberId: string) {
  const res = await fetch(`http://localhost:9080/api/users/${numberId}`);
  if (!res.ok) throw new Error("Usuario no encontrado");
  return res.json();
}
async function getUsageByUserId(userId: string) {
  const res = await fetch(`http://localhost:9080/api/users/${userId}/usage`);
  if (!res.ok) throw new Error("Consumo no encontrado");
  return res.json();
}
async function getUsageHistoryByUserId(userId: string) {
  const res = await fetch(`http://localhost:9080/api/users/${userId}/usage/history`);
  if (!res.ok) throw new Error("Historial no encontrado");
  return res.json();
}

function QuotaCircle({ used, total, unit, label, color }: any) {
  const available = total - used;
  const percentage = (used / total) * 100;
  
  return (
    <div className="flex flex-col items-center space-y-2">
      <div className="w-24 h-24">
        <CircularProgressbar
          value={percentage}
          text={`${available.toLocaleString()}${unit}`}
          styles={buildStyles({
            pathColor: color,
            textColor: "#009FE3",
            trailColor: "#E5E7EB",
            textSize: "10px",
          })}
        />
      </div>
      <div className="text-center">
        <div className="text-xs text-[#009FE3] font-medium">De {total.toLocaleString()}.0</div>
        <div className="text-xs text-[#222222] mt-1">{label}</div>
        <div className="text-xs text-gray-500 mt-1">{percentage.toFixed(1)}% usado</div>
      </div>
    </div>
  );
}

const App = ({ numberId }: { numberId: string }) => {
  const [user, setUser] = useState<any>(null);
  const [usage, setUsage] = useState<any>(null);
  const [usageHistory, setUsageHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [historyError, setHistoryError] = useState("");

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError("");
      try {
        const userData = await getUserByNumberId(numberId);
        setUser(userData);
        const usageData = await getUsageByUserId(userData.id);
        setUsage(usageData);
        setLoadingHistory(true);
        setHistoryError("");
        try {
          const historyData = await getUsageHistoryByUserId(userData.id);
          setUsageHistory(historyData);
        } catch (e: any) {
          setUsageHistory([]);
          setHistoryError(e.message);
        }
        setLoadingHistory(false);
      } catch (e: any) {
        setUser(null);
        setUsage(null);
        setError(e.message);
        setUsageHistory([]);
        setHistoryError("");
        setLoadingHistory(false);
      }
      setLoading(false);
    }
    fetchData();
  }, [numberId]);

  const quotaData = usage && user ? [
    {
      used: usage.dataGb,
      total: user.plan?.dataGb || 1,
      unit: "MB",
      label: "Datos móviles",
      color: "#009FE3",
    },
    {
      used: usage.minutes,
      total: user.plan?.minutes || 1,
      unit: "Min",
      label: "Minutos de voz",
      color: "#009FE3",
    },
    {
      used: usage.sms,
      total: user.plan?.sms || 1,
      unit: "SMS",
      label: "Mensajes de texto",
      color: "#009FE3",
    },
  ] : [];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="border-b-2 border-[#8BC53F] p-1">
          <div className="flex items-center justify-between px-5 py-3">
            <h1 className="text-xl font-bold text-[#222222]">Cupos disponibles</h1>            
          </div>
        </div>
        <div className="p-8">
          {/* El select de usuario ahora está en el header global */}
          {error && <div className="text-red-500 p-2">{error}</div>}
          {loading ? (
            <div className="p-4">Cargando...</div>
          ) : (
            <div className="flex flex-row justify-center items-center gap-8 text-xxl font-bold">
              {quotaData.map((quota, index) => (
                <QuotaCircle key={index} {...quota} />
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-[#222222] mb-4">Detalles de Consumo</h2>
        {loading ? (
          <div className="p-4">Cargando...</div>
        ) : (
          <div className="space-y-4">
            {quotaData.map((quota, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-[#222222]">{quota.label}</span>
                  <span className="text-sm text-[#222222]">
                    {(quota.total - quota.used).toLocaleString()}{quota.unit} disponibles
                  </span>
                </div>
                <NativeProgress value={((quota.total - quota.used) / quota.total) * 100} className="h-2" />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>
                    Usado: {quota.used.toLocaleString()}{quota.unit}
                  </span>
                  <span>
                    Total: {quota.total.toLocaleString()}{quota.unit}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-[#222222] mb-4">Historial de Consumo</h2>
        {loadingHistory ? (
          <div className="p-4">Cargando historial...</div>
        ) : historyError ? (
          <div className="text-red-500 p-2">{historyError}</div>
        ) : usageHistory.length === 0 ? (
          <div className="p-4 text-gray-400">No hay historial de consumo para este usuario.</div>
        ) : (
          <div className="space-y-4">
            {usageHistory.map((item, index) => (
              <div key={item.id || index} className="grid grid-cols-4 gap-4 p-3 bg-[#E6F4FB] rounded-lg">
                <div className="font-medium text-[#222222]">{item.lastUpdated ? new Date(item.lastUpdated).toLocaleDateString() : "-"}</div>
                <div className="text-sm text-[#222222]">{item.dataGb}MB datos</div>
                <div className="text-sm text-[#222222]">{item.minutes} min</div>
                <div className="text-sm text-[#222222]">{item.sms} SMS</div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-[#222222] mb-4">Vista Móvil</h2>
        <div className="max-w-sm mx-auto bg-[#E6F4FB] rounded-lg p-4">
          <div className="border-b-2 border-[#8BC53F] pb-2 mb-4">
            <h3 className="font-semibold text-[#222222]">Cupos disponibles</h3>
          </div>
          <div className="space-y-6">
            {quotaData.map((quota, index) => (
              <div key={index} className="flex items-center justify-between bg-white rounded-lg p-3">
                <div className="flex-1">
                  <div className="text-sm font-medium text-[#222222]">{quota.label}</div>
                  <div className="text-xs text-gray-500">
                    {(quota.total - quota.used).toLocaleString()}{quota.unit} de {quota.total.toLocaleString()}{quota.unit}
                  </div>
                  <NativeProgress value={((quota.total - quota.used) / quota.total) * 100} className="h-1 mt-2" />
                </div>
                <div className="ml-4 text-right">
                  <div className="text-lg font-bold text-[#009FE3]">{(quota.total - quota.used).toLocaleString()}</div>
                  <div className="text-xs text-[#222222]">{quota.unit}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>     
    </div>
  );
};

export default App;
