import Auth from '../models/auth.model.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import validator from "email-validator";
import axios from 'axios'

//signup here
export const signup = async (req, res) => {
    const { password } = req.body

    if (!validator.validate(req.body.email)) {
        return res.status(403).json({
            success: false,
            error: "Wrong Email Format"
        })
    }

    let existingUser;
    try {
        existingUser = await Auth.findOne({
            email: req.body.email
        });
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            error: "Something went wrong while finding new user!"
        })
    }


    if (existingUser) {
        return res.status(403).json({
            success: false,
            error: "Email already exists! Please login instead."
        })
    }


    //creating a hashed password and saving the user into mongo.
    let hashedpassword;
    try {
        hashedpassword = await bcrypt.hash(password, 10)
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            error: "Something went wrong while hashing!"
        })
    }

    //creating new user
    const newUser = new Auth({
        ...req.body,
        password: hashedpassword,

    });
    try {
        await newUser.save();

    }
    catch (err) {
        return res.status(500).json({
            success: false,
            error: "Something went wrong while saving new user!"
        })
    }

    //generating json web token 
    let token;
    try {
        token = jwt.sign({
            user: newUser
        },
            "Achilles",
            { expiresIn: "1d" }
        )
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            error: "Something went wrong while generating token!"
        })
    }

    res.status(200).json({
        success: true,
        user: newUser,
        token: token,
    });
};

export var login = async (req, res) => {
    const { email, password } = req.body;

    // checking if email exists in database
    let existingUser
    try {
        existingUser = await Auth.findOne({ email: email })
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            error: "Something went wrong!"
        })
    }

    if (!existingUser) {
        return res.status(403).json({
            success: false,
            error: "Account does not exist! Pleasse register instead."
        })
    }

    //comparing passwords
    let isValidPassword
    try {
        isValidPassword = await bcrypt.compare(password, existingUser.password)
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            error: "Something went wrong while checking password!"
        })
    }

    if (!isValidPassword) {
        return res.status(400).json({
            success: false,
            error: "Invalid Password!"
        })
    }

    //generating token here do not touch 
    let token;
    try {
        token = jwt.sign(
            {
                user: existingUser

            },
            "Achilles",
            { expiresIn: "1h" }
        );
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: "Something went wrong while generating token!"
        })
    }
    res.json({
        user: existingUser,
        token: token,
    });
};

export const getAuthById = async (req, res) => {
    let auth;
    try {
        auth = await Auth.findOne({ _id: req.params.id });

    } catch {
        res.status(500).json({
            success: false,
            error: "Something went wrong"
        })
    }

    res.status(200).json({
        success: true,
        user: auth
    })
}

export const getAllUsers = async (req, res) => {
    res.status(200).json(res.advancedResults);
}



// export const verifyEmail = async (req, res) => {
//     const { userId } = req.body;
//     const user = await Auth.findOne({
//         _id: userId
//     });
//     if (user)
//         try {
//             const response = await axios.post('https://api.modcart.io:80/email/send', {
//                 "templateName": "verificationEmail",
//                 "sendTo": [
//                     user.email
//                 ],
//                 "data": {
//                     "url": `https://www.modcart.io/verify?userId=${user._id}`,
//                 }, "source": 'admin@nirmitee.io'
//             })
//             console.log(response.data)
//             res.status(200).json({ success: true, message: "Verification Link sent on registered email!" })
//         }
//         catch (err) {
//             const error = new HttpResponse("failed to save", 500);
//             return res.status(500).json({ response: error });
//         }
//     else res.status(401).json({ success: false, message: "Invalid User ID" })
// }

// export const googleSignIn = async (req, res) => {
//     const { email, name, googleId, isVerified } = req.body

//     let existingUser;
//     try {
//         existingUser = await Auth.findOneAndUpdate({ email: email },
//             {
//                 $set: {
//                     isVerified: true
//                 }
//             });
//     }
//     catch (err) {
//         const error = new HttpResponse(
//             'something went wrong', 500
//         );
//         return res.status(500).json({
//             Response: error
//         })
//     }

//     //creating new user
//     if (!existingUser) {
//         existingUser = new Auth({
//             name,
//             //password: hashedpassword,
//             email,
//             googleId,
//             isVerified: true

