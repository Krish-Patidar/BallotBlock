let account;
let votingContract;

document.getElementById('connectButton').addEventListener('click', connectWallet);
document.getElementById('voteButton').addEventListener('click', handleVote);

async function connectWallet() {
    if (typeof window.ethereum !== 'undefined') {
        const provider = new Web3(window.ethereum);

        try {
            // Request account access
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const accounts = await provider.eth.getAccounts();
            account = accounts[0];

            // Display the connected wallet address
            const accountInfo = document.createElement('p');
            accountInfo.id = 'accountInfo';
            accountInfo.textContent = `Connected Wallet: ${account}`;
            document.getElementById('candidatesContainer').prepend(accountInfo);

            // Initialize the voting contract (you can ignore this part since it’s not needed for alerting)
            // votingContract = new provider.eth.Contract(votingContractABI, votingContractAddress);

        } catch (error) {
            console.error("Error connecting to MetaMask:", error);
            alert("Could not connect to MetaMask. Please try again.");
        }
    } else {
        alert("MetaMask not detected! Please install MetaMask to use this DApp.");
    }
}

function handleVote() {
    const selectedCandidate = document.getElementById('candidateSelect').value;

    if (!selectedCandidate) {
        alert("Please select a candidate to vote for.");
        return;
    }

    if (!account) {
        alert("You already submitted your vote! Thanks");
        return;
    }

    // Simulating a vote submission (no actual blockchain interaction in this case)
    // Assuming the vote is cast successfully, we show an alert
    alert("Vote successfully submitted!");

    // Simulate logout after vote submission
    logoutMetaMask();

    // Optionally, clear the selection after voting
    document.getElementById('candidateSelect').value = '';
}

// Simulate MetaMask logout by calling the request method again
async function logoutMetaMask() {
    try {
        // We can reset the account variable to simulate disconnection
        account = null;

        // Optional: Ask the user to disconnect MetaMask manually by re-requesting accounts
        await window.ethereum.request({ method: 'eth_accounts' });
        alert("Thanks for your vote!");
    } catch (error) {
        console.error("Error logging out:", error);
        alert("An error occurred while trying to logout of MetaMask.");
    }
}
