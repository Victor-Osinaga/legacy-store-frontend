const validateNameCheckout = (value) => {
    if(value.length < 3 || value.length > 30){
        return "Entre 3 y 30 caracteres"
    }
}

const validateSurnameCheckout = (value) => {
    if(value.length < 3 || value.length > 30){
        return "Entre 3 y 30 caracteres"
    }
}

const validateEmailCheckout = (v) => {
    const emailRegex = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;

    // console.log("email regex", emailRegex.test(v));
    if(!emailRegex.test(v)){
        return "'Email' invalido"
    }
}

const validateAreaCodeCheckout = (v) => {
    if(v.length < 2 || v.length > 4){
        return "Entre 2 y 4 números"
    }
}

const validateNumberCheckout = (v) => {
    if(v.length < 5 || v.length > 9){
        return "Entre 5 y 9 números"
    }
}

export {
    validateNameCheckout,
    validateSurnameCheckout,
    validateEmailCheckout,
    validateAreaCodeCheckout,
    validateNumberCheckout
}