let executeCheckingFunction,
    makingSecondPublicKey,
    sendingPrimeNumber = localStorage.primeNumber,
    sendingFirstNumber = localStorage.firstNumber;

const checkIfMakingStart = async _ => {

    if (thisFirstSide) {
        sendingPrimeNumber = localStorage.primeNumber;
        sendingFirstNumber = localStorage.firstNumber;
    }

    let ifChange = (
        localStorage.primeNumber !== sendingPrimeNumber 
        &&
        localStorage.firstNumber !== sendingFirstNumber
    );
    
    if (ifChange) {

        document.querySelector('.make-key').classList.add('disabled');

        clearInterval(executeCheckingFunction);

        let secondPrivateNumber,
            secondPrivateKey,
            secondPublicKey,
            groupNumber = localStorage.groupNumber;

        sendingPrimeNumber = localStorage.primeNumber;
        sendingFirstNumber = localStorage.firstNumber;

        while (true) {
            secondPrivateNumber = generateRandomNumber();

            if (secondPrivateNumber < sendingPrimeNumber) {
                localStorage.setItem("secondPrivateNumber", secondPrivateNumber);
                break;
            }
        }


        secondPrivateKey = bigInt(
            bigInt(groupNumber).pow(secondPrivateNumber)
        ).mod(sendingPrimeNumber);


        secondPublicKey = executePublicKeyFunction(secondPrivateKey, sendingFirstNumber, sendingPrimeNumber);

        setTimeout(() => {
            document.getElementById('prime').innerText = sendingPrimeNumber;
            document.getElementById('group').innerText = groupNumber;
            document.getElementById('private-number').innerText = secondPrivateNumber;
            document.getElementById('private-key').innerText = secondPrivateKey;
            document.getElementById('public-key').innerText = secondPublicKey;

            document.querySelector('.make-key').classList.remove('disabled');

            checkIfMakingStart();

        }, 200);

    } else {
        setTimeout(_ => {
            checkIfMakingStart();
        }, 200);
    }
}

runCheckFunction = _ => {
    checkIfMakingStart();
}

runCheckFunction();