//             //confirmPassword
//         });
//         try {
//             await existingUser.save();
//         }
//         catch (err) {
//             const error = new HttpResponse("failed to save", 500);
//             return res.status(500).json({ response: error });
//         }
//     }


//     //generating json web token 
//     let token;
//     try {
//         token = jwt.sign({
//             email: existingUser.email,
//             //password: newUser.password,
//             name: existingUser.name,
//             //confirmPassword: newUser.confirmPassword,
//             isVerified: existingUser.isVerified

//         },
//             "this is modcart private key",
//             { expiresIn: "1h" }
//         )
//     }
//     catch (err) {
//         console.log(err);
//         const error = new HttpResponse("token generation failed", 500)
//         return res.status(500).json({ response: error })
//     }

//     res.status(200).json({
//         userId: existingUser.id,
//         email: existingUser.email,
//         // password: newUser.password,
//         name: existingUser.name,
//         // confirmPassword:newUser.confirmPassword,
//         token: token,
//         isVerified: existingUser.isVerified
//     });
// };

// export const facebookSignIn = async (req, res) => {
//     const { email, name, facebookId, isVerified } = req.body
//     console.log(email)
//     let existingUser;
//     try {
//         existingUser = await Auth.findOneAndUpdate({ email: email },
//             {
//                 $set: {
//                     isVerified: true
//                 }
//             });
//     }
//     catch (err) {
//         const error = new HttpResponse(
//             'something went wrong', 500
//         );
//         return res.status(500).json({
//             Response: error
//         })
//     }
//     console.log(existingUser)

//     if (existingUser) {
//         // Login Logic

//         // return res.status(200).json({
//         //     response: "Email Alrady Exists, Please Login instead"
//         // })
//     }

//     //creating new user
//     if (!existingUser) {
//         existingUser = new Auth({
//             name,
//             //password: hashedpassword,
//             email,
//             facebookId,
//             //confirmPassword
//         });
//         try {
//             await existingUser.save();
//         }
//         catch (err) {
//             const error = new HttpResponse("failed to save", 500);
//             return res.status(500).json({ response: error });
//         }
//     }


//     //generating json web token 
//     let token;
//     try {
//         token = jwt.sign({
//             email: existingUser.email,
//             //password: newUser.password,
//             name: existingUser.name,
//             //confirmPassword: newUser.confirmPassword,
//             isVerified: existingUser.isVerified

//         },
//             "this is modcart private key",
//             { expiresIn: "1h" }
//         )
//     }
//     catch (err) {
//         console.log(err);
//         const error = new HttpResponse("token generation failed", 500)
//         return res.status(500).json({ response: error })
//     }

//     res.status(201).json({
//         userId: existingUser.id,
//         email: existingUser.email,
//         // password: newUser.password,
//         name: existingUser.name,
//         // confirmPassword:newUser.confirmPassword,
//         token: token,
//         isVerified: existingUser.isVerified
//     });
// };

// export const forgotPassword = async (req, res) => {
//     const { email } = req.body;
//     let existingUser;
//     try {
//         existingUser = await Auth.findOne({ email: email })
//     } catch (err) {
//         res.status(500).json({ success: false, message: "Unable to find the user!" })

//     }

//     if (!existingUser) {
//         res.status(401).json({ success: true, message: "User does not exist!" })

//     }

//     try {
//         const response = await axios.post('https://api.modcart.io:80/email/send', {
//             "templateName": "forgotPassword",
//             "sendTo": [
//                 existingUser.email
//             ],
//             "data": {
//                 "url": `https://www.modcart.io/reset?userId=${existingUser._id}`,
//             }, "source": 'admin@nirmitee.io'
//         })
//         console.log(response.data)
//         res.status(200).json({ success: true, message: "Password Reset Link sent on registered email!" })
//     }
//     catch (err) {
//         res.status(500).json({ success: false, message: "Unable to send reset link! Please try again." })
//     }

// }

// //login here

// export const updatePassword = asyncHandler(async (req, res, next) => {
//     const { confirmPassword, password } = req.body;

//     logger.info({
//         message: "Updating a password",
//     });

//     const id = req.params.id;
//     let existingUser

