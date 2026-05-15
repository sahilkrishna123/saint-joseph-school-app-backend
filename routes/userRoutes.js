import express from 'express';
import * as authController from "../controllers/authController.js";
import * as userController from "../controllers/userController.js";
const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);

// router.post('/logout', (req, res) => {
//     res.clearCookie('token', { httpOnly: true, sameSite: 'strict' });
//     res.json({ status: 'success' });
// });
// Replace your current logout route with this in userRouter.js

router.post('/logout', (req, res) => {
    // Clear ALL three cookies your login sets
    const cookieOptions = {
        httpOnly: true,
        expires: new Date(0),   // force immediate expiry
        path: '/',
    };

    res.clearCookie('jwt', cookieOptions);
    res.clearCookie('JWT-SESSION', cookieOptions);
    res.clearCookie('XSRF-TOKEN', { ...cookieOptions, httpOnly: false }); // XSRF is usually not httpOnly

    res.status(200).json({ status: 'success', message: 'Logged out successfully' });
});
router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

// Protect all routes after this middleware
router.use(authController.protect);

router.patch('/updateMyPassword', authController.updatePassword);
router.get('/me', userController.getMe, userController.getUser);
router.patch(
  '/updateMe',
  userController.uploadUserPhoto,
  userController.resizeUserPhoto,
  userController.updateMe
);
router.delete('/deleteMe', userController.deleteMe);

router.use(authController.restrictTo('admin'));

router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);

router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

export default router;
