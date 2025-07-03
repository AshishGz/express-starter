import * as userUseCase from "./usecases/manage.user.js";


/**
 * Create a new user.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export const add = (req, res, next) => {
  userUseCase
    .add(req.body)
    .then((data) => res.json({ success: true, data }))
    .catch((err) => next(err));
};
/**
 * Update an existing user.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export const update = (req, res, next) => {
  const userId = req.params.id;
  userUseCase
      .update(userId, req.body)
      .then((data) => res.json({ success: true, data }))
      .catch((err) => next(err));
};
/**
 * Delete a user.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export const remove = (req, res, next) => {
  const userId = req.params.id;
  userUseCase
      .remove(userId)
      .then((data) => res.json({ success: true, data }))
      .catch((err) => next(err));
};
/**
 * Change role of a user.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export const changeRole = (req, res, next) => {
  const userId = req.params.id;
  const { role } = req.body;

  userUseCase
      .changeRole(userId, role)
      .then((data) => res.json({ success: true, data }))
      .catch((err) => next(err));
};
/**
 * Update user password if old password matches.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export const updatePassword = (req, res, next) => {
  const { email, oldPassword, newPassword } = req.body;

  userUseCase
      .updatePassword(email, oldPassword, newPassword)
      .then((data) => res.json({ success: true, data }))
      .catch((err) => next(err));
};

