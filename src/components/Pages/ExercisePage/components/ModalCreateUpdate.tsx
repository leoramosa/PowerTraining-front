"use client";

import ButtonPrimary from "@/components/buttons/ButtonPrimary/ButtonPrimary";
import ButtonSecondary from "@/components/buttons/ButtonSecondary/ButtonSecondary";
import InputForm from "@/components/inputs/InputForm/InputForm";
import { IModalData } from "@/interface/IModalData";

const ModalCreatUpdate: React.FC<IModalData> = ({
  isSubmitting,
  typeModal,
  nameModal,
  dataExercise,
  handleSubmit,
  handleChange,
  handleBlur,
  validateDisabledSubmitButton,
  closeModal,
  errors,
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h1 className="text-2xl font-semibold mb-4">{nameModal}</h1>
        <hr className="my-3"></hr>
        <form onSubmit={handleSubmit}>
          <InputForm
            label="Name"
            placeholder="Enter exercise name"
            value={dataExercise.name}
            onBlur={handleBlur}
            onChange={handleChange}
            name="name"
            error={errors.name}
          />
          <InputForm
            label="Description"
            type="textarea"
            placeholder="Enter description"
            value={dataExercise.description}
            onBlur={handleBlur}
            onChange={handleChange}
            name="description"
            error={errors.description}
          />
          <InputForm
            label="Benefits"
            placeholder="Enter benefits"
            value={dataExercise.benefits}
            onBlur={handleBlur}
            onChange={handleChange}
            name="benefits"
            error={errors.benefits}
          />
          <InputForm
            label="Tags"
            placeholder="Enter tags"
            value={dataExercise.tags}
            onBlur={handleBlur}
            onChange={handleChange}
            name="tags"
            error={errors.tags}
          />
          <InputForm
            label="Vídeo"
            placeholder="Enter upload vídeo"
            type="file"
            onBlur={handleBlur}
            onChange={handleChange}
            name="video"
            error={errors.video}
          />
          <div className="flex justify-end space-x-3">
            <div>
              <ButtonSecondary
                type="button"
                text="Cancel"
                onClick={() => {
                  closeModal(typeModal);
                }}
              />
            </div>
            <div>
              <ButtonPrimary
                type="submit"
                text={isSubmitting ? "Saving..." : "Save"}
                disabled={validateDisabledSubmitButton()}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalCreatUpdate;
