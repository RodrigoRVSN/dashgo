import { useDisclosure, UseDisclosureReturn } from "@chakra-ui/hooks";
import { useRouter } from "next/dist/client/router";
import { useContext, createContext, ReactNode, useEffect } from "react";

type SidebarDrawerContextData = UseDisclosureReturn;

interface SidebarDrawerProviderProps {
  children: ReactNode;
}

const SidebarDrawerContext = createContext({} as SidebarDrawerContextData);

export function SidebarDrawerProvider({
  children,
}: SidebarDrawerProviderProps) {
  const disclosure = useDisclosure();
  const route = useRouter();

  useEffect(() => {
    disclosure.onClose();
  }, [route.asPath]);

  return (
    <SidebarDrawerContext.Provider value={disclosure}>
      {children}
    </SidebarDrawerContext.Provider>
  );
}

export const useSidebarDrawer = () => useContext(SidebarDrawerContext);
