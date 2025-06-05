

// "use client";
// import { Box, Stack } from "@mui/material";
// import { useBannerByPage } from "@/app/components/admin/banner/parts/useBanner";
// import Spinner from "@/app/components/ui/Spinner";
// import { useRouter } from "next/navigation";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// export default function Hero() {
//   const router = useRouter();
//   const { data, isLoading } = useBannerByPage("dummy");

//   if (isLoading) return <Spinner />;

//   const images = Array.isArray(data?.images) ? data.images : [];
//   const mobileImages = Array.isArray(data?.mobileimages)
//     ? data.mobileimages
//     : [];

//   const sliderSettings = {
//     dots: false,
//     infinite: true,
//     speed: 500,
//     autoplay: true,
//     arrows: false,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//   };

//   return (
//     <Stack width="100%">
//       {/* DESKTOP BANNER */}
//       <Box
//         display={{ xs: "none", md: "block" }}
//         width="100%"
//         minHeight={{ md: "50vh", lg: "60vh", xl: "80vh" }}
//         sx={{ position: "relative" }}
//       >
//         {images.length > 1 ? (
//           <Slider {...sliderSettings}>
//             {images.map((img, i) => (
//               <Box
//                 key={i}
//                 width="100%"
//                 height="100%"
//                 sx={{
//                   backgroundImage: `url(${img})`,
//                   backgroundSize: "cover",
//                   backgroundRepeat: "no-repeat",
//                   backgroundPosition: "center",
//                   height: { md: "50vh", lg: "60vh", xl: "80vh" },
//                   cursor: "pointer",
//                 }}
//                 onClick={() => router.push("/about")}
//               />
//             ))}
//           </Slider>
//         ) : (
//           <Box
//             width="100%"
//             height={{ md: "50vh", lg: "60vh", xl: "80vh" }}
//             sx={{
//               backgroundImage: `url(${images[0]})`,
//               backgroundSize: "cover",
//               backgroundRepeat: "no-repeat",
//               backgroundPosition: "center",
//               cursor: "pointer",
//             }}
//             onClick={() => router.push("/about")}
//           />
//         )}
//       </Box>

//       {/* MOBILE BANNER */}
//       <Box display={{ xs: "block", md: "none" }} width="100%" minHeight="50vh">
//         {mobileImages.length > 1 ? (
//           <Slider {...sliderSettings}>
//             {mobileImages.map((img, i) => (
//               <Box
//                 key={i}
//                 width="100%"
//                 height="70vh"
//                 sx={{
//                   backgroundImage: `url(${img})`,
//                   backgroundSize: "cover",
//                   backgroundRepeat: "no-repeat",
//                   backgroundPosition: "center",
//                 }}
//               />
//             ))}
//           </Slider>
//         ) : (
//           <Box
//             width="100%"
//             height="50vh"
//             sx={{
//               backgroundImage: `url(${mobileImages[0]})`,
//               backgroundSize: "cover",
//               backgroundRepeat: "no-repeat",
//               backgroundPosition: "center",
//             }}
//           />
//         )}
//       </Box>
//     </Stack>
//   );
// }




"use client";
import { Box, Stack } from "@mui/material";
import { useBannerByPage } from "@/app/components/admin/banner/parts/useBanner";
import Spinner from "@/app/components/ui/Spinner";
import { useRouter } from "next/navigation";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { AnotherUrl } from "@/app/components/services/AnotherUrl";

export default function Hero() {
  const router = useRouter();
  const { data, isLoading } = useBannerByPage("home");

  if (isLoading) return <Spinner />;

  // Function to get full URL for banner images
  const getBannerUrl = (url) => {
    if (!url) return "";
    const fileName = url.substring(url.lastIndexOf("/") + 1); // Extract the file name
    return AnotherUrl(fileName); // Get full URL using MediaUrl function
  };

  // Apply `getBannerUrl` to each image in the array
  const images = Array.isArray(data?.images)
    ? data.images.map(getBannerUrl)
    : [];
  const mobileImages = Array.isArray(data?.mobileimages)
    ? data.mobileimages.map(getBannerUrl)
    : [];

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Stack width="100%">
      {/* DESKTOP BANNER */}
      <Box
        display={{ xs: "none", md: "block" }}
        width="100%"
        minHeight={{ md: "50vh", lg: "60vh", xl: "80vh" }}
        sx={{ position: "relative" }}
      >
        {images.length > 1 ? (
          <Slider {...sliderSettings}>
            {images.map((img, i) => (
              <Box
                key={i}
                width="100%"
                height="100%"
                sx={{
                  backgroundImage: `url(${img})`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  height: { md: "50vh", lg: "60vh", xl: "80vh" },
                  cursor: "pointer",
                }}
                onClick={() => router.push("/about")}
              />
            ))}
          </Slider>
        ) : (
          <Box
            width="100%"
            height={{ md: "50vh", lg: "60vh", xl: "80vh" }}
            sx={{
              backgroundImage: `url(${images[0]})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              cursor: "pointer",
            }}
            onClick={() => router.push("/about")}
          />
        )}
      </Box>

      {/* MOBILE BANNER */}
      <Box display={{ xs: "block", md: "none" }} width="100%" minHeight="50vh">
        {mobileImages.length > 1 ? (
          <Slider {...sliderSettings}>
            {mobileImages.map((img, i) => (
              <Box
                key={i}
                width="100%"
                height="56vh"
                sx={{
                  backgroundImage: `url(${img})`,
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                }}
              />
            ))}
          </Slider>
        ) : (
          <Box
            width="100%"
            height="50vh"
            sx={{
              backgroundImage: `url(${mobileImages[0]})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
          />
        )}
      </Box>
    </Stack>
  );
}
