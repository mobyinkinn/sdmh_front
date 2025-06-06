import SortBy from "../../../ui/SortBy";
import Filter from "../../../ui/Filter";
import TableOperations from "../../../ui/TableOperations";
import { useDepartmentContext } from "./DepartmentContext";
import Modal from "@/app/components/ui/Modal";
import Button from "@/app/components/ui/Button";
import CreateDepartmentForm from "@/app/components/features/Department/CreateDepartmentForm";
import styled from "styled-components";
import { useState } from "react";
import toast from "react-hot-toast";

import {
  fetchAllDepartments,
  importDepartments,
} from "@/app/components/services/api.Department";
import { useDepartment, useSetDefaultDepartment } from "./useDepartment";

const DragDropContainer = styled.div`
  border: 2px dashed #ccc;
  border-radius: 8px;
  padding: 20px;
  text-align: center;
  cursor: pointer;
  background-color: #f9f9f9;
  &:hover {
    background-color: #f1f1f1;
  }
`;

const FileName = styled.p`
  margin-top: 10px;
  font-size: 14px;
  color: #333;
`;

function DepartmentTableOperations() {
  const { filter, setFilter, sort, setSort } = useDepartmentContext();

  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleDrop = (event) => {
    event.preventDefault();
    const uploadedFile = event.dataTransfer.files[0];
    if (uploadedFile && uploadedFile.type === "text/csv") {
      setFile(uploadedFile);
      toast.success(`File ${uploadedFile.name} selected!`);
    } else {
      toast.error("Please upload a valid .csv file.");
    }
  };
  const handleUpload = async () => {
    if (!file) {
      toast.error("No file selected for upload.");
      return;
    }

    try {
      setIsUploading(true);
      importDepartments(file);
      toast.success("File uploaded successfully!");
      setFile(null);
      await fetchAllDepartments(); // Refresh table data
    } catch (error) {
      console.error("File upload failed:", error);
      toast.error("Failed to upload file.");
    } finally {
      setIsUploading(false);
    }
  };
const [selectedIndex, setSelectedIndex] = useState(null);
const { data: departments = [] } = useDepartment();
const { setDefaultDepartment, isSettingDefault } = useSetDefaultDepartment();

const handleSetDefault = () => {
  if (selectedIndex !== null) {
    setDefaultDepartment(selectedIndex);
  } else {
    toast.error("Please select a department first.");
  }
};
  return (
    <TableOperations>
      <Filter
        filterField="status"
        filter={filter}
        setFilter={setFilter}
        options={[
          { value: "All", label: "All" },
          { value: "Active", label: "Active" },
          { value: "Inactive", label: "Inactive" },
        ]}
      />

      <SortBy
        sort={sort}
        setSort={setSort}
        options={[
          { value: "startDate-desc", label: "Sort by date (recent first)" },
          { value: "startDate-asc", label: "Sort by date (earlier first)" },
          { value: "name-dsc", label: "Sort by name (Z - A)" },
          { value: "name-asc", label: "Sort by name (A - Z)" },
        ]}
      />
      <Modal>
        <Modal.Open opens="set-default">
          <Button variation="primary" size="medium">
            Set Default
          </Button>
        </Modal.Open>
        <Modal.Window name="set-default">
          <>
            <h3 style={{ marginBottom: "1rem" }}>
              Select Department to Set as Default
            </h3>
            <select
              value={selectedIndex ?? ""}
              onChange={(e) => setSelectedIndex(Number(e.target.value))}
              style={{ width: "100%", padding: "10px", marginBottom: "1rem" }}
            >
              <option value="" disabled>
                Select a department
              </option>
              {departments.map((dept, idx) => (
                <option key={dept._id} value={idx}>
                  {dept.name}
                </option>
              ))}
            </select>
            <Button
              variation="primary"
              size="medium"
              onClick={handleSetDefault}
              disabled={selectedIndex === null || isSettingDefault}
            >
              {isSettingDefault ? "Setting..." : "Set Default"}
            </Button>
          </>
        </Modal.Window>
      </Modal>
      <Modal>
        <Modal.Open opens="import-form">
          <Button variation="primary" size="medium">
            Import Departments
          </Button>
        </Modal.Open>
        <Modal.Window name="import-form">
          <>
            <>
              <DragDropContainer
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
              >
                <p>Drag and drop your CSV file here</p>
                <p>or</p>
                <input
                  type="file"
                  accept=".csv"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ marginTop: "10px" }}
                />
              </DragDropContainer>
              {file && <FileName>Selected file: {file.name}</FileName>}
            </>
            <Button
              variation="primary"
              size="medium"
              onClick={handleUpload}
              disabled={isUploading}
              style={{ marginTop: "15px" }}
            >
              {isUploading ? "Uploading..." : "Upload"}
            </Button>
          </>
        </Modal.Window>
      </Modal>

      <Modal>
        <Modal.Open opens="department-form">
          <Button>Add Department</Button>
        </Modal.Open>
        <Modal.Window name="department-form">
          <CreateDepartmentForm />
        </Modal.Window>
      </Modal>
    </TableOperations>
  );
}

export default DepartmentTableOperations;
