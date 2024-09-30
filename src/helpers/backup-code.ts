/*const handleClickDelete = async (id: string) => {
    const confirmation = window.confirm(
      "Are you sure you want to delete this exercise?"
    );

    if (confirmation) {
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
    } else {
      toast.info("Exercise deletion cancelled");
    }
  };
  
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


trashedItems as IEntity[] && trashedItems.map((item) => (
              <div
                key={item.id}
                className="card flex justify-between items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <h3 className="text-xl">Ejemplo</h3>
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


*/