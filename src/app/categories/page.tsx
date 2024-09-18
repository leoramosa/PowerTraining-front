"use client";

import { useState } from "react";
import ContainerWeb from "@/components/containers/ContainerWeb/ContainerWeb";
import InputForm from "@/components/inputs/InputForm/InputForm";
import ItemInfo from "@/components/ItemInfo/ItemInfo";
import Badge from "@/components/badges/BadgeUser/BadgeUser";
import ButtonActions from "@/components/buttons/ButtonActions/ButtonActions";
import categoriesData from "@/data/categories.json";

interface Category {
  id: number;
  name: string;
}

export default function Categories() {
  const [categories, setCategories] = useState<Category[]>(categoriesData);
  const [newCategory, setNewCategory] = useState("");

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      const newCategoryObj: Category = {
        id: categories.length + 1, // Simple ID generation
        name: newCategory.trim()
      };
      setCategories([...categories, newCategoryObj]);
      setNewCategory(""); // Clear input
    }
  };

  const handleDeleteCategory = (id: number) => {
    setCategories(categories.filter(category => category.id !== id));
  };

  return (
    <main className="p-4">
      <ContainerWeb>
        <h1 className="text-2xl font-bold mb-4">Exercise Categories</h1>
        <div className="mb-4">
          <InputForm
            label="New Category"
            placeholder="Enter category name"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />
          <div className="flex justify-end mt-2">
            <ButtonActions
              status="edit" // Assuming 'edit' or other relevant status
              onClick={handleAddCategory}
              tooltip="Add new category"
            />
          </div>
        </div>
        {categories.map((category) => (
          <ItemInfo key={category.id}>
            <p>{category.name}</p>
            <Badge status="active" />
            <div className="flex">
              <ButtonActions
                status="view"
                tooltip="View details"
                onClick={() => alert(`View details for ${category.name}`)}
              />
              <ButtonActions
                status="delete"
                tooltip="Delete category"
                onClick={() => handleDeleteCategory(category.id)}
              />
            </div>
          </ItemInfo>
        ))}
      </ContainerWeb>
    </main>
  );
}
