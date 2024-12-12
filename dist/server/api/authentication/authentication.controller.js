"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const connection_1 = require("../../../configuration/connection");
const authentication_model_1 = __importDefault(require("./authentication.model"));
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
/**
 * Sign up
 * @param req
 * @param res
 * @returns
 */
const register = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let { email, password } = req.body;
        const user = yield authentication_model_1.default.findOne({
            email,
        });
        if (user) {
            res.status(400).json({
                message: "Email Address Already Exist",
            });
            return;
        }
        const newUser = new authentication_model_1.default({
            email,
            password,
        });
        encryptPassword(newUser, res);
    });
};
exports.register = register;
/**
 * Login
 * @param req
 * @param res
 */
const login = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!req.body.email || !req.body.password) {
            res.status(400).json({
                message: "Cannot Login Required Email and Password",
            });
        }
        const user = yield authentication_model_1.default.findOne({
            email: req.body.email,
        });
        if (user) {
            const isMatch = yield comparePassword(req.body.password, user === null || user === void 0 ? void 0 : user.password);
            if (!isMatch) {
                res.status(400).json({
                    message: " Invalid Email and Password",
                });
            }
            else {
                const expirationInSeconds = 24 * 60 * 60; // 24 hours in seconds
                user.token = jwt.sign({ _id: user._id, email: user.email }, connection_1.jwtSecret, {
                    expiresIn: expirationInSeconds,
                });
                res.status(200).send({ user, message: "Sucessfully Logined" });
            }
        }
        else {
            res.status(404).json({
                message: "No User Found",
            });
        }
    });
};
exports.login = login;
/**
 * Compare Password
 * @param password
 * @param hash
 * @returns
 */
const comparePassword = function (password, hash) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcrypt.compare(password, hash);
    });
};
/**
 * Encrypt User Password
 * @param user
 * @param res
 */
const encryptPassword = function (user, res) {
    return __awaiter(this, void 0, void 0, function* () {
        bcrypt.hash(user.password, 9, function (err, hashedPassword) {
            return __awaiter(this, void 0, void 0, function* () {
                if (err) {
                    res.status(500).send(err);
                }
                else {
                    user.password = hashedPassword;
                    yield user.save();
                    res.status(201).json({ user, message: "Registration Successfull" });
                }
            });
        });
    });
};
