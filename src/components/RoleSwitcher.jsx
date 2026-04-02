import { useFinanceStore } from "../store/useFinanceStore";
import RoleDropdown from "./RoleDropdown";

export default function RoleSwitcher() {
  const { role, setRole } = useFinanceStore();

  return <RoleDropdown role={role} setRole={setRole} />;
}