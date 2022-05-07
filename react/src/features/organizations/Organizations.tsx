/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useMemo } from "react";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  selectOrganizations,
  updateField,
  getOrganizationsAsync,
  selectIdOrganization,
  selectSelectedId,
  updateOrganizationAsync,
  createOrganizationAsync
} from "./organizationsSlice";

const OrganizationForm = () => {
  const organizations = useAppSelector(selectOrganizations);
  const selectedId = useAppSelector(selectSelectedId);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getOrganizationsAsync());
  }, []);
  const selectedOrganization = useMemo(() => {
    const selectedOrg = organizations.find((item) => item.id === selectedId);
    if (selectedOrg) {
      return selectedOrg;
    } else {
      return {
        id: 0,
        name: "",
        code: "",
        address: "",
        contactName: "",
        contactInfo: "",
      };
    }
  }, [selectedId, organizations]);
  const handleChange = (key: string) => (event: any) => {
    dispatch(updateField({ value: event.target.value, key, id: selectedId }));
  };

  const handleSubmit = (event: any) => {
    console.log(event.target.value)
    if(selectedOrganization.id !== 0) {
      dispatch(updateOrganizationAsync(selectedOrganization));
    } else if(selectedOrganization.id === 0){
      dispatch(createOrganizationAsync(selectedOrganization));
    }
    event.preventDefault();
  };
  const onSelect = (e: any) => {
    dispatch(selectIdOrganization(Number(e.target.value)));
  };
  return (
    <div>
      <select onChange={onSelect} value={selectedOrganization["id"]}>
        <option value={0}>New Item</option>
        {organizations.map((item, index) => (
          <option key={index} value={item.id}>{item.name}</option>
        ))}
      </select>
      <form onSubmit={handleSubmit}>
        <div>
          <div>
          <label>
            Name:
            <input
              type="text"
              value={selectedOrganization["name"]}
              onChange={handleChange("name")}
            />
          </label>
          </div>
          <div>
          <label>
            Code:
            <input
              type="text"
              value={selectedOrganization["code"]}
              onChange={handleChange("code")}
            />
          </label>
          </div>
          <div>
          <label>
            Address:
            <input
              type="text"
              value={selectedOrganization["address"]}
              onChange={handleChange("address")}
            />
          </label>
          </div>
          <div>
          <label>
            Contact Name:
            <input
              type="text"
              value={selectedOrganization["contactName"]}
              onChange={handleChange("contactName")}
            />
          </label>
          </div>
          <div>
          <label>
            Contact Info:
            <input
              type="text"
              value={selectedOrganization["contactInfo"]}
              onChange={handleChange("contactInfo")}
            />
          </label>
          </div>
        </div>
        {selectedOrganization.id !== 0 && <input type="submit" value="Update" />}
        {selectedOrganization.id === 0 && <input type="submit" value="Create" />}
      </form>
    </div>
  );
};

export default OrganizationForm;
