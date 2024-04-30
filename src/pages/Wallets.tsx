import { VStack, Button, Image, Text } from "@chakra-ui/react";
import { useWallet } from "@solana/wallet-adapter-react";

import { decodeUTF8 } from "tweetnacl-util";

const Wallets = () => {
  const { select, wallets, publicKey, disconnect, signMessage } = useWallet();

  // Function to sign a message
  const handleSignMessage = async () => {
    try {
      const message = "Hello, Solana!"; // Your message to sign
      const signature = await signMessage(decodeUTF8(message));
      console.log("Signature:", signature);
    } catch (error) {
      console.error("Error signing message:", error);
    }
  };

  return !publicKey ? (
    <VStack gap={4}>
      {wallets.filter((wallet) => wallet.readyState === "Installed").length >
      0 ? (
        wallets
          .filter((wallet) => wallet.readyState === "Installed")
          .map((wallet) => (
            <Button
              key={wallet.adapter.name}
              onClick={() => select(wallet.adapter.name)}
              w="64"
              size="lg"
              fontSize="md"
              leftIcon={
                <Image
                  src={wallet.adapter.icon}
                  alt={wallet.adapter.name}
                  h={6}
                  w={6}
                />
              }
            >
              {wallet.adapter.name}
            </Button>
          ))
      ) : (
        <Text>No wallet found. Please download a supported Solana wallet</Text>
      )}
    </VStack>
  ) : (
    <VStack gap={4}>
      <Text>{publicKey.toBase58()}</Text>
      <Button onClick={disconnect}>Disconnect Wallet</Button>
      <Button onClick={handleSignMessage}>Sign Message</Button>
    </VStack>
  );
};

export default Wallets;
