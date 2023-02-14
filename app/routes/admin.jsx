import { Outlet, useCatch } from "@remix-run/react";
import Code from "~/components/admin/shared/Code";
import Error from "~/components/admin/shared/Error";
import AdminHeader from "~/components/nav/AdminHeader";
import { requireUserSession } from "~/data/auth.server";

export async function loader ({ request }) {
  return await requireUserSession(request);
}

function Document({ children }) {
  return (
    <div className="bg-purple-500 min-h-screen">
      <div className="lg:w-2/3 sm:w-auto mx-auto p-2">
      
        <AdminHeader />
        
        <div className="bg-slate-100 p-3 rounded">{children}</div>
      </div>
    </div>
  );
}

export function CatchBoundary() {
  const dataCatch = useCatch();

  return (
    <Document>
      <Error title={dataCatch.statusText}>
        <Code>
          Catch from <b>"__site.jsx"</b> file.
        </Code>
        <p>{dataCatch.data?.message || "Something went wrong"}</p>
      </Error>
    </Document>
  );
}

export default function AdminLayout() {
  return (
    <Document>
      <Outlet />
    </Document>
  );
}
