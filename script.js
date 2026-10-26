const passwordInput = document.getElementById("password");
const lengthSlider = document.getElementById("length");
const lengthValue = document.getElementById("lengthValue");
const uppercaseCheck = document.getElementById("uppercase");
const lowercaseCheck = document.getElementById("lowercase");
const numbersCheck = document.getElementById("numbers");
const symbolsCheck = document.getElementById("symbols");
const generateBtn = document.getElementById("generateBtn");
const copyBtn = document.getElementById("copyBtn");
const errorMessage = document.getElementById("errorMessage");
const copyMessage = document.getElementById("copyMessage");
lengthSlider.addEventListener("input", () => {
    lengthValue.textContent = lengthSlider.value;
});
function generatePassword() {
    let characters = "";
    const characterGroups = [];
    if (uppercaseCheck.checked) {
        characterGroups.push("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
    }
    if (lowercaseCheck.checked) {
        characterGroups.push("abcdefghijklmnopqrstuvwxyz");
    }
    if (numbersCheck.checked) {
        characterGroups.push("0123456789");
    }
    if (symbolsCheck.checked) {
        characterGroups.push("!@#$%^&*()_+-=[]{}?");
    }
    if (characterGroups.length === 0) {
        passwordInput.value = "";
        errorMessage.textContent =
            "Please select at least one character type!";
        copyMessage.textContent = "";
        return;
    }
    errorMessage.textContent = "";
    characters = characterGroups.join("");
    const passwordLength = Number(lengthSlider.value);
    let password = "";
    const shuffledGroups = [...characterGroups];
    for (let i = shuffledGroups.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledGroups[i], shuffledGroups[j]] =
            [shuffledGroups[j], shuffledGroups[i]];
    }
    for (let i = 0; i < Math.min(passwordLength, shuffledGroups.length); i++) {
        const group = shuffledGroups[i];
        password += group[Math.floor(Math.random() * group.length)];
    }
    while (password.length < passwordLength) {
        const randomIndex = Math.floor(
            Math.random() * characters.length
        );
        password += characters[randomIndex];
    }
    const passwordArray = password.split("");
    for (let i = passwordArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [passwordArray[i], passwordArray[j]] =
            [passwordArray[j], passwordArray[i]];
    }

    passwordInput.value = passwordArray.join("");
    copyMessage.textContent = "";
}

async function copyPassword() {
    if (!passwordInput.value) {
        copyMessage.textContent = "Generate a password first!";
        return;
    }
    try {
        await navigator.clipboard.writeText(passwordInput.value);
        copyMessage.textContent = "Password copied successfully! 💗";
    } catch (error) {
        passwordInput.focus();
        passwordInput.select();
        const copied = document.execCommand("copy");
        copyMessage.textContent = copied
            ? "Password copied successfully! 💗"
            : "Unable to copy. Please copy it manually.";
    }
}

generateBtn.addEventListener("click", generatePassword);
copyBtn.addEventListener("click", copyPassword);
generatePassword();