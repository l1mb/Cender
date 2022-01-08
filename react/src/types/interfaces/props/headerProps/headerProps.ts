import { IRoutes } from "@/components/routesComponent/types/routes/IRoutes";

export default interface HeaderProps {
  data: IRoutes;
  signOutHandle: () => void;
}
