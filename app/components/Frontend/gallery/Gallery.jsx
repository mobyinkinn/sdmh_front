"use client";
import React from "react";
import Navbar from "../navbar/Nav";
import Footer from "../footer/Footer";
import banner from "./assets/bannerImage.png";
import BannerImage2 from "@/app/styledComponents/frontend/BannerImage2";
import TabData from "./assets/TabData";
import { Box } from "@mui/material";
import Spinner from "../../ui/Spinner";
import { useBannerByPage } from "../../admin/banner/parts/useBanner";
import Gallerychnage from "./assets/Gallery";

const Gallery = () => {
  const { data, isLoading: isLoadingBanner } = useBannerByPage("gallery");
  if (isLoadingBanner) return <Spinner />;
  return (
    <>
      <Navbar />
      {/* <BannerImage2 image={banner.src} /> */}
      <Box
        display={{ md: "flex", sm: "none" }}
        minHeight={{ md: "322px", lg: "434px", xl: "600px" }}
        width={"100%"}
        sx={{
          backgroundImage: `url(${data?.banner})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center center",
        }}
      ></Box>

      <Box
        display={{ md: "none", sm: "flex" }}
        minHeight={{ xs: "451px" }}
        width={"100%"}
        sx={{
          backgroundImage: `url(${data?.mobileBanner})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
          backgroundPosition: "center center",
        }}
      ></Box>
      <TabData />
     
      <Footer />
    </>
  );
};

export default Gallery;

// "use client"

// import { Canvas } from "@react-three/fiber";
// import * as THREE from "three";
// import { OrbitControls } from "@react-three/drei";
// const Gallery = () => {
//   return (
//     <Canvas style={{width:"100%", height:"50vh"}}>
//       <OrbitControls />
//       <mesh>
//         <sphereGeometry args={[500, 60, 40]} />
//         <meshBasicMaterial
//           map={new THREE.TextureLoader().load("/bg.jpg")}
//           side={THREE.BackSide}
//         />
//       </mesh>
//     </Canvas>
//   );
// };

// export default Gallery;

// "use client";

// import { Canvas, useThree } from "@react-three/fiber";
// import { OrbitControls, Html } from "@react-three/drei";
// import * as THREE from "three";

// const Gallery = () => {
//   return (
//     <div style={{ width: "100%", height: "100vh" }}>
//       <Canvas>
//         <OrbitControls />
//         <mesh>
//           <sphereGeometry args={[500, 60, 40]} />
//           <meshBasicMaterial
//             map={new THREE.TextureLoader().load("/bg.jpg")}
//             side={THREE.BackSide}
//           />
//         </mesh>
//         {/* Place ControlsOverlay with Html */}
//         <ControlsOverlay />
//       </Canvas>
//     </div>
//   );
// };

// const ControlsOverlay = () => {
//   const { camera } = useThree();

//   const zoomIn = () => {
//     camera.position.z -= 10;
//     camera.updateProjectionMatrix();
//   };

//   const zoomOut = () => {
//     camera.position.z += 10;
//     camera.updateProjectionMatrix();
//   };

//   const moveUp = () => {
//     camera.position.y += 5;
//     camera.updateProjectionMatrix();
//   };

//   const moveDown = () => {
//     camera.position.y -= 5;
//     camera.updateProjectionMatrix();
//   };

//   const resetCamera = () => {
//     camera.position.set(0, 0, 500);
//     camera.lookAt(0, 0, 0);
//     camera.updateProjectionMatrix();
//   };

//   return (
//     <Html position={[0, 0, 0]}>
//       <div
//         style={{
//           position: "absolute",
//           bottom: "10px",
//           left: "50%",
//           transform: "translateX(-50%)",
//           background: "rgba(255, 255, 255, 0.7)",
//           borderRadius: "8px",
//           padding: "10px",
//           display: "flex",
//           gap: "10px",
//         }}
//       >
//         <button onClick={zoomIn}>Zoom In</button>
//         <button onClick={zoomOut}>Zoom Out</button>
//         <button onClick={moveUp}>Move Up</button>
//         <button onClick={moveDown}>Move Down</button>
//         <button onClick={resetCamera}>Reset</button>
//       </div>
//     </Html>
//   );
// };

// export default Gallery;
