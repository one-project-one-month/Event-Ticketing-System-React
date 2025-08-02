export interface IAdminTotalCard {
  iconPath: string;
  title: string;
  count: number;
  status: number;
}

export default function AdminTotalCard({
  iconPath,
  title,
  count,
  status,
}: IAdminTotalCard) {
  return (
    <div className={`flex max-h-72 flex-row rounded-2xl bg-white p-6`}>
      {/* data */}
      <div className={`flex h-fit flex-1 flex-col gap-2`}>
        <img
          src={iconPath ?? "/icons/PurpleEventNote.svg"}
          alt="Icon"
          className={`size-10`}
        />
        <p className={`text-3xl font-bold text-[#43319A]`}>{count}</p>
        <p className={`text-xl`}>{title}</p>
      </div>
      {/* status */}
      <div className={`flex h-fit flex-row items-center gap-2`}>
        {status == 0 ? (
          <>
            <img
              src={"/icons/GrayStableArrow.svg"}
              alt="Icon"
              className={`size-6`}
            />
            <p>Stable</p>
          </>
        ) : status > 0 ? (
          <>
            <img
              src={"/icons/GreenUpArrow.svg"}
              alt="Icon"
              className={`size-6`}
            />
            <p>{status} %</p>
          </>
        ) : (
          <>
            <img
              src={"/icons/RedDownArrow.svg"}
              alt="Icon"
              className={`size-6`}
            />
            <p>{status} %</p>
          </>
        )}
      </div>
    </div>
  );
}
