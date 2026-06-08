export const TicketCard = () => {
  return (
    <div className="hidden -rotate-3 md:flex flex-col border-2 gap-2 w-70 p-3 absolute md:-bottom-5 lg:-bottom-20 md:right-5 lg:right-0 z-10 bg-magenta -translate-y-1.25 hover:translate-1.75 hover:shadow-none shadow-[7px_7px_0px_0px_#323232] transition-all">
      <div className="flex flex-col">
        <h3 className="text-sm">Music Concert</h3>
        <h4 className="text-lg uppercase font-grotesk font-semibold">
          End Year Music Concert
        </h4>
      </div>

      <div className="flex flex-col text-xs font-grotesk gap-1">
        <p>Regular Ticket</p>
        <p>#412*****</p>
        <p className="font-semibold">20.03.2026</p>
      </div>

      <img
        src="https://images8.alphacoders.com/135/thumb-1920-1355047.png"
        className="h-30 object-fit border-2"
      />
    </div>
  );
};
