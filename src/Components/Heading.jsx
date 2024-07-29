const Heading = ({ children }) => {
  return (
    <h1 className="font-sans font-bold flex flex-row justify-center items-center mx-4 mt-4 text-xl sm:mx-8 sm:mt-6 sm:text-2xl md:mx-24 md:mt-6 md:text-2xl">
      {children}
    </h1>
  );
};

export default Heading;
