import {
  Box,
  useColorModeValue,
  Drawer,
  DrawerContent,
  useDisclosure,
} from "@chakra-ui/react";

import MobileNav from "./NavBar/MobileNav";
import SidebarContent from "./Sidebar/SidebarContent";

const Sidebar = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box
      minH="100vh"
      bg={useColorModeValue("rgba(245, 247, 255, 255)", "gray.900")}
      overflow="hidden"
      overflowX="auto"
    >
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} overflow="hidden" overflowX="auto" />
      <Box ml={{ base: 0, md: 60 }} p="4" overflow="hidden" overflowX="auto">
        {children}
      </Box>
    </Box>
  );
};

export default Sidebar;