//     try {
//         existingUser = await Auth.findById(id)
//     }
//     catch (err) {
//         const error = new HttpResponse("cannot find user", 500)
//         return res.status(500).json({ response: error })
//     }

//     console.log(existingUser)

//     if (!existingUser) {
//         const error = new HttpResponse("Email not found, Please SignUp.", 401);
//         return res.status(500).json({ response: error });
//     }

//     let hashedpassword;
//     try {
//         hashedpassword = await bcrypt.hash(password, 10)
//     }
//     catch (err) {
//         const error = new HttpResponse(
//             "hashing failed..", 500
//         );
//         return res.status(500).json({
//             response: error
//         })
//     }

//     let hashedConfirmPassword;
//     try {
//         hashedConfirmPassword = await bcrypt.hash(confirmPassword, 10)
//     }
//     catch (err) {
//         const error = new HttpResponse(
//             "hashing failed..", 500
//         );
//         return res.status(500).json({
//             response: error
//         })
//     }

//     let updateAuth = await Auth.findOneAndUpdate({ _id: id },
//         {
//             $set: {
//                 password: hashedpassword,
//                 confirmPassword: hashedConfirmPassword
//             }
//         }
//         // { _id: id },
//         // { ...req.body },
//         // { new: true }
//     );

//     if (!updateAuth) {
//         logger.error({
//             message: `Auth with ${id} not found`,
//         });
//         return next(
//             new ErrorResponse(
//                 `Auth  with ${id}  not found`,
//                 404
//             )
//         );
//     }

//     logger.info({
//         message: `Auth with ${id} updated`,
//         ...req.body,
//     });
//     res.status(200).json(updateAuth);

// })


// export const searchAuth = asyncHandler(async (req, res, next) => {
//     let findAuth = await Auth
//         .fuzzySearch(
//             { query: req.query.text, prefixOnly: false, minSize: 3 },
//             { ...req.body.options }
//         )
//         .exec();
//     res.status(200).json(findAuth);
// });

// export const getAllAuth = asyncHandler(async (req, res, next) => {
//     logger.info({
//         message: "Sending the advancedResults",
//     });
//     res.status(200).json(res.advancedResults);
// });


// export const deleteAAuth = asyncHandler(async (req, res, next) => {
//     const id = req.params.id;
//     let deleteAuth = await Auth.updateOne({ _id: id },
//         {
//             $set: {
//                 deleted: true
//             }
//         })
//     if (!deleteAuth) {
//         logger.error({
//             message: `Auth with ${id} not found`,
//         });
//         return next(
//             new ErrorResponse(
//                 `Auth with ${id} not found`,
//                 404
//             )
//         );
//     }


//     logger.info({
//         message: `Auth with ${id} deleted`,
//     });
//     res.json(deleteAuth);
// });

// export const deleteAllAuth = asyncHandler(async (req, res, next) => {
//     await Auth.remove();
//     res.json({ deleted: true });
// });


// export const updateAAuth = asyncHandler(async (req, res, next) => {

//     const { confirmPassword, password } = req.body

//     logger.info({
//         message: "Updating a Auth",
//     });
//     const id = req.params.id;

//     let updateAuth = await Auth.findOneAndUpdate(
//         { _id: id },
//         { ...req.body },
//         { new: true }
//     );

//     if (!updateAuth) {
//         logger.error({
//             message: `Auth with ${id} not found`,
//         });
//         return next(
//             new ErrorResponse(
//                 `Auth  with ${id}  not found`,
//                 404
//             )
//         );
//     }



//     logger.info({
//         message: `Auth with ${id} updated`,
//         ...req.body,
//     });
//     res.status(200).json(updateAuth);
// });

// export const getAAuthById = asyncHandler(async (req, res, next) => {
//     const id = req.params.id;

//     let singleAuth = await Auth.findOne({ _id: id });

//     if (!singleAuth) {
//         logger.error({
//             message: `Auth with ${id} not found`,
//         });
//         return next(
//             new ErrorResponse(
//                 `Auth with ${id} not found`,
//                 404
//             )
//         );
//     }
//     logger.info({
//         message: `Auth with ${id}  found`,
//     });
//     res.status(200).json(singleAuth);
// });
