async function connectWallet() {
    if (typeof window.ethereum === 'undefined') {
        alert("MetaMask is not installed or enabled! Please install/enable MetaMask to use this DApp.");
        return;
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum);

    try {
        // Request wallet connection
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();

        console.log("Wallet Address:", address); // Log the connected address for debugging

        // Try to fetch ENS name
        let displayName = address; // Default to wallet address
        try {
            const ensName = await provider.lookupAddress(address); // Fetch ENS name
            if (ensName) {
                displayName = ensName; // Use ENS name if available
            } else {
                console.warn("No ENS name found for this address.");
            }
        } catch (ensError) {
            console.error("ENS lookup failed:", ensError); // Log ENS lookup errors
        }

        // Display the connected wallet name or address
        const accountInfo = document.createElement('p');
        accountInfo.id = 'accountInfo';
        accountInfo.textContent = `Connected Wallet: ${displayName}`;
        document.getElementById('candidatesContainer').prepend(accountInfo);
    } catch (error) {
        if (error.code === 4001) {
            alert("Connection request rejected by the user. Please approve the connection request.");
        } else {
            console.error("Error connecting to MetaMask:", error);
            alert("Could not connect to MetaMask. Please try again.");
        }
    }
}
