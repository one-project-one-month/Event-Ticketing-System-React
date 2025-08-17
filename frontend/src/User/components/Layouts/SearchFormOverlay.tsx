import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const SearchFormOverlay = () => {
  const navigate = useNavigate();
  const [priceRange, setPriceRange] = useState<[number, number]>([1000, 10000]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [searchTerm, setSearchTerm] = useState("");

  // const popularSearches = [
  //   "EDM Festival",
  //   "Concert",
  //   "Workshop",
  //   "Conference",
  //   "Party",
  // ];

  const handleSearch = () => {
    const query = new URLSearchParams();

    if (searchTerm.trim()) query.set("q", searchTerm.trim());
    if (priceRange[0] > 0) query.set("minPrice", priceRange[0].toString());
    if (priceRange[1] > 0) query.set("maxPrice", priceRange[1].toString());
    if (selectedDate)
      query.set("date", selectedDate.toISOString().split("T")[0]);

    navigate(`/search?${query.toString()}`);
  };

  return (
    <div className="fixed top-4 left-1/2 z-50 w-full max-w-4xl -translate-x-1/2 space-y-6 rounded-md bg-white/10 p-6 shadow-lg backdrop-blur-md">
      <div className="flex gap-4">
        <Input
          type="search"
          placeholder="Search events and venues..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 rounded-md border border-gray-300 bg-white/20"
        />
        <Button
          onClick={handleSearch}
          className="rounded-md bg-blue-900 px-6 text-white"
        >
          Search →
        </Button>
      </div>

      <div className="flex flex-col gap-6 md:flex-row">
        <div className="flex-1 space-y-2">
          <label className="font-medium text-white">Price</label>
          <Slider
            range
            min={0}
            max={100000}
            step={100}
            value={priceRange}
            onChange={(val) => setPriceRange(val as [number, number])}
            trackStyle={[{ backgroundColor: "#3F2B96" }]}
            handleStyle={[
              { borderColor: "#3F2B96" },
              { borderColor: "#3F2B96" },
            ]}
          />
          <div className="flex justify-between text-sm text-white">
            <span>{priceRange[0]} From MMK</span>
            <span>{priceRange[1]} To MMK</span>
          </div>
        </div>

        <div className="w-64 space-y-2">
          <label className="font-medium text-white">Date</label>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            className="w-full rounded-md border border-gray-300 bg-white/20 p-2"
          />
        </div>
      </div>

      {/*<div className="space-y-2">*/}
      {/*  <label className="font-medium text-white">Popular Searches</label>*/}
      {/*  <div className="flex flex-wrap gap-2">*/}
      {/*    {popularSearches.map((search) => (*/}
      {/*      <Button*/}
      {/*        key={search}*/}
      {/*        variant="outline"*/}
      {/*        onClick={() => setSearchTerm(search)}*/}
      {/*        className="text-sm px-3 py-1 flex items-center gap-1 rounded-md"*/}
      {/*      >*/}
      {/*        {search}*/}
      {/*      </Button>*/}
      {/*    ))}*/}
      {/*  </div>*/}
      {/*</div>*/}
    </div>
  );
};

export default SearchFormOverlay;
