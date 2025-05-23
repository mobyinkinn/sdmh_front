// "use client";

// import { InnerContainerHead } from "@/app/styledComponents/admin/AdminHead";
// import {
//   BlueButtonSmall,
//   GreenButtonSmall,
// } from "@/app/styledComponents/admin/Buttons";
// import {
//   InnerContainer,
//   InnerContainerHeadSection,
//   ModalContainer,
// } from "@/app/styledComponents/admin/Container";
// import {
//   InputSection,
//   Label,
//   TextInput,
// } from "@/app/styledComponents/admin/Inputs";
// import { Box, Stack } from "@mui/material";
// import { placeholder } from "jodit/esm/plugins/placeholder/placeholder";
// import { useMemo, useRef, useState } from "react";
// import dynamic from "next/dynamic";
// const Jodit = dynamic(() => import("./Jodit"), { ssr: false });
// const menu = [
//   "Departments",
//   "Doctors",
//   "Appointments",
//   "Academics",
//   "Download Files",
//   "Academics Notices",
//   "Tpa Logo",
//   "Events",
//   "Testimonials",
//   "Award Accreditation",
//   "Enquiries",
//   "Contact",
//   "Videos",
//   "Latest Openings",
//   "Careers",
//   "Health Plans",
//   "Health Tips",
// ];

// const cms = ["Menus", "Pages", "Posts", "Templates", "Site Settings"];

// const donations = ["Donation to", "Doners"];

// export default function AddDepartment({ setViewForm }) {
//   const editor = useRef(null);
//   const [content, setContent] = useState("");
//   const config = useMemo(
//     () => ({
//       readonly: false,
//       placeholder: "Start typing...",
//       language: "en", // Set default language
//     }),
//     []
//   );

//   return (
//     <ModalContainer>
//       <InnerContainer width={"80%"}>
//         <InnerContainerHead>New User</InnerContainerHead>
//         <InnerContainerHeadSection column>
//           <InputSection>
//             <Label>Name</Label>
//             <TextInput placeholder="Enter Name" />
//           </InputSection>
//           <InputSection>
//             <Label>Image</Label>
//             <TextInput placeholder="Enter Username" type="file" />
//           </InputSection>
//           <InputSection>
//             <Label>Banner Image</Label>
//             <TextInput placeholder="Enter Password" type="file" />
//           </InputSection>
//           <InputSection>
//             <Label>Content</Label>
//              <Jodit content={content} setContent={setContent} />
//           </InputSection>
//           <InputSection>
//             <Label></Label>
//             <Stack direction={"row"} gap={"10px"}>
//               <GreenButtonSmall>Save</GreenButtonSmall>
//               <BlueButtonSmall onClick={() => setViewForm(false)}>
//                 Cancel
//               </BlueButtonSmall>
//             </Stack>
//           </InputSection>
//         </InnerContainerHeadSection>
//       </InnerContainer>
//     </ModalContainer>
//   );
// }
"use client";

import { InnerContainerHead } from "@/app/styledComponents/admin/AdminHead";
import {
  BlueButtonSmall,
  GreenButtonSmall,
} from "@/app/styledComponents/admin/Buttons";
import {
  InnerContainer,
  InnerContainerHeadSection,
  ModalContainer,
} from "@/app/styledComponents/admin/Container";
import {
  InputSection,
  Label,
  TextInput,
} from "@/app/styledComponents/admin/Inputs";
import { useState } from "react";

// Dynamically import Jodit component
import dynamic from "next/dynamic";
import { Stack } from "@mui/material";
const Jodit = dynamic(() => import("./Jodit"), { ssr: false });

export default function AddDepartment({ setViewForm }) {
  const [content, setContent] = useState("");

  return (
    <ModalContainer>
      <InnerContainer width={"80%"}>
        <InnerContainerHead>New User</InnerContainerHead>
        <InnerContainerHeadSection column>
          <InputSection>
            <Label>Name</Label>
            <TextInput placeholder="Enter Name" />
          </InputSection>
          <InputSection>
            <Label>Image</Label>
            <TextInput placeholder="Enter Username" type="file" />
          </InputSection>
          <InputSection>
            <Label>Banner Image</Label>
            <TextInput placeholder="Enter Password" type="file" />
          </InputSection>
          <InputSection>
            <Label>Content</Label>
            {/* Use Jodit with dynamic import */}
            <Jodit content={content} setContent={setContent} />
          </InputSection>
          <InputSection>
            <Label></Label>
            <Stack direction={"row"} gap={"10px"}>
              <GreenButtonSmall>Save</GreenButtonSmall>
              <BlueButtonSmall onClick={() => setViewForm(false)}>
                Cancel
              </BlueButtonSmall>
            </Stack>
          </InputSection>
        </InnerContainerHeadSection>
      </InnerContainer>
    </ModalContainer>
  );
}
