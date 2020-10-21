export const ValidateEmail = (email) => {
    return new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test(email);
}

export const ValidatePassword = (password, signup) => {
    if (!password) {
        return false;
    }

    if (signup) {
        return new RegExp("^(?=.{8,})").test(password)
    }

    return true;
}