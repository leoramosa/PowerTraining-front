"use client";

import React, { useEffect, useState } from "react";
import RoutineWizard from "@/components/RoutineWizard/RoutineWizard";
import CardRoutineBody from "@/components/CardRoutineBody/CardRoutineBody";
import ContainerWeb from "@/components/containers/ContainerWeb/ContainerWeb";
import TitleH1 from "@/components/titles/TitleH1";
import ButtonPrimary from "@/components/buttons/ButtonPrimary/ButtonPrimary";
import RoutineWizardModify from "@/components/RoutineWizardModify/RoutineWizardModify";
import { IRoutineWizard } from "@/interface/IRoutine";
import showGenericAlert from "@/components/alert/alert";
import { toast } from "sonner";
import { useAuthStore } from "@/stores/userAuthStore";
import { useSubscriptionStore } from "@/stores/useSubscriptionStore";
import { useRouter } from "next/navigation";

const RoutinePage = () => {
  const initialStateRoutineData = {
    id: 0,
    userId: "",
    userName: "",
    userLastName: "",
    name: "",
    startDate: "",
    endDate: "",
    description: "",
  };

  const initialStateRoutine = {
    routineData: initialStateRoutineData,
    trainingDays: [],
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenMod, setIsModalOpenMod] = useState(false);
  const [routineToModify, setRoutineToModify] =
    useState<IRoutineWizard>(initialStateRoutine);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const { user, token } = useAuthStore();
  const { subscription, fetchSubscription } = useSubscriptionStore();
  const router = useRouter();

  useEffect(() => {
    if (user && token) {
      fetchSubscription(user.id, token); // Pasamos tanto el ID del usuario como el token
    }
  }, [user, token, fetchSubscription]);

  const showBlur =
    user?.role === "Admin" && subscription?.paymentStatus !== "approved";
  const closeModalx = async () => {
    await showGenericAlert({
      title: "Are you sure?",
      text: "You will lose all your information if you close the form. Do you really want to proceed?",
      icon: "warning",
      buttons: [
        {
          text: "Confirm",
          action: () => {
            setIsModalOpen(false);
            toast.info("Form closed without saving");
          },
          isConfirm: true,
        },
        {
          text: "Cancel",
          action: () => {
            toast.info("Form closure cancelled");
          },
          isConfirm: false,
        },
      ],
    });
  };

  const openModalMod = () => setIsModalOpenMod(true);
  const closeModalMod = () => setIsModalOpenMod(false);
  const closeModalModx = async () => {
    await showGenericAlert({
      title: "Are you sure?",
      text: "You will lose all your information if you close the form. Do you really want to proceed?",
      icon: "warning",
      buttons: [
        {
          text: "Confirm",
          action: () => {
            setIsModalOpenMod(false);
            toast.info("Form closed without saving");
          },
          isConfirm: true,
        },
        {
          text: "Cancel",
          action: () => {
            toast.info("Form closure cancelled");
          },
          isConfirm: false,
        },
      ],
    });
  };

  const [refreshRoutines, setRefreshRoutines] = useState(false);
  const handleRoutineCreated = () => {
    setRefreshRoutines((prev) => !prev);
  };

  useEffect(() => {
    console.log(routineToModify);
  }, [routineToModify]);

  const routineModify = (routine: IRoutineWizard) => {
    setRoutineToModify(routine);
    console.log(routine);
  };

  const handleRoutineModify = () => {
    setRefreshRoutines((prev) => !prev);
  };

  return (
    <main className=" p-5">
      <ContainerWeb className="">
        <div className="flex justify-between my-4 mt-6">
          <TitleH1>Routines</TitleH1>
          <ButtonPrimary text="New routine" onClick={openModal} />
        </div>

        {/* Modal modify */}
        {isModalOpenMod && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl relative">
              <button
                onClick={closeModalModx}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                ✖
              </button>
              {/* RoutineWizard Componente */}
              <RoutineWizardModify
                closeModal={closeModalMod}
                nameModal="Modify Routine"
                onRoutineModify={handleRoutineModify}
                routineMod={routineToModify}
              />
            </div>
          </div>
        )}

        {/* Modal create */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl relative">
              <button
                onClick={closeModalx}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                ✖
              </button>
              {/* RoutineWizard Componente */}
              <RoutineWizard
                closeModal={closeModal}
                nameModal="Create New Routine"
                onRoutineCreated={handleRoutineCreated}
              />
            </div>
          </div>
        )}

        <CardRoutineBody
          refreshRoutines={refreshRoutines}
          handleRoutineModify={routineModify}
          openModalMod={openModalMod}
        />
      </ContainerWeb>
      {showBlur && (
        <div className="absolute inset-0 flex flex-col items-center justify-center rounded-lg bg-black backdrop-blur-lg bg-opacity-70 z-20 w-full">
          <h2 className="text-white text-2xl mb-4">
            You need to subscribe first!
          </h2>
          <button
            className="bg-primary  text-black font-bold py-2 px-4 rounded"
            onClick={() => {
              router.push("/pricing");
            }}
          >
            Subscribe Now
          </button>
        </div>
      )}
    </main>
  );
};

export default RoutinePage;
