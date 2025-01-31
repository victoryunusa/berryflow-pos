const Wallet = () => {
  return (
    <>
      <div className="flex flex-col space-y-5 md:space-y-10 font-br">
        <div className="flex flex-row justify-between items-center">
          <div className="">
            <h3 className="text-lg font-bold text-gray-700">Wallet</h3>
            {/* <p className="text-xs text-neutral-400">
              List of all menu product items
            </p> */}
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between gap-5 md:gap-10 w-full h-44">
          <div className="flex flex-col border bg-white p-5 rounded-lg w-full md:w-1/2 gap-2">
            <div className="flex flex-col gap-5">
              <p className="text-base text-neutral-400">My balance</p>
              <h1 className="text-5xl font-bold text-tt_rich_black">
                100,000.00
              </h1>
            </div>
            <div className="flex flex-row gap-1 items-baseline">
              <p className="text-base text-neutral-400">Ledger Balance:</p>
              <h1 className="text-xl font-bold text-neutral-500">100,000.00</h1>
            </div>
          </div>
          <div className="flex flex-col border bg-white p-5 rounded-lg gap-5 w-full md:w-1/2">
            <div className="flex flex-row gap-5 items-baseline">
              <p className="text-base text-neutral-400">Bank:</p>
              <h1 className="text-xl font-bold text-neutral-500">
                Providus Bank
              </h1>
            </div>
            <div className="flex flex-row gap-5 items-baseline">
              <p className="text-base text-neutral-400">Account number:</p>
              <h1 className="text-xl font-bold text-neutral-500">6500576375</h1>
            </div>
            <div className="flex flex-row gap-5 items-baseline">
              <p className="text-base text-neutral-400">Account name:</p>
              <h1 className="text-xl font-bold text-neutral-500">
                Truetab Restaurant
              </h1>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-between gap-5 w-full border p-5 rounded-lg bg-white">
          <div className="flex flex-row gap-1 items-baseline">
            <p className="text-base text-neutral-600 font-semibold">
              Recent transactions
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Wallet;
