import { Button } from "@/components/ui/Buttons";
import { X } from "lucide-react";

export default function TaskDetailsModal({ task, onClose }) {
  if (!task) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/60"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-lg rounded-2xl bg-zinc-900 p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">{task.title}</h3>
          <Button variant="secondary" onClick={onClose}>
            <X />
          </Button>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-400 mb-6">
          {task.description || "No description"}
        </p>

        {/* Meta */}
        <div className="space-y-4 text-sm">
          <div className="flex justify-between">
            <span>Status</span>
            <span className="text-blue-400">{task.status}</span>
          </div>

          <div className="flex justify-between">
            <span>Due date</span>
            <span>{task.dueDate || "—"}</span>
          </div>

          <div className="flex justify-between">
            <span>Priority</span>
            <span>{task.priority || "Normal"}</span>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 flex justify-end gap-3">
          <Button variant="danger">
             Delete
          </Button>
          <Button >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}
