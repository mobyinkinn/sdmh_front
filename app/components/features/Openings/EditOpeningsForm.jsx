import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";
import { Stack } from "@mui/material";
import Heading from "../../ui/Heading";
import { useState } from "react";
import Jodit from "./Jodit";

const EditOpeningsForm = ({
  resourceName,
  onConfirm,
  isUpdating,
  editData,
  setEditData,
  onCloseModal,
  jdContent,
  setJdContent,
}) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onCloseModal?.();
    onConfirm();
  };
  return (
    <form onSubmit={handleSubmit}>
      <Heading as="h3">Edit {resourceName}</Heading>
      <Stack gap={1} justifyContent={"space-around"} pt={1}>
        <Stack direction={"row"} p={"0px 24px"} gap={4}>
          <FormRow label="Position">
            <Input
              disabled={isUpdating}
              type="text"
              id="position"
              name="position"
              value={editData.position}
              onChange={handleInputChange}
            />
          </FormRow>
          <FormRow label="Category">
            <Input
              disabled={isUpdating}
              type="text"
              id="category"
              name="category"
              value={editData.category}
              onChange={handleInputChange}
            />
          </FormRow>
        </Stack>
        <Stack
          direction={"row"}
          justifyContent={"space-around"}
          p={"0px 24px"}
          gap={4}
        >
          <FormRow label="Type">
            <Input
              disabled={isUpdating}
              type="text"
              id="type"
              name="type"
              value={editData.type}
              onChange={handleInputChange}
            />
          </FormRow>
          <FormRow label="Location">
            <Input
              disabled={isUpdating}
              type="text"
              id="location"
              name="location"
              value={editData.location}
              onChange={handleInputChange}
            />
          </FormRow>
        </Stack>
        <Stack p={"0 24px"}>
          <FormRow label="JD"></FormRow>
          <Jodit content={jdContent} setContent={setJdContent} />
        </Stack>
        <FormRow>
          <Button
            variation="secondary"
            type="reset"
            onClick={() => onCloseModal?.()}
          >
            Cancel
          </Button>
          <Button disabled={isUpdating}>{"Update opening"}</Button>
        </FormRow>
      </Stack>
    </form>
  );
};

export default EditOpeningsForm;
