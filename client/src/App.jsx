import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Login from "./pages/login";
import Register from "./pages/register";
import Employe from "./pages/employe";
import Dashbord from "./pages/dashbord";
import Bon from "./pages/bon_consultation";
import Convocation from "./pages/convocation";
import AddConvo from "./pages/addConvo";
import InfoEmployee from "./pages/infoEMP";
import "./style.scss"
import Settings from "./pages/settings";
import EnAttente from "./pages/rdv_en_attente";
import Terminer from "./pages/rdv_termines";
import DashbordMed from "./pages/dashboard_med";
import InfoPatient from "./pages/info_emp_med";
import CreerDocument from "./pages/creerDocument";
import CreerOrdonnance from "./pages/creerOrdonnance";
import info from "./pages/info";
import DemandeAnalyse from "./pages/creerDocument";







function App() {
  const router = createBrowserRouter([
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/Login",
      element: <Login />,
    },
    {
      path: "direction/:directionId/:directionName",
      element: <Employe />,
    },

    {
      path: "/",
      element: <Dashbord />,
    },
    {
      path: "/bon_consultation",
      element: <Bon />,
    },
    {
      path: "/add_convo",
      element: <AddConvo />,
    },
    {
      path: "/Employees/:employeeId",
      element: <InfoEmployee />,

    },
    {
      path: "/convocations",
      element: <Convocation />,
    },
    {
      path: "/settings",
      element: <Settings />,
    },

    {
      path: "/rdv_en_attente",
      element: <EnAttente />,
    },
    
    {
      path: "/rdv_termine",
      element: <Terminer />,
    },
    {
      path: "/dashbord_med",
      element: <DashbordMed />,
    },
    {
      path: "/infoPatient/:employeeId",
      element: <InfoPatient />,
    },
    {
      path: "/CreerOrdonnance/:employeeId",
      element: <CreerOrdonnance />,
    },
    {
      path: "/DemandeAnalyse/:employeeId",
      element: <DemandeAnalyse />,
    },
    {
      path: "/ordonnance/:employeeId",
      element: <info />,
    },


  ]);
  return (
    <div className="app">
      <div className="container">
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
