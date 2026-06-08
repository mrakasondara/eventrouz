export const FeaturedCard = () => {
  return (
    <div className="flex hover:-translate-[3px] flex-col border-2 shadow-[3px_4px_0px_0px_#091413] hover:shadow-[5px_7px_0px_0px_#091413] relative cursor-pointer">
      <img
        src="https://images8.alphacoders.com/135/thumb-1920-1355047.png"
        alt=""
        className="h-60 object-fit"
      />
      <span className="absolute text-sm right-0 bg-white p-2 font-semibold border-2 bt-0">
        12-15 Feb 2025
      </span>
      <div className="flex justify-between">
        <h4 className="p-3 text-lg font-bold w-full bg-white">Konser Musik</h4>
        <p className="bg-[#091413] text-white font-semibold p-3">Rp.15K</p>
      </div>
    </div>
  );
};
