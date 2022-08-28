import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { SearchBarWrapper, SearchBarContent } from "./SearchBar.styles";

const SearchBar = ({
  showSearch,
  setShowSearch,
  setSearchText,
  financeData,
  setSearchedData,
  setPageNumber,
  setMaxIndex,
  filter,
}) => {
  const formatDateTime = (arg1, arg2 = "") => {
    const d = arg1.split("-");
    const t = arg2.split(":");
    const date = new Date(
      parseInt(d[0]),
      parseInt(d[1]) - 1,
      parseInt(d[2]),
      parseInt(t[0]),
      parseInt(t[1])
    );
    return date;
  };

  const [value, setValue] = useState("");

  const handleSearch = (e) => {
    const regExp = new RegExp(value, "gi");
    if (!e.keyCode === 13 && !e.key === "Enter" && !e.isTrusted === true)
      return;
    if (
      (e.keyCode === 13 && e.key === "Enter" && e.isTrusted === true) ||
      (e.type === "click" && e.isTrusted === true)
    ) {
      // all fields filter
      if (filter === "All") {
        const test = financeData.filter((object) => {
          const superString = Object.entries(object).reduce(
            (acc, curr, index, arr) => {
              console.log(arr);
              if (curr[0] === "date") {
                return acc + formatDateTime(curr[1], arr["time"]);
              }
              return acc + curr[1];
            },
            ""
          );
          if (value.includes(",")) {
            const numStr = new RegExp(value.split(",").join(""), "gi");
            return numStr.test(superString);
          }
          return regExp.test(superString);
        });
        console.log(regExp);
        setSearchText(value);
        setSearchedData(test);
        setShowSearch(true);
        setPageNumber(1);
        setMaxIndex(1 * 10);
        return;
      }

      const filteredData = financeData.filter((data) => {
        // statementId filter
        if (filter.split(" ").join("") === "statementId") {
          return regExp.test(data["statement_id"]);
        }

        // amountInFigures filter
        if (
          filter.split(" ").join("") === "AmountInFigures" &&
          value.includes(",")
        ) {
          const numRegExp = new RegExp(value.split(",").join(""), "gi");

          return numRegExp.test(data[filter.split(" ").join("")]);
        }

        // date filter
        if (filter === "date") {
          const dateRegExp = new RegExp(value.split(",").join(""), "gi");

          return dateRegExp.test(formatDateTime(data["date"], data["time"]));
        }

        // other fields
        return regExp.test(data[filter.split(" ").join("")]);
      });
      setSearchText(value);
      setSearchedData(filteredData);
      setShowSearch(true);
      setPageNumber(1);
      setMaxIndex(1 * 10);
    }
  };
  const cancelSearch = (value) => {
    if (value === "") {
      setPageNumber(1);
      setMaxIndex(1 * 10);
      setShowSearch(false);
    }
  };

  useEffect(() => {
    !showSearch && setValue("");
  }, [showSearch]);

  return (
    <SearchBarWrapper>
      <SearchBarContent>
        <span className="button-holder" onClick={handleSearch}>
          <FaSearch />
        </span>
        <input
          type="search"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            cancelSearch(e.target.value);
          }}
          onKeyDown={handleSearch}
          placeholder="Search"
        />
        <div className="underline"></div>
      </SearchBarContent>
    </SearchBarWrapper>
  );
};

export default SearchBar;
