"use client";
import ContainerWeb from "@/components/containers/ContainerWeb/ContainerWeb";
import TitleH1 from "@/components/titles/TitleH1";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faUndo } from "@fortawesome/free-solid-svg-icons";
import ButtonOk from "@/components/buttons/ButtonOk/ButtonOk";
import ButtonNoOk from "@/components/buttons/ButtonNoOk/ButtonNoOk";

interface IEntity {
  id: string;
  title: string;
}

interface ICategory {
  id: string;
  name: string;
  entities: IEntity[];
}

const TrashPage: React.FC = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [trashedItems, setTrashedItems] = useState<IEntity[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const exampleCategories: ICategory[] = [
        {
          id: "1",
          name: "Exercises",
          entities: [
            { id: "e1", title: "Exercise 1" },
            { id: "e2", title: "Exercise 2" },
            { id: "e3", title: "Exercise 3" },
            { id: "e4", title: "Exercise 4" },
          ],
        },
        {
          id: "2",
          name: "Users",
          entities: [
            { id: "u1", title: "User 1" },
            { id: "u2", title: "User 2" },
            { id: "u3", title: "User 3" },
            { id: "u4", title: "User 4" },
          ],
        },
        {
          id: "3",
          name: "Routines",
          entities: [
            { id: "r1", title: "Routine 1" },
            { id: "r2", title: "Routine 2" },
            { id: "r3", title: "Routine 3" },
            { id: "r3", title: "Routine 4" },
          ],
        },
      ];
      setCategories(exampleCategories);
    };

    fetchCategories();
  }, []);

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const categoryId = event.target.value;
    setSelectedCategory(categoryId);

    const selectedCategory = categories.find((cat) => cat.id === categoryId);
    if (selectedCategory) {
      setTrashedItems(selectedCategory.entities);
    } else {
      setTrashedItems([]);
    }
  };

  const handleRecover = (id: string) => {
    const updatedItems = trashedItems.filter((item) => item.id !== id);
    setTrashedItems(updatedItems);
    // Recuperar el elemento en el backend
    console.log(`Recuperado: ${id}`);
  };

  const handleDelete = (id: string) => {
    const updatedItems = trashedItems.filter((item) => item.id !== id);
    setTrashedItems(updatedItems);
    // Recuperar el elemento en el backend
    console.log(`Recuperado: ${id}`);
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
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>

        {trashedItems.length > 0 ? (
          <div className="trashed-items space-y-4">
            <h2 className="text-2xl font-semibold text-left text-gray-800">
                Items in Trash
            </h2>
            {trashedItems.map((item) => (
              <div
                key={item.id}
                className="card flex justify-between items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <h3 className="text-xl">{item.title}</h3>
                <div className="flex justify-between items-end">
                  <ButtonOk
                    type="button"
                    text="Recover"
                    onClick={() => handleRecover(item.id)}
                    icon={
                      <FontAwesomeIcon icon={faUndo} className="text-white" />
                    }
                  />
                  <ButtonNoOk
                    type="button"
                    text="Delete"
                    onClick={() => handleDelete(item.id)}
                    icon={
                      <FontAwesomeIcon icon={faTrash} className="text-white" />
                    }
                  />
                </div>
              </div>
            ))}
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
