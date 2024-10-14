import { TrainingDayFormProps } from "@/interface/IRoutine";
import React, { useEffect, useState } from "react";
import InputForm from "../inputs/InputForm/InputForm";
import SelectForm from "../inputs/SelectForm/SelectForm";
import ButtonPrimary from "../buttons/ButtonPrimary/ButtonPrimary";
import TitleH2 from "../titles/TitleH2";

const TrainingDayForm: React.FC<TrainingDayFormProps> = ({ onAddDay, selectedDays }) => {
  const [dayNumber, setDayNumber] = useState<number>(1);
  const [muscleGroup, setMuscleGroup] = useState<string>("");

  const findFirstAvailableDay = () => {
    for (let i = 1; i <= 7; i++) {
      if (!selectedDays.includes(i)) {
        return i; 
      }
    }
    return 1; 
  };

  useEffect(() => {
    const nextAvailableDay = findFirstAvailableDay();
    setDayNumber(nextAvailableDay);
  }, [selectedDays]); 

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (muscleGroup.trim() === "") {
      alert("Please enter a valid muscle group.");
      return;
    }

    onAddDay({ dayNumber, muscleGroup, exercises: [] });
    setMuscleGroup(""); 
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border rounded-md p-2 space-y-2 my-2"
    >
      <TitleH2># Step 2: Add Training Days</TitleH2>
      <div className="flex justify-between items-end space-x-2">
        <div className="w-full pb-3">
        <SelectForm
            name="dayNumber"
            label="Day Number"
            value={dayNumber}
            onChange={(_, value) => setDayNumber(Number(value))} 
            options={Array.from({ length: 7 }, (_, index) => ({
              label: `Day ${index + 1}`,
              value: index + 1,
              disabled: selectedDays.includes(index + 1),
            }))}
          />
        </div>
        <div className="w-full">
          <InputForm
            label="Muscle Group"
            placeholder="e.g., Chest, Legs, Back"
            type="text2"
            value={muscleGroup}
            onChangeText2={(_, value: string) => setMuscleGroup(value)}
            name="muscleGroup"
          />
        </div>
        <div className="w-full py-3">
          <ButtonPrimary type="submit" text="Add Day" disabled={!muscleGroup}/>
        </div>
      </div>
    </form>
  );
};

export default TrainingDayForm;

