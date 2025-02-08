import { Bar_Chart_Label } from "../chart/Bar_Chart_Label";
import { Bar_Chart_Custom_Label } from "../chart/Bar_Chart_Custom_Label";
import { Bar_Chart_Mixed } from "../chart/Bar_Chart_Mixed";
import { Bar_Chart_Active } from "../chart/Bar_Chart_Active";
import { Area_Chart_Interactive } from "../chart/Area_Chart_Interactive";

export default function Dashboard() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="grid auto-rows-min gap-4 md:grid-cols-4">
        <div className="">
          <Bar_Chart_Label />
        </div>
        <div className="">
          <Bar_Chart_Active />
        </div>
        <div className="">
          <Bar_Chart_Custom_Label />
        </div>
        <div className="">
          <Bar_Chart_Mixed />
        </div>
      </div>
      <div className="">
        <Area_Chart_Interactive />
      </div>
    </main>
  );
}
