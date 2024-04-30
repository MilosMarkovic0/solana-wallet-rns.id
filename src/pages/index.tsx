import { Heading, VStack } from "@chakra-ui/react";
import dynamic from "next/dynamic";

const Wallets = dynamic(() => import("./Wallets"), { ssr: false });

export default function IndexPage() {
  return (
    <VStack gap={8} mt={16}>
      <Heading>Wallet Connect</Heading>

      <Wallets />
    </VStack>
  );
}
