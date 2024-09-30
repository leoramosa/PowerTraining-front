"use client";
import ContainerWeb from "@/components/containers/ContainerWeb/ContainerWeb";
import TitleH1 from "@/components/titles/TitleH1";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { toast } from "sonner";
import { getExercisesDB, modifyStatusExerciseById } from "@/helpers/exercises-helper";
import { calculateTotalPages, initialState } from "@/helpers/exercises-utils";
import { IExercise } from "@/interface/IExercise";
import { IUser } from "@/interface/IUsers";
import Pagination from "@/components/pagination/Pagination";
import ExerciseCardTrash from "@/components/CardExerciseTrash/CardExerciseTrash";
import showGenericAlert from "@/components/alert/alert";

interface ICategory {
  id: string;
  name: string;
}

const TrashPage: React.FC = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [trashedItems, setTrashedItems] = useState<IExercise[] | IUser[]>([]);
  const [limit, setLimit] = useState<number>(5);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const fetchCategories = async () => {
    const exampleCategories: ICategory[] = [
      {
        id: "1",
        name: "Exercises"
      },
      {
        id: "2",
        name: "Users"
      },
    ];
    setCategories(exampleCategories);
  };

  const fetchExercises = async () => {
    try {
      const filters = {
        status: "trash"
      };
      const response = await getExercisesDB(limit, currentPage, filters);
      setTotalPages(calculateTotalPages(response.count, limit));
      setTrashedItems(response.data);
      console.log("list")
    } catch (error) {
      toast.error("Error fetching exercises, please try again.");
    }
  };

  useEffect(() => {
    fetchExercises();
    setLimit(5);
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchExercises();
    fetchCategories();
  }, [limit, currentPage]);

  useEffect(() => {}, [trashedItems]);

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedId = event.target.value;
    setSelectedCategory(selectedId);

    if (selectedId) {
      const category = categories.find((cat) => cat.id === selectedId);
      if (category) {
        console.log(category);
        if (category.name == "Exercises") {
          fetchExercises();
          console.log(trashedItems);
        } else {
          setTrashedItems([]);
        }
      } else {
        setTrashedItems([]);
      }
    } else {
      setTrashedItems([]);
    }
  };

  const handleRecover = async (id: string) => {
    console.log(`Recovered: ${id}`);
    await showGenericAlert({
      title: 'Are you sure?',
      text: 'Do you really want to recover this exercise?',
      icon: 'info',
      buttons: [
        {
          text: 'Confirm',
          action: async () => {
            const toastId = toast.loading("Recover exercise..."); // Muestra el toast de carga
  
            try {
              await modifyStatusExerciseById(id, "active")
              setCurrentPage(1); 
              fetchExercises(); 
  
              // Muestra el toast de éxito
              toast.success("Exercise recovered successfully", { id: toastId });
            } catch (error) {
              // Muestra el toast de error en caso de que falle la eliminación
              toast.error("An error occurred while recover the exercise. Please try again.", { id: toastId });
            }
          },
          isConfirm: true, 
        },
        {
          text: 'Cancel',
          action: () => {
            toast.info("Exercise recover cancelled"); 
          },
          isConfirm: false, 
        },
      ],
    });
  };

  const handleDelete = async (id: string) => {
    console.log(`Deleted: ${id}`);
    await showGenericAlert({
      title: 'Are you sure?',
      text: 'Do you really want to delete this exercise?',
      icon: 'warning',
      buttons: [
        {
          text: 'Confirm',
          action: async () => {
            const toastId = toast.loading("Deleting exercise..."); // Muestra el toast de carga
  
            try {
              await modifyStatusExerciseById(id, "inactive")
              setCurrentPage(1); 
              fetchExercises(); 
  
              // Muestra el toast de éxito
              toast.success("Exercise deleting successfully", { id: toastId });
            } catch (error) {
              // Muestra el toast de error en caso de que falle la eliminación
              toast.error("An error occurred while deleting the exercise. Please try again.", { id: toastId });
            }
          },
          isConfirm: true, 
        },
        {
          text: 'Cancel',
          action: () => {
            toast.info("Exercise deleting cancelled"); 
          },
          isConfirm: false, 
        },
      ],
    });
  };

  const isExercise = (item: IExercise | IUser): item is IExercise => {
    return (item as IExercise).description !== undefined;
  };

  return (
    <ContainerWeb>
      <div className="mx-3 min-h-[300px] h-auto">
        <TitleH1>
          <FontAwesomeIcon icon={faTrash} /> Recycle Bin
        </TitleH1>

        <label
          htmlFor="categories"
          className="block mb-2 text-lg font-semibold"
        >
          Select a category
        </label>
        <select
          id="categories"
          onChange={handleCategoryChange}
          value={selectedCategory}
          className="block w-full p-2 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="" disabled>Select a category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>

        {selectedCategory && trashedItems.length > 0 ? (
          <div className="trashed-items space-y-4">
            { trashedItems.length > 0 && trashedItems[0].id && <h2 className="text-2xl font-semibold text-left text-gray-800">
              Items in Trash
            </h2>}
            {trashedItems.map((item, i: number) => {
              if (isExercise(item) && item.description && item.id) {
                return (
                  <ExerciseCardTrash
                    key={item.id}
                    index={
                      currentPage === 1
                        ? i + 1
                        : (currentPage - 1) * limit + (i + 1)
                    }
                    idExercise={item.id}
                    exercise={item.name}
                    videoUrl={item.urlVideoExample}
                    description={item.description}
                    benefits={item.benefits}
                    tags={[item.tags]}
                    handleDelete={()=>handleDelete(item.id)}
                    handleRecover={()=>handleRecover(item.id)}
                  />
                );
              }
              return null;
            })}
            { trashedItems.length > 0 && trashedItems[0].id &&
              <Pagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPages={totalPages}
            /> }
            { trashedItems.length > 0 && !trashedItems[0].id && <p className="mt-4 text-lg text-gray-600">
              There are no items in the trash for this category.
            </p>}
          </div>
        ) : (
          selectedCategory && (
            <p className="mt-4 text-lg text-gray-600">
              There are no items in the trash for this category.
            </p>
          )
        )}
      </div>
    </ContainerWeb>
  );
};

export default TrashPage;
