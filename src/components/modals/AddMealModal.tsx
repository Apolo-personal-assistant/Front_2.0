import React, { useState } from "react";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (meal: {
    meal_type: string;
    datetime: string;
    raw_text?: string;
    feedback?: string;
    calories?: number;
  }) => void;
}

const AddMealModal: React.FC<Props> = ({ isOpen, onClose, onSave }) => {
  const [mealType, setMealType] = useState("");
  const [rawText, setRawText] = useState("");
  const [date, setDate] = useState("");
  const [calories, setCalories] = useState("");

  const handleSubmit = () => {
    if (!mealType || !rawText || !date) return;

    // ✅ Combina fecha seleccionada + hora actual
    const currentTime = new Date();
    const datetimeWithTime = new Date(`${date}T${currentTime.toTimeString().slice(0, 8)}`).toISOString();

    onSave({
      meal_type: mealType,
      datetime: datetimeWithTime,
      raw_text: rawText,
      feedback: "",
      calories: calories ? parseInt(calories) : undefined,
    });

    setMealType("");
    setRawText("");
    setDate("");
    setCalories("");
    onClose();
  };

  const isFormValid = mealType && rawText && date;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Agregar comida">
      <div className="space-y-4">
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
            Tipo de comida
          </label>
          <input
            type="text"
            placeholder="Ej. Almuerzo"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm focus:ring-2 focus:ring-primary focus:outline-none"
            value={mealType}
            onChange={(e) => setMealType(e.target.value)}
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
            Descripción
          </label>
          <textarea
            placeholder="Ej. Pollo con arroz y ensalada"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm resize-none focus:ring-2 focus:ring-primary focus:outline-none"
            rows={3}
            value={rawText}
            onChange={(e) => setRawText(e.target.value)}
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
            Fecha
          </label>
          <input
            type="date"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm focus:ring-2 focus:ring-primary focus:outline-none"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
            Calorías estimadas
          </label>
          <input
            type="number"
            min={0}
            placeholder="Ej. 600"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm focus:ring-2 focus:ring-primary focus:outline-none"
            value={calories}
            onChange={(e) => setCalories(e.target.value)}
          />
        </div>

        <div className="pt-4">
          <Button
            variant="primary"
            className="w-full"
            onClick={handleSubmit}
            disabled={!isFormValid}
          >
            Guardar comida
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default AddMealModal;
