let account; 
let hasVoted = false; 

document.getElementById('connectButton').addEventListener('click', connectWallet);
document.getElementById('voteButton').addEventListener('click', handleVote);

async function connectWallet() {
    if (typeof window.ethereum === 'undefined') {
        alert("MetaMask is not installed or enabled! Please install/enable MetaMask to use this DApp.");
        return;
    }

    const provider = new Web3(window.ethereum);

    try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const accounts = await provider.eth.getAccounts();
        account = accounts[0];

        const maskedAddress = `${account.substring(0, 6)}...${account.substring(account.length - 4)}`;

        let displayName = maskedAddress; 
        try {
            const ensName = await provider.eth.ens.getName(account);
            if (ensName && ensName.name) {
                displayName = ensName.name; 
            }
        } catch (ensError) {
            console.warn("No ENS name found for this address:", ensError);
        }

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

function handleVote() {
    if (hasVoted) {
        alert("You have already voted. Thank you!");
        return;
    }

    const selectedCandidate = document.getElementById('candidateSelect').value;

    if (!selectedCandidate) {
        alert("Please select a candidate to vote for.");
        return;
    }

    if (!account) {
        alert("You need to connect your wallet to vote.");
        return;
    }

    alert(`Vote successfully submitted for: ${selectedCandidate}!`);

    hasVoted = true;

    document.getElementById('voteButton').disabled = true;

    logoutMetaMask();

    document.getElementById('candidateSelect').value = '';
}

async function logoutMetaMask() {
    try {
        account = null;

        alert("You have been logged out of MetaMask. Thank you for voting!");

        const accountInfo = document.getElementById('accountInfo');
        if (accountInfo) {
            accountInfo.remove();
        }

        document.getElementById('connectButton').disabled = false;
    } catch (error) {
        console.error("Error logging out:", error);
        alert("An error occurred while trying to logout of MetaMask.");
    }
}
