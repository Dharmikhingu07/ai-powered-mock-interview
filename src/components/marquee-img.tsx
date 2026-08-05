export const MarqueImg = ({ img }: { img: string }) => {
  return (
    <div className="mx-12 xl:mx-20 flex items-center justify-center">
      <img
        src={img}
        className="w-28 h-28 xl:w-32 xl:h-32 object-contain opacity-50 hover:opacity-80 transition-all duration-300 grayscale hover:grayscale-0"
        alt=""
      />
    </div>
  );
};
