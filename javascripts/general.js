const generateRandomNumber = (_) => {
    const num1 = parseInt(Math.random() * 10, 10),
      num2 = parseInt(Math.random() * 10, 10) * 10,
      num3 = parseInt(Math.random() * 10, 10) * 100,
      num4 = parseInt(Math.random() * 10, 10) * 1000,
      num5 = parseInt(Math.random() * 10, 10) * 10000,
      num6 = parseInt(Math.random() * 10, 10) * 100000,
      num7 = parseInt(Math.random() * 10, 10) * 1000000,
      number = num1 + num2 + num3 + num4 + num5 + num6 + num7;

    return number;
  },
  executePublicKeyFunction = (privateKey, privateNumber, primeNumber) => {
    let publicKey = bigInt(bigInt(privateKey).pow(privateNumber)).mod(
      primeNumber
    );

    return publicKey;
  };

let thisFirstSide = false,
  runCheckFunction;
