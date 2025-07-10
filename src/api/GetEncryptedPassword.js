export default async function getEncryptedPassword(password) {
    // Step 1: Fetch the public key from the backend
    const response = await fetch('http://localhost:8080/api/auth/public-key');
    console.log(response);
    
    const publicKeyBase64 = await response.text();

    // Step 2: Clean and validate the Base64 string
    const cleanBase64 = publicKeyBase64.trim();

    let binaryDer;
    try {
        // Decode Base64 to binary string
        const binaryDerString = atob(cleanBase64);

        // Convert binary string to Uint8Array
        binaryDer = new Uint8Array(binaryDerString.length);
        for (let i = 0; i < binaryDerString.length; i++) {
            binaryDer[i] = binaryDerString.charCodeAt(i);
        }
    } catch (error) {
        console.error("Base64 decoding failed:", error);
        throw new Error("Invalid public key format received from server.");
    }

    // Step 3: Import the public key for encryption
    const publicKey = await window.crypto.subtle.importKey(
        "spki",
        binaryDer.buffer,
        {
            name: "RSA-OAEP",
            hash: "SHA-256"
        },
        true,
        ["encrypt"]
    );

    // Step 4: Encrypt the password
    const encodedPassword = new TextEncoder().encode(password);
    const encrypted = await window.crypto.subtle.encrypt(
        {
            name: "RSA-OAEP"
        },
        publicKey,
        encodedPassword
    );

    // Step 5: Convert encrypted ArrayBuffer to Base64 string
    const byteArray = new Uint8Array(encrypted);
    let binary = '';
    byteArray.forEach(byte => binary += String.fromCharCode(byte));
    return btoa(binary);
}
