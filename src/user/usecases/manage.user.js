import bcrypt from "bcrypt";

import {isEmpty, uuid} from "../../platforms/utils/common.js";
import Boom from "@hapi/boom";
import userModel from "../user.model.js";


export const add = async (payload) => {
    try {
        const {email, password, role, name, profile_picture} = payload ?? {};
        const isDuplicate = await userModel.query().select('*').where('email', email);


        if (!isEmpty(isDuplicate)) {
            throw Boom.notFound("Email already exists. Please try with another email.");
        }

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        await userModel.query().insert({
            id: uuid(),
            email,
            profile_picture,
            name,
            role,
            password: hashedPassword,
            create_date: new Date().toISOString(),
            update_date: new Date().toISOString(),
        });


        return {
            status: 200, success: true, message: "User Added Successfully!!",
        };
    } catch (err) {
        throw err;
    }
};

export const update = async (id, payload) => {
  try {
    const { name, profile_picture } = payload ?? {};

    const existingUser = await userModel.query().findById(id);
    if (isEmpty(existingUser)) {
      throw Boom.notFound("User not found.");
    }

    const updates = {

      profile_picture,
      name,

      update_date: new Date().toISOString(),
    };


    await userModel.query().findById(id).patch(updates);

    return {
      status: 200,
      success: true,
      message: "User updated successfully!",
    };
  } catch (err) {
    throw err;
  }
};
export const remove = async (id) => {
  try {
    const existingUser = await userModel.query().findById(id);
    if (isEmpty(existingUser)) {
      throw Boom.notFound("User not found.");
    }

    await userModel.query().deleteById(id);

    return {
      status: 200,
      success: true,
      message: "User deleted successfully!",
    };
  } catch (err) {
    throw err;
  }
};
export const changeRole = async (id, newRole) => {
    try {
        const existingUser = await userModel.query().findById(id);
        if (isEmpty(existingUser)) {
            throw Boom.notFound("User not found.");
        }

        await userModel.query().findById(id).patch({
            role: newRole,
            update_date: new Date().toISOString(),
        });

        return {
            status: 200,
            success: true,
            message: "User role updated successfully!",
        };
    } catch (err) {
        throw err;
    }
};

export const updatePassword = async (email, oldPassword, newPassword) => {
    try {
        const user = await userModel.query().findOne({ email });

        if (isEmpty(user)) {
            throw Boom.notFound("User not found.");
        }

        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            throw Boom.unauthorized("Old password does not match.");
        }

        const salt = await bcrypt.genSalt();
        const hashedNewPassword = await bcrypt.hash(newPassword, salt);

        await userModel.query().patchAndFetchById(user.id, {
            password: hashedNewPassword,
            update_date: new Date().toISOString(),
        });

        return {
            status: 200,
            success: true,
            message: "Password updated successfully!",
        };
    } catch (err) {
        throw err;
    }
};
