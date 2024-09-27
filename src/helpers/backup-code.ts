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
*/