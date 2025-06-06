import styled from "styled-components";
import Tag from "../../../ui/Tag";
import Table from "../../../ui/Table";
import Modal from "../../../ui/Modal";
import ConfirmDelete from "../../../ui/ConfirmDelete";
import Menus from "../../../ui/Menus";
import { HiEye, HiTrash } from "react-icons/hi2";
import Image from "next/image";
import Button from "@/app/components/ui/Button";
import { HiEyeOff, HiPencil } from "react-icons/hi";
import {
  useBlockDoctor,
  useUnblockDoctor,
  useDeleteDoctor,
  useDoctors,
} from "./useDoctor";
import EditDoctorForm from "@/app/components/features/Doctor/EditDoctorForm";
import { useDepartment } from "../../departments/parts/useDepartment";
import Spinner from "@/app/components/ui/Spinner";
import { Stack } from "@mui/material";
import { MediaUrl } from "@/app/components/services/MediaUrl";

const Stacked = styled.div`
  font-size: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 0.9rem;
  }
`;

function DoctorsRow({
  doctor: {
    _id: id,
    name,
    image,
    department,
    floor,
    room,
    availablity,
    status,
    order,
    experience,
  },
  index,
}) {
  let convertedStatus;
  const {
    data: doctorsData,
    isLoading: isDoctorsLoading,
    error,
  } = useDoctors();
    const fileName = image ? image.substring(image.lastIndexOf("/") + 1) : "";
    console.log("fileName", fileName);
  const { blockDoctor, isBlocking } = useBlockDoctor();
  const { unblockDoctor, isUnblocking } = useUnblockDoctor();
  const { deleteDoctor, isDeleting } = useDeleteDoctor();
  const { data: departmentData, isLoading: isLoadingDepartment } =
    useDepartment();

  if (isLoadingDepartment || isDoctorsLoading) return <Spinner />;

  let filteredDepartment = departmentData.filter(
    (el) => el._id === department
  )[0];

  if (status === true) {
    convertedStatus = "active";
  } else {
    convertedStatus = "inactive";
  }

  const handleToggleStatus = () => {
    if (status === true) {
      blockDoctor(id);
    } else {
      unblockDoctor(id);
    }
  };

  const statusToTagName = {
    unconfirmed: "blue",
    active: "green",
    inactive: "silver",
  };

  return (
    <Table.Row>
      <Stacked>
        <span>{order}</span>
      </Stacked>

      <Stacked>
        <span>{name}</span>
      </Stacked>

      <Stacked>
        <span>{filteredDepartment?.name}</span>
      </Stacked>

      <Stacked>
            {image ? (
              <Image src={`${MediaUrl}${fileName}`} alt={name} width={50} height={50} />
            ) : (
              <div>No Image</div>
            )}
          </Stacked>
      <Stacked>
        <span>{floor}</span>
      </Stacked>

      <Stacked>
        <span>{room}</span>
      </Stacked>

      <Stacked>
        {availablity && Object.keys(availablity).length > 0 ? (
          <span
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "4px",
            }}
          >
            {Object.entries(availablity).map(([day, type]) => (
              <Stack alignItems={"center"} key={day}>
                <Button size="small" variation="secondary">
                  {day}
                </Button>
                <span>{type}</span>
              </Stack>
            ))}
          </span>
        ) : (
          <span>No availability</span>
        )}
      </Stacked>

      <Tag type={statusToTagName[convertedStatus]}>
        {convertedStatus.replace("-", " ")}
      </Tag>

      <Modal>
        <Menus.Menu>
          <Menus.Button
            icon={status ? <HiEye /> : <HiEyeOff />}
            onClick={handleToggleStatus}
            disabled={isBlocking || isUnblocking}
          ></Menus.Button>
          <Modal.Open opens="banner-form">
            <Menus.Button icon={<HiPencil />} />
          </Modal.Open>
          <Modal.Window name="banner-form">
            <EditDoctorForm
              id={id}
              // department={filteredDepartment}
              // departmentData={departmentData}
            />
          </Modal.Window>
          <Modal.Open opens="delete">
            <Menus.Button icon={<HiTrash />}></Menus.Button>
          </Modal.Open>
        </Menus.Menu>
        <Modal.Window name="delete">
          <ConfirmDelete
            resourceName="Banner"
            disabled={isDeleting}
            onConfirm={() => deleteDoctor(id)}
            onCloseModal={() => {
              // Make sure modal closes
            }}
          />
        </Modal.Window>
      </Modal>
    </Table.Row>
  );
}

export default DoctorsRow;
