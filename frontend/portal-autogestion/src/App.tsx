import React, { Suspense, useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { FileText, BarChart3, CreditCard, Bell, Settings, Users } from "lucide-react";
import "./index.css";
import ReactDOM from "react-dom/client";

const CuposApp = React.lazy(() => import("cupos/App"));
const FacturacionApp = React.lazy(() => import("facturacion/App"));

const numberIdOptions = [
  { label: "Juan Pérez", value: "12345678" },
  { label: "Ana Gómez", value: "87654321" },
  { label: "Carlos Ruiz", value: "11223344" },
];

const microfrontends = [
  {
    id: "invoices",
    title: "Consulta de Facturas",
    description: "Consulta y descarga tus facturas mensuales",
    icon: FileText,
    status: "Activo",
    module: "facturacion",
  },
  {
    id: "quotas",
    title: "Cupos Disponibles",
    description: "Revisa tu consumo de datos, minutos y SMS",
    icon: BarChart3,
    status: "Activo",
    module: "cupos",
  },
  {
    id: "payments",
    title: "Pagos y Recargas",
    description: "Realiza pagos y recargas de saldo",
    icon: CreditCard,
    status: "Próximamente",
  },
  {
    id: "notifications",
    title: "Notificaciones",
    description: "Centro de notificaciones y alertas",
    icon: Bell,
    status: "Próximamente",
  },
  {
    id: "profile",
    title: "Mi Perfil",
    description: "Gestiona tu información personal",
    icon: Users,
    status: "Próximamente",
  },
  {
    id: "settings",
    title: "Configuración",
    description: "Ajustes y preferencias del sistema",
    icon: Settings,
    status: "Próximamente",
  },
];

const App = () => {
  const [activeModule, setActiveModule] = useState<null | "facturacion" | "cupos">(null);
  const [numberId, setNumberId] = useState("12345678");
  const [user, setUser] = useState<any>(null);
  const [loadingUser, setLoadingUser] = useState(false);
  const [userError, setUserError] = useState("");

  useEffect(() => {
    async function fetchUser() {
      setLoadingUser(true);
      setUserError("");
      try {
        const res = await fetch(`http://localhost:9080/api/users/${numberId}`);
        if (!res.ok) throw new Error("Usuario no encontrado");
        const data = await res.json();
        setUser(data);
      } catch (e: any) {
        setUser(null);
        setUserError(e.message);
      }
      setLoadingUser(false);
    }
    fetchUser();
  }, [numberId]);

  // Render microfrontend if active
  if (activeModule === "facturacion") {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <header className="w-full bg-white border-b shadow-sm py-4 px-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xl font-bold text-[#009FE3]">Portal de Autogestión</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <a href="#" className="text-[#222222] font-medium hover:text-[#009FE3] transition-colors" onClick={() => setActiveModule(null)}>Inicio</a>
            <a href="#" className="text-[#222222] font-medium hover:text-[#009FE3] transition-colors" onClick={() => setActiveModule("cupos")}>Cupos</a>
            <a href="#" className="text-[#009FE3] font-bold transition-colors" onClick={() => setActiveModule("facturacion")}>Facturación</a>            
          </nav>
          <div className="flex items-center gap-2">
            <select
              className="bg-white border border-gray-300 rounded-md h-8 px-2 text-sm"
              value={numberId}
              onChange={e => setNumberId(e.target.value)}
            >
              {numberIdOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label} ({opt.value})</option>
              ))}
            </select>
          </div>
        </header>
        <main className="flex-1 p-8">
          <Suspense fallback={<div>Cargando facturación...</div>}>
            <FacturacionApp numberId={numberId} />
          </Suspense>
        </main>
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-500">© 2025 Portal de Autogestión. Arquitectura de Microfrontends.</div>
            <div className="flex items-center gap-4 text-xs text-gray-400">
              <span>Shell App v3.0.0</span>
              <span>•</span>
              <span>Runtime: Next.js 15</span>
              <span>•</span>
              <span>Module Federation</span>
            </div>
          </div>
        </div>
      </footer>
      </div>
    );
  }

  if (activeModule === "cupos") {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <header className="w-full bg-white border-b shadow-sm py-4 px-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xl font-bold text-[#009FE3]">Portal de Autogestión</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <a href="#" className="text-[#222222] font-medium hover:text-[#009FE3] transition-colors" onClick={() => setActiveModule(null)}>Inicio</a>
            <a href="#" className="text-[#009FE3] font-bold transition-colors" onClick={() => setActiveModule("cupos")}>Cupos</a>
            <a href="#" className="text-[#222222] font-medium hover:text-[#009FE3] transition-colors" onClick={() => setActiveModule("facturacion")}>Facturación</a>            
          </nav>
          <div className="flex items-center gap-2">
            <select
              className="bg-white border border-gray-300 rounded-md h-8 px-2 text-sm"
              value={numberId}
              onChange={e => setNumberId(e.target.value)}
            >
              {numberIdOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label} ({opt.value})</option>
              ))}
            </select>
          </div>
        </header>
        <main className="flex-1 p-8">
          <Suspense fallback={<div>Cargando cupos...</div>}>
            <CuposApp numberId={numberId} />
          </Suspense>
        </main>
        <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-500">© 2025 Portal de Autogestión. Arquitectura de Microfrontends.</div>
            <div className="flex items-center gap-4 text-xs text-gray-400">
              <span>Shell App v3.0.0</span>
              <span>•</span>
              <span>Runtime: Next.js 15</span>
              <span>•</span>
              <span>Module Federation</span>
            </div>
          </div>
        </div>
      </footer>
      </div>
    );
  }

  // Dashboard
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header/Nav */}
      <header className="w-full bg-white border-b shadow-sm py-4 px-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-xl font-bold text-[#009FE3]">Portal de Autogestión</span>
        </div>
        <nav className="hidden md:flex gap-6">
          <a href="#" className="text-[#222222] font-medium hover:text-[#009FE3] transition-colors" onClick={() => setActiveModule(null)}>Inicio</a>
          <a href="#" className="text-[#222222] font-medium hover:text-[#009FE3] transition-colors" onClick={() => setActiveModule("cupos")}>Cupos</a>
          <a href="#" className="text-[#222222] font-medium hover:text-[#009FE3] transition-colors" onClick={() => setActiveModule("facturacion")}>Facturación</a>          
        </nav>
        <div className="flex items-center gap-2"> 
          <select
            className="bg-white border border-gray-300 rounded-md h-8 px-2 text-sm"
            value={numberId}
            onChange={e => setNumberId(e.target.value)}
          >
            {numberIdOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label} ({opt.value})</option>
            ))}
          </select>
        </div>
      </header>

      {/* Main Dashboard */}
      <main className="flex-1 space-y-6 p-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-[#E6F4FB] to-[#B1D4E0] rounded-lg p-6">
          <h1 className="text-2xl font-bold text-[#222222] mb-2">Bienvenido al Portal de Autogestión</h1>
          <p className="text-[#222222] opacity-80">
            Gestiona todos tus servicios desde un solo lugar con nuestra arquitectura de microfrontends
          </p>
        </div>

        {/* User Info Quick View */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-[#222222] mb-4">Información de la Cuenta</h2>
          {userError && <div className="text-red-500 p-2">{userError}</div>}
          {loadingUser ? (
            <div className="p-2">Cargando usuario...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
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
          )}
        </div>

        {/* Microfrontends Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {microfrontends.map((mf) => {
            const IconComponent = mf.icon;
            const isActive = mf.status === "Activo";
            return (
              <Card key={mf.id} className="hover:shadow-md transition-shadow duration-200">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="p-3 rounded-lg bg-[#E6F4FB]">
                      <IconComponent className="w-6 h-6 text-[#009FE3]" />
                    </div>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        isActive ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {mf.status}
                    </span>
                  </div>
                  <CardTitle className="text-lg text-[#222222]">{mf.title}</CardTitle>
                  <CardDescription className="text-[#222222] opacity-70">{mf.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  {isActive && mf.module ? (
                    <Button className="w-full bg-[#009FE3] text-white" onClick={() => setActiveModule(mf.module as any)}>
                      Acceder al Módulo
                    </Button>
                  ) : (
                    <Button disabled className="w-full bg-[#009FE3] text-white">
                      Próximamente
                    </Button>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-500">© 2025 Portal de Autogestión. Arquitectura de Microfrontends.</div>
            <div className="flex items-center gap-4 text-xs text-gray-400">
              <span>Shell App v3.0.0</span>
              <span>•</span>
              <span>Runtime: Next.js 15</span>
              <span>•</span>
              <span>Module Federation</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("app") as HTMLElement);
root.render(<App />);