module.exports = {
    validate: async (req) => {
        let { nickname, email, password } = req.body;
        if (nickname.toString().lenght >= 6 && email.toString().lenght >= 6 && password.toString().lenght >= 6) {
            return true;
        } return false;
    }
}