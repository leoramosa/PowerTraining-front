"use client";
import ButtonPrimary from "@/components/buttons/ButtonPrimary/ButtonPrimary";
import ExerciseCard from "@/components/cardExercise/CardExercise";
import ContainerWeb from "@/components/containers/ContainerWeb/ContainerWeb";
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
import {
  validateExerciseForm,
  validateFieldOnBlur,
} from "@/helpers/exercises-validate";
import {
  ExerciseFieldKeys,
  IExerciseFormError,
} from "@/interface/IExerciseFormError";
import ItemInfo from "@/components/ItemInfo/ItemInfo";
import ModalCreateUpdate from "./components/ModalCreateUpdate";
import { toast } from "sonner";

const ExercisePage: React.FC<IExerciseData> = ({ data, count }) => {
  //console.log(data);

  const initialState: IExercise = {
    id: "",
    name: "",
    description: "",
    urlVideoExample: "",
    video: new File([], ""),
    benefits: "",
    tags: "",
  };

  const initialStateError: IExerciseFormError = {
    name: "",
    description: "",
    urlVideoExample: "",
    video: "",
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
  const [errors, setErrors] = useState<IExerciseFormError>(initialStateError);
  const [createOrUpdateItem, setCreateOrUpdateItem] = useState<boolean>(false);
  const [filters, setFilters] =
    useState<IFiltersExercises>(filterInitialValues);
  const [isSubmitting, setIsSubmitting] = useState(false);

  //###### Function request api
  const fetchData = async (id?: string) => {
    const exercise: IExercise = await getExerciseById(id);
    console.log(exercise);
    setDataExercise(exercise);
  };

  useEffect(() => {}, [dataExercise, listExercises, createOrUpdateItem]);

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await getExercisesDB(limit, currentPage, filters);
        setTotalPages(calculateTotalPages(response.count, limit));
        setListExercises(response.data);
      } catch (error) {
        toast.error("Error fetching exercises, please try again.");
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
    /*setCurrentPage(1);
    if (searchSelect && searchValue) {
      setFilters({ [searchSelect]: searchValue });
    } else {
      setFilters(filterInitialValues);
    }*/
    setCurrentPage(1);

    // Mensajes de Sonner con toast.promise
    toast.promise(
      new Promise(async (resolve, reject) => {
        try {
          if (searchSelect && searchValue) {
            setFilters({ [searchSelect]: searchValue });
          } else {
            setFilters(filterInitialValues);
          }

          const response = await getExercisesDB(limit, currentPage, filters);
          setTotalPages(calculateTotalPages(response.count, limit));
          setListExercises(response.data);

          resolve("Exercises fetched successfully!");
        } catch (error) {
          reject("Error fetching exercises, please try again.");
        }
      }),
      {
        loading: "Searching for exercises...",
        success: (msg) => String(msg),
        error: (msg) => String(msg),
      }
    );
  };

  const optionsSearch = [
    { label: "Find by name", value: "name" },
    { label: "Find by benefits", value: "benefits" },
    { label: "Find by tags", value: "tags" },
  ];

  //####### Handle inputs change and blur
  const handleChange = (name: ExerciseFieldKeys, value: string | File) => {
    setDataExercise((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleBlur = (name: ExerciseFieldKeys, value: string | File) => {
    const errorsOne = validateExerciseForm(errors, dataExercise);
    setErrors(errorsOne);
    const errorsTwo = validateFieldOnBlur(errors, name, value);
    setErrors(errorsTwo);
  };

  //####### Modals operations
  const openModal = (type: string, id?: string) => {
    if (type == "create") {
      setDataExercise(initialState);
      setErrors(initialStateError);
      setIsModalOpenCreate(true);
    } else {
      setErrors(initialStateError);
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
          errors.video &&
          errors.benefits &&
          errors.tags
        )
      ) {
        setIsSubmitting(true);
        const exerciseCreated: IExercise = await createExercise(dataExercise);
        const response = await getExercisesDB(limit, currentPage);
        setTotalPages(calculateTotalPages(response.count, limit));
        setListExercises(() => {
          const filteredList = response.data.filter(
            (exercise) => exercise.id !== exerciseCreated.id
          );
          return [exerciseCreated, ...filteredList];
        });
        console.log(exerciseCreated);
        setDataExercise(exerciseCreated);
        closeModal("create");
        toast.success("Exercise created successfully!");
        setIsSubmitting(false);
        setCreateOrUpdateItem(true);
        setTimeout(() => {
          setCreateOrUpdateItem(false);
          setDataExercise(initialState);
        }, 3000);
      } else {
        toast.warning(
          "Please fill out all required fields before creating the exercise."
        );
      }
    } catch (error) {
      toast.error(
        "An error occurred while creating the exercise. Please try again."
      );
    }
  };

  //####### Modify exercises
  const handleSubmitModify = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    try {
      if (
        !(
          errors.name &&
          errors.description &&
          errors.video &&
          errors.benefits &&
          errors.tags
        )
      ) {
        console.log(dataExercise);
        setIsSubmitting(true);
        const exerciseUpdate: IExercise = await modifyExerciseById(
          dataExercise
        );
        setListExercises((prevList) =>
          prevList.map((exercise) =>
            exercise.id === dataExercise.id
              ? { ...exercise, ...exerciseUpdate }
              : exercise
          )
        );
        closeModal("modify");
        toast.success("Exercise updated successfully!");
        setIsSubmitting(false);
        setCreateOrUpdateItem(true);
        setTimeout(() => {
          setCreateOrUpdateItem(false);
        }, 5000);
      } else {
        toast.warning(
          "Make sure all fields are properly filled before updating the exercise."
        );
      }
    } catch (error) {
      toast.error(
        "An error occurred while updating the exercise. Please try again."
      );
    }
  };

  //####### Delete exercises
  const handleClickDelete = async (id: string) => {
    /*try {
      await deleteExerciseById(id);
      setCurrentPage(1);
      const response = await getExercisesDB(limit, currentPage);
      setTotalPages(calculateTotalPages(response.count, limit));
      setListExercises(response.data);
    } catch (error) {
      toast.error(
        "An error occurred while updating the exercise. Please try again."
      );
    }*/
    toast.promise(
      new Promise(async (resolve, reject) => {
        try {
          await deleteExerciseById(id);
          setCurrentPage(1);
          const response = await getExercisesDB(limit, currentPage);
          setTotalPages(calculateTotalPages(response.count, limit));
          setListExercises(response.data);

          // Resolución exitosa de la promesa
          resolve("Exercise deleted successfully");
        } catch (error) {
          // Rechazar la promesa en caso de error
          reject(
            "An error occurred while deleting the exercise. Please try again."
          );
        }
      }),
      {
        loading: "Deleting exercise...",
        success: (msg) => String(msg),
        error: (msg) => String(msg),
      }
    );
  };

  //####### Pagination operations
  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };
  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const validateDisabledSubmitButton = () => {
    const hasErrors = !!(
      errors.name ||
      errors.description ||
      errors.video ||
      errors.benefits ||
      errors.tags
    );

    const isVideoValid =
      typeof dataExercise.video === "string" ||
      dataExercise.video instanceof File;

    const hasEmptyFields = !(
      dataExercise.name &&
      dataExercise.description &&
      isVideoValid &&
      dataExercise.benefits &&
      dataExercise.tags
    );

    return hasErrors || hasEmptyFields || isSubmitting;
  };

  return (
    <main className="">
      <ContainerWeb>
        <div className="ml-3">
          <TitleH1>Exercises</TitleH1>
        </div>
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
          <ModalCreateUpdate
            nameModal="New exercise"
            typeModal="create"
            dataExercise={dataExercise}
            handleSubmit={handleSubmitCreate}
            handleBlur={handleBlur}
            handleChange={handleChange}
            validateDisabledSubmitButton={validateDisabledSubmitButton}
            closeModal={closeModal}
            errors={errors}
            isSubmitting={isSubmitting}
          />
        )}

        {/* Modal modify */}
        {isModalOpenModify && (
          <ModalCreateUpdate
            nameModal="Edit exercise"
            typeModal="modify"
            dataExercise={dataExercise}
            handleSubmit={handleSubmitModify}
            handleBlur={handleBlur}
            handleChange={handleChange}
            validateDisabledSubmitButton={validateDisabledSubmitButton}
            closeModal={closeModal}
            errors={errors}
            isSubmitting={isSubmitting}
          />
        )}

        {/* List of exercises */}
        <div className="p-4 min-h-[550px]">
          {/* If not exist exercises */}
          {!listExercises ||
            (listExercises.length === 0 && (
              <ItemInfo>
                <p className="text-gray-500 font-semibold">
                  No results found. Please try with other filter.
                </p>
              </ItemInfo>
            ))}
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

        {/* Pagination */}
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
