"use client";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { AiFillInstagram } from "react-icons/ai";
import { Box, Button, Divider, IconButton, Stack, Typography } from "@mui/material";
import { IoIosArrowDown } from "react-icons/io";
import logo from "./assets/logo.png";
import nabh from "./assets/nabh.png";
import Image from "next/image";
import { SearchInput } from "@/app/styledComponents/frontend/Inputs";
import {
  ButtonMediumOutline,
  DarkGreenButton,
  DarkGreenButtonSmall,
  DarkGreenButtonSmallOutline,
} from "@/app/styledComponents/frontend/Buttons";
import { FaPhone } from "react-icons/fa6";
import { IoIosMail } from "react-icons/io";
import { SlArrowRight, SlMagnifier } from "react-icons/sl";
import { useEffect, useRef, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { useNavbar } from "../../admin/navbar/useNavbar";
import Spinner from "../../ui/Spinner";
import { useDepartment } from "../../admin/departments/parts/useDepartment";
import { useDoctors } from "../../admin/doctors/parts/useDoctor";
import { useRouter } from "next/navigation";
import Modal from "../../ui/Modal";
import { FaLanguage } from "react-icons/fa";
import { RiMenu3Fill } from "react-icons/ri";



const navLinks = [
  { id: 0, name: "About Us", link: "about" },
  { id: 0, name: "Centre Of Excellence", link: "centre-of-excellence" },
  { id: 0, name: "Patient Care & Service", link: "patients" },
  { id: 0, name: "Appointment", link: "appointment" },
  { id: 0, name: "Academics", link: "academics/academics-deanery" },
  { id: 0, name: "Donation", link: "support-a-cause" },
  { id: 0, name: "Contact Us", link: "contact-us" },
  { id: 0, name: "Nursing college" },
];

export default function Navbar() {
   const handleMailClick = () => {
     window.location.href = "mailto:info@sdmh.in";
   };
  const router = useRouter();
  const { data: navData, isLoading, error } = useNavbar();
  const { data: departmentData, isLoading: isDepartmentLoading } =
    useDepartment();
  const { data: doctorsData, isLoading: isLoadingDoctors } = useDoctors();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  // State to capture the search input for doctor filtering
  const [searchTerm, setSearchTerm] = useState("");
 const widgetRef = useRef(null);
 const [loaded, setLoaded] = useState(false);
   const [showSearch, setShowSearch] = useState(false);
const [activeMobileItem, setActiveMobileItem] = useState(null);

 useEffect(() => {
   // Define init globally
   window.googleTranslateElementInit = () => {
     new window.google.translate.TranslateElement(
       {
         pageLanguage: "en",
         includedLanguages:
           "as,bn,brx,doi,gu,hi,kn,ks,gom,mai,ml,mni,mr,ne,or,pa,sa,sat,sd,ta,te,ur",

         layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
         autoDisplay: false,
       },
       "google_translate_element"
     );
     setLoaded(true);
   };

   // Add script
   const script = document.createElement("script");
   script.src =
     "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
   script.async = true;
   document.body.appendChild(script);
 }, []);

 const triggerDropdown = () => {
   const iframe = document.querySelector("iframe.goog-te-menu-frame");
   if (iframe) {
     const innerDoc = iframe.contentDocument || iframe.contentWindow.document;
     const firstLangOption = innerDoc.querySelector(".goog-te-menu2-item span");
     firstLangOption?.click(); // triggers dropdown
   } else {
     // fallback: click the container
     widgetRef.current?.querySelector("span")?.click();
   }
 };

  const filteredData =
    departmentData
      ?.filter((el) => el.status === true)
      .sort((a, b) => a.name.localeCompare(b.name)) || [];

  if (isLoading || isDepartmentLoading || isLoadingDoctors) return <Spinner />;
  if (error) return <div>Error loading Navbar: {error.message}</div>;

  const filteredDoctors =
    searchTerm.length >= 2
      ? doctorsData.filter((doc) =>
          doc.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : [];

  return (
    <Modal>
      <Stack
        direction={"row"}
        justifyContent={{ xs: "end", smm: "end", lg: "space-between" }}
        alignItems={{ xs: "end", smm: "end", lg: "center" }}
        backgroundColor={"#005900"}
        color={"white"}
        p={{ xs: "0 0 0 40px", smm: "0 60px", lg: "0 100px" }}
        py={{ xs: "10px" }}
      >
        <Stack
          direction={"row"}
          gap={"10px"}
          sx={{ display: { sm: "none", lg: "flex" } }}
        >
          <a
            href={"https://www.facebook.com/santokbadurlabhji?mibextid=ZbWKwL"}
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none" }}
          >
            <FaFacebookF style={{ color: "white" }} />
          </a>
          <a
            href={"https://youtube.com/@SDMHCARE"}
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none" }}
          >
            <FaYoutube style={{ color: "white" }} />
          </a>
          <a
            href={
              "https://in.linkedin.com/company/santokba-durlabhji-memorial-hospital-jaipur"
            }
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none" }}
          >
            <FaLinkedinIn style={{ color: "white" }} />
          </a>
          <a
            href={"https://www.instagram.com/sdmhjaipur?igsh=OHVvMGFhd3hwMjBy"}
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none" }}
          >
            <AiFillInstagram style={{ color: "white" }} />
          </a>
        </Stack>
        <Stack
          direction={"row"}
          gap={{ lg: "25px", sm: "10px" }}
          alignItems={"center"}
        >
          <Typography
            sx={{
              display: { sm: "none", lg: "flex" },
              "&:hover": {
                // color: "black",
                cursor: "pointer",
              },
            }}
            onClick={() => {
              router.push(`/second-opinion`);
            }}
          >
            Second Opinion
          </Typography>
          <Typography
            sx={{ display: { sm: "none", lg: "flex" }, cursor: "pointer" }}
            onClick={() => {
              router.push(`https://labreports.sdmh.in/patientlogin/`);
            }}
          >
            Lab Reports
          </Typography>
          {/* <Box
            display={"flex"}
            direction={"row"}
            gap={"25px"}
            justifyContent={{ xs: "flex-end", sm: "flex-start" }}
          >
            <Stack direction={"row"} alignItems={"center"} gap={"5px"}>
              <div
                id="google_translate_element"
                style={{ backgroundColor: "black" }}
              ></div>
            </Stack>
          </Box> */}
          <Box
            position="relative"
            sx={{ display: { sm: "flex", lg: "none" } }}
            alignItems={"center"}
          >
            {/* Toggle between icon and input */}
            {!showSearch ? (
              <Stack direction="row" alignItems="center" gap={1}>
                <IconButton onClick={() => setShowSearch(true)}>
                  <SlMagnifier style={{ color: "white", fontSize: 20 }} />
                </IconButton>
              </Stack>
            ) : (
              <Stack direction="row">
                <input
                  type="text"
                  placeholder="Search Doctor"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    padding: "6px 0 6px 12px",
                    borderRadius: "10px 0 0 10px",
                    border: "1px solid #ccc",
                    outline: "none",
                  }}
                />
                <button
                  style={{
                    borderRadius: "0 10px 10px 0",
                    backgroundColor: "#1e441e",
                    color: "white",
                    border: "none",
                    padding: "6px 10px",
                  }}
                >
                  <SlArrowRight style={{ width: "15px", height: "15px" }} />
                </button>
              </Stack>
            )}

            {/* Dropdown */}
            {showSearch && searchTerm.length >= 2 && (
              <Stack
                position="absolute"
                top="100%"
                left={0}
                bgcolor="white"
                padding={3}
                maxHeight="32rem"
                overflowY="auto"
                boxShadow={1}
                zIndex={1000}
                borderRadius="5px"
                flexWrap={"wrap"}
                columnGap={2}
                sx={{
                  opacity: 1,
                  transform: "translateY(0)",
                  transition: "opacity 0.3s ease, transform 0.3s ease",
                  pointerEvents: "auto",
                  width: "max-content",
                  minWidth: "100%",
                  maxWidth: "max-content",
                }}
              >
                {filteredDoctors.map((doc) => (
                  <Box
                    key={doc._id}
                    p={1}
                    borderBottom="1px solid #ccc"
                    sx={{ cursor: "pointer" }}
                    onClick={() => {
                      router.push(`/find-a-doctor/${doc._id}`);
                      setSearchTerm("");
                      setShowSearch(false);
                    }}
                  >
                    <Typography
                      sx={{
                        textTransform: "capitalize",
                        width: "200px",
                        color: "black",
                        fontSize: "0.9rem",
                        whiteSpace: "normal",
                        wordWrap: "break-word",
                        overflowWrap: "break-word",
                        "&:hover": {
                          color: "green",
                          cursor: "pointer",
                        },
                      }}
                    >
                      {doc.name}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            )}
          </Box>
          <Box display="flex" alignItems="center" gap="8px">
            {/* Language icon trigger */}
            <IconButton onClick={triggerDropdown}>
              <FaLanguage style={{ color: "white", fontSize: 24 }} />
            </IconButton>

            {/* Hidden Google Widget */}
            <Box
              id="google_translate_element"
              ref={widgetRef}
              sx={{
                position: "absolute",
                top: 50,
                left: 20,
                visibility: "hidden",
              }}
            />
          </Box>
          <Stack
            sx={{ display: { sm: "flex", lg: "none" } }}
            direction={"row"}
            gap={"10px"}
          >
            <Box
              component="img"
              src={nabh.src}
              alt=""
              sx={{
                width: "50px",
                height: "50px",
              }}
            />
          </Stack>
        </Stack>
      </Stack>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        paddingX={{ xs: "40px", smm: "60px", lg: "20px", xl: "100px" }}
        paddingY={"10px"}
        sx={{
          borderBottom: "1.5px solid #5F5F5F",
        }}
      >
        <a href="/" style={{ textDecoration: "none", color: "black" }}>
          <Box
            component="img"
            src={logo.src}
            alt=""
            sx={{
              width: {
                xs: "43%",
                smm: "150px",
                md: "195px",
                lg: "170px",
                xl: "185px",
              },
              // height: {
              //   xs: "38px",
              //   smm: "55px",
              //   md: "73px",
              //   lg: "65px",
              //   xl: "84px",
              // },
            }}
          />
        </a>
        <Stack
          direction={"row"}
          gap={"20px"}
          sx={{ display: { xs: "none", lg: "flex" } }}
          alignItems={"center"}
        >
          {/* <Box textAlign="center" maxWidth="33%">
            <Typography color="error" fontWeight="600" fontSize="0.8rem">
              Book Appointment <br /> For Teleconsultation <br />
              Or Call On- 70731-11811
            </Typography>
          </Box> */}
          <DarkGreenButtonSmallOutline padding="5px 5px">
            <span style={{ color: "red" }}>Book Appointment</span>
            <FaPhone style={{ width: "15px", height: "25px" }} /> 70731-11911
          </DarkGreenButtonSmallOutline>
          <Box position="relative">
            <Stack direction="row">
              <SearchInput
                placeholder="Search Doctor"
                borderRadius="10px 0 0 10px"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <DarkGreenButtonSmall borderRadius="0 10px 10px 0">
                <SlArrowRight style={{ width: "15px", height: "15px" }} />
              </DarkGreenButtonSmall>
            </Stack>

            {/** Search Doctor Dropdown */}
            {searchTerm.length >= 2 && (
              <Stack
                position="absolute"
                top="100%"
                left={0}
                bgcolor="white"
                padding={3}
                maxHeight="32rem"
                overflowY="auto"
                boxShadow={1}
                zIndex={1000}
                borderRadius="5px"
                flexWrap={"wrap"}
                columnGap={2}
                sx={{
                  opacity: searchTerm ? 1 : 0,
                  transform: searchTerm ? "translateY(0)" : "translateY(-10px)",
                  transition: "opacity 0.3s ease, transform 0.3s ease",
                  pointerEvents: searchTerm ? "auto" : "none",
                  width: "max-content",
                  minWidth: "100%",
                  maxWidth: "max-content",
                }}
              >
                {filteredDoctors.map((doc) => (
                  <Box
                    key={doc._id}
                    p={1}
                    borderBottom="1px solid #ccc"
                    sx={{
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      router.push(`/find-a-doctor/${doc._id}`);
                      setSearchTerm("");
                    }}
                  >
                    <Typography
                      sx={{
                        textTransform: "capitalize",
                        width: "200px",
                        color: "black",
                        fontSize: "0.9rem",
                        whiteSpace: "normal",
                        wordWrap: "break-word",
                        overflowWrap: "break-word",
                        "&:hover": {
                          color: "green",
                          cursor: "pointer",
                        },
                      }}
                    >
                      {doc.name}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            )}
          </Box>

          <DarkGreenButtonSmallOutline padding="5px 5px">
            <span style={{ color: "red" }}>Emergency Number</span>
            <FaPhone style={{ width: "15px", height: "25px" }} /> 0141 352 4444
          </DarkGreenButtonSmallOutline>
          <DarkGreenButtonSmallOutline
            padding="5px 5px"
            onClick={handleMailClick}
          >
            <IoIosMail style={{ width: "20px", height: "25px" }} href="" />{" "}
            info@sdmh.in
          </DarkGreenButtonSmallOutline>

          <Box
            component="img"
            src={nabh.src}
            alt=""
            sx={{
              width: { xs: "102px", smm: "150px", md: "47px" },
              height: { xs: "38px", smm: "55px", md: "47px" },
            }}
          />
        </Stack>
        <IconButton
          size="large"
          sx={{ display: { xs: "flex", lg: "none" } }}
          onClick={() => setIsMenuOpen((prev) => !prev)}
        >
          <RiMenu3Fill style={{ color: "#005900" }} />
        </IconButton>
      </Stack>
      {/* Mobile Navbar */}
      {isMenuOpen && (
        <Stack
          direction="column"
          py={2}
          gap={1}
          sx={{ display: { lg: "none" } }}
        >
          {navData.map((el, i) => (
            <Box
              key={i}
              onClick={() => setOpenDropdown((prev) => (prev === i ? null : i))}
              // onMouseEnter={() => setOpenDropdown(i)}
              // onMouseLeave={() => setOpenDropdown(null)}
            >
              <Stack
                direction="row"
                alignItems="center"
                sx={{ cursor: "pointer" }}
                bgcolor={openDropdown === i ? "#50a65f" : "white"}
                color={openDropdown === i ? "white" : "black"}
                padding={"9px"}
                justifyContent={"space-between"}
              >
                {el.name === "Appointment" ? (
                  <Modal.Open opens="appointment">
                    <Typography
                      sx={{ "&:hover": { color: "green", cursor: "pointer" } }}
                    >
                      {el.name}
                    </Typography>
                  </Modal.Open>
                ) : (
                  <a
                    key={el._id}
                    href={el.link}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <Typography
                      color={openDropdown === i ? "white" : "black"}
                      // sx={{ "&:hover": { color: "green", cursor: "pointer" } }}
                    >
                      {el.name}
                    </Typography>
                  </a>
                )}
                {(el.items.length > 0 ||
                  el.name === "Centre Of Excellence") && (
                  <IoIosArrowDown
                    style={{
                      transform:
                        openDropdown === i ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 0.3s ease",
                    }}
                  />
                )}
              </Stack>
              {(el.items.length > 0 || el.name === "Centre Of Excellence") &&
                openDropdown === i && (
                  <Stack
                    bgcolor="white"
                    height={"250px"}
                    overflow={"scroll"}
                    p={"10px 20px"}
                    spacing={0.5}
                    boxShadow={1}
                  >
                    {el.name === "Centre Of Excellence"
                      ? filteredData.map((dept) => (
                          <a
                            key={dept._id}
                            href={`/centre-of-excellence/${dept._id}`}
                            style={{ textDecoration: "none", color: "black" }}
                          >
                            <Typography
                              sx={{
                                "&:hover": {
                                  color: "green",
                                  cursor: "pointer",
                                },
                              }}
                            >
                              {dept.name}
                            </Typography>
                          </a>
                        ))
                      : el.items.map((subItem) => (
                          <a
                            key={subItem._id}
                            href={subItem.itemLink}
                            style={{ textDecoration: "none", color: "black" }}
                          >
                            <Typography
                              sx={{
                                "&:hover": {
                                  color: "green",
                                  cursor: "pointer",
                                },
                              }}
                            >
                              {subItem.itemName}
                            </Typography>
                          </a>
                        ))}
                  </Stack>
                )}
            </Box>
          ))}
        </Stack>
      )}

      {/* Desktop Navbar */}
      <Stack
        direction="row"
        padding={{ lg: "15px" }}
        justifyContent="center"
        alignItems="center"
      >
        <Stack
          direction="row"
          gap="25px"
          sx={{ display: { xs: "none", lg: "flex" } }}
        >
          {navData?.map((el, i) =>
            el.name === "Second Opinion" ? null : (
              <Box
                key={i}
                position="relative"
                onMouseEnter={() => setOpenDropdown(i)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Stack
                  direction="row"
                  alignItems="center"
                  sx={{ cursor: "pointer" }}
                >
                  {el.name === "Appointment" ? (
                    <Modal.Open opens="appointment">
                      <Typography
                        sx={{
                          fontSize: { xs: "12px", xl: "1rem" },
                          "&:hover": { color: "green", cursor: "pointer" },
                        }}
                      >
                        {el.name}
                      </Typography>
                    </Modal.Open>
                  ) : (
                    <a
                      key={el._id}
                      href={el.link}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <Typography
                        sx={{
                          fontSize: { xs: "12px", xl: "1rem" },
                          "&:hover": { color: "green", cursor: "pointer" },
                        }}
                      >
                        {el.name}
                      </Typography>
                    </a>
                  )}
                  {(el.items.length > 0 ||
                    el.name === "Centre Of Excellence") && (
                    <IoIosArrowDown
                      style={{
                        transform:
                          openDropdown === i
                            ? "rotate(180deg)"
                            : "rotate(0deg)",
                        transition: "transform 0.3s ease",
                      }}
                    />
                  )}
                </Stack>

                {(el.items.length > 0 ||
                  el.name === "Centre Of Excellence") && (
                  <Stack
                    position="absolute"
                    bgcolor="white"
                    padding={3}
                    width="max-content"
                    maxHeight="32rem"
                    flexWrap="wrap"
                    columnGap="2.5rem"
                    rowGap="0.6rem"
                    sx={{
                      zIndex: 10,
                      opacity: openDropdown === i ? 1 : 0,
                      transform:
                        openDropdown === i
                          ? "translateY(0)"
                          : "translateY(-10px)",
                      transition: "opacity 0.3s ease, transform 0.3s ease",
                      pointerEvents: openDropdown === i ? "auto" : "none",
                      borderRadius: "5px",
                    }}
                  >
                    {el.name === "Centre Of Excellence"
                      ? filteredData.map((department) => (
                          <a
                            key={department._id}
                            href={`/centre-of-excellence/${department._id}`}
                            style={{ textDecoration: "none", color: "black" }}
                          >
                            <Typography
                              sx={{
                                fontSize: "0.9rem",
                                maxWidth: "200px",
                                wordWrap: "break-word",
                                "&:hover": {
                                  color: "green",
                                  cursor: "pointer",
                                },
                              }}
                            >
                              {department.name}
                            </Typography>
                          </a>
                        ))
                      : el.items.map((subItem) => (
                          <a
                            key={subItem._id}
                            href={subItem.itemLink}
                            style={{ textDecoration: "none", color: "black" }}
                          >
                            <Typography
                              sx={{
                                fontSize: "0.9rem",
                                "&:hover": {
                                  color: "green",
                                  cursor: "pointer",
                                },
                              }}
                            >
                              {subItem.itemName}
                            </Typography>
                          </a>
                        ))}
                  </Stack>
                )}
              </Box>
            )
          )}
        </Stack>
      </Stack>
      <Box
        sx={{ display: { sm: "flex", lg: "none" }, backgroundColor: "#f9f9f9" }}
        justifyContent="space-between"
        alignItems="center"
        borderTop="1px solid #ddd"
        borderBottom="1px solid #ddd"
        padding="5px"
      >
        {/* LEFT SECTION */}
        <Box textAlign="center" maxWidth="33%">
          <Typography color="error" fontWeight="600" fontSize="0.8rem">
            Book Appointment 70731-11911
          </Typography>
        </Box>

        {/* CENTER - BUTTON */}
        <Divider orientation="vertical" flexItem sx={{ mx: 1.1 }} />
        <Box textAlign="center">
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#285a1c",
              borderRadius: "10px",
              px: 3,
              py: 1,
              textTransform: "none",
              fontWeight: "bold",
              fontSize: "0.8rem",
              "&:hover": {
                backgroundColor: "#1e4414",
              },
            }}
          >
            Lab <br /> Reports
          </Button>
        </Box>

        {/* RIGHT SECTION */}
        <Divider orientation="vertical" flexItem sx={{ mx: 1.1 }} />
        <Box textAlign="center" maxWidth="33%">
          <Typography color="error" fontWeight="500" fontSize="0.7rem">
            Emergency Number
          </Typography>
          <Typography color="error" fontWeight="700" fontSize="0.8rem">
            0141-352-4444
          </Typography>
          <Typography fontWeight="500" fontSize="0.7rem" color="black">
            info@sdmh.in
          </Typography>
        </Box>
      </Box>

      <Modal.Window name="appointment">
        <div>
          <Typography textAlign={"center"} fontSize={"2rem"} color="green">
            Book an Appointment
          </Typography>
          <Typography textAlign={"center"}>
            Appointments can currently be booked by calling 7073111911 between
            7:00 AM and 4:00 PM. This service allows patients or their
            attendants to choose a preferred time slot for consultation with the
            doctor.
          </Typography>
          <Typography textAlign={"center"} marginTop={2}>
            <b>Please note:</b> Appointment slots are subject to availability.
            If a preferred slot is not available, patients will be attended
            through the regular OPD system.
          </Typography>
        </div>
      </Modal.Window>
    </Modal>
  );
}
