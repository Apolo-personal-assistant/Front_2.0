import React, { useState } from "react";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (goal: {
    title: string;
    description: string;
    type: string;
    frequency: string;
    deadline?: string;
    calories_goal?: number;
    protein_goal?: number;
    carbs_goal?: number;
    fat_goal?: number;
  }) => void;
}

const AddGoalModal: React.FC<Props> = ({ isOpen, onClose, onSave }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("mantenerse saludable");
  const [frequency, setFrequency] = useState("semanal");
  const [deadline, setDeadline] = useState("");
  const [caloriesGoal, setCaloriesGoal] = useState<number | "">("");
  const [proteinGoal, setProteinGoal] = useState<number | "">("");
  const [carbsGoal, setCarbsGoal] = useState<number | "">("");
  const [fatGoal, setFatGoal] = useState<number | "">("");

  const isFormValid = title && description && type && frequency;

  const handleSubmit = () => {
    if (!isFormValid) return;

    onSave({
      title,
      description,
      type,
      frequency,
      deadline: deadline || undefined,
      calories_goal: caloriesGoal === "" ? undefined : Number(caloriesGoal),
      protein_goal: proteinGoal === "" ? undefined : Number(proteinGoal),
      carbs_goal: carbsGoal === "" ? undefined : Number(carbsGoal),
      fat_goal: fatGoal === "" ? undefined : Number(fatGoal),
    });

    setTitle("");
    setDescription("");
    setType("mantenerse saludable");
    setFrequency("semanal");
    setDeadline("");
    setCaloriesGoal("");
    setProteinGoal("");
    setCarbsGoal("");
    setFatGoal("");
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Agregar nueva meta">
      <div className="space-y-4">

        {/* Título */}
        <div>
          <label className="block mb-1 text-sm font-medium">Título</label>
          <input
            type="text"
            placeholder="Ej. Perder peso"
            className="input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Descripción */}
        <div>
          <label className="block mb-1 text-sm font-medium">Descripción</label>
          <textarea
            placeholder="Ej. Bajar 3 kg en 2 meses con dieta baja en carbohidratos"
            className="input resize-none"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* Tipo */}
        <div>
          <label className="block mb-1 text-sm font-medium">Tipo</label>
          <select
            className="input"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="bajar peso">Bajar peso</option>
            <option value="subir peso">Subir peso</option>
            <option value="mantenerse saludable">Mantenerse saludable</option>
            <option value="dieta personalizada">Dieta personalizada</option>
          </select>
        </div>

        {/* Frecuencia */}
        <div>
          <label className="block mb-1 text-sm font-medium">Frecuencia</label>
          <select
            className="input"
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
          >
            <option value="diaria">Diaria</option>
            <option value="semanal">Semanal</option>
            <option value="mensual">Mensual</option>
          </select>
        </div>

        {/* Fecha límite */}
        <div>
          <label className="block mb-1 text-sm font-medium">Fecha límite</label>
          <input
            type="date"
            className="input"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
          />
        </div>

        {/* Objetivos nutricionales opcionales */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 text-sm font-medium">Calorías (kcal)</label>
            <input
              type="number"
              className="input"
              value={caloriesGoal}
              onChange={(e) => setCaloriesGoal(e.target.value ? Number(e.target.value) : "")}
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">Proteínas (g)</label>
            <input
              type="number"
              className="input"
              value={proteinGoal}
              onChange={(e) => setProteinGoal(e.target.value ? Number(e.target.value) : "")}
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">Carbohidratos (g)</label>
            <input
              type="number"
              className="input"
              value={carbsGoal}
              onChange={(e) => setCarbsGoal(e.target.value ? Number(e.target.value) : "")}
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">Grasas (g)</label>
            <input
              type="number"
              className="input"
              value={fatGoal}
              onChange={(e) => setFatGoal(e.target.value ? Number(e.target.value) : "")}
            />
          </div>
        </div>

        {/* Botón */}
        <div className="pt-4">
          <Button
            variant="primary"
            className="w-full"
            onClick={handleSubmit}
            disabled={!isFormValid}
          >
            Guardar meta
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default AddGoalModal;
