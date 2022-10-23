import Badge from "./Badge";

import Search from "./Search";
import { useMemo, useState } from "react";
import usePolicies from "data/usePolicies";
import Select from "./Select";
import { InsuranceType, PolicyStatus } from "types";

const Table = () => {
  const [searchValue, setSearchValue] = useState("");
  const [selectType, setSelectType] = useState<InsuranceType | "">("");
  const [selectStatus, setSelectStatus] = useState<PolicyStatus | "">("");
  const { policies, isFetching } = usePolicies(searchValue);

  const shownPolicies = useMemo(() => {
    if (!policies.length) {
      return [];
    }
    let result = policies;

    if (selectType) {
      result = result.filter((entry) => entry.insuranceType === selectType);
    }
    if (selectStatus) {
      result = result.filter((entry) => entry.status === selectStatus);
    }

    return result;
  }, [policies, selectType, selectStatus]);

  return (
    <div className="flex flex-col">
      <Search
        name="search"
        label="Search"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <div className="flex flex-row space-x-4">
        <Select<InsuranceType>
          name="insuranceType"
          value={selectType}
          label="Insurance Type"
          onChange={(e) => setSelectType(e.target.value)}
          options={[
            ["", "Select value"],
            ["HEALTH", "Health"],
            ["HOUSEHOLD", "Household"],
            ["LIABILITY", "Liability"],
          ]}
        />
        <Select<PolicyStatus>
          name="policyStatus"
          value={selectStatus}
          label="Policy Status"
          onChange={(e) => setSelectStatus(e.target.value)}
          options={[
            ["", "Select value"],
            ["ACTIVE", "Active"],
            ["PENDING", "Pending"],
          ]}
        />
      </div>
      <div className="flex flex-row ">
        <button
          className="rounded-lg p-2 border-solid border-slate-50 border-2"
          type="button"
          onClick={() => {
            setSearchValue("");
            setSelectStatus("");
            setSelectType("");
          }}
        >
          Clear filters
        </button>
      </div>
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-lg shadow-sm">
            {isFetching ? (
              <div className="flex justify-center items-center">
                <div className="animate-spin border-t border-r border-gray-400 p-4 m-2 rounded-full" />
              </div>
            ) : shownPolicies.length ? (
              <table className="min-w-full">
                <thead className="border-b bg-gray-100">
                  <tr>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      #
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      Provider
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      Type
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {shownPolicies.map((result, i) => (
                    <tr className="border-b" key={result.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {i + 1}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {`${result.customer.firstName} ${result.customer.lastName}`}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {result.provider}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        {result.insuranceType}
                      </td>
                      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                        <Badge status={result.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No results</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
