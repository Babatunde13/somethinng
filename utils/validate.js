const Joi = require('joi');

const schema = Joi.object({
    userName: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
    firstName: Joi.string()
        .min(3)
        .max(30)
        .required(),
    lastName: Joi.string()
        .min(3)
        .max(30)
        .required(),

    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .required(),

    confirm_password: Joi.ref('password'),

    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'io'] } })
        .required(),
    role: Joi.string()
        .valid('admin', 'user')
        .required(),
})
    .with('password', 'confirm_password');
exports.validateUser = (userName, firstName, lastName, email, password, role, confirm_password) => {
        const data = {
        userName, firstName, lastName, email, password, role, confirm_password
    }
    const {error, value} = schema.validate(data);
    if (error) {
        throw new Error(error);
    }
    return value;
}
