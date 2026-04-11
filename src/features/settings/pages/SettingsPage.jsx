import { Button, Input } from "@/components/ui";
import {
  Accessibility,
  Archive,
  Bell,
  Calendar,
  CheckSquare,
  Clock,
  Eye,
  Globe,
  LayoutGrid,
} from "lucide-react";
import { useState } from "react";
import SettingsDropdown from "../components/SettingsDropdown";

export default function Settings() {
  const [language, setLanguage] = useState("en");
  const [weekStart, setWeekStart] = useState("sunday");
  return (
    <div className=" space-y-8">
      {/* Page title */}
      <h1 className="text-2xl font-semibold">Settings</h1>

      <Section title="General">
        <SettingsDropdown
          label="Language"
          icon={<Globe  size={18}  />}
          value={language}
          onChange={setLanguage}
          options={[
            { label: "English", value: "en" },
            { label: "Arabic", value: "ar" },
          ]}
        />

        <SettingsDropdown
          label="Week starts"
          icon={<Calendar size={18} />}
          value={weekStart}
          onChange={setWeekStart}
          options={[
            { label: "Sunday", value: "sunday" },
            { label: "Monday", value: "monday" },
          ]}
        />
        <SelectItem icon={Clock} label="Timezone" value="Africa / Cairo" />
        <SelectItem
          icon={Calendar}
          label="Date format"
          value="DD / MM / YYYY"
        />
      </Section>

      {/* ================= Tasks Preferences ================= */}
      <Section title="Tasks Preferences">
        <SelectItem icon={LayoutGrid} label="Default view" value="Board" />
        <SelectItem
          icon={CheckSquare}
          label="Default task status"
          value="To Do"
        />
        <SelectItem
          icon={Archive}
          label="Auto archive completed tasks"
          value="After 30 days"
        />
        <ToggleItem icon={Eye} label="Show completed tasks" />
      </Section>

      {/* ================= Calendar ================= */}
      <Section title="Calendar">
        <ToggleItem icon={Calendar} label="Show weekends" />

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 ">
            <Calendar size={18} />
            Working days
          </div>

          <div className="flex gap-1">
            {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => (
              <span
                key={i}
                className={`h-8 w-8 flex items-center justify-center rounded-md text-sm
                ${i < 5 ? "bg-teal-500/10 text-teal-400" : "bg-white/5 text-gray-400"}`}
              >
                {day}
              </span>
            ))}
          </div>
        </div>

        <SelectItem
          icon={Bell}
          label="Default reminder"
          value="30 min before"
        />
      </Section>

      {/* ================= Accessibility ================= */}
      <Section title="Accessibility">
        <ToggleItem icon={Accessibility} label="Reduce animations" />
        <ToggleItem icon={Accessibility} label="Larger text" />
      </Section>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <section className="rounded-xl  border border-white/5 p-6 space-y-4">
      <h2 className="text-lg font-medium ">{title}</h2>
      {children}
    </section>
  );
}

function SelectItem({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3 ">
        <Icon size={18} />
        {label}
      </div>

      <Button variant="secondary">
        {value}
        <span className="text-gray-500">▼</span>
      </Button>
    </div>
  );
}

function ToggleItem({ icon: Icon, label }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3 ">
        <Icon size={18} />
        {label}
      </div>

      <Input type="checkbox" className="h-5 w-5 accent-teal-500" />
    </div>
  );
}
