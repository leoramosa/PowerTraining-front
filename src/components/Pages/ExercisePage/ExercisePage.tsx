"use client";
import ButtonPrimary from "@/components/buttons/ButtonPrimary/ButtonPrimary";
import ButtonSecondary from "@/components/buttons/ButtonSecondary/ButtonSecondary";
import ExerciseCard from "@/components/cardExercise/CardExercise";
import ContainerWeb from "@/components/containers/ContainerWeb/ContainerWeb";
import InputForm from "@/components/inputs/InputForm/InputForm";
import SearchInput from "@/components/search/SearchInput";
import TitleH1 from "@/components/titles/TitleH1";
import {
  createExercise,
  deleteExerciseById,
  getExerciseById,
  getExercisesDB,
  modifyExerciseById,
} from "@/helpers/exercises-helper";
import { IExercise } from "@/interface/IExercise";
import IExerciseData from "@/interface/IExerciseData";
import { useEffect, useState } from "react";
import { IFiltersExercises } from "@/interface/IPagDataFilters";
import { validateExerciseForm } from "@/helpers/exercises-validate";
import { IExerciseFormError } from "@/interface/IExerciseFormError";

const ExercisePage: React.FC<IExerciseData> = ({ data, count }) => {
  //console.log(data);

  const initialState = {
    id: "",
    name: "",
    description: "",
    urlVideoExample: "",
    benefits: "",
    tags: "",
  };

  const calculateTotalPages = (count: number, limit: number) => {
    const totalPages = Math.ceil(count / limit);
    return totalPages;
  };

  const filterInitialValues: IFiltersExercises = {
    name: "",
    benefits: "",
    tags: "",
  };

  const [listExercises, setListExercises] = useState<IExercise[]>(data);
  const [isModalOpenCreate, setIsModalOpenCreate] = useState<boolean>(false);
  const [isModalOpenModify, setIsModalOpenModify] = useState<boolean>(false);
  const [dataExercise, setDataExercise] = useState<IExercise>(initialState);
  const [searchValue, setSearchValue] = useState<string>("");
  const [searchSelect, setSearchSelect] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(5);
  const [totalPages, setTotalPages] = useState<number>(
    calculateTotalPages(count, limit)
  );
  const [errors, setErrors] = useState<IExerciseFormError>(initialState);
  const [createOrUpdateItem, setCreateOrUpdateItem] = useState<boolean>(false);
  const [filters, setFilters] =
    useState<IFiltersExercises>(filterInitialValues);

  //###### Function request api
  const fetchData = async (id?: string) => {
    const exercise: IExercise = await getExerciseById(id);
    console.log(exercise);
    setDataExercise(exercise);
  };

  useEffect(() => {
    const errors = validateExerciseForm(dataExercise);
    setErrors(errors);
  }, [dataExercise]);

  useEffect(() => {}, [listExercises, createOrUpdateItem]);

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await getExercisesDB(limit, currentPage, filters);
        setTotalPages(calculateTotalPages(response.count, limit));
        setListExercises(response.data);
      } catch (error) {
        console.error("Error fetching exercises:", error);
      }
    };
    fetchExercises();
  }, [currentPage, limit, filters]);

  //####### Handle Search
  const handleInputSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setSearchValue(newValue);
  };
  const handleSelectSearchChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newValue = e.target.value;
    setSearchSelect(newValue);
  };
  const handleClickSearch = async () => {
    if (searchSelect && searchValue) {
      setFilters((prevFilters) => {
        return {
          ...prevFilters,
          [searchSelect]: searchValue,
        };
      });
    } else {
      setCurrentPage(1);
      setFilters(filterInitialValues);
    }
  };
  const optionsSearch = [
    { label: "Find by name", value: "name" },
    { label: "Find by benefits", value: "benefits" },
    { label: "Find by tags", value: "tags" },
  ];

  //####### Handle inputs change
  const handleChange = (name: string, value: string) => {
    setDataExercise((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //####### Modals operations
  const openModal = (type: string, id?: string) => {
    if (type == "create") {
      setDataExercise(initialState);
      setIsModalOpenCreate(true);
    } else {
      fetchData(id);
      setIsModalOpenModify(true);
    }
  };
  const closeModal = (type: string) => {
    if (type == "create") {
      setIsModalOpenCreate(false);
    } else {
      setIsModalOpenModify(false);
    }
  };

  //####### Create exercises
  const handleSubmitCreate = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    try {
      if (
        !(
          errors.name &&
          errors.description &&
          errors.urlVideoExample &&
          errors.benefits &&
          errors.tags
        )
      ) {
        const exerciseCreated: IExercise = await createExercise(dataExercise);
        const response = await getExercisesDB(limit, currentPage);
        setTotalPages(calculateTotalPages(response.count, limit));
        setListExercises(() => {
          const filteredList = response.data.filter(
            (exercise) => exercise.id !== exerciseCreated.id
          );
          return [exerciseCreated, ...filteredList];
        });
        setDataExercise(exerciseCreated);
        closeModal("create");
        setCreateOrUpdateItem(true);
        setTimeout(() => {
          setCreateOrUpdateItem(false);
          setDataExercise(initialState);
        }, 5000);
      } else {
        alert("The form has errors. Please, complete.");
      }
    } catch (error) {
      console.error("Error creating exercise:", error);
    }
  };

  //####### Modify exercises
  const handleSubmitModify = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    try {
      console.log(dataExercise);
      const exerciseUpdate: IExercise = await modifyExerciseById(dataExercise);
      setListExercises((prevList) =>
        prevList.map((exercise) =>
          exercise.id === dataExercise.id
            ? { ...exercise, ...exerciseUpdate }
            : exercise
        )
      );
      closeModal("modify");
      setCreateOrUpdateItem(true);
      setTimeout(() => {
        setCreateOrUpdateItem(false);
      }, 5000);
    } catch (error) {
      console.error("Error modify exercise:", error);
    }
  };

  //####### Delete exercises
  const handleClickDelete = async (id: string) => {
    try {
      await deleteExerciseById(id);
      setCurrentPage(1);
      const response = await getExercisesDB(limit, currentPage);
      setTotalPages(calculateTotalPages(response.count, limit));
      setListExercises(response.data);
    } catch (error) {
      console.error("Error delete exercise:", error);
    }
  };

  //####### Pagination operations
  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };
  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };


  const validateDisabledSubmitButton = () => {
    const hasErrors = !!(errors.name || 
      errors.description || 
      errors.urlVideoExample || 
      errors.benefits || 
      errors.tags);
    
    const hasEmptyFields = !(
      dataExercise.name && 
      dataExercise.description && 
      dataExercise.urlVideoExample && 
      dataExercise.benefits && 
      dataExercise.tags
    );
  
    return hasErrors || hasEmptyFields;
  }

  return (
    <main className="">
      <ContainerWeb>
        <TitleH1>Exercises</TitleH1>
        <div className="flex justify-between mx-3.5 my-4 mt-6">
          <SearchInput
            value={searchValue}
            placeholder="Type a word here"
            onClick={handleClickSearch}
            options={optionsSearch}
            onChangeInput={handleInputSearchChange}
            onChangeSelect={handleSelectSearchChange}
          />
          <ButtonPrimary
            text="New exercise"
            onClick={() => {
              openModal("create");
            }}
          />
        </div>
        {/* Modal create */}
        {isModalOpenCreate && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <h2 className="text-xl font-bold mb-4">New exercise</h2>
              <form onSubmit={handleSubmitCreate}>
                <InputForm
                  label="Name"
                  placeholder="Enter exercise name"
                  value={dataExercise.name}
                  onChange={handleChange}
                  name="name"
                  error={errors.name}
                />
                <InputForm
                  label="Description"
                  type="textarea"
                  placeholder="Enter description"
                  value={dataExercise.description}
                  onChange={handleChange}
                  name="description"
                  error={errors.description}
                />
                <InputForm
                  label="Vídeo url"
                  placeholder="Enter video URL"
                  value={dataExercise.urlVideoExample}
                  onChange={handleChange}
                  name="urlVideoExample"
                  error={errors.urlVideoExample}
                />
                <InputForm
                  label="Benefits"
                  placeholder="Enter benefits"
                  value={dataExercise.benefits}
                  onChange={handleChange}
                  name="benefits"
                  error={errors.benefits}
                />
                <InputForm
                  label="Tags"
                  placeholder="Enter tags"
                  value={dataExercise.tags}
                  onChange={handleChange}
                  name="tags"
                  error={errors.tags}
                />
                <div className="flex justify-end space-x-3">
                  <div>
                    <ButtonSecondary
                      type="button"
                      text="Cancel"
                      onClick={() => {
                        closeModal("create");
                      }}
                    />
                  </div>
                  <div>
                    <ButtonPrimary
                      type="submit"
                      text="Save"
                      disabled={validateDisabledSubmitButton()}
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal modify */}
        {isModalOpenModify && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <h2 className="text-xl font-bold mb-4">Edit exercise</h2>
              <form onSubmit={handleSubmitModify}>
                <InputForm
                  label="Name"
                  placeholder="Enter exercise name"
                  value={dataExercise.name}
                  onChange={handleChange}
                  name="name"
                  error={errors.name}
                />
                <InputForm
                  label="Description"
                  type="textarea"
                  placeholder="Enter description"
                  value={dataExercise.description}
                  onChange={handleChange}
                  name="description"
                  error={errors.description}
                />
                <InputForm
                  label="Vídeo url"
                  placeholder="Enter video URL"
                  value={dataExercise.urlVideoExample}
                  onChange={handleChange}
                  name="urlVideoExample"
                  error={errors.urlVideoExample}
                />
                <InputForm
                  label="Benefits"
                  placeholder="Enter benefits"
                  value={dataExercise.benefits}
                  onChange={handleChange}
                  name="benefits"
                  error={errors.benefits}
                />
                <InputForm
                  label="Tags"
                  placeholder="Enter tags"
                  value={dataExercise.tags}
                  onChange={handleChange}
                  name="tags"
                  error={errors.tags}
                />
                <div className="flex justify-end space-x-3">
                  <div>
                    <ButtonSecondary
                      type="button"
                      text="Cancel"
                      onClick={() => {
                        closeModal("modify");
                      }}
                    />
                  </div>
                  <div>
                    <ButtonPrimary
                      type="submit"
                      text="Save"
                      disabled={validateDisabledSubmitButton()}
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* List of exercises */}
        <div className="p-4 min-h-[550px]">
          {listExercises.length > 0 &&
            listExercises.map((exercise, i) => {
              return (
                <ExerciseCard
                  key={exercise.id}
                  index={
                    currentPage === 1
                      ? i + 1
                      : (currentPage - 1) * limit + (i + 1)
                  }
                  exercise={exercise.name}
                  videoUrl={exercise.urlVideoExample}
                  description={exercise.description}
                  benefits={exercise.benefits}
                  tags={[exercise.tags]}
                  onClickEdit={() => {
                    openModal("modify", exercise.id ? exercise.id : undefined);
                  }}
                  onClickDelete={() => {
                    handleClickDelete(exercise.id);
                  }}
                  isCreateOrUpdate={
                    dataExercise.id != null &&
                    dataExercise.id == exercise.id &&
                    createOrUpdateItem
                  }
                />
              );
            })}
        </div>
        {listExercises.length > 0 && (
          <div className="flex justify-center items-center mt-4">
            <ButtonPrimary
              type="button"
              text="Previous"
              onClick={handlePrevPage}
              disabled={currentPage === 1}
            />
            <span className="font-semibold">Page {currentPage}</span>
            <ButtonPrimary
              type="button"
              text="Next"
              onClick={handleNextPage}
              disabled={currentPage == totalPages}
            />
          </div>
        )}
      </ContainerWeb>
    </main>
  );
};

export default ExercisePage;
