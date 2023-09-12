let sendingSecondPrivateNumber = localStorage.secondPrivateNumber,
  /**
    @param {number} firstPrivateKey
        Private Key for First Side

    @param {number} primeNumber
        Prime Number

    @void
*/
  makingFirstPublicKey = async (firstPrivateKey, primeNumber) => {
    let isChange =
      sendingSecondPrivateNumber !== localStorage.secondPrivateNumber;

    if (isChange) {
      sendingSecondPrivateNumber = localStorage.secondPrivateNumber;

      let firstPublicKey = executePublicKeyFunction(
        firstPrivateKey,
        sendingSecondPrivateNumber,
        primeNumber
      );

      setTimeout(() => {
        document.getElementById("prime").innerText = primeNumber;
        document.getElementById("group").innerText = localStorage.groupNumber;
        document.getElementById("private-number").innerText =
          localStorage.firstNumber;
        document.getElementById("private-key").innerText = firstPrivateKey;
        document.getElementById("public-key").innerText = firstPublicKey;

        document.querySelector(".make-key").classList.remove("disabled");

        thisFirstSide = false;
      }, 200);
    } else {
      setTimeout((_) => {
        makingFirstPublicKey(firstPrivateKey, primeNumber);
      }, 200);
    }
  };

document.querySelector(".make-key").addEventListener("click", async (ev) => {
  if (ev.target.classList.contains("disabled")) return;

  document.querySelector(".make-key").classList.add("disabled");

  thisFirstSide = true;

  let groupNumber = generateRandomNumber(),
    primeNumber,
    firstPrivateNumber,
    firstPrivateKey;

  localStorage.setItem("groupNumber", groupNumber);

  while (true) {
    primeNumber = generateRandomNumber();

    if (bigInt(primeNumber).isPrime()) {
      localStorage.setItem("primeNumber", primeNumber);
      break;
    }
  }

  while (true) {
    firstPrivateNumber = generateRandomNumber();

    if (firstPrivateNumber < primeNumber) {
      localStorage.setItem("firstNumber", firstPrivateNumber);
      break;
    }
  }

  firstPrivateKey = bigInt(bigInt(groupNumber).pow(firstPrivateNumber)).mod(
    primeNumber
  );

  setTimeout((_) => {
    makingFirstPublicKey(firstPrivateKey, primeNumber);
  }, 200);
});
