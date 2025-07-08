const DecorativeBackground = () => {
  return (
    <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
      <div className="absolute top-[-200px] left-[-200px] w-[400px] h-[400px] bg-primary/10 rounded-full filter blur-3xl opacity-50 animate-pulse"></div>
      <div className="absolute bottom-[-250px] right-[-250px] w-[500px] h-[500px] bg-blue-500/10 rounded-full filter blur-3xl opacity-40 animate-pulse animation-delay-4000"></div>
    </div>
  );
};
export default DecorativeBackground; 