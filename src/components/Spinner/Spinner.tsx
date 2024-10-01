const Spinner = () => {
    return (
    <div className="flex justify-center items-center h-screen">
      <div className="relative w-32 h-32">
        <div className="absolute inset-0 rounded-full border-8 border-gray-200"></div>
        <div className="absolute inset-0 rounded-full border-8 border-primary animate-pulse"></div>
      </div>
    </div>
    );
  };
  
  export default Spinner;
  