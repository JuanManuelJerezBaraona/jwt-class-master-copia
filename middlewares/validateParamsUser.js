// const validateParametersUser = (req, res, next) => {
//     const { user } = req.body;
//     if (!user.email || !user.password || !user.nombre || !user.apellido) {
//         return res.status(400).json({ error: "el email, password, nombre y apellido deben estar presentes" });
//     }
//     next();
// }

// export { validateParametersUser };

import { check, validationResult } from 'express-validator';

const validateParametersUser = [
    check('user.email').isEmail().withMessage('Debe ser un correo electrónico válido'),
    check('user.password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
    check('user.nombre').notEmpty().withMessage('El nombre es requerido'),
    check('user.apellido').notEmpty().withMessage('El apellido es requerido'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isLength === 0) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

export { validateParametersUser };