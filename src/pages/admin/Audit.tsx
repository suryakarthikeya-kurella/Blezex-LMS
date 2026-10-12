import DataTable from "../../components/DataTable";
import { Title } from "../../components/ui";
export default function Audit() { return <><Title note="who did what">Audit Log</Title><DataTable source="audit_logs" sort="created_at" /></>; }
