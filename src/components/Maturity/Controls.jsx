import React, { useState, useEffect } from "react";

export default function Controls({
  personas2,
  setPersonas2,
  setRegions2,
  setRoles2,
  personas,
  setPersonas,
  handleFilter,
  roles,
  roles2,
  setRoles,
  regions,
  regions2,
  setRegions,
  handleClearFilters,
  filters,
  dataSet,
}) {
  return (
    <div className="z-40 sticky top-0">
      <div className="grid grid-cols-2 gap-4 bg-gray-100 border-b-2 border-t-2 border-[#0E6AAD]">
        <div className=" flex items-center ">
          <div className="basis-1/2">
            <div className="absolute top-1 ml-[23.5%] text-gray-500">
              <div className="font-bold text-sm ml-4">Filter Set 1</div>
            </div>
            <div className="flex  ml-2 flex-wrap ">
              <div className="flex items-center mx-2 ">
                <button
                  type="button"
                  className="bg-blue-400 text-white p-1 rounded-l"
                  onClick={() =>
                    handleFilter("persona", personas, setPersonas, "left")
                  }
                >
                  {"<"}
                </button>
                <div className="border bg-blue-400 p-1 text-white">
                  Personas
                </div>
                <button
                  type="button"
                  className="bg-blue-400 text-white p-1 rounded-r"
                  onClick={() =>
                    handleFilter("persona", personas, setPersonas, "right")
                  }
                >
                  {">"}
                </button>
              </div>
              <div className="flex items-center m-2">
                <button
                  type="button"
                  className="bg-blue-400 text-white p-1 rounded-l"
                  onClick={() => handleFilter("role", roles, setRoles, "left")}
                >
                  {"<"}
                </button>
                <div className="border bg-blue-400 p-1 text-white">Roles</div>
                <button
                  type="button"
                  className="bg-blue-400 text-white p-1 rounded-r"
                  onClick={() => handleFilter("role", roles, setRoles, "right")}
                >
                  {">"}
                </button>
              </div>
              <div className="flex items-center m-2">
                <button
                  type="button"
                  className="bg-blue-400 text-white p-1 rounded-l"
                  onClick={() =>
                    handleFilter("region", regions, setRegions, "left")
                  }
                >
                  {"<"}
                </button>
                <div className="border bg-blue-400 p-1 text-white">Regions</div>
                <button
                  type="button"
                  className="bg-blue-400 text-white p-1 rounded-r"
                  onClick={() =>
                    handleFilter("region", regions, setRegions, "right")
                  }
                >
                  {">"}
                </button>
              </div>
              <button
                type="button"
                className="m-2 bg-red-400 text-white p-1 rounded"
                onClick={() => handleClearFilters()}
              >
                Clear
              </button>
            </div>
          </div>

          <div className="basis-1/2 xl:mt-6">
            <div className="flex items-center text-sm h-full">
              <div className={"h-3 w-3 bg-[#FFCB18] "}></div>
              <span className="text-2xl  font-bold px-2">
                {filters.count && filters.count + " "}
              </span>
              {(filters.persona
                ? filters.persona + " Respondents "
                : "Respondents ") +
                (filters.role ? "who are " + filters.role : "") +
                (filters.region ? " from " + filters.region : "")}
            </div>
          </div>
        </div>

        <div className=" flex items-center">
          <div className="basis-1/2">
            <div className="absolute top-1 ml-[23.5%] text-gray-500">
              <div className="font-bold text-sm ml-4">Filter Set 2</div>
            </div>
            <div className="flex ml-2 flex-wrap">
              <div className="flex items-center m-2">
                <button
                  type="button"
                  className="bg-blue-400 text-white p-1 rounded-l"
                  onClick={() =>
                    handleFilter("persona2", personas2, setPersonas2, "left")
                  }
                >
                  {"<"}
                </button>
                <div className="border bg-blue-400 p-1 text-white">
                  Personas
                </div>
                <button
                  type="button"
                  className="bg-blue-400 text-white p-1 rounded-r"
                  onClick={() =>
                    handleFilter("persona2", personas2, setPersonas2, "right")
                  }
                >
                  {">"}
                </button>
              </div>
              <div className="flex items-center m-2">
                <button
                  type="button"
                  className="bg-blue-400 text-white p-1 rounded-l"
                  onClick={() =>
                    handleFilter("role2", roles2, setRoles2, "left")
                  }
                >
                  {"<"}
                </button>
                <div className="border bg-blue-400 p-1 text-white">Roles</div>
                <button
                  type="button"
                  className="bg-blue-400 text-white p-1 rounded-r"
                  onClick={() =>
                    handleFilter("role2", roles2, setRoles2, "right")
                  }
                >
                  {">"}
                </button>
              </div>
              <div className="flex items-center m-2">
                <button
                  type="button"
                  className="bg-blue-400 text-white p-1 rounded-l"
                  onClick={() =>
                    handleFilter("region2", regions2, setRegions2, "left")
                  }
                >
                  {"<"}
                </button>
                <div className="border bg-blue-400 p-1 text-white">Regions</div>
                <button
                  type="button"
                  className="bg-blue-400 text-white p-1 rounded-r"
                  onClick={() =>
                    handleFilter("region2", regions2, setRegions2, "right")
                  }
                >
                  {">"}
                </button>
              </div>
              <button
                type="button"
                className="m-2 bg-red-400 text-white p-1 rounded"
                onClick={() => handleClearFilters("2")}
              >
                Clear
              </button>
            </div>
          </div>

          <div className="basis-1/2 xl:mt-6">
            <div className="flex items-center text-sm h-full">
              <div className={"h-3 w-3 bg-[#0EA8DC] "}></div>
              <span className="text-2xl  font-bold px-2">
                {filters.count2 && filters.count2 + " "}
              </span>
              {(filters.persona2
                ? filters.persona2 + " Respondents "
                : "Respondents ") +
                (filters.role2 ? "who are " + filters.role2 : "") +
                (filters.region2 ? " from " + filters.region2 : "")}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
