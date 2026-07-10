import Inicio from "views/inicio";
import IngresosSistemas from "views/ingresos-sistemas";
import IngresosLaboratorio from "views/ingresos-laboratorio";
import NotFound from "views/notfound";
import Icons from "views/icons";
import Proyectos from "views/proyectos";

var routes = [
  {
    path: "/inicio",
    name: "Inicio",
    icon: "nc-icon nc-shop",
    component: <Inicio />,
    layout: "/admin",
  },{
    path: "/proyectos",
    name: "Proyectos",
    icon: "nc-icon nc-vector",
    component: <Proyectos />,
    layout: "/admin",
  },{
    path: "/ingresos-sistemas",
    name: "Ingresos Sistemas",
    icon: "nc-icon nc-laptop",
    component: <IngresosSistemas />,
    layout: "/admin",
  },{
    path: "/ingresos-laboratorio",
    name: "Ingresos Laboratorio",
    icon: "nc-icon nc-atom",
    component: <IngresosLaboratorio />,
    layout: "/admin",
  },
  {
    path: "/icons",
    name: "Iconos",
    icon: "nc-icon nc-album-2",
    component: <Icons />,
    layout: "/admin",
  },
  {
    path: "/notfound",
    component: <NotFound />
  },
];
export default routes;
