"use client";
import ButtonActions from "@/components/buttons/ButtonActions/ButtonActions";
import ButtonPrimary from "@/components/buttons/ButtonPrimary";
import ContainerWeb from "@/components/containers/ContainerWeb/ContainerWeb";
import InputForm from "@/components/inputs/InputForm/InputForm";
import ItemInfo from "@/components/ItemInfo/ItemInfo";
import TitleH1 from "@/components/titles/TitleH1";
import { getExerciseById } from "@/helpers/exercises-helper";
import { IExercise } from "@/interface/IExercise";
import { ExercisePageProps } from "@/interface/IExercisePageProps";
import { useState } from "react";

const ExercisePage: React.FC<ExercisePageProps> = ( {exercises} ) => {
    console.log(exercises);

    const [isModalOpenCreate, setIsModalOpenCreate] = useState(false);
    const [isModalOpenModify, setIsModalOpenModify] = useState(false);
    const [dataExercise, setDataExercise] = useState<IExercise>({
        id: null,
        name: "",
        description: "",
        urlVideoExample: "",
        benefits: "",
        tags: ""
    });

    const fetchData = async (id?: number) => {
        const exercise: IExercise = await getExerciseById(id);
        console.log(exercise);
        setDataExercise(exercise);
      };

    const openModal = (type: string, id?: number) => {
        if(type=="create"){
            setIsModalOpenCreate(true);
        } else {
            fetchData(id)
            setIsModalOpenModify(true);
        }   
    };
  
    const closeModal = (type: string) => {
        if(type=="create"){
            setIsModalOpenCreate(false);
        } else {
            setIsModalOpenModify(false);
        }   
    };

  return (
    <main className="">
      <ContainerWeb className="">
        <div className="flex justify-between mb-4"> 
            <TitleH1>Exercises</TitleH1>
            <ButtonPrimary text="New exercise" onClick={()=> {openModal("create")}}  />
        </div>
        

         {/* Modal create */}
         {isModalOpenCreate && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <h2 className="text-xl font-bold mb-4">New Exercise</h2>
              <form>
                <InputForm label="Name" placeholder="Enter exercise name" />
                <InputForm label="Vídeo url" placeholder="Enter video URL" />
                <InputForm label="Description" placeholder="Enter description" />
                <InputForm label="Benefits" placeholder="Enter benefits" />
                <div className="flex justify-end">
                  <button
                    type="button"
                    className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                    onClick={()=> {closeModal("create")}}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-primary hover:bg-primaryLight text-white px-4 py-2 rounded"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal modify */}
        {isModalOpenModify && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <h2 className="text-xl font-bold mb-4">Edit Exercise</h2>
              <form>
                <InputForm label="Name" placeholder="Enter exercise name" value={dataExercise.name}/>
                <InputForm label="Vídeo url" placeholder="Enter video URL"  value={dataExercise.urlvideo}/>
                <InputForm label="Description" placeholder="Enter description"  value={dataExercise.descr}/>
                <InputForm label="Benefits" placeholder="Enter benefits" value={dataExercise.benefits}/>
                <div className="flex justify-end">
                  <button
                    type="button"
                    className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                    onClick={()=> {closeModal("modify")}}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-primary hover:bg-primaryLight text-white px-4 py-2 rounded"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}


        {/* List of exercises */}
        {
            exercises.length > 0 && exercises.map((exercise)=>{
                return (
                    <ItemInfo key={exercise.id} className="flex">
                        <div>#{exercise.id}</div>
                        <div className="flex justify-start space-x-10 px-4 items-center">
                            <div><p>{exercise.name}</p></div>
                            <div><p>Url: <a href="#">{exercise.urlvideo}</a></p></div>
                            <div><p>{exercise.descr}</p></div>
                        </div>
                        
                        <div className="flex">
                            <ButtonActions status="edit" size="md" tooltip="Edit exercise" onClick={()=> {openModal("modify", exercise.id ? exercise.id : undefined)}} />
                            <ButtonActions status="delete" size="md" tooltip="Delete exercise" />
                        </div>
                    </ItemInfo>
                )
            })
        }
      </ContainerWeb>
    </main>
  );
}

export default ExercisePage;
