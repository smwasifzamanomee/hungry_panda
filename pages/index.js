import GraphChart from "@/components/GraphChart";
import SalesTable from "@/components/SalesTable";

export default function Home() {
  return (
      <div>
      <h1 className="text-center py-10 text-3xl font-bold text-red-500">Hungry Panda</h1>
      <SalesTable />
      <h1 className="text-center py-10 text-3xl font-bold text-blue-500">
        Graph Chart
      </h1>
      <GraphChart/>
    </div>
    
  )
}