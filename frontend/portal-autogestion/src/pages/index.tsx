import React, { Suspense } from "react";
import Layout from "../components/Layout";
import "../styles/globals.css";

const CuposApp = React.lazy(() => import("cupos/App"));
const FacturacionApp = React.lazy(() => import("facturacion/App"));

export default function Home() {
  return (
    <Layout>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Suspense fallback={<div>Cargando cupos...</div>}>
          <CuposApp />
        </Suspense>
        <Suspense fallback={<div>Cargando facturación...</div>}>
          <FacturacionApp />
        </Suspense>
      </div>
    </Layout>
  );
} 