// import type { FC } from "react";
// import { useNavigate } from "react-router-dom";
// import ExportDataModal from "@/Admin/components/ui/ExportModal";
// import { Input } from "@/User/components/ui/input";
// import { Button } from "@/User/components/ui/button";
// import { useState } from "react";

// interface ToolbarProps {
//   onSearch: (query: string) => void;
//   onExport: (format: 'csv' | 'pdf' | 'xlsx') => void;
//   addNewPath: string;
// }

// const Toolbar: FC<ToolbarProps> = ({ onSearch, onExport, addNewPath }) => {
//   const [query, setQuery] = useState("");
//   const [showExportModal, setShowExportModal] = useState(false);
//   const navigate = useNavigate();

//   return (
//     <div className="w-full flex items-center justify-between gap-4 p-4 bg-transparent rounded-xl">
//       <div className="flex items-center w-full max-w-md relative">
//         <img
//           src="/icons/MagnifyingGlass.svg"
//           alt="search"
//           className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5"
//         />
//         <Input
//           value={query}
//           onChange={(e) => {
//             setQuery(e.target.value);
//             onSearch(e.target.value);
//           }}
//           placeholder="Search"
//           className="pl-12 bg-[#F1F3FA] text-[#6E6B8A] font-medium text-base rounded-2xl"
//         />
//       </div>
//       <div className="flex gap-4">
//         <Button
//           onClick={() => setShowExportModal(true)}
//           className="rounded-2xl bg-[#43319A] hover:bg-[#e78e48] text-white px-6 text-base font-medium flex items-center gap-2"
//         >
//           <img src="/icons/Export.svg" alt="export" className="w-5 h-5" />
//           Export
//         </Button>
//         <Button
//           onClick={() => navigate(addNewPath)}
//           className="rounded-2xl bg-[#FC9B51] hover:bg-[#382880] text-white px-6 text-base font-medium flex items-center gap-2"
//         >
//           <img src="/icons/Plus.svg" alt="add" className="w-5 h-5" />
//           Add new
//         </Button>
//       </div>

//       <ExportDataModal
//         open={showExportModal}
//         onClose={() => setShowExportModal(false)}
//         onExport={onExport}
//       />
//     </div>
//   );
// };

// export default Toolbar;

import type { FC } from "react";
import { useNavigate } from "react-router-dom";
import ExportDataModal from "@/Admin/components/ui/ExportModal";
import { Input } from "@/User/components/ui/input";
import { Button } from "@/User/components/ui/button";
import { useState } from "react";

interface ToolbarProps {
  onSearch: (query: string) => void;
  onExport: (format: "csv" | "pdf" | "xlsx") => void;
  addNewPath: string;
  hideAddNew?: boolean;
}

const Toolbar: FC<ToolbarProps> = ({
  onSearch,
  onExport,
  addNewPath,
  hideAddNew = false,
}) => {
  const [query, setQuery] = useState("");
  const [showExportModal, setShowExportModal] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="flex w-full items-center justify-between gap-4 pt-4">
      <div className="relative flex w-[40rem] flex-row items-center justify-start">
        <img
          src="/icons/MagnifyingGlass.svg"
          alt="search"
          className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 opacity-60"
        />
        <Input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            onSearch(e.target.value);
          }}
          placeholder="Search"
          className="h-[56px] w-full rounded-[16px] border-none bg-[#EEF0FA] pl-12 text-lg font-medium text-[#6B6B6B] shadow-none placeholder:text-lg placeholder:text-[#6B6B6B]"
        />
      </div>

      <div className="flex items-center gap-10">
        <Button
          onClick={() => setShowExportModal(true)}
          className="flex h-[56px] items-center gap-2 rounded-[16px] bg-[#43319A] px-6 text-base font-semibold text-white shadow-none hover:bg-[#37257c]"
        >
          <img src="/icons/Export.svg" alt="export" className="h-5 w-5" />
          Export
        </Button>
        {!hideAddNew && (
          <Button
            onClick={() => navigate(addNewPath)}
            className="flex h-[56px] items-center gap-2 rounded-[16px] bg-[#FC9B51] px-6 text-base font-semibold text-white shadow-none hover:bg-[#e48945]"
          >
            <img src="/icons/Plus.svg" alt="add" className="h-5 w-5" />
            Add New
          </Button>
        )}
      </div>

      <ExportDataModal
        open={showExportModal}
        onClose={() => setShowExportModal(false)}
        onExport={onExport}
      />
    </div>
  );
};

export default Toolbar;
